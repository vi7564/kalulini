// scripts/shared/assets.js
// Official institutional assets, SVGs, crests, rubber stamps, signatures, and placeholders

const SCHOOL_INFO = {
  name: 'KALULINI BOYS HIGH SCHOOL',
  subTitle: 'Extra-County Public Boarding Secondary School',
  ministry: 'REPUBLIC OF KENYA — MINISTRY OF EDUCATION',
  department: 'STATE DEPARTMENT FOR BASIC EDUCATION',
  motto: 'STRIVE FOR EXCELLENCE, INTEGRITY AND SERVICE',
  poBox: 'P.O. Box 24 - 90130, Kalulini, Makueni County, Kenya',
  phone: '+254 [PHONE] / +254 [PHONE]',
  email: 'info@kaluliniboys.ac.ke / principal@kaluliniboys.ac.ke',
  website: 'www.kaluliniboys.ac.ke',
  nemisCode: 'KBHS/MOE/SEC/[NEMIS]',
  knecCode: 'KNEC/SEC/[KNEC CODE]'
};

// Vector School Crest
function getSchoolCrestSvg(width = 100, height = 100) {
  return `
<svg width="${width}" height="${height}" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Outer Decorative Ring -->
  <circle cx="80" cy="80" r="76" stroke="#007fa3" stroke-width="3" fill="#ffffff" />
  <circle cx="80" cy="80" r="70" stroke="#d9a900" stroke-width="1.5" stroke-dasharray="3,2" />
  
  <!-- Outer text along circle path -->
  <defs>
    <path id="circleTextTop" d="M 22,80 A 58,58 0 0,1 138,80" />
    <path id="circleTextBottom" d="M 138,80 A 58,58 0 0,1 22,80" />
    <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#007fa3"/>
      <stop offset="50%" stop-color="#0b4558"/>
      <stop offset="100%" stop-color="#1f1f1f"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffd84d"/>
      <stop offset="50%" stop-color="#f5c400"/>
      <stop offset="100%" stop-color="#d9a900"/>
    </linearGradient>
  </defs>

  <!-- School Shield -->
  <path d="M 45 42 L 115 42 C 115 72 108 98 80 115 C 52 98 45 72 45 42 Z" fill="url(#shieldGrad)" stroke="#f5c400" stroke-width="2.5" />
  
  <!-- Shield Cross Division -->
  <line x1="80" y1="42" x2="80" y2="114" stroke="#f5c400" stroke-width="1.5" opacity="0.6" />
  <line x1="46" y1="74" x2="114" y2="74" stroke="#f5c400" stroke-width="1.5" opacity="0.6" />

  <!-- Graduation Cap (Top Left Quarter) -->
  <g transform="translate(52, 48) scale(0.65)">
    <polygon points="20,5 38,13 20,21 2,13" fill="#ffd84d" />
    <path d="M 8 16 L 8 26 C 8 30 32 30 32 26 L 32 16" fill="#f5c400" opacity="0.9" />
    <line x1="38" y1="13" x2="38" y2="28" stroke="#ffffff" stroke-width="1.5" />
    <circle cx="38" cy="29" r="2" fill="#ffd84d" />
  </g>

  <!-- Torch of Knowledge (Top Right Quarter) -->
  <g transform="translate(86, 48) scale(0.65)">
    <path d="M 12 5 C 10 9 14 11 12 15 C 16 11 15 7 12 5 Z" fill="#ffd84d" />
    <path d="M 12 8 C 11 10 13 11 12 13 C 14 11 13 9 12 8 Z" fill="#ff4d4d" />
    <path d="M 8 15 L 16 15 L 14 28 L 10 28 Z" fill="#f5c400" />
    <rect x="7" y="14" width="10" height="2" fill="#ffffff" />
  </g>

  <!-- Open Book (Bottom Left Quarter) -->
  <g transform="translate(52, 80) scale(0.65)">
    <path d="M 2 8 Q 12 4 20 8 Q 28 4 38 8 L 38 24 Q 28 20 20 24 Q 12 20 2 24 Z" fill="#ffffff" stroke="#f5c400" stroke-width="1" />
    <line x1="20" y1="8" x2="20" y2="24" stroke="#007fa3" stroke-width="1" />
    <line x1="5" y1="12" x2="17" y2="12" stroke="#007fa3" stroke-width="0.8" opacity="0.5" />
    <line x1="5" y1="15" x2="17" y2="15" stroke="#007fa3" stroke-width="0.8" opacity="0.5" />
    <line x1="5" y1="18" x2="17" y2="18" stroke="#007fa3" stroke-width="0.8" opacity="0.5" />
    <line x1="23" y1="12" x2="35" y2="12" stroke="#007fa3" stroke-width="0.8" opacity="0.5" />
    <line x1="23" y1="15" x2="35" y2="15" stroke="#007fa3" stroke-width="0.8" opacity="0.5" />
    <line x1="23" y1="18" x2="35" y2="18" stroke="#007fa3" stroke-width="0.8" opacity="0.5" />
  </g>

  <!-- Laurel / Atom STEM Symbol (Bottom Right Quarter) -->
  <g transform="translate(86, 78) scale(0.65)">
    <ellipse cx="14" cy="14" rx="12" ry="5" stroke="#ffd84d" stroke-width="1.2" fill="none" transform="rotate(30, 14, 14)" />
    <ellipse cx="14" cy="14" rx="12" ry="5" stroke="#ffd84d" stroke-width="1.2" fill="none" transform="rotate(-30, 14, 14)" />
    <circle cx="14" cy="14" r="2.5" fill="#ffffff" />
  </g>

  <!-- Laurel Wreath surrounding bottom of shield -->
  <path d="M 32 75 Q 36 112 80 126 Q 124 112 128 75" stroke="#d9a900" stroke-width="2.5" fill="none" stroke-linecap="round" />
  <circle cx="32" cy="75" r="2" fill="#d9a900" />
  <circle cx="128" cy="75" r="2" fill="#d9a900" />
  <circle cx="80" cy="126" r="3" fill="#f5c400" />

  <!-- Motto Ribbon Banner -->
  <g transform="translate(10, 126)">
    <path d="M 12 10 L 25 2 L 115 2 L 128 10 L 115 18 L 25 18 Z" fill="#007fa3" stroke="#f5c400" stroke-width="1.2" />
    <text x="70" y="13" font-family="'Inter', Arial, sans-serif" font-size="6.5" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">STRIVE FOR EXCELLENCE</text>
  </g>
</svg>
`;
}

// Official Circular Rubber Stamp (Blue/Purple Ink)
function getRubberStampSvg({ office = 'OFFICE OF THE CHIEF PRINCIPAL', date = 'JAN 2026', ref = 'APPROVED' } = {}) {
  return `
<svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: rotate(-6deg); opacity: 0.88;">
  <!-- Double ring border -->
  <circle cx="75" cy="75" r="70" stroke="#1d4ed8" stroke-width="3" stroke-dasharray="80,1,10,1" fill="#1d4ed8" fill-opacity="0.04"/>
  <circle cx="75" cy="75" r="64" stroke="#1d4ed8" stroke-width="1.2"/>
  <circle cx="75" cy="75" r="46" stroke="#1d4ed8" stroke-width="1.5"/>

  <!-- Curved Texts using SVG path -->
  <path id="stampUpperPath" d="M 20 75 A 55 55 0 0 1 130 75" fill="none" />
  <path id="stampLowerPath" d="M 130 75 A 55 55 0 0 1 20 75" fill="none" />

  <text font-family="'Courier New', monospace, sans-serif" font-size="8" font-weight="900" fill="#1d4ed8" letter-spacing="1">
    <textPath href="#stampUpperPath" startOffset="50%" text-anchor="middle">
      KALULINI BOYS HIGH SCHOOL
    </textPath>
  </text>

  <text font-family="'Courier New', monospace, sans-serif" font-size="7.5" font-weight="800" fill="#1d4ed8" letter-spacing="0.8">
    <textPath href="#stampLowerPath" startOffset="50%" text-anchor="middle">
      * ${office} *
    </textPath>
  </text>

  <!-- Center Content -->
  <g text-anchor="middle" font-family="'Courier New', monospace, sans-serif">
    <text x="75" y="65" font-size="7" font-weight="bold" fill="#1d4ed8">P.O. BOX 24 - 90130</text>
    <text x="75" y="76" font-size="9" font-weight="900" fill="#1d4ed8" letter-spacing="1">${date}</text>
    <text x="75" y="87" font-size="7.5" font-weight="bold" fill="#1d4ed8">${ref}</text>
  </g>
  
  <!-- Decorative Stars -->
  <text x="18" y="78" font-size="10" fill="#1d4ed8">★</text>
  <text x="126" y="78" font-size="10" fill="#1d4ed8">★</text>
</svg>
`;
}

// Finance Office Stamp (Violet Ink)
function getFinanceStampSvg({ date = '05 JAN 2026', ref = 'FEES VERIFIED' } = {}) {
  return `
<svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: rotate(4deg); opacity: 0.88;">
  <circle cx="75" cy="75" r="70" stroke="#6b21a8" stroke-width="2.8" fill="#6b21a8" fill-opacity="0.04"/>
  <circle cx="75" cy="75" r="63" stroke="#6b21a8" stroke-width="1.2"/>
  <circle cx="75" cy="75" r="44" stroke="#6b21a8" stroke-width="1.5" stroke-dasharray="4,2"/>

  <path id="finUpper" d="M 20 75 A 55 55 0 0 1 130 75" fill="none" />
  <path id="finLower" d="M 130 75 A 55 55 0 0 1 20 75" fill="none" />

  <text font-family="'Courier New', monospace, sans-serif" font-size="8" font-weight="900" fill="#6b21a8" letter-spacing="1">
    <textPath href="#finUpper" startOffset="50%" text-anchor="middle">
      KALULINI BOYS HIGH SCHOOL
    </textPath>
  </text>

  <text font-family="'Courier New', monospace, sans-serif" font-size="7" font-weight="800" fill="#6b21a8" letter-spacing="0.8">
    <textPath href="#finLower" startOffset="50%" text-anchor="middle">
      * BURSAR &amp; ACCOUNTS DEPT *
    </textPath>
  </text>

  <g text-anchor="middle" font-family="'Courier New', monospace, sans-serif">
    <text x="75" y="66" font-size="7" font-weight="bold" fill="#6b21a8">FINANCE OFFICE</text>
    <text x="75" y="77" font-size="8.5" font-weight="900" fill="#6b21a8">${date}</text>
    <text x="75" y="88" font-size="7.5" font-weight="900" fill="#6b21a8">${ref}</text>
  </g>
</svg>
`;
}

// Medical Clinical Stamp (Teal/Green Ink)
function getMedicalStampSvg({ date = 'JAN 2026', facility = 'KALULINI SUB-COUNTY HOSPITAL' } = {}) {
  return `
<svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: rotate(-3deg); opacity: 0.88;">
  <circle cx="75" cy="75" r="69" stroke="#047857" stroke-width="2.8" fill="#047857" fill-opacity="0.04"/>
  <circle cx="75" cy="75" r="62" stroke="#047857" stroke-width="1.2"/>
  <circle cx="75" cy="75" r="45" stroke="#047857" stroke-width="1.5"/>

  <path id="medUpper" d="M 20 75 A 55 55 0 0 1 130 75" fill="none" />
  <path id="medLower" d="M 130 75 A 55 55 0 0 1 20 75" fill="none" />

  <text font-family="'Courier New', monospace, sans-serif" font-size="7" font-weight="900" fill="#047857" letter-spacing="0.5">
    <textPath href="#medUpper" startOffset="50%" text-anchor="middle">
      ${facility}
    </textPath>
  </text>

  <text font-family="'Courier New', monospace, sans-serif" font-size="7" font-weight="800" fill="#047857" letter-spacing="0.8">
    <textPath href="#medLower" startOffset="50%" text-anchor="middle">
      * MEDICAL SUPERINTENDENT *
    </textPath>
  </text>

  <g text-anchor="middle" font-family="'Courier New', monospace, sans-serif">
    <text x="75" y="65" font-size="7" font-weight="bold" fill="#047857">CLINICAL EXAMINER</text>
    <text x="75" y="76" font-size="8.5" font-weight="900" fill="#047857">${date}</text>
    <text x="75" y="87" font-size="7" font-weight="900" fill="#047857">FIT FOR BOARDING</text>
  </g>
</svg>
`;
}

// Realistic Signatures in SVG
function getSignatureSvg(name, title) {
  // Artistic simulated cursive signature path
  return `
<div style="display: inline-block; text-align: left; min-width: 200px;">
  <svg width="180" height="45" viewBox="0 0 180 45" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M 10 32 C 25 10 35 8 45 28 C 50 36 55 12 70 20 C 85 28 100 8 115 22 C 125 30 135 15 155 25 C 165 30 170 22 175 20 M 35 25 L 140 25" 
      stroke="#1e3a8a" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
  <div style="border-top: 1.5px solid #1f1f1f; padding-top: 4px; font-size: 8.5pt; font-weight: bold; color: #1f1f1f; font-family: 'Inter', Arial, sans-serif;">
    ${name}
  </div>
  <div style="font-size: 7.5pt; color: #555555; font-family: 'Inter', Arial, sans-serif;">
    ${title}
  </div>
</div>
`;
}

module.exports = {
  SCHOOL_INFO,
  getSchoolCrestSvg,
  getRubberStampSvg,
  getFinanceStampSvg,
  getMedicalStampSvg,
  getSignatureSvg
};
