// scripts/verify-pdfs.js
const fs = require('fs');
const path = require('path');

const PDF_FILES = [
  'kalulini-academic-prospectus-2026.pdf',
  'kalulini-boarding-fees-structure-2026.pdf',
  'kalulini-form-1-admission-package.pdf',
  'kalulini-student-medical-clearance-form.pdf',
  'kalulini-rules-code-of-conduct-prefects-charter.pdf',
  'kalulini-term-1-2026-academic-calendar.pdf',
  'kalulini-boarding-packing-list-uniform-standards.pdf',
  'kalulini-transfer-student-assessment-form.pdf'
];

async function verifyAll() {
  const pdfjs = await import('pdfjs-dist');
  const baseDir = path.join(__dirname, '..', 'public', 'downloads');
  console.log('========================================================================');
  console.log('         DEEP VERIFICATION OF ALL 8 GENERATED PDF DOCUMENTS            ');
  console.log('========================================================================\n');

  let allPassed = true;
  const results = [];

  for (const filename of PDF_FILES) {
    const fullPath = path.join(baseDir, filename);
    if (!fs.existsSync(fullPath)) {
      console.error(`[FAIL] File missing: ${filename}`);
      allPassed = false;
      continue;
    }

    const stat = fs.statSync(fullPath);
    const data = new Uint8Array(fs.readFileSync(fullPath));
    const doc = await pdfjs.getDocument({ data }).promise;
    const numPages = doc.numPages;

    const pageReports = [];
    let hasBlankPage = false;

    for (let p = 1; p <= numPages; p++) {
      const page = await doc.getPage(p);
      const textContent = await page.getTextContent();
      const text = textContent.items.map((it) => it.str).join(' ').trim();
      const charCount = text.length;

      if (charCount < 30) {
        hasBlankPage = true;
      }
      pageReports.push({ pageNum: p, charCount, preview: text.slice(0, 70) });
    }

    const sizeFormatted = stat.size >= 1024 * 1024 ? `${(stat.size / (1024 * 1024)).toFixed(2)} MB` : `${Math.round(stat.size / 1024)} KB`;

    results.push({
      filename,
      sizeFormatted,
      numPages,
      hasBlankPage,
      pageReports
    });

    console.log(`Document: ${filename}`);
    console.log(`  Size: ${sizeFormatted} (${stat.size} bytes) | Pages: ${numPages}`);
    for (const pr of pageReports) {
      console.log(`  - Page ${pr.pageNum}: ${pr.charCount} chars | Preview: "${pr.preview}..."`);
    }
    if (hasBlankPage) {
      console.warn(`  [WARNING] Possible blank page detected!`);
      allPassed = false;
    } else {
      console.log(`  [PASS] All pages contain robust text content. No blank pages.`);
    }
    console.log('------------------------------------------------------------------------');
  }

  console.log(`\nOverall PDF Integrity: ${allPassed ? 'ALL PASSED (100% Valid)' : 'ISSUES DETECTED'}\n`);
}

verifyAll().catch(console.error);
