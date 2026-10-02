// scripts/shared/styles.js
// Shared CSS stylesheet for print-ready A4 Kenyan high school institutional documents

const BASE_STYLES = `
  @page {
    size: A4 portrait;
    margin: 12mm 14mm 14mm 14mm;
    @bottom-right {
      content: counter(page) " of " counter(pages);
    }
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    color: #1F1F1F;
    background: #ffffff;
    font-size: 9pt;
    line-height: 1.42;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* Page Break Utilities */
  .page-break {
    page-break-before: always;
  }
  .avoid-break {
    page-break-inside: avoid;
  }

  /* Institutional Letterhead */
  .letterhead {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    padding-bottom: 8px;
    position: relative;
  }
  .letterhead-crest {
    flex-shrink: 0;
  }
  .letterhead-text {
    flex: 1;
    text-align: center;
  }
  .letterhead-ministry {
    font-size: 7.5pt;
    font-weight: 800;
    letter-spacing: 1.2px;
    color: #475569;
    text-transform: uppercase;
    margin-bottom: 2px;
  }
  .letterhead-title {
    font-size: 17pt;
    font-weight: 900;
    color: #0b4558;
    letter-spacing: 0.8px;
    line-height: 1.15;
    margin: 2px 0;
    text-transform: uppercase;
  }
  .letterhead-subtitle {
    font-size: 8.5pt;
    font-weight: 700;
    color: #b45309;
    text-transform: uppercase;
    letter-spacing: 0.8px;
  }
  .letterhead-motto {
    font-size: 8pt;
    font-weight: 800;
    color: #007fa3;
    letter-spacing: 1px;
    margin: 3px 0;
    font-style: italic;
  }
  .letterhead-contacts {
    font-size: 7.5pt;
    color: #475569;
    line-height: 1.35;
    margin-top: 3px;
  }
  .letterhead-rule {
    height: 3px;
    background: linear-gradient(90deg, #007fa3 0%, #00BFFF 50%, #f5c400 100%);
    margin-top: 6px;
    margin-bottom: 12px;
  }

  /* Document Meta Header Box */
  .doc-meta-banner {
    background: #f8fafc;
    border: 1.5px solid #cbd5e1;
    border-left: 5px solid #007fa3;
    padding: 8px 12px;
    margin-bottom: 14px;
    border-radius: 4px;
  }
  .doc-title-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
  }
  .doc-main-title {
    font-size: 12pt;
    font-weight: 900;
    color: #0b4558;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    line-height: 1.25;
  }
  .doc-subtitle-text {
    font-size: 8pt;
    color: #475569;
    margin-top: 2px;
  }
  .doc-meta-tags {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
    flex-shrink: 0;
  }
  .doc-meta-badge {
    display: inline-block;
    padding: 2px 7px;
    font-size: 7pt;
    font-weight: 800;
    border-radius: 3px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .badge-ref {
    background: #0b4558;
    color: #ffffff;
  }
  .badge-date {
    background: #f1f5f9;
    color: #334155;
    border: 1px solid #cbd5e1;
  }

  /* Section Headings */
  .section-heading {
    font-size: 10pt;
    font-weight: 800;
    color: #0b4558;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 1.5px solid #007fa3;
    padding-bottom: 3px;
    margin-top: 12px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .section-num {
    background: #007fa3;
    color: #ffffff;
    font-size: 7.5pt;
    padding: 1px 6px;
    border-radius: 3px;
    margin-right: 6px;
  }

  /* Tables */
  table.doc-table {
    width: 100%;
    border-collapse: collapse;
    margin: 8px 0 12px 0;
    font-size: 8pt;
    page-break-inside: avoid;
  }
  table.doc-table th {
    background: #0b4558;
    color: #ffffff;
    font-weight: 800;
    text-align: left;
    padding: 5px 7px;
    font-size: 7.5pt;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    border: 1px solid #07536a;
  }
  table.doc-table td {
    padding: 4.5px 7px;
    border: 1px solid #cbd5e1;
    color: #1f1f1f;
  }
  table.doc-table tr:nth-child(even) td {
    background: #f8fafc;
  }
  table.doc-table tr.total-row td {
    background: #eafaff;
    font-weight: 900;
    color: #07536a;
    border-top: 2px solid #007fa3;
    border-bottom: 2px solid #007fa3;
  }

  /* Form Fields & Grids */
  .form-grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px 14px;
    margin: 8px 0;
  }
  .form-grid-3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px 12px;
    margin: 8px 0;
  }
  .form-field {
    margin-bottom: 6px;
  }
  .field-label {
    font-size: 7.5pt;
    font-weight: 700;
    color: #334155;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    margin-bottom: 2px;
  }
  .field-box {
    border: 1px solid #94a3b8;
    background: #ffffff;
    height: 22px;
    border-radius: 2px;
    padding: 2px 6px;
    font-size: 8pt;
    display: flex;
    align-items: center;
  }
  .field-line {
    border-bottom: 1px dashed #64748b;
    height: 18px;
    display: flex;
    align-items: flex-end;
    font-size: 8pt;
    color: #334155;
    padding-bottom: 1px;
  }

  /* Checkbox styling */
  .checkbox-item {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 8pt;
  }
  .check-square {
    display: inline-block;
    width: 11px;
    height: 11px;
    border: 1.5px solid #334155;
    border-radius: 2px;
    flex-shrink: 0;
  }

  /* Callout & Notice Boxes */
  .notice-box {
    background: #fffbea;
    border: 1.5px solid #ffd84d;
    border-left: 4px solid #f5c400;
    padding: 8px 12px;
    border-radius: 4px;
    margin: 8px 0;
    font-size: 8pt;
    color: #583b00;
  }
  .notice-box strong {
    color: #321f00;
  }

  .info-box {
    background: #eafaff;
    border: 1.5px solid #66dcff;
    border-left: 4px solid #007fa3;
    padding: 8px 12px;
    border-radius: 4px;
    margin: 8px 0;
    font-size: 8pt;
    color: #07536a;
  }

  /* Official Stamping & Sign-off Zone */
  .sign-off-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 14px;
    padding-top: 10px;
    border-top: 1px solid #cbd5e1;
    page-break-inside: avoid;
  }

  /* Running Header & Footers */
  .running-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #cbd5e1;
    padding-bottom: 4px;
    margin-bottom: 10px;
    font-size: 7.5pt;
    color: #64748b;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .running-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #cbd5e1;
    padding-top: 4px;
    margin-top: 12px;
    font-size: 7pt;
    color: #64748b;
  }
`;

module.exports = {
  BASE_STYLES
};
