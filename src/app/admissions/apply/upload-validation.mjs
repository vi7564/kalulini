export const MAX_ADMISSION_FILE_SIZE = 5 * 1024 * 1024;

const allowedTypes = new Map([
  ['pdf', 'application/pdf'],
  ['jpg', 'image/jpeg'],
  ['jpeg', 'image/jpeg'],
  ['png', 'image/png'],
]);

export function getAdmissionFileContentType(file) {
  const extension = file?.name?.split('.').pop()?.toLowerCase() || '';
  return allowedTypes.get(extension) || '';
}

export function validateAdmissionFile(file) {
  if (!file || typeof file.name !== 'string' || typeof file.size !== 'number') {
    return 'Select a valid file.';
  }

  const extension = file.name.split('.').pop()?.toLowerCase() || '';
  const expectedType = getAdmissionFileContentType(file);
  if (!expectedType || (file.type && file.type !== expectedType)) {
    return 'Choose a PDF, JPG, or PNG file.';
  }
  if (file.size <= 0) {
    return 'The selected file is empty.';
  }
  if (file.size > MAX_ADMISSION_FILE_SIZE) {
    return 'The file must be 5 MB or smaller.';
  }
  return null;
}
