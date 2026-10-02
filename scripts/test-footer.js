const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function testFooter() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  const html = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial; padding: 20px;">
        <div style="height: 1000px;"><h1>Page 1</h1><p>Testing footer</p></div>
        <div style="page-break-before: always; height: 1000px;"><h1>Page 2</h1><p>Testing footer 2</p></div>
      </body>
    </html>
  `;
  await page.setContent(html, { waitUntil: 'domcontentloaded' });
  const pdfBuf = await page.pdf({
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: `
      <div style="font-family: Arial, sans-serif; font-size: 8pt; width: 100%; padding: 0 14mm; display: flex; justify-content: space-between; align-items: center; color: #64748b;">
        <span>Kalulini Boys High School &bull; Official Publication</span>
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
  await browser.close();
  console.log('PDF generated with footer, size:', pdfBuf.length);
}

testFooter().catch(console.error);
