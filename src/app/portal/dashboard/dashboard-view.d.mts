export type DashboardView = 'applicant' | 'parent' | 'unsupported';
export function getDashboardView(role: unknown): DashboardView;
export function getDashboardSections(role: unknown): string[];
export function getLinkedStudentIds(claims: Record<string, unknown>): string[];
export function parentOwnsStudent(
  claims: Record<string, unknown>,
  studentId: string,
  admissionNumber?: string,
): boolean;
export function getAcademicTerm(now?: Date): {
  label: string;
  year: number;
  startDate: string | null;
  endDate: string | null;
  today: string;
};
export function isInAcademicTerm(
  record: Record<string, unknown>,
  term: ReturnType<typeof getAcademicTerm>,
): boolean;
