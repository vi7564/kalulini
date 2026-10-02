// scripts/render-pdf-previews.js
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

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

async function renderPreviews() {
  const outDir = path.join(__dirname, '..', 'public', 'pdf-previews');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600 });

  // Use pdfjs viewer in browser
  for (const filename of PDF_FILES) {
    const pdfUrl = `http://localhost:3001/downloads/${filename}`;
    // Load an HTML page with pdfjs CDN to render page 1 to canvas
    const renderHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
          <style>
            body { margin: 0; background: #333; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
            canvas { box-shadow: 0 4px 20px rgba(0,0,0,0.5); background: white; }
          </style>
        </head>
        <body>
          <canvas id="the-canvas"></canvas>
          <script>
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            const loadingTask = pdfjsLib.getDocument('${pdfUrl}');
            loadingTask.promise.then(function(pdf) {
              return pdf.getPage(1).then(function(page) {
                const scale = 1.8;
                const viewport = page.getViewport({scale: scale});
                const canvas = document.getElementById('the-canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                const renderContext = {
                  canvasContext: context,
                  viewport: viewport
                };
                return page.render(renderContext).promise;
              });
            }).then(function() {
              window.renderDone = true;
            }).catch(function(err) {
              console.error(err);
              window.renderError = err.message;
            });
          </script>
        </body>
      </html>
    `;

    await page.setContent(renderHtml);
    await page.waitForFunction('window.renderDone || window.renderError', { timeout: 15000 });

    const previewFilename = filename.replace('.pdf', '-p1.png');
    const previewPath = path.join(outDir, previewFilename);
    const canvas = await page.$('#the-canvas');
    if (canvas) {
      await canvas.screenshot({ path: previewPath });
      console.log(`Rendered preview: ${previewFilename}`);
    }
  }

  await browser.close();
  console.log('All PDF page 1 previews generated in public/pdf-previews/');
}

renderPreviews().catch(console.error);
