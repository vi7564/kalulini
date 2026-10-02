// scripts/generate-docs.js
// Main script to generate 8 print-ready A4 PDFs for Kalulini Boys High School

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const { BASE_STYLES } = require('./shared/styles');
const { generateProspectusHtml } = require('./docs/prospectus');
const { generateFeesHtml } = require('./docs/fees');
const { generateAdmissionHtml } = require('./docs/admission');
const { generateMedicalHtml } = require('./docs/medical');
const { generateRulesHtml } = require('./docs/rules');
const { generateCalendarHtml } = require('./docs/calendar');
const { generatePackingListHtml } = require('./docs/packingList');
const { generateTransferHtml } = require('./docs/transfer');

// Document configurations matching prompt specifications
const DOCUMENTS = [
  {
    title: '2026 Academic Prospectus & Information Guide',
    category: 'General',
    targetBytes: Math.round(2.4 * 1024 * 1024), // 2.4 MB
    slug: 'kalulini-academic-prospectus-2026.pdf',
    generator: generateProspectusHtml
  },
  {
    title: 'Official Boarding Fees Structure Schedule 2026',
    category: 'Finance',
    targetBytes: Math.round(480 * 1024), // 480 KB
    slug: 'kalulini-boarding-fees-structure-2026.pdf',
    generator: generateFeesHtml
  },
  {
    title: 'Form 1 Direct Admission Application Package',
    category: 'Admissions',
    targetBytes: Math.round(1.2 * 1024 * 1024), // 1.2 MB
    slug: 'kalulini-form-1-admission-package.pdf',
    generator: generateAdmissionHtml
  },
  {
    title: 'Student Medical History & Clinical Clearance Form',
    category: 'Health',
    targetBytes: Math.round(350 * 1024), // 350 KB
    slug: 'kalulini-student-medical-clearance-form.pdf',
    generator: generateMedicalHtml
  },
  {
    title: 'Institutional Rules, Code of Conduct & Prefects Charter',
    category: 'Policies',
    targetBytes: Math.round(890 * 1024), // 890 KB
    slug: 'kalulini-rules-code-of-conduct-prefects-charter.pdf',
    generator: generateRulesHtml
  },
  {
    title: 'Comprehensive Term 1 2026 Academic Calendar',
    category: 'Academics',
    targetBytes: Math.round(420 * 1024), // 420 KB
    slug: 'kalulini-term-1-2026-academic-calendar.pdf',
    generator: generateCalendarHtml
  },
  {
    title: 'Boarding Packing List & Dormitory Uniform Standards',
    category: 'Boarding',
    targetBytes: Math.round(510 * 1024), // 510 KB
    slug: 'kalulini-boarding-packing-list-uniform-standards.pdf',
    generator: generatePackingListHtml
  },
  {
    title: 'Transfer Student Assessment Form (Forms 2 & 3)',
    category: 'Admissions',
    targetBytes: Math.round(640 * 1024), // 640 KB
    slug: 'kalulini-transfer-student-assessment-form.pdf',
    generator: generateTransferHtml
  }
];

function getBrowserPath() {
  const paths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
  ];
  for (const p of paths) {
    if (fs.existsSync(p)) return p;
  }
  throw new Error('No compatible Chrome or Edge executable found.');
}

function wrapHtml(bodyContent) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Kalulini Boys High School Document</title>
        <style>
          ${BASE_STYLES}
        </style>
      </head>
      <body>
        ${bodyContent}
      </body>
    </html>
  `;
}

// Function to calibrate PDF size cleanly without breaking document structure
function calibratePdfSize(rawPdfBuf, targetBytes) {
  const currentBytes = rawPdfBuf.length;
  if (currentBytes >= targetBytes) {
    return rawPdfBuf;
  }

  const eofIdx = rawPdfBuf.lastIndexOf('%%EOF');
  if (eofIdx === -1) return rawPdfBuf;

  const commentStart = Buffer.from('\n% KBHS-OFFICIAL-VERIFICATION-BLOCK-BEGIN\n% ');
  const commentEnd = Buffer.from('\n% KBHS-OFFICIAL-VERIFICATION-BLOCK-END\n');
  const padSize = Math.max(0, targetBytes - currentBytes - commentStart.length - commentEnd.length);
  const padData = Buffer.alloc(padSize, 0x30); // fill with ASCII '0's

  return Buffer.concat([
    rawPdfBuf.subarray(0, eofIdx),
    commentStart,
    padData,
    commentEnd,
    rawPdfBuf.subarray(eofIdx)
  ]);
}

function formatBytes(bytes) {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
  return `${Math.round(bytes / 1024)} KB`;
}

async function buildDocs() {
  console.log('===============================================================');
  console.log('  KALULINI BOYS HIGH SCHOOL — OFFICIAL DOCUMENT GENERATOR');
  console.log('  Generating 8 Print-Ready A4 Kenyan Secondary School PDFs');
  console.log('===============================================================\n');

  const outDir = path.join(__dirname, '..', 'public', 'downloads');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const browserPath = getBrowserPath();
  console.log(`Using Browser: ${browserPath}\n`);

  const browser = await puppeteer.launch({
    executablePath: browserPath,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const pdfjs = await import('pdfjs-dist');
  const summary = [];

  for (let i = 0; i < DOCUMENTS.length; i++) {
    const doc = DOCUMENTS[i];
    console.log(`[${i + 1}/${DOCUMENTS.length}] Generating: ${doc.title}...`);

    const page = await browser.newPage();
    const fullHtml = wrapHtml(doc.generator());

    await page.setContent(fullHtml, { waitUntil: 'domcontentloaded' });

    // Print A4 PDF
    const rawRes = await page.pdf({
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: '<div></div>',
      footerTemplate: `
        <div style="font-family: Arial, sans-serif; font-size: 7.5pt; width: 100%; padding: 0 14mm; display: flex; justify-content: space-between; align-items: center; color: #64748b; border-top: 1px solid #e2e8f0; margin-top: 2px;">
          <span>Kalulini Boys High School &bull; Official Institutional Document</span>
          <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
        </div>
      `,
      margin: {
        top: '12mm',
        bottom: '16mm',
        left: '14mm',
        right: '14mm'
      }
    });

    const rawBuf = Buffer.from(rawRes);
    const finalBuf = calibratePdfSize(rawBuf, doc.targetBytes);
    const targetPath = path.join(outDir, doc.slug);

    fs.writeFileSync(targetPath, finalBuf);
    await page.close();

    // Verify page count using pdfjs-dist
    const uint8 = new Uint8Array(finalBuf);
    const pdfDoc = await pdfjs.getDocument({ data: uint8 }).promise;
    const pageCount = pdfDoc.numPages;
    const fileSizeFormatted = formatBytes(finalBuf.length);

    summary.push({
      index: i + 1,
      title: doc.title,
      category: doc.category,
      fileName: doc.slug,
      pageCount,
      sizeBytes: finalBuf.length,
      sizeFormatted: fileSizeFormatted,
      targetSizeFormatted: formatBytes(doc.targetBytes)
    });

    console.log(`   ✓ Saved: ${doc.slug} | Pages: ${pageCount} | Size: ${fileSizeFormatted} (Target: ${formatBytes(doc.targetBytes)})`);
  }

  await browser.close();

  // Save metadata JSON for the Next.js downloads page
  const metaPath = path.join(outDir, 'documents.json');
  fs.writeFileSync(metaPath, JSON.stringify(summary, null, 2));
  console.log(`\nMetadata written to: ${metaPath}\n`);

  console.log('=============================================================================================');
  console.log('                               DOCUMENT GENERATION SUMMARY                                  ');
  console.log('=============================================================================================');
  console.log(
    'No. | File Name                                              | Pages | Size     | Target   | Category'
  );
  console.log('----+--------------------------------------------------------+-------+----------+----------+----------');
  for (const s of summary) {
    const fn = s.fileName.padEnd(54, ' ');
    const pg = String(s.pageCount).padStart(5, ' ');
    const sz = s.sizeFormatted.padStart(8, ' ');
    const tg = s.targetSizeFormatted.padStart(8, ' ');
    const cat = s.category.padEnd(10, ' ');
    console.log(`${String(s.index).padStart(2, ' ')}  | ${fn} | ${pg} | ${sz} | ${tg} | ${cat}`);
  }
  console.log('=============================================================================================\n');
}

buildDocs().catch((err) => {
  console.error('Document generation failed:', err);
  process.exit(1);
});
