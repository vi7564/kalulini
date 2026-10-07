import { getAuth } from 'firebase-admin/auth';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import { NextResponse } from 'next/server';
import { isPendingStatus, requiredRoleLink, validateRoleAssignment } from '@/lib/access-policy.mjs';
import { requireAdminRequest } from '@/lib/firebase-admin';

export const runtime = 'nodejs';

type UserAction = 'approve' | 'reject' | 'deactivate' | 'activate' | 'set-role';

export async function PATCH(request: Request, context: { params: { uid: string } }) {
  try {
    const access = await requireAdminRequest(request);
    if ('response' in access) return access.response;
    const { app, decoded, profile: actor } = access;
    const uid = context.params.uid;
    if (!uid || uid === decoded.uid) {
      return NextResponse.json({ error: 'You cannot change your own access from this screen.' }, { status: 400 });
    }

    const body = await request.json() as {
      action?: unknown;
      role?: unknown;
      studentId?: unknown;
      teacherId?: unknown;
      assignedClasses?: unknown;
    };
    const actions: UserAction[] = ['approve', 'reject', 'deactivate', 'activate', 'set-role'];
    if (typeof body.action !== 'string' || !actions.includes(body.action as UserAction)) {
      return NextResponse.json({ error: 'Choose a valid account action.' }, { status: 400 });
    }
    const action = body.action as UserAction;
    const firestore = getFirestore(app);
    const auth = getAuth(app);
    const userRef = firestore.collection('users').doc(uid);
    const requestRef = firestore.collection('roleRequests').doc(uid);
    const [profileSnapshot, requestSnapshot, authUser] = await Promise.all([
      userRef.get(),
      requestRef.get(),
      auth.getUser(uid),
    ]);
    if (!profileSnapshot.exists) return NextResponse.json({ error: 'The account profile was not found.' }, { status: 404 });
    const currentProfile = profileSnapshot.data() || {};
    const currentStatus = currentProfile.status;

    if (action === 'approve' || action === 'set-role' || action === 'activate') {
      const isNewApproval = action === 'approve';
      if (isNewApproval && (!isPendingStatus(currentStatus) || requestSnapshot.data()?.status !== 'pending')) {
        return NextResponse.json({ error: 'Only a pending access request can be approved.' }, { status: 409 });
      }
      if (action === 'activate' && currentStatus !== 'suspended') {
        return NextResponse.json({ error: 'Only a deactivated account can be reactivated.' }, { status: 409 });
      }
      if (action === 'set-role' && currentStatus !== 'active') {
        return NextResponse.json({ error: 'Only an active account can have its role changed.' }, { status: 409 });
      }
      const role = action === 'activate' ? currentProfile.role : body.role;
      const roleError = validateRoleAssignment(role, { isSuperAdmin: actor.role === 'SUPER_ADMIN' });
      if (roleError) return NextResponse.json({ error: roleError }, { status: 400 });

      const claims: Record<string, unknown> = {
        ...(authUser.customClaims || {}),
        role,
        status: 'active',
      };
      delete claims.studentId;
      delete claims.studentIds;
      delete claims.teacherId;
      delete claims.assignedClasses;
      const link = requiredRoleLink(String(role));
      const linkId = link === 'studentId' ? body.studentId : link === 'teacherId' ? body.teacherId : undefined;
      if (link && (typeof linkId !== 'string' || !linkId.trim())) {
        return NextResponse.json({ error: `Select a verified ${link === 'studentId' ? 'student' : 'teacher'} record.` }, { status: 400 });
      }

      if (link === 'studentId') {
        const student = await firestore.collection('students').doc(String(linkId).trim()).get();
        if (!student.exists) return NextResponse.json({ error: 'The selected student record does not exist.' }, { status: 404 });
        claims.studentId = student.id;
        claims.studentIds = [student.id];
      }
      if (link === 'teacherId') {
        const teacher = await firestore.collection('teachers').doc(String(linkId).trim()).get();
        if (!teacher.exists) return NextResponse.json({ error: 'The selected teacher record does not exist.' }, { status: 404 });
        claims.teacherId = teacher.id;
        if (Array.isArray(body.assignedClasses)) {
          claims.assignedClasses = body.assignedClasses.filter((value): value is string => typeof value === 'string');
        }
      }

      let profileCommitted = false;
      try {
        await auth.setCustomUserClaims(uid, claims);
        if (action === 'approve' || action === 'activate') {
          await auth.updateUser(uid, { disabled: false });
        }
        await firestore.runTransaction(async (transaction) => {
          const latestProfile = await transaction.get(userRef);
          if (!latestProfile.exists) throw new Error('The account profile was not found.');
          if (action === 'approve') {
            const latestRequest = await transaction.get(requestRef);
            if (
              latestProfile.data()?.status !== 'pending'
              || !latestRequest.exists
              || latestRequest.data()?.status !== 'pending'
            ) {
              throw new Error('This access request has already been reviewed.');
            }
            transaction.update(requestRef, {
              status: 'approved',
              assignedRole: role,
              reviewedAt: FieldValue.serverTimestamp(),
              reviewedBy: decoded.uid,
            });
          } else if (
            latestProfile.data()?.status !== (action === 'activate' ? 'suspended' : 'active')
          ) {
            throw new Error('The account status changed. Refresh the account list and try again.');
          }
          transaction.set(userRef, {
            uid,
            email: authUser.email || currentProfile.email || '',
            displayName: authUser.displayName || currentProfile.displayName || 'User',
            role,
            requestedRole: currentProfile.requestedRole || null,
            status: 'active',
            studentId: claims.studentId || FieldValue.delete(),
            studentIds: claims.studentIds || FieldValue.delete(),
            teacherId: claims.teacherId || FieldValue.delete(),
            assignedClasses: claims.assignedClasses || FieldValue.delete(),
            updatedAt: FieldValue.serverTimestamp(),
            activatedAt: isNewApproval ? FieldValue.serverTimestamp() : currentProfile.activatedAt || FieldValue.serverTimestamp(),
            activatedBy: decoded.uid,
          }, { merge: true });
        });
        profileCommitted = true;
      } catch (error) {
        if (!profileCommitted) {
          try {
            await auth.updateUser(uid, { disabled: authUser.disabled });
            await auth.setCustomUserClaims(uid, authUser.customClaims || {});
            await auth.revokeRefreshTokens(uid);
          } catch (rollbackError) {
            console.error('Unable to fully roll back a failed account activation or role change.', rollbackError);
          }
        }
        throw error;
      }
      if (action === 'set-role') await auth.revokeRefreshTokens(uid);
      await firestore.collection('auditLogs').add({
        userId: decoded.uid,
        userName: actor.displayName || authUser.email || 'Administrator',
        userRole: actor.role,
        action: isNewApproval ? 'approve-account' : action,
        target: uid,
        details: `Set account role to ${role}.`,
        timestamp: FieldValue.serverTimestamp(),
      });
      return NextResponse.json({ status: 'active', role });
    }

    if (action === 'reject' && (!isPendingStatus(currentStatus) || requestSnapshot.data()?.status !== 'pending')) {
      return NextResponse.json({ error: 'Only a pending access request can be rejected.' }, { status: 409 });
    }
    if (action === 'deactivate' && currentStatus !== 'active') {
      return NextResponse.json({ error: 'Only an active account can be deactivated.' }, { status: 409 });
    }
    if (['ADMIN', 'SUPER_ADMIN', 'PRINCIPAL'].includes(String(currentProfile.role)) && actor.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Only a Super Admin can deactivate or reject an elevated account.' }, { status: 403 });
    }

    const nextStatus = action === 'reject' ? 'rejected' : 'suspended';
    await auth.updateUser(uid, { disabled: true });
    await auth.revokeRefreshTokens(uid);
    await auth.setCustomUserClaims(uid, {});
    await firestore.runTransaction(async (transaction) => {
      transaction.set(userRef, {
        role: action === 'reject' ? null : currentProfile.role,
        status: nextStatus,
        updatedAt: FieldValue.serverTimestamp(),
        ...(action === 'reject' ? { rejectedBy: decoded.uid, rejectedAt: FieldValue.serverTimestamp() } : { deactivatedBy: decoded.uid, deactivatedAt: FieldValue.serverTimestamp() }),
      }, { merge: true });
      if (action === 'reject') {
        transaction.set(requestRef, {
          status: 'rejected',
          reviewedAt: FieldValue.serverTimestamp(),
          reviewedBy: decoded.uid,
        }, { merge: true });
      }
    });
    await firestore.collection('auditLogs').add({
      userId: decoded.uid,
      userName: actor.displayName || 'Administrator',
      userRole: actor.role,
      action: action === 'reject' ? 'reject-account' : 'deactivate-account',
      target: uid,
      details: `Account access changed to ${nextStatus}.`,
      timestamp: FieldValue.serverTimestamp(),
    });
    return NextResponse.json({ status: nextStatus });
  } catch (error) {
    console.error('Administrator account action failed.', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to update this account.' },
      { status: 500 },
    );
  }
}
