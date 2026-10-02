// scripts/docs/fees.js
const {
  renderLetterhead,
  renderRunningHeader,
  renderDocHeader,
  getFinanceStampSvg,
  getSignatureSvg,
  SCHOOL_INFO
} = require('../shared/components');

function generateFeesHtml() {
  return `
  <!-- PAGE 1: FEES SCHEDULE VOTE-HEADS -->
  <div class="page-container">
    ${renderLetterhead({ showCrest: true })}
    ${renderDocHeader({
      title: 'Official Boarding Fees Structure Schedule 2026',
      subTitle: 'Approved Financial Circular for Continuing Students & Incoming Form 1 Scholars',
      refNo: 'KBHS/FIN/2026/002',
      issueDate: '5th January 2026',
      version: 'Rev. 2026.1',
      category: 'Finance'
    })}

    <div class="info-box">
      <strong>DIRECTORATE OF FINANCE &amp; ACCOUNTS NOTICE:</strong> This fee schedule is ratified by the Board of Management (BOM) in strict accordance with Ministry of Education gazetted circulars for Extra-County Public Boarding Secondary Schools. All fees are quoted in Kenya Shillings (KES).
    </div>

    <div class="section-heading">
      <span><span class="section-num">01</span> Standard Boarding &amp; Institutional Levies Breakdown (Per Term)</span>
      <span style="font-size: 7pt; color: #64748b;">Academic Year 2026</span>
    </div>

    <table class="doc-table">
      <thead>
        <tr>
          <th style="width: 5%;">No</th>
          <th style="width: 35%;">Vote Head / Account Category</th>
          <th style="width: 15%; text-align: right;">Term 1 (50%)</th>
          <th style="width: 15%; text-align: right;">Term 2 (30%)</th>
          <th style="width: 15%; text-align: right;">Term 3 (20%)</th>
          <th style="width: 15%; text-align: right;">Annual Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td><strong>Government Capitation (Tuition &amp; Learning)</strong></td>
          <td style="text-align: right; color: #047857;">[Govt Paid]</td>
          <td style="text-align: right; color: #047857;">[Govt Paid]</td>
          <td style="text-align: right; color: #047857;">[Govt Paid]</td>
          <td style="text-align: right; color: #047857;"><strong>[Subsidized]</strong></td>
        </tr>
        <tr>
          <td>2</td>
          <td>Boarding Operation, Accommodation &amp; Catering</td>
          <td style="text-align: right;">KES 16,100</td>
          <td style="text-align: right;">KES 9,660</td>
          <td style="text-align: right;">KES 6,440</td>
          <td style="text-align: right;">KES 32,200</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Repairs, Maintenance &amp; Improvement (RMI)</td>
          <td style="text-align: right;">KES 1,800</td>
          <td style="text-align: right;">KES 1,080</td>
          <td style="text-align: right;">KES 720</td>
          <td style="text-align: right;">KES 3,600</td>
        </tr>
        <tr>
          <td>4</td>
          <td>Local Transport &amp; Travel (LTT)</td>
          <td style="text-align: right;">KES 900</td>
          <td style="text-align: right;">KES 540</td>
          <td style="text-align: right;">KES 360</td>
          <td style="text-align: right;">KES 1,800</td>
        </tr>
        <tr>
          <td>5</td>
          <td>Administrative Costs &amp; Support Staff Wages</td>
          <td style="text-align: right;">KES 1,950</td>
          <td style="text-align: right;">KES 1,170</td>
          <td style="text-align: right;">KES 780</td>
          <td style="text-align: right;">KES 3,900</td>
        </tr>
        <tr>
          <td>6</td>
          <td>Activity, Physical Education &amp; Games Levy</td>
          <td style="text-align: right;">KES 750</td>
          <td style="text-align: right;">KES 450</td>
          <td style="text-align: right;">KES 300</td>
          <td style="text-align: right;">KES 1,500</td>
        </tr>
        <tr>
          <td>7</td>
          <td>Medical, Sanatorium Operations &amp; Student Insurance</td>
          <td style="text-align: right;">KES 650</td>
          <td style="text-align: right;">KES 390</td>
          <td style="text-align: right;">KES 260</td>
          <td style="text-align: right;">KES 1,300</td>
        </tr>
        <tr>
          <td>8</td>
          <td>Electricity, Water, Sewerage &amp; Conservancy (EWC)</td>
          <td style="text-align: right;">KES 1,500</td>
          <td style="text-align: right;">KES 900</td>
          <td style="text-align: right;">KES 600</td>
          <td style="text-align: right;">KES 3,000</td>
        </tr>
        <tr>
          <td>9</td>
          <td>Academic Assessment, CATs &amp; E-Learning Portal Access</td>
          <td style="text-align: right;">KES 1,100</td>
          <td style="text-align: right;">KES 660</td>
          <td style="text-align: right;">KES 440</td>
          <td style="text-align: right;">KES 2,200</td>
        </tr>
        <tr>
          <td>10</td>
          <td>BOM Capital Development &amp; Infrastructure Levy</td>
          <td style="text-align: right;">KES 1,500</td>
          <td style="text-align: right;">KES 900</td>
          <td style="text-align: right;">KES 600</td>
          <td style="text-align: right;">KES 3,000</td>
        </tr>
        <tr class="total-row">
          <td colspan="2"><strong>TOTAL PAYABLE FEES PER STUDENT (KES)</strong></td>
          <td style="text-align: right;"><strong>KES 26,250</strong></td>
          <td style="text-align: right;"><strong>KES 15,750</strong></td>
          <td style="text-align: right;"><strong>KES 10,500</strong></td>
          <td style="text-align: right; font-size: 8.5pt;"><strong>KES 52,500</strong></td>
        </tr>
      </tbody>
    </table>

    <div class="section-heading" style="margin-top: 14px;">
      <span><span class="section-num">02</span> Form 1 One-Off Mandatory Uniform &amp; Enrolment Package</span>
      <span style="font-size: 7pt; color: #64748b;">Payable upon Enrolment</span>
    </div>

    <table class="doc-table">
      <thead>
        <tr>
          <th style="width: 60%;">Enrolment / Uniform Item Description</th>
          <th style="width: 20%; text-align: center;">Standard Quantity</th>
          <th style="width: 20%; text-align: right;">Approved Cost (KES)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Complete School Uniform Set (Blazer with crest, 3 shirts, 2 trousers, 2 sweaters, tie, tracksuit)</td>
          <td style="text-align: center;">1 Complete Set</td>
          <td style="text-align: right;">KES 8,800</td>
        </tr>
        <tr>
          <td>Bedding Package (Official Kalulini counterpane, mattress cover, 2 bedsheets)</td>
          <td style="text-align: center;">1 Dormitory Pack</td>
          <td style="text-align: right;">KES 2,400</td>
        </tr>
        <tr>
          <td>Student Barcoded Identity Card, File Folder &amp; Enrolment Dossier</td>
          <td style="text-align: center;">Permanent Kit</td>
          <td style="text-align: right;">KES 800</td>
        </tr>
        <tr class="total-row">
          <td colspan="2"><strong>TOTAL ONE-OFF ENROLMENT PACKAGE (NEW STUDENTS ONLY)</strong></td>
          <td style="text-align: right;"><strong>KES 12,000</strong></td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- PAGE 2: PAYMENT METHODS, DEADLINES & REFUND POLICY -->
  <div class="page-break"></div>
  <div class="page-container">
    ${renderRunningHeader('Official Boarding Fees Structure Schedule 2026', 'KBHS/FIN/2026/002')}

    <div class="section-heading">
      <span><span class="section-num">03</span> Authorized Payment Channels &amp; Banking Protocols</span>
      <span style="font-size: 7pt; color: #64748b;">Zero Cash Policy</span>
    </div>

    <div class="notice-box">
      <strong>CRITICAL CASH RESTRICTION:</strong> In compliance with Government Financial Regulations and school anti-fraud standards, <strong>NO CASH PAYMENTS</strong> are accepted at the school accounts counter under any circumstances. All fees must be deposited through official school bank accounts or our verified Lipa Na M-Pesa Paybill.
    </div>

    <div class="form-grid-2" style="margin-top: 10px;">
      <div style="background: #f8fafc; border: 1.5px solid #007fa3; border-radius: 4px; padding: 10px;">
        <div style="font-size: 8.5pt; font-weight: 900; color: #07536a; text-transform: uppercase;">Bank Deposit Channel 1: KCB Bank</div>
        <div style="margin-top: 6px; font-size: 8pt; line-height: 1.5; color: #334155;">
          <div><strong>Bank Name:</strong> Kenya Commercial Bank (KCB)</div>
          <div><strong>Account Name:</strong> Kalulini Boys High School</div>
          <div><strong>Account Number:</strong> <code>[BANK ACCOUNT]</code></div>
          <div><strong>Branch:</strong> <code>[BANK BRANCH]</code></div>
          <div><strong>Reference:</strong> Student Full Name &amp; Admission Number</div>
        </div>
      </div>

      <div style="background: #f8fafc; border: 1.5px solid #007fa3; border-radius: 4px; padding: 10px;">
        <div style="font-size: 8.5pt; font-weight: 900; color: #07536a; text-transform: uppercase;">Bank Deposit Channel 2: Co-op Bank</div>
        <div style="margin-top: 6px; font-size: 8pt; line-height: 1.5; color: #334155;">
          <div><strong>Bank Name:</strong> Co-operative Bank of Kenya</div>
          <div><strong>Account Name:</strong> Kalulini Boys High School Boarding</div>
          <div><strong>Account Number:</strong> <code>[BANK ACCOUNT]</code></div>
          <div><strong>Branch:</strong> <code>[BANK BRANCH]</code></div>
          <div><strong>Reference:</strong> Student Full Name &amp; Admission Number</div>
        </div>
      </div>
    </div>

    <div style="background: #f0fdf4; border: 1.5px solid #16a34a; border-radius: 4px; padding: 10px; margin-top: 10px;">
      <div style="font-size: 8.5pt; font-weight: 900; color: #166534; text-transform: uppercase;">Mobile Money Channel: Lipa Na M-Pesa Paybill</div>
      <div style="font-size: 8pt; color: #166534; margin-top: 4px; line-height: 1.45;">
        1. Access M-PESA menu &bull; Select <strong>Lipa Na M-PESA</strong> &bull; Select <strong>Paybill</strong><br/>
        2. Enter Business Number: <strong><code>[PAYBILL NUMBER]</code></strong><br/>
        3. Enter Account Number: <strong><code>[STUDENT ADM NO.]</code></strong> (e.g. KBHS/4201 or Student Name for Form 1)<br/>
        4. Enter Exact Amount &bull; Enter M-Pesa PIN &bull; Retain SMS confirmation code for official receipting.
      </div>
    </div>

    <div class="section-heading" style="margin-top: 16px;">
      <span><span class="section-num">04</span> Payment Deadlines, Bursaries &amp; Institutional Refund Policy</span>
      <span style="font-size: 7pt; color: #64748b;">Statutory Guidelines</span>
    </div>

    <div style="font-size: 7.5pt; color: #334155; line-height: 1.45;">
      <p style="margin-bottom: 5px;">
        <strong>1. Payment Deadlines:</strong> Term fees must be settled in full on or prior to the official opening day of the respective term. Students with unapproved fee arrears exceeding KES 2,000 will not be admitted to boarding dormitories without an official payment plan signed by the School Bursar and Chief Principal.
      </p>
      <p style="margin-bottom: 5px;">
        <strong>2. Bursary &amp; CDF Cheques:</strong> Parents receiving bursary funds from National Government Constituency Development Funds (NG-CDF), County Education Bursary Funds, or corporate foundations must ensure cheques are made payable strictly to &ldquo;Kalulini Boys High School&rdquo; and forwarded to the bursar with the student&apos;s full name and admission number clearly written on the reverse side.
      </p>
      <p style="margin-bottom: 5px;">
        <strong>3. Fee Refund Policy:</strong> When a student voluntarily transfers or leaves the school during the academic term, boarding fees are refunded on a pro-rata basis minus a 15% administrative retention charge, calculated based on the actual weeks remaining before midterm. No refunds are granted after the mid-term break has elapsed. One-off uniform and enrolment package levies are strictly non-refundable once materials have been issued.
      </p>
    </div>

    <div class="sign-off-container" style="margin-top: 20px;">
      <div>
        ${getSignatureSvg('Mr. Patrick Mutiso, CPA(K)', 'Senior Bursar & Head of Finance')}
      </div>
      <div>
        ${getSignatureSvg('Dr. Josephat M. Ndambuki, Ph.D.', 'Chief Principal & Secretary to BOM')}
      </div>
      <div>
        ${getFinanceStampSvg({ date: '05 JAN 2026', ref: 'FEES APPROVED' })}
      </div>
    </div>
  </div>
  `;
}

module.exports = {
  generateFeesHtml
};
