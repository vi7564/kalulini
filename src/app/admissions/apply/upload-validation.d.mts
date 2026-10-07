export const MAX_ADMISSION_FILE_SIZE: number;
export function getAdmissionFileContentType(file: { name: string }): string;
export function validateAdmissionFile(file: { name: string; size: number; type?: string } | null): string | null;
