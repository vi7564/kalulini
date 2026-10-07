'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  onIdTokenChanged,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  updateEmail,
  updateProfile,
  type User,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import type { UserProfile, UserRole } from '@/types';
import { auth, db, firebaseConfigured } from '@/lib/firebase';

type EditableProfile = Pick<UserProfile, 'displayName' | 'email' | 'phoneNumber' | 'photoURL'>;

interface AuthContextType {
  currentUser: UserProfile | null;
  loading: boolean;
  loginWithEmail: (email: string, pass: string) => Promise<UserRole>;
  refreshCurrentUser: () => Promise<void>;
  logout: () => Promise<void>;
  updateCurrentProfile: (updates: EditableProfile) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  loginWithEmail: async () => {
    throw new Error('Authentication is not configured.');
  },
  refreshCurrentUser: async () => {},
  logout: async () => {},
  updateCurrentProfile: async () => {
    throw new Error('No authenticated user.');
  },
});

const userRoles: UserRole[] = [
  'SUPER_ADMIN',
  'ADMIN',
  'PRINCIPAL',
  'TEACHER',
  'STUDENT',
  'PARENT',
  'STAFF',
  'APPLICANT',
];

async function profileFromAuthUser(user: User, claims: Record<string, unknown>): Promise<UserProfile | null> {
  const claimRole = claims.role;
  const profileSnapshot = db ? await getDoc(doc(db, 'users', user.uid)) : null;
  const profileData = profileSnapshot?.exists() ? profileSnapshot.data() : {};
  const role = claimRole;
  if (
    typeof role !== 'string'
    || !userRoles.includes(role as UserRole)
    || profileData.status !== 'active'
    || profileData.role !== role
  ) return null;

  const now = new Date().toISOString();
  return {
    uid: user.uid,
    email: user.email || (typeof profileData.email === 'string' ? profileData.email : ''),
    displayName: user.displayName || (typeof profileData.displayName === 'string' ? profileData.displayName : user.email?.split('@')[0]) || 'User',
    role: role as UserRole,
    photoURL: user.photoURL || (typeof profileData.photoURL === 'string' ? profileData.photoURL : undefined),
    phoneNumber: user.phoneNumber || (typeof profileData.phoneNumber === 'string' ? profileData.phoneNumber : undefined),
    studentId: typeof claims.studentId === 'string'
      ? claims.studentId
      : typeof profileData.studentId === 'string' ? profileData.studentId : undefined,
    teacherId: typeof claims.teacherId === 'string'
      ? claims.teacherId
      : typeof profileData.teacherId === 'string' ? profileData.teacherId : undefined,
    createdAt: user.metadata.creationTime || (typeof profileData.createdAt === 'string' ? profileData.createdAt : now),
    updatedAt: user.metadata.lastSignInTime || now,
    status: 'active',
  };
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    return onIdTokenChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setCurrentUser(null);
        setLoading(false);
        return;
      }

      try {
        const token = await firebaseUser.getIdTokenResult();
        const profile = await profileFromAuthUser(firebaseUser, token.claims);
        if (!profile) {
          setCurrentUser(null);
          return;
        }
        const response = await fetch('/api/auth/session', {
          method: 'POST',
          headers: { Authorization: `Bearer ${await firebaseUser.getIdToken()}` },
        });
        if (!response.ok) {
          setCurrentUser(null);
          return;
        }
        setCurrentUser(profile);
      } catch (error) {
        console.error('Unable to load the signed-in user role.', error);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    });
  }, []);

  const loginWithEmail = async (email: string, pass: string): Promise<UserRole> => {
    if (!auth || !firebaseConfigured) {
      throw new Error('Firebase is not configured. Add the Firebase web app settings to .env.local.');
    }

    setLoading(true);
    try {
      const credential = await signInWithEmailAndPassword(auth, email.trim(), pass);
      const token = await credential.user.getIdTokenResult(true);
      const profile = await profileFromAuthUser(credential.user, token.claims);
      if (!profile) {
        await fbSignOut(auth);
        throw new Error('Your account is awaiting administrator approval or has been deactivated.');
      }
      const response = await fetch('/api/auth/session', {
        method: 'POST',
        headers: { Authorization: `Bearer ${await credential.user.getIdToken()}` },
      });
      const sessionResult = await response.json() as { error?: string };
      if (!response.ok) {
        await fbSignOut(auth);
        throw new Error(sessionResult.error || 'Your account is not authorized to access the portal.');
      }
      setCurrentUser(profile);
      return profile.role;
    } finally {
      setLoading(false);
    }
  };

  const refreshCurrentUser = async () => {
    if (!auth?.currentUser) {
      setCurrentUser(null);
      return;
    }
    const token = await auth.currentUser.getIdTokenResult(true);
    const profile = await profileFromAuthUser(auth.currentUser, token.claims);
    if (!profile) {
      setCurrentUser(null);
      return;
    }
    const response = await fetch('/api/auth/session', {
      method: 'POST',
      headers: { Authorization: `Bearer ${await auth.currentUser.getIdToken()}` },
    });
    if (!response.ok) throw new Error('Your account is awaiting administrator approval or has been deactivated.');
    setCurrentUser(profile);
  };

  const logout = async () => {
    await fetch('/api/auth/session', { method: 'DELETE' });
    if (auth) await fbSignOut(auth);
    setCurrentUser(null);
  };

  const updateCurrentProfile = async (updates: EditableProfile) => {
    const firebaseUser = auth?.currentUser;
    if (!firebaseUser || !db || !currentUser) {
      throw new Error('You must be signed in to update your profile.');
    }

    await updateProfile(firebaseUser, {
      displayName: updates.displayName,
      photoURL: updates.photoURL || null,
    });

    await setDoc(
      doc(db, 'users', firebaseUser.uid),
      {
        displayName: updates.displayName,
        phoneNumber: updates.phoneNumber || null,
        photoURL: updates.photoURL || null,
      },
      { merge: true },
    );

    setCurrentUser({
      ...currentUser,
      ...updates,
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, loginWithEmail, refreshCurrentUser, logout, updateCurrentProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
