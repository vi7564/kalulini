export const HOMEPAGE_KCSE_RESULTS = {
  year: '',
  source: '',
  meanScore: '',
  universityEntry: '',
  candidates: '',
};

export const HOMEPAGE_IMPACT_ESTIMATES = [
  {
    label: 'Learners in the community',
    value: 1000,
    prefix: '~',
    suffix: '+',
    description: 'Rounded planning estimate',
    icon: 'learners',
  },
  {
    label: 'Teaching team',
    value: 40,
    prefix: '~',
    suffix: '+',
    description: 'Illustrative staff estimate',
    icon: 'staff',
  },
  {
    label: 'Clubs & activities',
    value: 20,
    prefix: '~',
    suffix: '+',
    description: 'Illustrative programme estimate',
    icon: 'activities',
  },
] as const;
