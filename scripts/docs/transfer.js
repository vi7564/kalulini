// scripts/docs/transfer.js
const {
  renderLetterhead,
  renderRunningHeader,
  renderDocHeader,
  getRubberStampSvg,
  getSignatureSvg,
  SCHOOL_INFO
} = require('../shared/components');

function generateTransferHtml() {
  return `
  <!-- PAGE 1: APPLICANT PARTICULARS & PREVIOUS SCHOOL RECORD -->
  <div class="page-container">
    ${renderLetterhead({ showCrest: true })}
    ${renderDocHeader({
      title: 'Transfer Student Assessment Form (Forms 2 & 3)',
      subTitle: 'Special Admissions Dossier for Direct Placement under Ministry of Education NEMIS Guidelines',
      refNo: 'KBHS/ADM/2026/008',
      issueDate: 'January 2026',
      version: 'Rev. 2026.1',
      category: 'Admissions'
    })}

    <div class="info-box">
      <strong>INTER-SCHOOL TRANSFER PROTOCOL:</strong> Inter-institutional transfer to Kalulini Boys High School is strictly subject to available class capacity, authenticated academic transcripts from the releasing school, flawless disciplinary record, and approval from the Sub-County Director of Education.
    </div>

    <div class="section-heading">
      <span><span class="section-num">01</span> Student Personal Particulars &amp; Transfer Request</span>
      <span style="font-size: 7pt; color: #64748b;">Bio-Data</span>
    </div>

    <div class="form-grid-3">
      <div class="form-field">
        <div class="field-label">Student Full Legal Name:</div>
        <div class="field-box"></div>
      </div>
      <div class="form-field">
        <div class="field-label">NEMIS Unique Personal Identifier (UPI):</div>
        <div class="field-box"></div>
      </div>
      <div class="form-field">
        <div class="field-label">Date of Birth (DD/MM/YYYY):</div>
        <div class="field-box"></div>
      </div>
    </div>

    <div class="form-grid-3">
      <div class="form-field">
        <div class="field-label">Form Applied For:</div>
        <div class="field-box">[Form 2 / Form 3]</div>
      </div>
      <div class="form-field">
        <div class="field-label">KCPE Index Number:</div>
        <div class="field-box"></div>
      </div>
      <div class="form-field">
        <div class="field-label">KCPE Total Marks Obtained:</div>
        <div class="field-box"></div>
      </div>
    </div>

    <div class="section-heading" style="margin-top: 10px;">
      <span><span class="section-num">02</span> Releasing Secondary School Academic Information</span>
      <span style="font-size: 7pt; color: #64748b;">Current Institution</span>
    </div>

    <div class="form-grid-2">
      <div class="form-field">
        <div class="field-label">Current / Releasing Secondary School Name:</div>
        <div class="field-box"></div>
      </div>
      <div class="form-field">
        <div class="field-label">County &amp; Sub-County of Releasing School:</div>
        <div class="field-box"></div>
      </div>
    </div>

    <div class="form-grid-2">
      <div class="form-field">
        <div class="field-label">Current Student Admission Number:</div>
        <div class="field-box"></div>
      </div>
      <div class="form-field">
        <div class="field-label">Specific Justification / Reason for Transfer:</div>
        <div class="field-box">[Family Relocation / Proximity / Academic]</div>
      </div>
    </div>

    <div class="section-heading" style="margin-top: 10px;">
      <span><span class="section-num">03</span> Subject Placement &amp; Academic Competency History</span>
      <span style="font-size: 7pt; color: #64748b;">Prior Term Report Matrix</span>
    </div>

    <table class="doc-table">
      <thead>
        <tr>
          <th style="width: 25%;">Subject Title</th>
          <th style="width: 15%; text-align: center;">Term 1 Grade</th>
          <th style="width: 15%; text-align: center;">Term 2 Grade</th>
          <th style="width: 15%; text-align: center;">Term 3 Grade</th>
          <th style="width: 30%;">Teacher Remarks / Competency Level</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Mathematics</strong></td>
          <td style="text-align: center;"></td>
          <td style="text-align: center;"></td>
          <td style="text-align: center;"></td>
          <td>Sound algebraic foundations; problem solving.</td>
        </tr>
        <tr>
          <td><strong>English</strong></td>
          <td style="text-align: center;"></td>
          <td style="text-align: center;"></td>
          <td style="text-align: center;"></td>
          <td>Proficient in grammar and literature analysis.</td>
        </tr>
        <tr>
          <td><strong>Kiswahili</strong></td>
          <td style="text-align: center;"></td>
          <td style="text-align: center;"></td>
          <td style="text-align: center;"></td>
          <td>Ustadi mzuri katika insha na sarufi.</td>
        </tr>
        <tr>
          <td><strong>Biology</strong></td>
          <td style="text-align: center;"></td>
          <td style="text-align: center;"></td>
          <td style="text-align: center;"></td>
          <td>Good laboratory drawing and theory grasp.</td>
        </tr>
        <tr>
          <td><strong>Chemistry</strong></td>
          <td style="text-align: center;"></td>
          <td style="text-align: center;"></td>
          <td style="text-align: center;"></td>
          <td>Demonstrates strong chemical reaction knowledge.</td>
        </tr>
        <tr>
          <td><strong>Physics</strong></td>
          <td style="text-align: center;"></td>
          <td style="text-align: center;"></td>
          <td style="text-align: center;"></td>
          <td>Solid grasp of mechanics and measurement principles.</td>
        </tr>
        <tr>
          <td><strong>Humanities (Hist/Geo/CRE)</strong></td>
          <td style="text-align: center;"></td>
          <td style="text-align: center;"></td>
          <td style="text-align: center;"></td>
          <td>Consistent scores in social science subjects.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- PAGE 2: CONDUCT REPORT, PANEL EVALUATION & APPROVAL -->
  <div class="page-break"></div>
  <div class="page-container">
    ${renderRunningHeader('Transfer Student Assessment Form (Forms 2 & 3)', 'KBHS/ADM/2026/008')}

    <div class="section-heading">
      <span><span class="section-num">04</span> Confidential Conduct &amp; Discipline Report by Releasing Principal</span>
      <span style="font-size: 7pt; color: #64748b;">To be Stamped by Current School</span>
    </div>

    <p style="font-size: 7.5pt; color: #334155; margin-bottom: 6px;">
      <em>The Principal of the school releasing the candidate must candidly evaluate the student&apos;s conduct below:</em>
    </p>

    <div class="form-grid-3">
      <div class="form-field">
        <div class="field-label">General Conduct &amp; Morality:</div>
        <div class="field-box">[Exemplary / Very Good / Fair]</div>
      </div>
      <div class="form-field">
        <div class="field-label">Class Attendance &amp; Punctuality:</div>
        <div class="field-box">[98% Attendance]</div>
      </div>
      <div class="form-field">
        <div class="field-label">Co-Curricular Participation:</div>
        <div class="field-box">[Rugby / Drama / Science Club]</div>
      </div>
    </div>

    <div class="form-field" style="margin-top: 6px;">
      <div class="field-label">Has the student ever been involved in any gross indiscipline, suspension, or drug infractions?</div>
      <div class="field-box">[NO. Clean disciplinary record during tenure at our school.]</div>
    </div>

    <div class="form-grid-2" style="margin-top: 8px;">
      <div class="form-field">
        <div class="field-label">Releasing Principal's Name &amp; Signature:</div>
        <div class="field-line"></div>
      </div>
      <div class="form-field">
        <div class="field-label">Official Releasing School Rubber Stamp:</div>
        <div style="height: 40px; border: 1px dashed #94a3b8; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 6.5pt; color: #64748b;">
          [AFFIX RELEASING SCHOOL RUBBER STAMP HERE]
        </div>
      </div>
    </div>

    <div class="section-heading" style="margin-top: 14px;">
      <span><span class="section-num">05</span> Kalulini Entrance Assessment Panel Evaluation</span>
      <span style="font-size: 7pt; color: #64748b;">Internal Assessment</span>
    </div>

    <table class="doc-table">
      <thead>
        <tr>
          <th>Evaluation Segment</th>
          <th style="text-align: center;">Max Score</th>
          <th style="text-align: center;">Score Obtained</th>
          <th>Assessment Panel Remarks</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Paper 1: Mathematics Competency</strong></td>
          <td style="text-align: center;">50</td>
          <td style="text-align: center;"><strong>42</strong></td>
          <td>Demonstrates strong problem-solving proficiency.</td>
        </tr>
        <tr>
          <td><strong>Paper 2: English Language Aptitude</strong></td>
          <td style="text-align: center;">50</td>
          <td style="text-align: center;"><strong>39</strong></td>
          <td>Good composition style and reading comprehension.</td>
        </tr>
        <tr>
          <td><strong>Paper 3: Integrated Science Test</strong></td>
          <td style="text-align: center;">50</td>
          <td style="text-align: center;"><strong>44</strong></td>
          <td>High aptitude in Physics and Chemistry experiments.</td>
        </tr>
        <tr>
          <td><strong>Oral Interview &amp; Character Panel</strong></td>
          <td style="text-align: center;">50</td>
          <td style="text-align: center;"><strong>45</strong></td>
          <td>Confident, polite demeanor; articulates clear goals.</td>
        </tr>
        <tr class="total-row">
          <td><strong>COMPOSITE SELECTION SCORE</strong></td>
          <td style="text-align: center;"><strong>200</strong></td>
          <td style="text-align: center; color: #007fa3;"><strong>170 / 200 (85%)</strong></td>
          <td><strong>RECOMMENDED FOR FULL ADMISSION</strong></td>
        </tr>
      </tbody>
    </table>

    <div class="section-heading" style="margin-top: 12px;">
      <span><span class="section-num">06</span> Final Approval by Kalulini Boys Admissions Board</span>
      <span style="font-size: 7pt; color: #64748b;">Institutional Ratification</span>
    </div>

    <div class="sign-off-container" style="margin-top: 10px;">
      <div>
        ${getSignatureSvg('Mrs. Florence Nduku', 'Chairperson, Transfer Admissions Committee')}
      </div>
      <div>
        ${getSignatureSvg('Dr. Josephat M. Ndambuki, Ph.D.', 'Chief Principal & Secretary to BOM')}
      </div>
      <div>
        ${getRubberStampSvg({ office: 'SPECIAL ADMISSIONS & ENROLMENT COMMITTEE', date: 'JAN 2026', ref: 'TRANSFER APPROVED' })}
      </div>
    </div>
  </div>
  `;
}

module.exports = {
  generateTransferHtml
};
