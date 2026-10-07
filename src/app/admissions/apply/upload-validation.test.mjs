import assert from 'node:assert/strict';
import test from 'node:test';
import { MAX_ADMISSION_FILE_SIZE, validateAdmissionFile } from './upload-validation.mjs';

test('accepts supported PDF and image formats through 5 MB', () => {
  assert.equal(validateAdmissionFile({ name: 'birth.pdf', size: MAX_ADMISSION_FILE_SIZE, type: 'application/pdf' }), null);
  assert.equal(validateAdmissionFile({ name: 'result.JPG', size: 100, type: 'image/jpeg' }), null);
  assert.equal(validateAdmissionFile({ name: 'result.png', size: 100, type: 'image/png' }), null);
});

test('rejects unsupported types and MIME/extension mismatches', () => {
  assert.match(validateAdmissionFile({ name: 'script.exe', size: 100, type: 'application/octet-stream' }) || '', /PDF, JPG, or PNG/);
  assert.match(validateAdmissionFile({ name: 'result.jpg', size: 100, type: 'image/png' }) || '', /PDF, JPG, or PNG/);
});

test('rejects empty and over-limit documents', () => {
  assert.match(validateAdmissionFile({ name: 'empty.pdf', size: 0, type: 'application/pdf' }) || '', /empty/);
  assert.match(validateAdmissionFile({ name: 'large.png', size: MAX_ADMISSION_FILE_SIZE + 1, type: 'image/png' }) || '', /5 MB/);
});
