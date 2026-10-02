import {
  Student,
  Teacher,
  Subject,
  Department,
  Announcement,
  EventItem,
  BlogPost,
  GalleryItem,
  FAQItem,
  LeadershipMember,
  FacilityItem,
  AdmissionApplication,
  PaymentTransaction,
  Assignment,
  GradeRecord
} from '@/types';

export const DEMO_NOTICE = "Sample data for demonstration purposes. Configurable via Admin Portal.";

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Term 1 2026 Academic Reporting & Opening Dates',
    content: 'All Form 1 students report on Monday 6th January 2026. Forms 2, 3, and 4 report on Tuesday 7th January by 4:00 PM. Boarding requirements must be adhered to strictly.',
    category: 'Academic',
    targetAudience: 'All',
    isTopBanner: true,
    published: true,
    publishedAt: '2026-01-02',
    authorName: 'Office of the Principal'
  },
  {
    id: 'ann-2',
    title: 'Form 1 Online Admission Application Portal Now Open',
    content: 'Prospective parents and guardians can now submit admission requests and upload required academic certificates through the online portal.',
    category: 'Admissions',
    targetAudience: 'Public',
    isTopBanner: true,
    published: true,
    publishedAt: '2026-01-05',
    authorName: 'Admissions Committee'
  },
  {
    id: 'ann-3',
    title: 'Annual Parents & Teachers Association (PTA) General Meeting',
    content: 'The 2026 Annual General Meeting will convene in the School Assembly Hall on Saturday 14th February 2026 at 9:00 AM.',
    category: 'General',
    targetAudience: 'Parents',
    isTopBanner: false,
    published: true,
    publishedAt: '2026-01-10',
    authorName: 'PTA Secretariat'
  }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'std-1001',
    admissionNumber: 'KBHS/4201',
    firstName: 'Brian',
    middleName: 'Mutua',
    lastName: 'Kyalo',
    gender: 'Male',
    dateOfBirth: '2009-04-12',
    enrollmentDate: '2023-01-15',
    form: 'Form 3',
    stream: 'East',
    house: 'Simba House',
    guardianName: 'Joseph Kyalo Mutua',
    guardianPhone: '+254 712 345 678',
    guardianEmail: 'j.kyalo@example.com',
    guardianRelationship: 'Father',
    county: 'Makueni',
    kcpeMarks: 378,
    status: 'Active',
    feeBalance: 12500,
    attendanceRate: 97.4,
    photoURL: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'std-1002',
    admissionNumber: 'KBHS/4202',
    firstName: 'Kelvin',
    middleName: 'Mwangi',
    lastName: 'Kamau',
    gender: 'Male',
    dateOfBirth: '2008-09-20',
    enrollmentDate: '2022-01-12',
    form: 'Form 4',
    stream: 'West',
    house: 'Chui House',
    guardianName: 'Grace Wanjiku Kamau',
    guardianPhone: '+254 722 890 123',
    guardianEmail: 'grace.kamau@example.com',
    guardianRelationship: 'Mother',
    county: 'Machakos',
    kcpeMarks: 389,
    status: 'Active',
    feeBalance: 0,
    attendanceRate: 98.8,
    photoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'std-1003',
    admissionNumber: 'KBHS/4203',
    firstName: 'Dennis',
    middleName: 'Otieno',
    lastName: 'Ochieng',
    gender: 'Male',
    dateOfBirth: '2010-02-14',
    enrollmentDate: '2024-01-10',
    form: 'Form 2',
    stream: 'North',
    house: 'Kifaru House',
    guardianName: 'Peter Ochieng',
    guardianPhone: '+254 733 456 789',
    guardianEmail: 'peter.ochieng@example.com',
    guardianRelationship: 'Father',
    county: 'Nairobi',
    kcpeMarks: 365,
    status: 'Active',
    feeBalance: 5000,
    attendanceRate: 95.0,
    photoURL: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'std-1004',
    admissionNumber: 'KBHS/4204',
    firstName: 'Victor',
    middleName: 'Kiprotich',
    lastName: 'Cheruiyot',
    gender: 'Male',
    dateOfBirth: '2011-06-30',
    enrollmentDate: '2025-01-14',
    form: 'Form 1',
    stream: 'South',
    house: 'Twiga House',
    guardianName: 'Mary Cheruiyot',
    guardianPhone: '+254 720 112 233',
    guardianEmail: 'm.cheruiyot@example.com',
    guardianRelationship: 'Mother',
    county: 'Nakuru',
    kcpeMarks: 392,
    status: 'Active',
    feeBalance: 0,
    attendanceRate: 99.2,
    photoURL: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'std-1005',
    admissionNumber: 'KBHS/4205',
    firstName: 'Emmanuel',
    middleName: 'Kiplagat',
    lastName: 'Koech',
    gender: 'Male',
    dateOfBirth: '2009-11-05',
    enrollmentDate: '2023-01-15',
    form: 'Form 3',
    stream: 'East',
    house: 'Simba House',
    guardianName: 'Samuel Koech',
    guardianPhone: '+254 721 998 877',
    guardianEmail: 's.koech@example.com',
    guardianRelationship: 'Father',
    county: 'Kericho',
    kcpeMarks: 370,
    status: 'Active',
    feeBalance: 28000,
    attendanceRate: 94.1,
    photoURL: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80'
  }
];

export const INITIAL_TEACHERS: Teacher[] = [
  {
    id: 'tch-101',
    tscNumber: 'TSC/482190',
    staffNumber: 'KB-T01',
    firstName: 'Geoffrey',
    lastName: 'Musyoka',
    email: 'g.musyoka@kaluliniboys.ac.ke',
    phone: '+254 722 100 200',
    department: 'Sciences & Mathematics',
    subjects: ['Mathematics', 'Physics'],
    assignedClasses: ['Form 4 West', 'Form 3 East'],
    roleTitle: 'Senior Teacher / Head of Mathematics',
    qualification: 'B.Ed Science (UoN), M.Sc Applied Math',
    joiningDate: '2016-05-10',
    status: 'Active',
    photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'tch-102',
    tscNumber: 'TSC/510344',
    staffNumber: 'KB-T02',
    firstName: 'Florence',
    lastName: 'Nduku',
    email: 'f.nduku@kaluliniboys.ac.ke',
    phone: '+254 723 300 400',
    department: 'Languages',
    subjects: ['English', 'Literature'],
    assignedClasses: ['Form 4 West', 'Form 2 North'],
    roleTitle: 'Dean of Studies & Patron Debate Club',
    qualification: 'B.Ed Arts (Kenyatta University)',
    joiningDate: '2018-09-01',
    status: 'Active',
    photoURL: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'tch-103',
    tscNumber: 'TSC/629011',
    staffNumber: 'KB-T03',
    firstName: 'Patrick',
    lastName: 'Wanyama',
    email: 'p.wanyama@kaluliniboys.ac.ke',
    phone: '+254 724 500 600',
    department: 'Sciences & Mathematics',
    subjects: ['Chemistry', 'Biology'],
    assignedClasses: ['Form 3 East', 'Form 1 South'],
    roleTitle: 'Head of Department - Sciences',
    qualification: 'B.Sc Chemistry (Egerton University)',
    joiningDate: '2019-01-08',
    status: 'Active',
    photoURL: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'tch-104',
    tscNumber: 'TSC/701238',
    staffNumber: 'KB-T04',
    firstName: 'David',
    lastName: 'Mutiso',
    email: 'd.mutiso@kaluliniboys.ac.ke',
    phone: '+254 725 700 800',
    department: 'Humanities & Social Sciences',
    subjects: ['History & Government', 'C.R.E'],
    assignedClasses: ['Form 4 West', 'Form 3 East'],
    roleTitle: 'Games Master & House Master (Simba)',
    qualification: 'B.Ed Arts (Moi University)',
    joiningDate: '2020-02-15',
    status: 'Active',
    photoURL: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80'
  }
];

export const DEPARTMENTS_DATA: Department[] = [
  {
    id: 'dept-sci',
    name: 'Sciences & Mathematics',
    hodName: 'Mr. Patrick Wanyama',
    description: 'Committed to fostering empirical inquiry, analytical rigor, and hands-on laboratory mastery in Biology, Chemistry, Physics, and Advanced Mathematics.',
    subjectsCount: 4,
    teachersCount: 14
  },
  {
    id: 'dept-lang',
    name: 'Languages',
    hodName: 'Mrs. Florence Nduku',
    description: 'Empowering articulate communication, critical rhetoric, literary appreciation, and grammatical finesse in English, Kiswahili, and Foreign Languages.',
    subjectsCount: 3,
    teachersCount: 10
  },
  {
    id: 'dept-hum',
    name: 'Humanities & Social Sciences',
    hodName: 'Mr. David Mutiso',
    description: 'Nurturing civic understanding, ethical grounding, historical consciousness, and geographic reasoning across History, Geography, and Christian Religious Education.',
    subjectsCount: 3,
    teachersCount: 8
  },
  {
    id: 'dept-tech',
    name: 'Technical & Applied Studies',
    hodName: 'Eng. Titus Kilonzo',
    description: 'Equipping boys with high-demand practical competencies in Computer Studies, Agriculture, Business Studies, and Aviation basics.',
    subjectsCount: 4,
    teachersCount: 6
  }
];

export const SUBJECTS_DATA: Subject[] = [
  { id: '101', code: '101', name: 'English', department: 'Languages', category: 'Compulsory' },
  { id: '102', code: '102', name: 'Kiswahili', department: 'Languages', category: 'Compulsory' },
  { id: '121', code: '121', name: 'Mathematics', department: 'Sciences & Mathematics', category: 'Compulsory' },
  { id: '231', code: '231', name: 'Biology', department: 'Sciences & Mathematics', category: 'Sciences' },
  { id: '232', code: '232', name: 'Physics', department: 'Sciences & Mathematics', category: 'Sciences' },
  { id: '233', code: '233', name: 'Chemistry', department: 'Sciences & Mathematics', category: 'Sciences' },
  { id: '311', code: '311', name: 'History & Government', department: 'Humanities & Social Sciences', category: 'Humanities' },
  { id: '312', code: '312', name: 'Geography', department: 'Humanities & Social Sciences', category: 'Humanities' },
  { id: '313', code: '313', name: 'C.R.E', department: 'Humanities & Social Sciences', category: 'Humanities' },
  { id: '443', code: '443', name: 'Agriculture', department: 'Technical & Applied Studies', category: 'Technical' },
  { id: '451', code: '451', name: 'Computer Studies', department: 'Technical & Applied Studies', category: 'Technical' },
  { id: '565', code: '565', name: 'Business Studies', department: 'Technical & Applied Studies', category: 'Technical' }
];

export const KCSE_SAMPLE_PERFORMANCE = [
  { year: '2020', meanScore: 7.84, meanGrade: 'B-', universityEntryRate: '72%', candidates: 184 },
  { year: '2021', meanScore: 8.21, meanGrade: 'B-', universityEntryRate: '78%', candidates: 198 },
  { year: '2022', meanScore: 8.56, meanGrade: 'B', universityEntryRate: '83%', candidates: 212 },
  { year: '2023', meanScore: 8.92, meanGrade: 'B', universityEntryRate: '86%', candidates: 226 },
  { year: '2024', meanScore: 9.35, meanGrade: 'B+', universityEntryRate: '91%', candidates: 240 }
];

export const KCSE_GRADE_DISTRIBUTION_2024 = [
  { grade: 'A', count: 18 },
  { grade: 'A-', count: 34 },
  { grade: 'B+', count: 62 },
  { grade: 'B', count: 58 },
  { grade: 'B-', count: 38 },
  { grade: 'C+', count: 22 },
  { grade: 'C', count: 6 },
  { grade: 'C-', count: 2 },
  { grade: 'D+', count: 0 }
];

export const LEADERSHIP_PROFILES: LeadershipMember[] = [
  {
    id: 'lead-1',
    name: 'Dr. Josephat M. Ndambuki',
    role: 'Chief Principal & Secretary to BOM',
    credentials: 'Ph.D. Educational Administration (KU), M.Ed, B.Ed (Hons)',
    bio: 'An esteemed educator with over 24 years in secondary leadership, focused on holistic academic rigor, moral integrity, and technological transformation.',
    photoURL: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    order: 1
  },
  {
    id: 'lead-2',
    name: 'Mr. Peter K. Mumo',
    role: 'Deputy Principal (Administration)',
    credentials: 'M.Ed Leadership & Policy, B.Ed Science (UoN)',
    bio: 'Oversees daily institutional operations, faculty coordination, institutional discipline, and infrastructure maintenance.',
    photoURL: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    order: 2
  },
  {
    id: 'lead-3',
    name: 'Mrs. Florence Nduku',
    role: 'Dean of Studies / Academic Coordinator',
    credentials: 'B.Ed Arts (KU), Higher Dip. Curriculum Planning',
    bio: 'Directs curriculum execution, continuous assessments, teacher appraisals, and national examination preparedness.',
    photoURL: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    order: 3
  },
  {
    id: 'lead-4',
    name: 'Arch. Samuel Muteti',
    role: 'Chairman, Board of Management (BOM)',
    credentials: 'B.Arch (UoN), Corporate Member AAK',
    bio: 'Leads strategic governance, resource mobilization, and long-term capital development projects for the institution.',
    photoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    order: 4
  }
];

export const FACILITIES_DATA: FacilityItem[] = [
  {
    id: 'fac-1',
    title: 'Modern Science & Innovation Complex',
    description: 'Equipped with dedicated Physics, Chemistry, and Biology laboratories complying with KNEC and international STEM safety protocols.',
    category: 'Academic',
    features: ['Independent Prep Rooms', 'Digital Microscopes & Sensors', 'Emergency Eye-Wash Stations', 'Capacity of 60 Students Per Lab'],
    imageURL: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'fac-2',
    title: 'Ultra-Modern ICT Center & E-Library',
    description: 'A 100-workstation computerized research suite with high-speed fiber internet and access to Kenya Education Cloud portals.',
    category: 'Technology',
    features: ['Gigabit Fiber Connectivity', 'Uninterruptible Power Supply (UPS)', 'Digital Curriculum Terminals', 'Smart Projection System'],
    imageURL: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'fac-3',
    title: 'Modern Boarding Dormitories & Halls',
    description: 'Spacious, well-ventilated dormitories structured into traditional school houses fostering discipline, fraternity, and hygiene.',
    category: 'Residential',
    features: ['Solar Water Heating System', '24/7 Security CCTV & Wardens', 'In-house Sickbay with Qualified Nurse', 'Study Cubicles'],
    imageURL: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'fac-4',
    title: 'Sports Arena & Athletics Complex',
    description: 'Expansive sporting grounds supporting competitive football, rugby, basketball, volleyball, lawn tennis, and field athletics.',
    category: 'Sports',
    features: ['Standard Football Pitch', 'FIBA-Spec Basketball Court', 'All-Weather Volleyball Court', 'Track & Field Pavilion'],
    imageURL: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80'
  }
];

export const BLOG_POSTS_DATA: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Kalulini Boys Triumphs at Eastern Region Science & Engineering Fair',
    slug: 'science-fair-champions-2025',
    excerpt: 'Our Form 3 innovators took 1st position in Robotics and Environmental Science, qualifying for the prestigious National Finals.',
    content: 'Students from the Kalulini Young Scientists Club demonstrated extraordinary brilliance with an automated irrigation prototype powered by solar energy. Under the mentorship of Mr. Patrick Wanyama, the two-student team impressed judges with empirical data and practical community viability...',
    category: 'Academics & STEM',
    author: 'Florence Nduku',
    authorRole: 'Dean of Studies',
    coverImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    publishedAt: '2026-01-08',
    readTimeMinutes: 4,
    featured: true
  },
  {
    id: 'blog-2',
    title: 'Holistic Character Formation: The Pillars of Kalulini Discipline',
    slug: 'holistic-character-formation-pillars',
    excerpt: 'Why moral rectitude, peer mentorship, and time-discipline remain the bedrock of our consistent academic distinction.',
    content: 'At Kalulini Boys High School, we strongly believe that high academic scores without solid ethical grounding yield incomplete leaders. Our four-pillar discipline framework focuses on responsibility, honesty, respect, and servant leadership...',
    category: 'Institutional Culture',
    author: 'Dr. Josephat Ndambuki',
    authorRole: 'Principal',
    coverImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    publishedAt: '2026-01-04',
    readTimeMinutes: 5,
    featured: false
  },
  {
    id: 'blog-3',
    title: 'Rugby 7s Squad Qualifies for Regional School Championship',
    slug: 'rugby-regional-qualification-2026',
    excerpt: 'The Kalulini Stallions delivered an unbeaten run during the sub-county inter-schools derby, showing exceptional grit and teamwork.',
    content: 'In a thrilling final clash against arch-rivals, the Kalulini Stallions maintained defensive composure before striking with two decisive tries in the closing minutes. Coach David Mutiso commended the physical conditioning and strategic play of the boys...',
    category: 'Sports & Co-curricular',
    author: 'David Mutiso',
    authorRole: 'Games Master',
    coverImage: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80',
    publishedAt: '2025-12-18',
    readTimeMinutes: 3,
    featured: false
  }
];

export const EVENTS_DATA: EventItem[] = [
  {
    id: 'evt-1',
    title: 'Term 1 Mid-Term Assessments',
    description: 'Scheduled evaluation for all forms to gauge syllabus progression and curriculum mastery ahead of mid-term break.',
    category: 'Academic',
    startDate: '2026-02-16',
    endDate: '2026-02-20',
    time: '8:00 AM - 4:30 PM',
    location: 'Main Examination Halls',
    targetAudience: 'All Students & Faculty',
    isFeatured: true
  },
  {
    id: 'evt-2',
    title: 'Annual Inter-House Cross-Country Derby',
    description: 'Annual 10km endurance race between Simba, Chui, Kifaru, and Twiga Houses across the scenic Makueni terrain.',
    category: 'Sports',
    startDate: '2026-02-28',
    time: '6:30 AM - 11:00 AM',
    location: 'School Sports Complex',
    targetAudience: 'Students, Staff, Alumni',
    isFeatured: true
  },
  {
    id: 'evt-3',
    title: 'Form 4 Parents & Candidates Academic Consultation',
    description: 'Targeted one-on-one consultation with subject teachers to set individual KCSE target grades.',
    category: 'Parent Meeting',
    startDate: '2026-03-07',
    time: '9:00 AM - 2:00 PM',
    location: 'Auditorium & Classrooms',
    targetAudience: 'Form 4 Parents & Students',
    isFeatured: false
  }
];

export const FAQS_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Admissions',
    question: 'How do I apply for Form 1 admission at Kalulini Boys High School?',
    answer: 'Admissions are conducted through the official Ministry of Education NEMIS placement and through our online admission application portal on this website. You will need your KCPE / KPSEA assessment index, result slip copy, and birth certificate.'
  },
  {
    id: 'faq-2',
    category: 'Fees & Finance',
    question: 'What is the approved fee structure for boarding students?',
    answer: 'Our fee structure strictly adheres to the Ministry of Education guidelines for Public Extra-County/County boarding schools. Detailed termly breakdowns and payment channels (Bank Paybill / Direct Deposit) are accessible in the Fees section and Student Portal.'
  },
  {
    id: 'faq-3',
    category: 'Academics',
    question: 'Which subject combinations are available for Form 3 and Form 4?',
    answer: 'In addition to the compulsory subjects (English, Kiswahili, Mathematics, Chemistry), students choose from Physics, Biology, History, Geography, CRE, Agriculture, Computer Studies, and Business Studies based on career clusters.'
  },
  {
    id: 'faq-4',
    category: 'Boarding Life',
    question: 'What are the visiting hours and guidelines for parents?',
    answer: 'Official visiting days take place once every term on the designated calendar date from 10:00 AM to 4:00 PM. Unscheduled visits must receive prior written clearance from the Deputy Principal.'
  }
];

export const GALLERY_ITEMS_DATA: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'State-of-the-Art Chemistry Laboratory',
    caption: 'Students conducting quantitative titrations under instructor supervision.',
    category: 'Laboratories',
    imageURL: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    date: '2025-11-12'
  },
  {
    id: 'gal-2',
    title: 'Annual Prize-Giving & Honors Day',
    caption: 'Top academic achievers receiving book vouchers and trophies from the Chief Guest.',
    category: 'Events',
    imageURL: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    date: '2025-10-24'
  },
  {
    id: 'gal-3',
    title: 'Modern Library & Quiet Study Hall',
    caption: 'Our collection exceeds 12,000 reference textbooks and digital terminals.',
    category: 'Campus',
    imageURL: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
    date: '2025-09-18'
  },
  {
    id: 'gal-4',
    title: 'Football Derby Match',
    caption: 'Kalulini Stallions in action against regional contenders.',
    category: 'Sports',
    imageURL: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    date: '2025-08-14'
  },
  {
    id: 'gal-5',
    title: 'Collaborative Classroom Learning',
    caption: 'Learners work together on classroom assignments and presentations.',
    category: 'Academics',
    imageURL: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80',
    date: '2025-07-22'
  },
  {
    id: 'gal-6',
    title: 'Boarding House Community',
    caption: 'Shared residential spaces support routine, wellbeing, and student fellowship.',
    category: 'Dormitories',
    imageURL: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80',
    date: '2025-06-18'
  },
  {
    id: 'gal-7',
    title: 'Student Clubs in Action',
    caption: 'Clubs give learners room to explore interests, collaborate, and lead.',
    category: 'Student Life',
    imageURL: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1000&q=80',
    date: '2025-05-30'
  }
];

export const SAMPLE_STUDENT_GRADES: GradeRecord[] = [
  { id: 'grd-1', examId: 'exam-2025-t3', studentId: 'std-1001', studentName: 'Brian Mutua Kyalo', admissionNumber: 'KBHS/4201', form: 'Form 3', stream: 'East', subjectCode: '101', subjectName: 'English', score: 81, grade: 'A', points: 12, remarks: 'Excellent mastery of comprehension and composition', enteredByTeacherId: 'tch-102', updatedAt: '2025-11-28' },
  { id: 'grd-2', examId: 'exam-2025-t3', studentId: 'std-1001', studentName: 'Brian Mutua Kyalo', admissionNumber: 'KBHS/4201', form: 'Form 3', stream: 'East', subjectCode: '102', subjectName: 'Kiswahili', score: 76, grade: 'A-', points: 11, remarks: 'Ushairi na insha vimeimarika sana', enteredByTeacherId: 'tch-102', updatedAt: '2025-11-28' },
  { id: 'grd-3', examId: 'exam-2025-t3', studentId: 'std-1001', studentName: 'Brian Mutua Kyalo', admissionNumber: 'KBHS/4201', form: 'Form 3', stream: 'East', subjectCode: '121', subjectName: 'Mathematics', score: 88, grade: 'A', points: 12, remarks: 'Superb conceptual understanding in calculus & vectors', enteredByTeacherId: 'tch-101', updatedAt: '2025-11-28' },
  { id: 'grd-4', examId: 'exam-2025-t3', studentId: 'std-1001', studentName: 'Brian Mutua Kyalo', admissionNumber: 'KBHS/4201', form: 'Form 3', stream: 'East', subjectCode: '232', subjectName: 'Physics', score: 84, grade: 'A', points: 12, remarks: 'Commendable laboratory experimental accuracy', enteredByTeacherId: 'tch-101', updatedAt: '2025-11-28' },
  { id: 'grd-5', examId: 'exam-2025-t3', studentId: 'std-1001', studentName: 'Brian Mutua Kyalo', admissionNumber: 'KBHS/4201', form: 'Form 3', stream: 'East', subjectCode: '233', subjectName: 'Chemistry', score: 78, grade: 'A-', points: 11, remarks: 'Good work on stoichiometry and periodic trends', enteredByTeacherId: 'tch-103', updatedAt: '2025-11-28' },
  { id: 'grd-6', examId: 'exam-2025-t3', studentId: 'std-1001', studentName: 'Brian Mutua Kyalo', admissionNumber: 'KBHS/4201', form: 'Form 3', stream: 'East', subjectCode: '311', subjectName: 'History & Govt', score: 79, grade: 'A-', points: 11, remarks: 'Solid analytical essay arguments', enteredByTeacherId: 'tch-104', updatedAt: '2025-11-28' },
  { id: 'grd-7', examId: 'exam-2025-t3', studentId: 'std-1001', studentName: 'Brian Mutua Kyalo', admissionNumber: 'KBHS/4201', form: 'Form 3', stream: 'East', subjectCode: '451', subjectName: 'Computer Studies', score: 92, grade: 'A', points: 12, remarks: 'Distinguished project programming and theoretical execution', enteredByTeacherId: 'tch-101', updatedAt: '2025-11-28' }
];

export const SAMPLE_APPLICATIONS: AdmissionApplication[] = [
  {
    id: 'app-001',
    applicationReference: 'KBHS-2026-0842',
    userId: 'usr-applicant-1',
    applicantFirstName: 'Collins',
    applicantLastName: 'Mutiso',
    dateOfBirth: '2011-04-18',
    gender: 'Male',
    currentSchool: 'Wote Township Boarding Primary',
    kcpeIndexNumber: '12345001/014',
    kcpeMarks: 382,
    targetForm: 'Form 1',
    parentName: 'Stephen Mutiso Kioko',
    parentPhone: '+254 711 223 344',
    parentEmail: 'stephen.mutiso@example.com',
    parentOccupation: 'Agricultural Officer',
    homeCounty: 'Makueni',
    subCounty: 'Makueni West',
    submittedAt: '2026-01-06T10:15:00Z',
    status: 'Under Review',
    documents: {
      birthCertificateUrl: '#',
      kcpeResultSlipUrl: '#'
    }
  },
  {
    id: 'app-002',
    applicationReference: 'KBHS-2026-0843',
    userId: 'usr-applicant-2',
    applicantFirstName: 'Meshack',
    applicantLastName: 'Kariuki',
    dateOfBirth: '2010-08-22',
    gender: 'Male',
    currentSchool: 'Machakos Academy Primary',
    kcpeIndexNumber: '12345002/089',
    kcpeMarks: 395,
    targetForm: 'Form 1',
    parentName: 'Mercy Kariuki',
    parentPhone: '+254 722 990 011',
    parentEmail: 'mercy.kariuki@example.com',
    parentOccupation: 'Accountant',
    homeCounty: 'Machakos',
    subCounty: 'Machakos Central',
    submittedAt: '2026-01-07T14:30:00Z',
    status: 'Accepted',
    reviewNotes: 'Accepted for Form 1 East. Letter generated.',
    documents: {
      birthCertificateUrl: '#',
      kcpeResultSlipUrl: '#'
    }
  }
];

export const SAMPLE_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-01',
    title: 'Vectors and Three-Dimensional Geometry Assignment',
    subject: 'Mathematics',
    form: 'Form 3',
    stream: 'East',
    teacherName: 'Mr. Geoffrey Musyoka',
    teacherId: 'tch-101',
    description: 'Complete questions 1 to 14 from Exercise 6.4 on position vectors and scalar products. Show all step calculations clearly.',
    dueDate: '2026-02-12',
    assignedDate: '2026-02-05',
    totalMarks: 30,
    submissionsCount: 42
  },
  {
    id: 'asg-02',
    title: 'Character Analysis: Fathers of Nations & The Samaritan',
    subject: 'English & Literature',
    form: 'Form 3',
    stream: 'East',
    teacherName: 'Mrs. Florence Nduku',
    teacherId: 'tch-102',
    description: 'Write a 600-word critical evaluation of Dr. Afolabi and Mayor Mossi, contrasting their moral compromises.',
    dueDate: '2026-02-15',
    assignedDate: '2026-02-06',
    totalMarks: 20,
    submissionsCount: 38
  }
];

export const SAMPLE_PAYMENTS: PaymentTransaction[] = [
  {
    id: 'pay-001',
    invoiceId: 'inv-101',
    studentId: 'std-1001',
    admissionNumber: 'KBHS/4201',
    studentName: 'Brian Mutua Kyalo',
    amount: 25000,
    date: '2026-01-05',
    paymentMethod: 'Bank Transfer',
    transactionReference: 'KCB-REF-9988123',
    receiptNumber: 'REC-2026-014',
    verifiedBy: 'Bursar - Accounts Dept'
  },
  {
    id: 'pay-002',
    invoiceId: 'inv-102',
    studentId: 'std-1002',
    admissionNumber: 'KBHS/4202',
    studentName: 'Kelvin Mwangi Kamau',
    amount: 37500,
    date: '2026-01-06',
    paymentMethod: 'M-Pesa Paybill',
    transactionReference: 'SBA8812KLQ',
    receiptNumber: 'REC-2026-022',
    verifiedBy: 'Bursar - Accounts Dept'
  }
];
