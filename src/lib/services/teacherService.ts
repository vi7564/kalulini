import { Teacher } from '@/types';
import { INITIAL_TEACHERS } from '@/lib/mockData';
import { auth, db } from '@/lib/firebase';
import { collection, getDocs, addDoc, doc, documentId, query, where, updateDoc, deleteDoc } from 'firebase/firestore';

let memoryTeachers: Teacher[] = [...INITIAL_TEACHERS];

export const teacherService = {
  async getTeachers(): Promise<Teacher[]> {
    if (!db) return memoryTeachers;

    const claims = (await auth?.currentUser?.getIdTokenResult())?.claims;
    if (!claims) throw new Error('Sign in to access teacher records.');
    const role = claims?.role;
    const teachers = collection(db, 'teachers');
    let querySnapshot;

    if (role === 'ADMIN' || role === 'SUPER_ADMIN' || role === 'PRINCIPAL') {
      querySnapshot = await getDocs(teachers);
    } else if (role === 'TEACHER' && typeof claims.teacherId === 'string') {
      querySnapshot = await getDocs(query(teachers, where(documentId(), '==', claims.teacherId)));
    } else {
      throw new Error('Your role is not allowed to read teacher records.');
    }

    return querySnapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }) as Teacher);
  },

  async addTeacher(teacherData: Omit<Teacher, 'id'>): Promise<Teacher> {
    const newId = 'tch-' + (Date.now().toString().slice(-4));
    const newTeacher: Teacher = { ...teacherData, id: newId };

    if (db) {
      const docRef = await addDoc(collection(db, 'teachers'), teacherData);
      newTeacher.id = docRef.id;
    }

    memoryTeachers = [newTeacher, ...memoryTeachers];
    return newTeacher;
  },

  async updateTeacher(id: string, updates: Partial<Teacher>): Promise<Teacher | null> {
    if (db) await updateDoc(doc(db, 'teachers', id), updates);

    const idx = memoryTeachers.findIndex((t) => t.id === id);
    if (idx !== -1) {
      memoryTeachers[idx] = { ...memoryTeachers[idx], ...updates };
      return memoryTeachers[idx];
    }
    return null;
  },

  async deleteTeacher(id: string): Promise<boolean> {
    if (db) await deleteDoc(doc(db, 'teachers', id));

    memoryTeachers = memoryTeachers.filter((t) => t.id !== id);
    return true;
  }
};
