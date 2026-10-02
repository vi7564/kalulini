export type AssignmentState = 'Pending' | 'Submitted' | 'Graded';
export type AttendanceMark = 'Unmarked' | 'Present' | 'Absent' | 'Late';

export interface StudentTimetableEntry {
  time: string;
  subject: string;
  room: string;
  teacher: string;
}

export interface StudentAssignment {
  id: string;
  subject: string;
  title: string;
  due: string;
  status: AssignmentState;
}

export interface StudentActivity {
  id: string;
  title: string;
  detail: string;
  time: string;
  kind: 'grade' | 'message' | 'payment';
}

export interface TeacherClassStudent {
  id: string;
  name: string;
  attendance: AttendanceMark;
  mark: number;
}

export interface TeacherClass {
  id: string;
  name: string;
  subject: string;
  room: string;
  average: number;
  attendanceRate: number;
  students: TeacherClassStudent[];
}

export interface ParentMessage {
  id: string;
  from: string;
  role: string;
  message: string;
  time: string;
}

export interface ParentWard {
  id: string;
  name: string;
  form: string;
  stream: string;
  attendanceRate: number;
  feeBalance: number;
  termAverage: number;
  messages: ParentMessage[];
}

export interface AdminArrearsRow {
  student: string;
  admissionNo: string;
  class: string;
  term: string;
  balance: number;
}

export interface AdminStaffMember {
  name: string;
  role: string;
  classes: string;
}

export interface PortalNotice {
  id: string;
  title: string;
  message: string;
  time: string;
  tone: 'aqua' | 'gold' | 'emerald';
}

export interface PortalSearchItem {
  label: string;
  category: string;
  href: string;
}

export const STUDENT_DASHBOARD_DATA = {
  attendanceRate: 96.2,
  termAverage: 78.4,
  feeBalance: 12500,
  unreadMessages: 2,
  attendanceTrend: [
    { week: 'W1', rate: 94 },
    { week: 'W2', rate: 98 },
    { week: 'W3', rate: 92 },
    { week: 'W4', rate: 100 },
    { week: 'W5', rate: 96 },
    { week: 'W6', rate: 97 },
  ],
  timetable: [
    { time: '08:00', subject: 'Mathematics', room: 'Room 12', teacher: 'Mr. Musyoka' },
    { time: '09:00', subject: 'English', room: 'Room 4', teacher: 'Mrs. Nduku' },
    { time: '11:00', subject: 'Chemistry', room: 'Science Lab 2', teacher: 'Mr. Wanyama' },
    { time: '14:00', subject: 'History', room: 'Room 8', teacher: 'Mr. Mutiso' },
  ] satisfies StudentTimetableEntry[],
  assignments: [
    { id: 'as-1', subject: 'Mathematics', title: 'Vectors and 3D geometry', due: 'Thu, Oct 1', status: 'Pending' },
    { id: 'as-2', subject: 'English', title: 'Character analysis essay', due: 'Fri, Oct 2', status: 'Submitted' },
    { id: 'as-3', subject: 'Chemistry', title: 'Titration lab report', due: 'Mon, Oct 5', status: 'Graded' },
  ] satisfies StudentAssignment[],
  activity: [
    { id: 'act-1', title: 'Grade posted', detail: 'Mathematics CAT 2 · 84%', time: 'Today, 9:42 AM', kind: 'grade' },
    { id: 'act-2', title: 'Message received', detail: 'Mr. Musyoka shared feedback on your work.', time: 'Today, 8:15 AM', kind: 'message' },
    { id: 'act-3', title: 'Fee payment recorded', detail: 'KES 5,000 · Receipt KBH-2026-1048', time: 'Yesterday', kind: 'payment' },
  ] satisfies StudentActivity[],
};

export const TEACHER_CLASSES: TeacherClass[] = [
  {
    id: 'f3-east-math', name: 'Form 3 East', subject: 'Mathematics', room: 'Room 8', average: 74.8, attendanceRate: 96.4,
    students: [
      { id: 'std-1001', name: 'Brian Mutua Kyalo', attendance: 'Unmarked', mark: 84 },
      { id: 'std-1002', name: 'Kelvin Mwangi Kamau', attendance: 'Unmarked', mark: 78 },
      { id: 'std-1003', name: 'Dennis Otieno Ochieng', attendance: 'Unmarked', mark: 68 },
      { id: 'std-1004', name: 'Victor Kiprotich Cheruiyot', attendance: 'Unmarked', mark: 82 },
    ],
  },
  {
    id: 'f4-west-math', name: 'Form 4 West', subject: 'Mathematics', room: 'Room 12', average: 79.2, attendanceRate: 98.1,
    students: [
      { id: 'std-2001', name: 'Collins Mutiso', attendance: 'Unmarked', mark: 87 },
      { id: 'std-2002', name: 'Joseph Mumo', attendance: 'Unmarked', mark: 75 },
      { id: 'std-2003', name: 'Peter Njoroge', attendance: 'Unmarked', mark: 80 },
    ],
  },
  {
    id: 'f3-east-physics', name: 'Form 3 East', subject: 'Physics', room: 'Physics Lab', average: 71.6, attendanceRate: 96.4,
    students: [
      { id: 'std-1001', name: 'Brian Mutua Kyalo', attendance: 'Unmarked', mark: 80 },
      { id: 'std-1002', name: 'Kelvin Mwangi Kamau', attendance: 'Unmarked', mark: 76 },
      { id: 'std-1003', name: 'Dennis Otieno Ochieng', attendance: 'Unmarked', mark: 64 },
      { id: 'std-1004', name: 'Victor Kiprotich Cheruiyot', attendance: 'Unmarked', mark: 77 },
    ],
  },
];

export const PARENT_WARDS: ParentWard[] = [
  {
    id: 'std-1001', name: 'Brian Mutua Kyalo', form: 'Form 3', stream: 'East', attendanceRate: 96.2, feeBalance: 12500, termAverage: 78.4,
    messages: [
      { id: 'msg-1', from: 'Mr. Geoffrey Musyoka', role: 'Class Teacher', message: 'Brian has made excellent progress in Mathematics this month.', time: 'Today, 10:20 AM' },
      { id: 'msg-2', from: 'Mrs. Florence Nduku', role: 'English Department', message: 'Please remind Brian to bring his literature text for Friday.', time: 'Yesterday' },
    ],
  },
  {
    id: 'std-1002', name: 'Kelvin Mwangi Kamau', form: 'Form 4', stream: 'West', attendanceRate: 98.8, feeBalance: 0, termAverage: 82.1,
    messages: [
      { id: 'msg-3', from: 'Mr. Peter Mumo', role: 'Deputy Principal', message: 'Kelvin is on track with his candidate revision plan.', time: 'Mon, 9:10 AM' },
    ],
  },
];

export const ADMIN_DASHBOARD_DATA = {
  totalStudents: 840,
  totalStaff: 42,
  feeCollectionRate: 86,
  attendanceRate: 96.8,
  enrollmentFunnel: [
    { stage: 'Applications', count: 286, fill: '#00BFFF' },
    { stage: 'Admitted', count: 214, fill: '#FFD700' },
    { stage: 'Active', count: 198, fill: '#1F1F1F' },
  ],
  arrears: [
    { student: 'Dennis Ochieng', admissionNo: 'KBHS/4203', class: 'Form 2 North', term: 'Term 1', balance: 5000 },
    { student: 'Emmanuel Koech', admissionNo: 'KBHS/4205', class: 'Form 3 East', term: 'Term 1', balance: 28000 },
    { student: 'Brian Kyalo', admissionNo: 'KBHS/4201', class: 'Form 3 East', term: 'Term 2', balance: 12500 },
    { student: 'Collins Mutiso', admissionNo: 'KBHS/4210', class: 'Form 4 West', term: 'Term 1', balance: 9500 },
  ] satisfies AdminArrearsRow[],
  staff: [
    { name: 'Geoffrey Musyoka', role: 'Mathematics Teacher', classes: 'Form 3 East, Form 4 West' },
    { name: 'Florence Nduku', role: 'English Teacher', classes: 'Form 2 North, Form 4 West' },
    { name: 'Patrick Wanyama', role: 'Science Teacher', classes: 'Form 1 South, Form 3 East' },
  ] satisfies AdminStaffMember[],
};

export const PORTAL_NOTIFICATIONS: PortalNotice[] = [
  { id: 'notice-1', title: 'Attendance register ready', message: 'Today’s class registers are ready to review.', time: '5 min ago', tone: 'aqua' },
  { id: 'notice-2', title: 'Term fee statement', message: 'Updated fee balances are available in the portal.', time: '1 hour ago', tone: 'gold' },
  { id: 'notice-3', title: 'Academic bulletin', message: 'Term assessment dates have been published.', time: 'Yesterday', tone: 'emerald' },
];

export const PORTAL_SEARCH_ITEMS: PortalSearchItem[] = [
  { label: 'Brian Mutua Kyalo', category: 'Student · Form 3 East', href: '/portal/admin/students' },
  { label: 'Form 3 East', category: 'Class · 4 students', href: '/portal/teacher/attendance' },
  { label: 'Grades', category: 'Student module', href: '/portal/student/grades' },
  { label: 'Attendance', category: 'Student module', href: '/portal/student/attendance' },
  { label: 'Messages', category: 'Student module', href: '/portal/student/messages' },
  { label: 'Fees', category: 'Student module', href: '/portal/student/fees' },
  { label: 'Admissions', category: 'Admin module', href: '/portal/admin/admissions' },
  { label: 'Teacher directory', category: 'Admin module', href: '/portal/admin/teachers' },
];