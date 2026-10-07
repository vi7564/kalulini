import { AdmissionApplication } from '@/types';
import { SAMPLE_APPLICATIONS } from '@/lib/mockData';
import { auth, db, storage } from '@/lib/firebase';
import { collection, getDoc, getDocs, doc, query, setDoc, where, updateDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { getAdmissionFileContentType, validateAdmissionFile } from '@/app/admissions/apply/upload-validation.mjs';

let memoryApplications: AdmissionApplication[] = [...SAMPLE_APPLICATIONS];

export const admissionService = {
  async getApplications(): Promise<AdmissionApplication[]> {
    if (!db) return memoryApplications;

    const user = auth?.currentUser;
    const claims = (await user?.getIdTokenResult())?.claims;
    const profileSnapshot = user
      ? await getDoc(doc(db, 'users', user.uid))
      : null;
    const role = claims?.role || profileSnapshot?.data()?.role;
    const applications = collection(db, 'admissions');
    let querySnapshot;

    if (role === 'ADMIN' || role === 'SUPER_ADMIN' || role === 'PRINCIPAL') {
      querySnapshot = await getDocs(applications);
    } else if (role === 'APPLICANT' && user) {
      querySnapshot = await getDocs(query(applications, where('userId', '==', user.uid)));
    } else {
      throw new Error('Your role is not allowed to read admission records.');
    }

    return querySnapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }) as AdmissionApplication);
  },

  async getApplicationByUserId(userId: string): Promise<AdmissionApplication | undefined> {
    const list = await this.getApplications();
    return list.find((app) => app.userId === userId);
  },

  async getApplicationByRef(ref: string): Promise<AdmissionApplication | undefined> {
    const list = await this.getApplications();
    return list.find((app) => app.applicationReference.toLowerCase() === ref.toLowerCase());
  },

  async submitApplication(
    data: Omit<AdmissionApplication, 'id' | 'userId' | 'applicationReference' | 'submittedAt' | 'status' | 'documents'>,
    files: { birthCertificate: File; kcpeResultSlip: File },
  ): Promise<AdmissionApplication> {
    const user = auth?.currentUser;
    if (!user || !db || !storage) {
      throw new Error('Sign in with a configured applicant account before submitting your application.');
    }
    for (const file of [files.birthCertificate, files.kcpeResultSlip]) {
      const validationError = validateAdmissionFile(file);
      if (validationError) throw new Error(validationError);
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newRef = `KBHS-2026-${randomNum}`;
    const applicationRef = doc(collection(db, 'admissions'));
    const storageRefs = [
      ref(storage, `admissions/${user.uid}/${applicationRef.id}/birth-certificate.${extensionOf(files.birthCertificate.name)}`),
      ref(storage, `admissions/${user.uid}/${applicationRef.id}/kcpe-result-slip.${extensionOf(files.kcpeResultSlip.name)}`),
    ];

    try {
      const birthCertificate = await uploadBytes(storageRefs[0], files.birthCertificate, {
        contentType: getAdmissionFileContentType(files.birthCertificate),
      });
      const resultSlip = await uploadBytes(storageRefs[1], files.kcpeResultSlip, {
        contentType: getAdmissionFileContentType(files.kcpeResultSlip),
      });
      const [birthCertificateUrl, kcpeResultSlipUrl] = await Promise.all([
        getDownloadURL(birthCertificate.ref),
        getDownloadURL(resultSlip.ref),
      ]);

      const application: AdmissionApplication = {
        ...data,
        id: applicationRef.id,
        userId: user.uid,
        applicationReference: newRef,
        submittedAt: new Date().toISOString(),
        status: 'Submitted',
        documents: {
          birthCertificateUrl,
          kcpeResultSlipUrl,
        },
      };

      await setDoc(applicationRef, application);

      memoryApplications = [application, ...memoryApplications];
      return application;
    } catch (error) {
      const cleanupResults = await Promise.allSettled(storageRefs.map((storageRef) => deleteObject(storageRef)));
      cleanupResults.forEach((result) => {
        if (result.status === 'rejected' && !(result.reason && typeof result.reason === 'object' && 'code' in result.reason && result.reason.code === 'storage/object-not-found')) {
          console.error('Unable to clean up an incomplete admission document upload.', result.reason);
        }
      });
      throw error;
    }
  },

  async updateStatus(id: string, status: AdmissionApplication['status'], reviewNotes?: string): Promise<AdmissionApplication | null> {
    if (db) await updateDoc(doc(db, 'admissions', id), { status, reviewNotes });

    const idx = memoryApplications.findIndex((a) => a.id === id);
    if (idx !== -1) {
      memoryApplications[idx] = {
        ...memoryApplications[idx],
        status,
        ...(reviewNotes ? { reviewNotes } : {})
      };
      return memoryApplications[idx];
    }
    return null;
  }
};

function extensionOf(fileName: string) {
  return fileName.split('.').pop()?.toLowerCase() || '';
}
