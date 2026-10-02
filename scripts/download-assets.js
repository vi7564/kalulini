// scripts/download-assets.js
const fs = require('fs');
const path = require('path');

const IMAGES = {
  'campus-main.jpg': 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=90',
  'science-lab.jpg': 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=90',
  'ict-center.jpg': 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1400&q=90',
  'dormitory.jpg': 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1400&q=90',
  'sports-field.jpg': 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1400&q=90',
  'library.jpg': 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1400&q=90',
  'assembly.jpg': 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1400&q=90',
  'principal.jpg': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=90',
  'students-studying.jpg': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=90'
};

async function downloadAll() {
  const dir = path.join(__dirname, 'assets', 'images');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  for (const [filename, url] of Object.entries(IMAGES)) {
    const dest = path.join(dir, filename);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 10000) {
      console.log(`Image already exists: ${filename} (${(fs.statSync(dest).size / 1024).toFixed(1)} KB)`);
      continue;
    }
    console.log(`Downloading ${filename}...`);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(dest, buf);
      console.log(`Saved ${filename}: ${(buf.length / 1024).toFixed(1)} KB`);
    } catch (err) {
      console.error(`Failed to download ${filename}:`, err.message);
    }
  }
  console.log('All image assets ready!');
}

downloadAll();
