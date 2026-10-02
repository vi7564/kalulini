export type UserRole = 
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'TEACHER'
  | 'STUDENT'
  | 'PARENT'
  | 'STAFF'
  | 'APPLICANT';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  photoURL?: string;
  phoneNumber?: string;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'suspended' | 'pending';
  nationalId?: string;
  studentId?: string; // Linked student for parents/students
  teacherId?: string; // Linked teacher profile
}

export interface Student {
  id: string;
  admissionNumber: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: 'Male';
  dateOfBirth: string;
  enrollmentDate: string;
  form: 'Form 1' | 'Form 2' | 'Form 3' | 'Form 4';
  stream: 'East' | 'West' | 'North' | 'South';
  house: 'Simba House' | 'Chui House' | 'Kifaru House' | 'Twiga House';
  guardianName: string;
  guardianPhone: string;
  guardianEmail?: string;
  guardianRelationship: string;
  county: string;
  primarySchoolAttended?: string;
  kcpeMarks?: number;
  status: 'Active' | 'Transferred' | 'Graduated' | 'Suspended';
  photoURL?: string;
  feeBalance: number;
  attendanceRate: number; // percentage e.g. 96.5
}

export interface Teacher {
  id: string;
  tscNumber: string;
  staffNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  subjects: string[]; // e.g. ['Mathematics', 'Physics']
  assignedClasses: string[]; // e.g. ['Form 3 East', 'Form 4 West']
  roleTitle: string; // e.g. 'Senior Master - Academics', 'Class Teacher Form 3 East'
  qualification: string; // e.g. 'B.Ed (Science), University of Nairobi'
  joiningDate: string;
  status: 'Active' | 'On Leave' | 'Retired';
  photoURL?: string;
}

export interface Subject {
  id: string;
  code: string; // e.g. '121' for Mathematics
  name: string; // 'Mathematics'
  department: string;
  category: 'Compulsory' | 'Sciences' | 'Humanities' | 'Technical';
  headOfSubject?: string;
}

export interface Department {
  id: string;
  name: string; // 'Science & Mathematics', 'Humanities', 'Languages', 'Technical'
  hodName: string;
  description: string;
  subjectsCount: number;
  teachersCount: number;
}

export interface Examination {
  id: string;
  title: string; // 'Term 1 Mid-Term Exam 2026'
  academicYear: number;
  term: 'Term 1' | 'Term 2' | 'Term 3';
  startDate: string;
  endDate: string;
  status: 'Draft' | 'Grading' | 'Moderation' | 'Published';
}

export interface GradeRecord {
  id: string;
  examId: string;
  studentId: string;
  studentName: string;
  admissionNumber: string;
  form: string;
  stream: string;
  subjectCode: string;
  subjectName: string;
  score: number; // 0 - 100
  grade: 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D+' | 'D' | 'D-' | 'E';
  points: number; // 1 to 12
  remarks: string;
  enteredByTeacherId: string;
  updatedAt: string;
}

export interface StudentReportCard {
  student: Student;
  term: string;
  year: number;
  examTitle: string;
  grades: {
    subject: string;
    code: string;
    catMarks: number;
    endTermMarks: number;
    total: number;
    grade: string;
    points: number;
    remarks: string;
    teacherInitials: string;
  }[];
  totalMarks: number;
  meanMarks: number;
  meanGrade: string;
  totalPoints: number;
  classPosition: number;
  totalStudentsInClass: number;
  streamPosition: number;
  totalStudentsInStream: number;
  classTeacherRemarks: string;
  principalRemarks: string;
  closingDate: string;
  nextTermOpeningDate: string;
}

export interface AttendanceRecord {
  id: string;
  date: string; // YYYY-MM-DD
  form: string;
  stream: string;
  studentId: string;
  status: 'Present' | 'Absent' | 'Late' | 'Excused';
  notes?: string;
  markedByTeacherId: string;
}

export interface FeeStructure {
  id: string;
  academicYear: number;
  form: string;
  term: 'Term 1' | 'Term 2' | 'Term 3';
  tuitionFee: number;
  boardingFee: number;
  activityFee: number;
  maintenanceFee: number;
  medicalFee: number;
  totalAmount: number;
}

export interface FeeInvoice {
  id: string;
  studentId: string;
  admissionNumber: string;
  studentName: string;
  invoiceNumber: string;
  term: string;
  year: number;
  totalDue: number;
  amountPaid: number;
  balance: number;
  dueDate: string;
  status: 'Paid' | 'Partial' | 'Overdue';
}

export interface PaymentTransaction {
  id: string;
  invoiceId?: string;
  studentId: string;
  admissionNumber: string;
  studentName: string;
  amount: number;
  date: string;
  paymentMethod: 'Bank Transfer' | 'M-Pesa Paybill' | 'Cheque' | 'Direct Deposit';
  transactionReference: string; // e.g. Bank slip or M-Pesa code
  receiptNumber: string;
  verifiedBy: string;
}

export interface AdmissionApplication {
  id: string;
  applicationReference: string; // e.g. 'KBHS-2026-0842'
  userId: string;
  applicantFirstName: string;
  applicantLastName: string;
  dateOfBirth: string;
  gender: 'Male';
  currentSchool: string;
  kcpeIndexNumber?: string;
  kcpeMarks?: number;
  targetForm: 'Form 1' | 'Form 2' | 'Form 3';
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  parentOccupation: string;
  homeCounty: string;
  subCounty: string;
  submittedAt: string;
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Accepted' | 'Waitlisted' | 'Rejected' | 'Completed';
  reviewNotes?: string;
  documents: {
    birthCertificateUrl?: string;
    kcpeResultSlipUrl?: string;
    leavingCertificateUrl?: string;
  };
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: 'General' | 'Academic' | 'Admissions' | 'Urgent' | 'Boarding';
  targetAudience: 'All' | 'Students' | 'Teachers' | 'Parents' | 'Public';
  isTopBanner: boolean; // Shown on public website top bar
  published: boolean;
  publishedAt: string;
  expiresAt?: string;
  authorName: string;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  category: 'Academic' | 'Sports' | 'Parent Meeting' | 'Cultural' | 'Holiday' | 'Exam';
  startDate: string;
  endDate?: string;
  time: string;
  location: string;
  targetAudience: string;
  isFeatured: boolean;
  imageURL?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole: string;
  coverImage: string;
  publishedAt: string;
  readTimeMinutes: number;
  featured: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  category: 'Campus' | 'Academics' | 'Sports' | 'Laboratories' | 'Dormitories' | 'Events' | 'Student Life';
  imageURL: string;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Admissions' | 'Fees & Finance' | 'Academics' | 'Boarding Life' | 'General';
}

export interface LeadershipMember {
  id: string;
  name: string;
  role: string;
  credentials: string;
  bio: string;
  photoURL: string;
  order: number;
}

export interface FacilityItem {
  id: string;
  title: string;
  description: string;
  category: 'Academic' | 'Sports' | 'Residential' | 'Technology';
  features: string[];
  imageURL: string;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  form: string;
  stream?: string;
  teacherName: string;
  teacherId: string;
  description: string;
  dueDate: string;
  assignedDate: string;
  totalMarks: number;
  attachmentUrl?: string;
  submissionsCount?: number;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  action: string;
  target: string;
  details: string;
  timestamp: string;
  ipAddress?: string;
}
