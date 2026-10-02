import { GradeRecord, StudentReportCard, Subject, Department } from '@/types';
import { SAMPLE_STUDENT_GRADES, SUBJECTS_DATA, DEPARTMENTS_DATA, INITIAL_STUDENTS } from '@/lib/mockData';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

let memoryGrades: GradeRecord[] = [...SAMPLE_STUDENT_GRADES];

export const academicService = {
  getSubjects(): Subject[] {
    return SUBJECTS_DATA;
  },

  getDepartments(): Department[] {
    return DEPARTMENTS_DATA;
  },

  async getGradesByStudent(studentId: string): Promise<GradeRecord[]> {
    return memoryGrades.filter((g) => g.studentId === studentId);
  },

  async addGradeRecord(record: Omit<GradeRecord, 'id' | 'updatedAt'>): Promise<GradeRecord> {
    const newGrade: GradeRecord = {
      ...record,
      id: 'grd-' + Date.now(),
      updatedAt: new Date().toISOString()
    };

    try {
      if (db && typeof db.app !== 'undefined') {
        const docRef = await addDoc(collection(db, 'grades'), newGrade);
        newGrade.id = docRef.id;
      }
    } catch (err) {
      console.warn("Firestore write skipped:", err);
    }

    memoryGrades = [newGrade, ...memoryGrades];
    return newGrade;
  },

  async generateReportCard(studentId: string): Promise<StudentReportCard | null> {
    const student = INITIAL_STUDENTS.find((s) => s.id === studentId || s.admissionNumber === studentId);
    if (!student) return null;

    const grades = memoryGrades.filter((g) => g.studentId === student.id);
    const totalMarks = grades.reduce((acc, curr) => acc + curr.score, 0);
    const meanMarks = grades.length > 0 ? Math.round(totalMarks / grades.length) : 0;
    const totalPoints = grades.reduce((acc, curr) => acc + curr.points, 0);

    const calcMeanGrade = (avg: number) => {
      if (avg >= 80) return 'A';
      if (avg >= 75) return 'A-';
      if (avg >= 70) return 'B+';
      if (avg >= 65) return 'B';
      if (avg >= 60) return 'B-';
      if (avg >= 55) return 'C+';
      if (avg >= 50) return 'C';
      if (avg >= 45) return 'C-';
      if (avg >= 40) return 'D+';
      return 'D';
    };

    return {
      student,
      term: 'Term 3',
      year: 2025,
      examTitle: 'End of Term 3 Summative Examination',
      grades: grades.map((g) => ({
        subject: g.subjectName,
        code: g.subjectCode,
        catMarks: Math.round(g.score * 0.3),
        endTermMarks: Math.round(g.score * 0.7),
        total: g.score,
        grade: g.grade,
        points: g.points,
        remarks: g.remarks,
        teacherInitials: 'TCH'
      })),
      totalMarks,
      meanMarks,
      meanGrade: calcMeanGrade(meanMarks),
      totalPoints,
      classPosition: 3,
      totalStudentsInClass: 48,
      streamPosition: 7,
      totalStudentsInStream: 192,
      classTeacherRemarks: 'Outstanding intellectual consistency and character. Keep up the high standard in sciences.',
      principalRemarks: 'An exemplary performance reflecting academic seriousness and discipline. Approved for promotion.',
      closingDate: '27th November 2025',
      nextTermOpeningDate: '6th January 2026'
    };
  }
};
