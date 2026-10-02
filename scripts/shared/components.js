// scripts/shared/components.js
const fs = require('fs');
const path = require('path');
const {
  SCHOOL_INFO,
  getSchoolCrestSvg,
  getRubberStampSvg,
  getFinanceStampSvg,
  getMedicalStampSvg,
  getSignatureSvg
} = require('./assets');

// Helper to get base64 data URI of a local image asset
function getLocalImageBase64(filename) {
  const filepath = path.join(__dirname, '..', 'assets', 'images', filename);
  if (fs.existsSync(filepath)) {
    const ext = path.extname(filename).toLowerCase().replace('.', '');
    const mime = ext === 'png' ? 'image/png' : 'image/jpeg';
    const buf = fs.readFileSync(filepath);
    return `data:${mime};base64,${buf.toString('base64')}`;
  }
  return '';
}

// Render the primary institutional letterhead
function renderLetterhead({ showCrest = true } = {}) {
  return `
  <div class="letterhead">
    ${showCrest ? `<div class="letterhead-crest">${getSchoolCrestSvg(85, 85)}</div>` : ''}
    <div class="letterhead-text">
      <div class="letterhead-ministry">${SCHOOL_INFO.ministry}</div>
      <div class="letterhead-title">${SCHOOL_INFO.name}</div>
      <div class="letterhead-subtitle">${SCHOOL_INFO.subTitle}</div>
      <div class="letterhead-motto">&ldquo;${SCHOOL_INFO.motto}&rdquo;</div>
      <div class="letterhead-contacts">
        ${SCHOOL_INFO.poBox} &bull; Tel: ${SCHOOL_INFO.phone}<br/>
        Email: ${SCHOOL_INFO.email} &bull; Website: ${SCHOOL_INFO.website}
      </div>
    </div>
  </div>
  <div class="letterhead-rule"></div>
  `;
}

// Render running sub-header for pages 2+
function renderRunningHeader(title, refNo) {
  return `
  <div class="running-header">
    <span>KALULINI BOYS HIGH SCHOOL &bull; ${title}</span>
    <span>REF: ${refNo}</span>
  </div>
  `;
}

// Render document metadata title block
function renderDocHeader({
  title,
  subTitle = '',
  refNo,
  issueDate = 'January 2026',
  version = 'Rev. 2026.1',
  category = 'Official Publication'
}) {
  return `
  <div class="doc-meta-banner">
    <div class="doc-title-row">
      <div>
        <h1 class="doc-main-title">${title}</h1>
        ${subTitle ? `<p class="doc-subtitle-text">${subTitle}</p>` : ''}
      </div>
      <div class="doc-meta-tags">
        <span class="doc-meta-badge badge-ref">REF: ${refNo}</span>
        <span class="doc-meta-badge badge-date">DATE: ${issueDate}</span>
        <span class="doc-meta-badge badge-date">VER: ${version}</span>
      </div>
    </div>
  </div>
  `;
}

// Render page-level footer
function renderPageFooter(refNo) {
  return `
  <div class="running-footer">
    <span>KALULINI BOYS HIGH SCHOOL &bull; CONFIDENTIAL &amp; PROPRIETARY</span>
    <span>REF: ${refNo}</span>
  </div>
  `;
}

module.exports = {
  SCHOOL_INFO,
  getLocalImageBase64,
  renderLetterhead,
  renderRunningHeader,
  renderDocHeader,
  renderPageFooter,
  getSchoolCrestSvg,
  getRubberStampSvg,
  getFinanceStampSvg,
  getMedicalStampSvg,
  getSignatureSvg
};
