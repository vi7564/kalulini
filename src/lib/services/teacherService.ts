import { Teacher } from '@/types';
import { INITIAL_TEACHERS } from '@/lib/mockData';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';

let memoryTeachers: Teacher[] = [...INITIAL_TEACHERS];

export const teacherService = {
  async getTeachers(): Promise<Teacher[]> {
    try {
      if (db && typeof db.app !== 'undefined') {
        const querySnapshot = await getDocs(collection(db, 'teachers'));
        if (!querySnapshot.empty) {
          const list: Teacher[] = [];
          querySnapshot.forEach((docSnap) => {
            list.push({ id: docSnap.id, ...docSnap.data() } as Teacher);
          });
          return list;
        }
      }
    } catch (err) {
      console.warn("Firestore reading failed, falling back to local dataset:", err);
    }
    return memoryTeachers;
  },

  async addTeacher(teacherData: Omit<Teacher, 'id'>): Promise<Teacher> {
    const newId = 'tch-' + (Date.now().toString().slice(-4));
    const newTeacher: Teacher = { ...teacherData, id: newId };

    try {
      if (db && typeof db.app !== 'undefined') {
        const docRef = await addDoc(collection(db, 'teachers'), teacherData);
        newTeacher.id = docRef.id;
      }
    } catch (err) {
      console.warn("Firestore write skipped, storing locally:", err);
    }

    memoryTeachers = [newTeacher, ...memoryTeachers];
    return newTeacher;
  },

  async updateTeacher(id: string, updates: Partial<Teacher>): Promise<Teacher | null> {
    try {
      if (db && typeof db.app !== 'undefined') {
        const docRef = doc(db, 'teachers', id);
        await updateDoc(docRef, updates);
      }
    } catch (err) {
      console.warn("Firestore update skipped:", err);
    }

    const idx = memoryTeachers.findIndex((t) => t.id === id);
    if (idx !== -1) {
      memoryTeachers[idx] = { ...memoryTeachers[idx], ...updates };
      return memoryTeachers[idx];
    }
    return null;
  },

  async deleteTeacher(id: string): Promise<boolean> {
    try {
      if (db && typeof db.app !== 'undefined') {
        await deleteDoc(doc(db, 'teachers', id));
      }
    } catch (err) {
      console.warn("Firestore delete skipped:", err);
    }

    memoryTeachers = memoryTeachers.filter((t) => t.id !== id);
    return true;
  }
};
