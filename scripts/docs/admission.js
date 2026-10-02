// scripts/docs/admission.js
const {
  renderLetterhead,
  renderRunningHeader,
  renderDocHeader,
  getLocalImageBase64,
  getRubberStampSvg,
  getSignatureSvg,
  SCHOOL_INFO
} = require('../shared/components');

function generateAdmissionHtml() {
  const campusImg = getLocalImageBase64('campus-main.jpg');

  return `
  <!-- PAGE 1: ADMISSION OFFER LETTER & INSTRUCTIONS -->
  <div class="page-container">
    ${renderLetterhead({ showCrest: true })}
    ${renderDocHeader({
      title: 'Form 1 Direct Admission Application Package',
      subTitle: 'Official Enrolment Dossier, Student Registration Form & Undertaking — 2026 Cohort',
      refNo: 'KBHS/ADM/2026/003',
      issueDate: 'January 2026',
      version: 'Rev. 2026.1',
      category: 'Admissions'
    })}

    <div style="display: flex; gap: 12px; margin-bottom: 10px;">
      <div style="flex: 1; border: 1.5px solid #007fa3; border-radius: 4px; padding: 10px; background: #f8fafc;">
        <div style="font-size: 8.5pt; font-weight: 800; color: #0b4558; text-transform: uppercase;">Letter of Provisional Admission Offer</div>
        <p style="font-size: 7.5pt; color: #334155; margin-top: 4px; line-height: 1.45;">
          Dear Candidate and Respected Parent/Guardian,<br/>
          I have the distinct honor and pleasure to inform you that you have been provisionally selected for admission to <strong>Kalulini Boys High School</strong> for Form 1 in the 2026 Academic Year. Admission is granted on merit, disciplined conduct, and compliance with all institutional regulations ratified by the Ministry of Education.
        </p>
      </div>

      <div style="width: 110px; height: 130px; border: 1.5px dashed #007fa3; border-radius: 4px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 4px; background: #ffffff; flex-shrink: 0;">
        <span style="font-size: 6.5pt; color: #64748b; font-weight: bold;">AFFIX RECENT PASSPORT PHOTO HERE</span>
        <span style="font-size: 6pt; color: #94a3b8; margin-top: 2px;">(Red background, in previous school uniform)</span>
      </div>
    </div>

    <div class="section-heading">
      <span><span class="section-num">A</span> Applicant's Personal Biodata</span>
      <span style="font-size: 7pt; color: #64748b;">Block Capitals Only</span>
    </div>

    <div class="form-grid-2">
      <div class="form-field">
        <div class="field-label">Student Surname:</div>
        <div class="field-box"></div>
      </div>
      <div class="form-field">
        <div class="field-label">First &amp; Middle Names:</div>
        <div class="field-box"></div>
      </div>
    </div>

    <div class="form-grid-3">
      <div class="form-field">
        <div class="field-label">Date of Birth (DD/MM/YYYY):</div>
        <div class="field-box"></div>
      </div>
      <div class="form-field">
        <div class="field-label">Birth Certificate Entry No:</div>
        <div class="field-box"></div>
      </div>
      <div class="form-field">
        <div class="field-label">NEMIS UPI Number:</div>
        <div class="field-box"></div>
      </div>
    </div>

    <div class="form-grid-3">
      <div class="form-field">
        <div class="field-label">County of Origin:</div>
        <div class="field-box"></div>
      </div>
      <div class="form-field">
        <div class="field-label">Sub-County:</div>
        <div class="field-box"></div>
      </div>
      <div class="form-field">
        <div class="field-label">Religious Affiliation:</div>
        <div class="field-box"></div>
      </div>
    </div>

    <div class="section-heading" style="margin-top: 10px;">
      <span><span class="section-num">B</span> Primary School Academic Background &amp; Examination Record</span>
      <span style="font-size: 7pt; color: #64748b;">KCPE / KPSEA Assessment</span>
    </div>

    <div class="form-grid-2">
      <div class="form-field">
        <div class="field-label">Primary School Attended:</div>
        <div class="field-box"></div>
      </div>
      <div class="form-field">
        <div class="field-label">KNEC Primary School Code:</div>
        <div class="field-box"></div>
      </div>
    </div>

    <div class="form-grid-3">
      <div class="form-field">
        <div class="field-label">KCPE / KPSEA Index Number:</div>
        <div class="field-box"></div>
      </div>
      <div class="form-field">
        <div class="field-label">Year of Examination:</div>
        <div class="field-box"></div>
      </div>
      <div class="form-field">
        <div class="field-label">Total Aggregate Marks:</div>
        <div class="field-box"></div>
      </div>
    </div>

    <table class="doc-table" style="margin-top: 6px;">
      <thead>
        <tr>
          <th>Subject Area</th>
          <th style="text-align: center;">English</th>
          <th style="text-align: center;">Kiswahili</th>
          <th style="text-align: center;">Mathematics</th>
          <th style="text-align: center;">Science</th>
          <th style="text-align: center;">Social Studies &amp; RE</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Marks / Performance Level</strong></td>
          <td style="text-align: center; height: 20px;"></td>
          <td style="text-align: center;"></td>
          <td style="text-align: center;"></td>
          <td style="text-align: center;"></td>
          <td style="text-align: center;"></td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- PAGE 2: PARENT/GUARDIAN PARTICULARS & DECLARATION -->
  <div class="page-break"></div>
  <div class="page-container">
    ${renderRunningHeader('Form 1 Direct Admission Application Package', 'KBHS/ADM/2026/003')}

    <div class="section-heading">
      <span><span class="section-num">C</span> Parent / Legal Guardian Particulars</span>
      <span style="font-size: 7pt; color: #64748b;">Official Contact Record</span>
    </div>

    <div style="font-size: 7.5pt; font-weight: bold; color: #0b4558; margin: 4px 0;">1. FATHER / GUARDIAN (1) DETAILS:</div>
    <div class="form-grid-2">
      <div class="form-field">
        <div class="field-label">Full Legal Name:</div>
        <div class="field-box"></div>
      </div>
      <div class="form-field">
        <div class="field-label">National Identity Card No (ID):</div>
        <div class="field-box"></div>
      </div>
    </div>
    <div class="form-grid-3">
      <div class="form-field">
        <div class="field-label">Occupation / Profession:</div>
        <div class="field-box"></div>
      </div>
      <div class="form-field">
        <div class="field-label">Primary Mobile Phone [PHONE]:</div>
        <div class="field-box"></div>
      </div>
      <div class="form-field">
        <div class="field-label">Alternative Phone [PHONE]:</div>
        <div class="field-box"></div>
      </div>
    </div>
    <div class="form-grid-2">
      <div class="form-field">
        <div class="field-label">Postal Address [PO BOX]:</div>
        <div class="field-box"></div>
      </div>
      <div class="form-field">
        <div class="field-label">Physical Residential Address:</div>
        <div class="field-box"></div>
      </div>
    </div>

    <div style="font-size: 7.5pt; font-weight: bold; color: #0b4558; margin: 8px 0 4px 0;">2. MOTHER / GUARDIAN (2) DETAILS:</div>
    <div class="form-grid-2">
      <div class="form-field">
        <div class="field-label">Full Legal Name:</div>
        <div class="field-box"></div>
      </div>
      <div class="form-field">
        <div class="field-label">National Identity Card No (ID):</div>
        <div class="field-box"></div>
      </div>
    </div>
    <div class="form-grid-3">
      <div class="form-field">
        <div class="field-label">Occupation / Profession:</div>
        <div class="field-box"></div>
      </div>
      <div class="form-field">
        <div class="field-label">Primary Mobile Phone [PHONE]:</div>
        <div class="field-box"></div>
      </div>
      <div class="form-field">
        <div class="field-label">Email Address:</div>
        <div class="field-box"></div>
      </div>
    </div>

    <div class="section-heading" style="margin-top: 10px;">
      <span><span class="section-num">D</span> Emergency Contact Person (Other than Parents)</span>
      <span style="font-size: 7pt; color: #64748b;">Secondary Next of Kin</span>
    </div>

    <div class="form-grid-3">
      <div class="form-field">
        <div class="field-label">Contact Person Name:</div>
        <div class="field-box"></div>
      </div>
      <div class="form-field">
        <div class="field-label">Relationship to Student:</div>
        <div class="field-box"></div>
      </div>
      <div class="form-field">
        <div class="field-label">Emergency Phone [PHONE]:</div>
        <div class="field-box"></div>
      </div>
    </div>

    <div class="section-heading" style="margin-top: 12px;">
      <span><span class="section-num">E</span> Student &amp; Parent Solemn Commitment Undertaking</span>
      <span style="font-size: 7pt; color: #64748b;">Legal Covenant</span>
    </div>

    <div style="font-size: 7.5pt; color: #334155; line-height: 1.45; background: #f8fafc; border: 1px solid #cbd5e1; padding: 8px; border-radius: 4px;">
      <p style="margin-bottom: 4px;">
        <strong>Student Declaration:</strong> I, the undersigned applicant, solemnly pledge that if admitted to Kalulini Boys High School, I will faithfully uphold all institutional rules, apply myself diligently to my studies, respect my teachers and student leaders, preserve school property, and conduct myself with honor and discipline.
      </p>
      <div style="display: flex; justify-content: space-between; margin-top: 8px;">
        <span style="font-size: 7.5pt;">Candidate Signature: _______________________</span>
        <span style="font-size: 7.5pt;">Date: _______________________</span>
      </div>
      <hr style="margin: 8px 0; border: none; border-top: 1px dashed #cbd5e1;" />
      <p style="margin-bottom: 4px;">
        <strong>Parent/Guardian Declaration:</strong> I certify that all particulars provided herein are correct. I undertake to support my son, ensure timely clearance of approved school fees, attend all mandatory school forums, and partner with the administration in his moral and academic formation.
      </p>
      <div style="display: flex; justify-content: space-between; margin-top: 8px;">
        <span style="font-size: 7.5pt;">Parent/Guardian Signature: _______________________</span>
        <span style="font-size: 7.5pt;">Date: _______________________</span>
      </div>
    </div>
  </div>

  <!-- PAGE 3: CHECKLIST & OFFICIAL CLEARING DESK -->
  <div class="page-break"></div>
  <div class="page-container">
    ${renderRunningHeader('Form 1 Direct Admission Application Package', 'KBHS/ADM/2026/003')}

    <div class="section-heading">
      <span><span class="section-num">F</span> Mandatory Enrolment Document Checklist</span>
      <span style="font-size: 7pt; color: #64748b;">Verification Protocol</span>
    </div>

    <p style="font-size: 7.5pt; color: #334155; margin-bottom: 8px;">
      Prospective scholars must physically present the original and certified copies of the following documents to the Admissions Verification Desk on reporting day:
    </p>

    <table class="doc-table">
      <thead>
        <tr>
          <th style="width: 5%;">No</th>
          <th style="width: 65%;">Required Enrolment Document</th>
          <th style="width: 15%; text-align: center;">Applicant Check</th>
          <th style="width: 15%; text-align: center;">Official Verified</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Original KCPE / KPSEA Result Slip and 2 photocopies certified by Primary Headteacher</td>
          <td style="text-align: center;"><div class="check-square"></div></td>
          <td style="text-align: center;"><div class="check-square"></div></td>
        </tr>
        <tr>
          <td>2</td>
          <td>Certified Copy of Birth Certificate (Official Registrar of Births)</td>
          <td style="text-align: center;"><div class="check-square"></div></td>
          <td style="text-align: center;"><div class="check-square"></div></td>
        </tr>
        <tr>
          <td>3</td>
          <td>Four (4) Recent Colored Passport-size Photographs (with candidate name on reverse)</td>
          <td style="text-align: center;"><div class="check-square"></div></td>
          <td style="text-align: center;"><div class="check-square"></div></td>
        </tr>
        <tr>
          <td>4</td>
          <td>Duly completed and officially stamped Student Medical Clearance Form</td>
          <td style="text-align: center;"><div class="check-square"></div></td>
          <td style="text-align: center;"><div class="check-square"></div></td>
        </tr>
        <tr>
          <td>5</td>
          <td>Primary School Leaving Certificate / Character Testimonial</td>
          <td style="text-align: center;"><div class="check-square"></div></td>
          <td style="text-align: center;"><div class="check-square"></div></td>
        </tr>
        <tr>
          <td>6</td>
          <td>Photocopies of National Identity Cards (ID) for both Father and Mother / Legal Guardian</td>
          <td style="text-align: center;"><div class="check-square"></div></td>
          <td style="text-align: center;"><div class="check-square"></div></td>
        </tr>
        <tr>
          <td>7</td>
          <td>Bank Deposit Slip / Official Bank Receipt for Term 1 Fees Clearance</td>
          <td style="text-align: center;"><div class="check-square"></div></td>
          <td style="text-align: center;"><div class="check-square"></div></td>
        </tr>
      </tbody>
    </table>

    <div class="section-heading" style="margin-top: 14px;">
      <span><span class="section-num">G</span> For Official Institutional Use Only</span>
      <span style="font-size: 7pt; color: #64748b;">Admissions Committee Clearance</span>
    </div>

    <div style="border: 2px solid #0b4558; border-radius: 4px; padding: 10px; background: #f8fafc; margin-top: 8px;">
      <div class="form-grid-3">
        <div class="form-field">
          <div class="field-label">Admission Number Allocated:</div>
          <div class="field-box" style="font-weight: bold; color: #0b4558;">KBHS/4</div>
        </div>
        <div class="form-field">
          <div class="field-label">Assigned Boarding House:</div>
          <div class="field-box">[Simba / Chui / Kifaru / Twiga]</div>
        </div>
        <div class="form-field">
          <div class="field-label">Assigned Class Stream:</div>
          <div class="field-box">[East / West / North / Central]</div>
        </div>
      </div>

      <div class="form-grid-2" style="margin-top: 8px;">
        <div class="form-field">
          <div class="field-label">Verification Officer Name &amp; Signature:</div>
          <div class="field-line"></div>
        </div>
        <div class="form-field">
          <div class="field-label">Verification Remarks:</div>
          <div class="field-line">[All originals authenticated]</div>
        </div>
      </div>

      <div class="sign-off-container" style="margin-top: 12px; border-top: 1px solid #cbd5e1; padding-top: 8px;">
        <div>
          ${getSignatureSvg('Dr. Josephat M. Ndambuki, Ph.D.', 'Chief Principal & Secretary to BOM')}
        </div>
        <div>
          ${getRubberStampSvg({ office: 'ADMISSIONS & REGISTRATION DESK', date: 'JAN 2026', ref: 'FORM 1 ENROLLED' })}
        </div>
      </div>
    </div>
  </div>
  `;
}

module.exports = {
  generateAdmissionHtml
};
