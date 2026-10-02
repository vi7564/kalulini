import { Student } from '@/types';
import { INITIAL_STUDENTS } from '@/lib/mockData';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';

let memoryStudents: Student[] = [...INITIAL_STUDENTS];

export const studentService = {
  async getStudents(): Promise<Student[]> {
    try {
      if (db && typeof db.app !== 'undefined') {
        const querySnapshot = await getDocs(collection(db, 'students'));
        if (!querySnapshot.empty) {
          const list: Student[] = [];
          querySnapshot.forEach((docSnap) => {
            list.push({ id: docSnap.id, ...docSnap.data() } as Student);
          });
          return list;
        }
      }
    } catch (err) {
      console.warn("Firestore reading failed, falling back to local dataset:", err);
    }
    return memoryStudents;
  },

  async getStudentById(id: string): Promise<Student | undefined> {
    const list = await this.getStudents();
    return list.find((s) => s.id === id || s.admissionNumber === id);
  },

  async addStudent(studentData: Omit<Student, 'id'>): Promise<Student> {
    const newId = 'std-' + (Date.now().toString().slice(-4));
    const newStudent: Student = {
      ...studentData,
      id: newId
    };

    try {
      if (db && typeof db.app !== 'undefined') {
        const docRef = await addDoc(collection(db, 'students'), studentData);
        newStudent.id = docRef.id;
      }
    } catch (err) {
      console.warn("Firestore write skipped, storing locally:", err);
    }

    memoryStudents = [newStudent, ...memoryStudents];
    return newStudent;
  },

  async updateStudent(id: string, updates: Partial<Student>): Promise<Student | null> {
    try {
      if (db && typeof db.app !== 'undefined') {
        const docRef = doc(db, 'students', id);
        await updateDoc(docRef, updates);
      }
    } catch (err) {
      console.warn("Firestore update skipped:", err);
    }

    const idx = memoryStudents.findIndex((s) => s.id === id);
    if (idx !== -1) {
      memoryStudents[idx] = { ...memoryStudents[idx], ...updates };
      return memoryStudents[idx];
    }
    return null;
  },

  async deleteStudent(id: string): Promise<boolean> {
    try {
      if (db && typeof db.app !== 'undefined') {
        await deleteDoc(doc(db, 'students', id));
      }
    } catch (err) {
      console.warn("Firestore delete skipped:", err);
    }

    memoryStudents = memoryStudents.filter((s) => s.id !== id);
    return true;
  }
};
