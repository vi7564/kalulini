import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const DOC_DEFINITIONS = [
  {
    title: '2026 Academic Prospectus & Information Guide',
    category: 'General',
    fileName: 'kalulini-academic-prospectus-2026.pdf',
    fallbackSize: '2.4 MB'
  },
  {
    title: 'Official Boarding Fees Structure Schedule 2026',
    category: 'Finance',
    fileName: 'kalulini-boarding-fees-structure-2026.pdf',
    fallbackSize: '480 KB'
  },
  {
    title: 'Form 1 Direct Admission Application Package',
    category: 'Admissions',
    fileName: 'kalulini-form-1-admission-package.pdf',
    fallbackSize: '1.2 MB'
  },
  {
    title: 'Student Medical History & Clinical Clearance Form',
    category: 'Health',
    fileName: 'kalulini-student-medical-clearance-form.pdf',
    fallbackSize: '350 KB'
  },
  {
    title: 'Institutional Rules, Code of Conduct & Prefects Charter',
    category: 'Policies',
    fileName: 'kalulini-rules-code-of-conduct-prefects-charter.pdf',
    fallbackSize: '890 KB'
  },
  {
    title: 'Comprehensive Term 1 2026 Academic Calendar',
    category: 'Academics',
    fileName: 'kalulini-term-1-2026-academic-calendar.pdf',
    fallbackSize: '420 KB'
  },
  {
    title: 'Boarding Packing List & Dormitory Uniform Standards',
    category: 'Boarding',
    fileName: 'kalulini-boarding-packing-list-uniform-standards.pdf',
    fallbackSize: '510 KB'
  },
  {
    title: 'Transfer Student Assessment Form (Forms 2 & 3)',
    category: 'Admissions',
    fileName: 'kalulini-transfer-student-assessment-form.pdf',
    fallbackSize: '640 KB'
  }
];

function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
  return `${Math.round(bytes / 1024)} KB`;
}

export async function GET() {
  const downloadsDir = path.join(process.cwd(), 'public', 'downloads');

  const documents = DOC_DEFINITIONS.map((def) => {
    const filePath = path.join(downloadsDir, def.fileName);
    const exists = fs.existsSync(filePath);
    let size = def.fallbackSize;
    let sizeBytes = 0;

    if (exists) {
      try {
        const stats = fs.statSync(filePath);
        sizeBytes = stats.size;
        size = formatBytes(sizeBytes);
      } catch (err) {
        console.error(`Error reading stats for ${def.fileName}:`, err);
      }
    }

    return {
      title: def.title,
      category: def.category,
      fileName: def.fileName,
      filePath: `/downloads/${def.fileName}`,
      exists,
      size,
      sizeBytes
    };
  });

  return NextResponse.json({
    success: true,
    documents
  });
}
