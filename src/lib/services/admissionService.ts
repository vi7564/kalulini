import { AdmissionApplication } from '@/types';
import { SAMPLE_APPLICATIONS } from '@/lib/mockData';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore';

let memoryApplications: AdmissionApplication[] = [...SAMPLE_APPLICATIONS];

export const admissionService = {
  async getApplications(): Promise<AdmissionApplication[]> {
    try {
      if (db && typeof db.app !== 'undefined') {
        const querySnapshot = await getDocs(collection(db, 'admissions'));
        if (!querySnapshot.empty) {
          const list: AdmissionApplication[] = [];
          querySnapshot.forEach((docSnap) => {
            list.push({ id: docSnap.id, ...docSnap.data() } as AdmissionApplication);
          });
          return list;
        }
      }
    } catch (err) {
      console.warn("Firestore error reading admissions:", err);
    }
    return memoryApplications;
  },

  async getApplicationByUserId(userId: string): Promise<AdmissionApplication | undefined> {
    const list = await this.getApplications();
    return list.find((app) => app.userId === userId);
  },

  async getApplicationByRef(ref: string): Promise<AdmissionApplication | undefined> {
    const list = await this.getApplications();
    return list.find((app) => app.applicationReference.toLowerCase() === ref.toLowerCase());
  },

  async submitApplication(data: Omit<AdmissionApplication, 'id' | 'applicationReference' | 'submittedAt' | 'status'>): Promise<AdmissionApplication> {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newRef = `KBHS-2026-${randomNum}`;
    const newId = 'app-' + Date.now();

    const application: AdmissionApplication = {
      ...data,
      id: newId,
      applicationReference: newRef,
      submittedAt: new Date().toISOString(),
      status: 'Submitted'
    };

    try {
      if (db && typeof db.app !== 'undefined') {
        const docRef = await addDoc(collection(db, 'admissions'), application);
        application.id = docRef.id;
      }
    } catch (err) {
      console.warn("Firestore write skipped, storing application locally:", err);
    }

    memoryApplications = [application, ...memoryApplications];
    return application;
  },

  async updateStatus(id: string, status: AdmissionApplication['status'], reviewNotes?: string): Promise<AdmissionApplication | null> {
    try {
      if (db && typeof db.app !== 'undefined') {
        const docRef = doc(db, 'admissions', id);
        await updateDoc(docRef, { status, reviewNotes });
      }
    } catch (err) {
      console.warn("Firestore update skipped:", err);
    }

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
