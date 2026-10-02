export type SchoolStat = {
  label: string;
  value: number;
  suffix?: string;
  description: string;
};

export type Department = {
  name: string;
  lead: string;
  focus: string;
};

export type EventItem = {
  title: string;
  date: string;
  category: string;
  description: string;
};

export type NewsItem = {
  title: string;
  excerpt: string;
  date: string;
  category: string;
};

export const schoolStats: SchoolStat[] = [
  { label: 'Students', value: 1320, suffix: '+', description: 'Learners in a disciplined and nurturing environment.' },
  { label: 'Academic Excellence', value: 96, suffix: '%', description: 'Average KCSE performance across recent cohorts.' },
  { label: 'Teachers', value: 120, suffix: '+', description: 'Dedicated educators across all departments.' },
  { label: 'Facilities', value: 18, suffix: '+', description: 'Modern academic, sporting, and residential facilities.' },
];

export const departments: Department[] = [
  { name: 'Sciences', lead: 'Mr. Patrick Wanyama', focus: 'Biology, Chemistry, Physics and Applied Mathematics.' },
  { name: 'Humanities', lead: 'Mr. David Mutiso', focus: 'History, Geography, CRE and Social Studies.' },
  { name: 'Languages', lead: 'Mrs. Florence Nduku', focus: 'English, Kiswahili, Literature and Communication.' },
  { name: 'Technology', lead: 'Mr. Daniel Mwangangi', focus: 'ICT, Design & Entrepreneurship, and digital learning.' },
];

export const upcomingEvents: EventItem[] = [
  { title: 'Science & Innovation Week', date: '15 Jan 2027', category: 'Academic', description: 'Students showcase projects, experiments and STEM challenges.' },
  { title: 'Parent-Teacher Meeting', date: '22 Jan 2027', category: 'Community', description: 'Open engagement on student growth, discipline and performance.' },
  { title: 'Inter-House Games', date: '04 Feb 2027', category: 'Sports', description: 'Athletics, football and track events across all houses.' },
];

export const newsItems: NewsItem[] = [
  { title: 'New digital learning labs launched', excerpt: 'Students now access ICT-enabled learning with modern project-based tools.', date: '04 Jan 2027', category: 'Technology' },
  { title: 'KCSE results exceed school target', excerpt: 'The class of 2026 recorded a strong performance in core sciences and languages.', date: '12 Dec 2026', category: 'Academics' },
  { title: 'Boarding facilities upgraded', excerpt: 'Renovated dormitories and sanitation upgrades improve living standards.', date: '28 Nov 2026', category: 'Boarding' },
];
