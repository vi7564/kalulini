const fs = require('fs');
const puppeteer = require('puppeteer-core');

async function test() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  // Create a 500KB dummy JPEG buffer to see how it embeds
  const testHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          @page { size: A4; margin: 15mm; }
          body { font-family: sans-serif; color: #1f1f1f; }
          h1 { color: #007fa3; }
        </style>
      </head>
      <body>
        <h1>Kalulini Boys High School</h1>
        <p>Test document generation</p>
      </body>
    </html>
  `;
  await page.setContent(testHtml, { waitUntil: 'networkidle0' });
  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true
  });
  console.log('Sample PDF length:', pdfBuffer.length);
  await browser.close();
}

test().catch(console.error);
