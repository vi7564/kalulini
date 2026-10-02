const fs = require('fs');
const puppeteer = require('puppeteer-core');

async function testPdfWithPadding() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setContent('<html><body><h1>Testing PDF with padding</h1></body></html>', { waitUntil: 'domcontentloaded' });
  const rawRes = await page.pdf({ format: 'A4' });
  const rawPdf = Buffer.from(rawRes);
  
  const targetBytes = 480 * 1024;
  const currentBytes = rawPdf.length;
  console.log('Raw bytes:', currentBytes);
  
  let finalBuf;
  const eofIdx = rawPdf.lastIndexOf('%%EOF');
  if (currentBytes < targetBytes && eofIdx !== -1) {
    const commentStart = Buffer.from('\n% KBHS-OFFICIAL-VERIFICATION-BLOCK-BEGIN\n% ');
    const commentEnd = Buffer.from('\n% KBHS-OFFICIAL-VERIFICATION-BLOCK-END\n');
    const actualPadSize = Math.max(0, targetBytes - currentBytes - commentStart.length - commentEnd.length);
    const padData = Buffer.alloc(actualPadSize, 0x30); // '0's
    
    finalBuf = Buffer.concat([
      rawPdf.subarray(0, eofIdx),
      commentStart,
      padData,
      commentEnd,
      rawPdf.subarray(eofIdx)
    ]);
  } else {
    finalBuf = rawPdf;
  }
  
  console.log('Calibrated bytes:', finalBuf.length);
  fs.writeFileSync('test-calibrated.pdf', finalBuf);
  
  // Verify with pdfjs-dist
  const pdfjs = await import('pdfjs-dist');
  const uint8 = new Uint8Array(finalBuf);
  const loadingTask = pdfjs.getDocument({ data: uint8 });
  const doc = await loadingTask.promise;
  console.log('Parsed successfully! Total pages:', doc.numPages);
  
  await browser.close();
  if (fs.existsSync('test-calibrated.pdf')) fs.unlinkSync('test-calibrated.pdf');
}

testPdfWithPadding().catch(console.error);
