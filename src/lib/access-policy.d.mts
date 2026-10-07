export const ASSIGNABLE_ROLES: readonly string[];
export function validateRoleAssignment(role: unknown, options?: { isSuperAdmin?: boolean }): string | null;
export function requiredRoleLink(role: string): 'studentId' | 'teacherId' | null;
export function isPendingStatus(status: unknown): boolean;
