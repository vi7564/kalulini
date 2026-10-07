import { Student } from '@/types';
import { INITIAL_STUDENTS } from '@/lib/mockData';
import { auth, db } from '@/lib/firebase';
import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

let memoryStudents: Student[] = [...INITIAL_STUDENTS];

function mapStudentDocuments(snapshot: Awaited<ReturnType<typeof getDocs>>) {
  return snapshot.docs.map((studentDoc) => ({
    id: studentDoc.id,
    ...(studentDoc.data() as Omit<Student, 'id'>),
  }) as Student);
}

export const studentService = {
  async getStudents(): Promise<Student[]> {
    if (!db) return memoryStudents;

    const claims = (await auth?.currentUser?.getIdTokenResult())?.claims;
    if (!claims) throw new Error('Sign in to access student records.');
    const role = claims?.role;
    const students = collection(db, 'students');

    if (role === 'ADMIN' || role === 'SUPER_ADMIN' || role === 'PRINCIPAL') {
      return mapStudentDocuments(await getDocs(students));
    }

    if (role === 'STUDENT' || role === 'PARENT') {
      if (typeof claims.studentId !== 'string') {
        throw new Error('This account is not linked to a student record.');
      }
      const admissionNumberMatches = await getDocs(
        query(students, where('admissionNumber', '==', claims.studentId)),
      );
      if (!admissionNumberMatches.empty) return mapStudentDocuments(admissionNumberMatches);

      return mapStudentDocuments(
        await getDocs(query(students, where(documentId(), '==', claims.studentId))),
      );
    }

    if (role === 'TEACHER') {
      const assignedClasses = claims.assignedClasses;
      if (!Array.isArray(assignedClasses) || assignedClasses.length === 0) {
        throw new Error('No classes are assigned to this teacher account.');
      }
      return mapStudentDocuments(
        await getDocs(query(students, where('classKey', 'in', assignedClasses))),
      );
    }

    throw new Error('Your role is not allowed to read student records.');
  },

  async getStudentById(id: string): Promise<Student | undefined> {
    const list = await this.getStudents();
    return list.find((student) => student.id === id || student.admissionNumber === id);
  },

  async addStudent(studentData: Omit<Student, 'id'>): Promise<Student> {
    const classKey = studentData.classKey || `${studentData.form} ${studentData.stream}`;
    const newStudent: Student = {
      ...studentData,
      classKey,
      id: 'std-' + Date.now().toString().slice(-4),
    };

    if (db) {
      const docRef = await addDoc(collection(db, 'students'), { ...studentData, classKey });
      newStudent.id = docRef.id;
    }

    memoryStudents = [newStudent, ...memoryStudents];
    return newStudent;
  },

  async updateStudent(id: string, updates: Partial<Student>): Promise<Student | null> {
    const normalizedUpdates = updates.form || updates.stream
      ? {
          ...updates,
          classKey: updates.classKey || `${updates.form || ''} ${updates.stream || ''}`.trim(),
        }
      : updates;

    if (db) await updateDoc(doc(db, 'students', id), normalizedUpdates);

    const idx = memoryStudents.findIndex((student) => student.id === id);
    if (idx === -1) return null;
    memoryStudents[idx] = { ...memoryStudents[idx], ...normalizedUpdates };
    return memoryStudents[idx];
  },

  async deleteStudent(id: string): Promise<boolean> {
    if (db) await deleteDoc(doc(db, 'students', id));
    memoryStudents = memoryStudents.filter((student) => student.id !== id);
    return true;
  },
};
