const fs = require('fs');
const puppeteer = require('puppeteer-core');

async function testRealImage() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  const imgRes = await fetch('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85');
  const imgBuf = Buffer.from(await imgRes.arrayBuffer());
  const base64 = imgBuf.toString('base64');
  console.log('Original image size:', imgBuf.length);

  const testHtml = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial; margin: 0;">
        <h1>Kalulini Boys High School</h1>
        <img src="data:image/jpeg;base64,${base64}" style="width: 100%; max-height: 400px; object-fit: cover;" />
      </body>
    </html>
  `;
  await page.setContent(testHtml, { waitUntil: 'domcontentloaded' });
  const pdf = await page.pdf({ format: 'A4', printBackground: true });
  console.log('Resulting PDF size with image:', pdf.length);
  await browser.close();
}

testRealImage().catch(console.error);
