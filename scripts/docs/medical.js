// scripts/docs/medical.js
const {
  renderLetterhead,
  renderRunningHeader,
  renderDocHeader,
  getMedicalStampSvg,
  getSignatureSvg,
  SCHOOL_INFO
} = require('../shared/components');

function generateMedicalHtml() {
  return `
  <!-- PAGE 1: STUDENT HEALTH RECORD & PARENT CONSENT -->
  <div class="page-container">
    ${renderLetterhead({ showCrest: true })}
    ${renderDocHeader({
      title: 'Student Medical History & Clinical Clearance Form',
      subTitle: 'Confidential Health Record to be Completed by Parent & Registered Medical Practitioner',
      refNo: 'KBHS/MED/2026/004',
      issueDate: 'January 2026',
      version: 'Rev. 2026.1',
      category: 'Health'
    })}

    <div class="info-box">
      <strong>STATUTORY HEALTH DIRECTIVE:</strong> Boarding school life involves strenuous physical training, cross-country runs, and communal residential living. Accurate disclosure of prior medical conditions is mandatory for the preservation of student health and rapid emergency intervention.
    </div>

    <div class="section-heading">
      <span><span class="section-num">I</span> Student Personal Identification Particulars</span>
      <span style="font-size: 7pt; color: #64748b;">Bio-Data</span>
    </div>

    <div class="form-grid-3">
      <div class="form-field">
        <div class="field-label">Student Full Name:</div>
        <div class="field-box"></div>
      </div>
      <div class="form-field">
        <div class="field-label">Admission Number:</div>
        <div class="field-box">KBHS/</div>
      </div>
      <div class="form-field">
        <div class="field-label">Date of Birth (DD/MM/YYYY):</div>
        <div class="field-box"></div>
      </div>
    </div>

    <div class="form-grid-3">
      <div class="form-field">
        <div class="field-label">Blood Group / Rhesus:</div>
        <div class="field-box"></div>
      </div>
      <div class="form-field">
        <div class="field-label">NHIF / SHA Card No:</div>
        <div class="field-box">[SHA/NHIF NO.]</div>
      </div>
      <div class="form-field">
        <div class="field-label">Private Medical Insurance:</div>
        <div class="field-box">[INSURER / POLICY NO.]</div>
      </div>
    </div>

    <div class="section-heading" style="margin-top: 10px;">
      <span><span class="section-num">II</span> Comprehensive Medical History (To be Completed by Parent)</span>
      <span style="font-size: 7pt; color: #64748b;">Disclose All Pre-existing Conditions</span>
    </div>

    <div style="font-size: 7.5pt; color: #334155; margin-bottom: 6px;">
      Indicate with a tick [✓] if the student has ever suffered from or is currently receiving treatment for:
    </div>

    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; font-size: 7.5pt; margin-bottom: 8px;">
      <div class="checkbox-item"><div class="check-square"></div> Asthma / Wheezing</div>
      <div class="checkbox-item"><div class="check-square"></div> Epilepsy / Seizures</div>
      <div class="checkbox-item"><div class="check-square"></div> Diabetes Mellitus</div>
      <div class="checkbox-item"><div class="check-square"></div> Sickle Cell Disease</div>
      <div class="checkbox-item"><div class="check-square"></div> Cardiac / Heart Murmur</div>
      <div class="checkbox-item"><div class="check-square"></div> Hypertension</div>
      <div class="checkbox-item"><div class="check-square"></div> Tuberculosis (TB)</div>
      <div class="checkbox-item"><div class="check-square"></div> Kidney / Renal Disease</div>
      <div class="checkbox-item"><div class="check-square"></div> Severe Eye / Vision Defect</div>
      <div class="checkbox-item"><div class="check-square"></div> Hearing Impairment</div>
      <div class="checkbox-item"><div class="check-square"></div> Bleeding / Hemophilia</div>
      <div class="checkbox-item"><div class="check-square"></div> Physical / Bone Deformity</div>
    </div>

    <div class="form-grid-2">
      <div class="form-field">
        <div class="field-label">Known Allergies (Medications, Penicillin, Foods, Dust):</div>
        <div class="field-box"></div>
      </div>
      <div class="form-field">
        <div class="field-label">Current Regular Medications Taken Daily:</div>
        <div class="field-box"></div>
      </div>
    </div>

    <div class="section-heading" style="margin-top: 10px;">
      <span><span class="section-num">III</span> National Immunization Profile</span>
      <span style="font-size: 7pt; color: #64748b;">Vaccination Compliance</span>
    </div>

    <table class="doc-table">
      <thead>
        <tr>
          <th>Vaccine / Immunization</th>
          <th style="text-align: center;">BCG (Tuberculosis)</th>
          <th style="text-align: center;">Polio (OPV/IPV)</th>
          <th style="text-align: center;">Tetanus Toxoid</th>
          <th style="text-align: center;">Yellow Fever</th>
          <th style="text-align: center;">COVID-19 Vaccine</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Immunization Status</strong></td>
          <td style="text-align: center;">[Completed]</td>
          <td style="text-align: center;">[Completed]</td>
          <td style="text-align: center;">[Booster Given]</td>
          <td style="text-align: center;">[Vaccinated]</td>
          <td style="text-align: center;">[Vaccinated]</td>
        </tr>
      </tbody>
    </table>

    <div class="section-heading" style="margin-top: 10px;">
      <span><span class="section-num">IV</span> Parent / Guardian Emergency Medical Authorization</span>
      <span style="font-size: 7pt; color: #64748b;">Emergency Consent</span>
    </div>

    <div style="font-size: 7.5pt; color: #334155; line-height: 1.45; background: #f8fafc; border: 1px solid #cbd5e1; padding: 8px; border-radius: 4px;">
      In the event of acute illness, injury, or emergency requiring surgical, radiological, or inpatient intervention where I cannot be reached immediately, I hereby grant permission to the Chief Principal, School Clinical Nurse, or attending physicians at Kalulini Sub-County Hospital / Designated Referral Hospital to administer essential emergency anesthesia, blood tests, or surgical treatment.
      <div class="form-grid-3" style="margin-top: 6px;">
        <div>Parent Name: _______________________</div>
        <div>Emergency Phone [PHONE]: ___________</div>
        <div>Signature &amp; Date: ___________________</div>
      </div>
    </div>
  </div>

  <!-- PAGE 2: CLINICAL EXAMINATION & DOCTOR'S CLEARANCE -->
  <div class="page-break"></div>
  <div class="page-container">
    ${renderRunningHeader('Student Medical History & Clinical Clearance Form', 'KBHS/MED/2026/004')}

    <div class="section-heading">
      <span><span class="section-num">V</span> Clinical Examination by Registered Medical Practitioner</span>
      <span style="font-size: 7pt; color: #64748b;">Official Hospital Evaluation</span>
    </div>

    <p style="font-size: 7.5pt; color: #334155; margin-bottom: 8px;">
      <em>To be examined and filled by a Medical Officer / Registered Clinical Officer in a Government Sub-County Hospital or accredited health institution.</em>
    </p>

    <div class="form-grid-3">
      <div class="form-field">
        <div class="field-label">Height (cm):</div>
        <div class="field-box"></div>
      </div>
      <div class="form-field">
        <div class="field-label">Weight (kg):</div>
        <div class="field-box"></div>
      </div>
      <div class="form-field">
        <div class="field-label">Blood Pressure (mmHg):</div>
        <div class="field-box"></div>
      </div>
    </div>

    <div class="form-grid-3">
      <div class="form-field">
        <div class="field-label">Pulse Rate (bpm):</div>
        <div class="field-box"></div>
      </div>
      <div class="form-field">
        <div class="field-label">Visual Acuity Right Eye:</div>
        <div class="field-box">6 / 6</div>
      </div>
      <div class="form-field">
        <div class="field-label">Visual Acuity Left Eye:</div>
        <div class="field-box">6 / 6</div>
      </div>
    </div>

    <table class="doc-table" style="margin-top: 8px;">
      <thead>
        <tr>
          <th style="width: 25%;">Body System</th>
          <th style="width: 15%; text-align: center;">Clinical Finding</th>
          <th style="width: 60%;">Specific Doctor's Notes / Observations</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Ears, Nose &amp; Throat (ENT)</strong></td>
          <td style="text-align: center; color: #047857;">[NORMAL]</td>
          <td>Tympanic membranes intact; no chronic discharge or hypertrophied tonsils.</td>
        </tr>
        <tr>
          <td><strong>Respiratory System</strong></td>
          <td style="text-align: center; color: #047857;">[NORMAL]</td>
          <td>Chest clear to auscultation bilaterally; vesicular breath sounds; no wheezes.</td>
        </tr>
        <tr>
          <td><strong>Cardiovascular System</strong></td>
          <td style="text-align: center; color: #047857;">[NORMAL]</td>
          <td>Normal heart sounds S1 and S2; no pathological murmurs detected.</td>
        </tr>
        <tr>
          <td><strong>Abdomen &amp; Hernial Orifices</strong></td>
          <td style="text-align: center; color: #047857;">[NORMAL]</td>
          <td>Soft, non-tender; no hepatosplenomegaly; no inguinal or umbilical hernia.</td>
        </tr>
        <tr>
          <td><strong>Musculoskeletal &amp; Spine</strong></td>
          <td style="text-align: center; color: #047857;">[NORMAL]</td>
          <td>Full range of motion in all limbs and joints; spine normal without scoliosis.</td>
        </tr>
        <tr>
          <td><strong>Nervous System &amp; Mental State</strong></td>
          <td style="text-align: center; color: #047857;">[NORMAL]</td>
          <td>Oriented in time, place, and person; reflexes intact; neurologically stable.</td>
        </tr>
      </tbody>
    </table>

    <div class="section-heading" style="margin-top: 12px;">
      <span><span class="section-num">VI</span> Official Clinician's Fitness Certification</span>
      <span style="font-size: 7pt; color: #64748b;">Statutory Medical Opinion</span>
    </div>

    <div style="background: #f0fdf4; border: 1.5px solid #16a34a; border-radius: 4px; padding: 10px; margin: 8px 0;">
      <p style="font-size: 8pt; color: #166534; line-height: 1.5;">
        <strong>FITNESS DECLARATION:</strong> I have physically and systemically examined the student named herein and hereby certify that in my clinical assessment, he is <strong>[✓] MEDICALLY FIT</strong> for communal boarding school accommodation, rigorous academic pursuits, standard physical education, cross-country, and competitive field sports.
      </p>
      <div style="font-size: 7.5pt; color: #166534; margin-top: 4px;">
        Special Medical Advice / Dietary Exemptions (if any): <u>None. Recommended for full student boarding activity.</u>
      </div>
    </div>

    <div class="form-grid-2" style="margin-top: 8px;">
      <div class="form-field">
        <div class="field-label">Examining Doctor / Clinician Name:</div>
        <div class="field-box">Dr. Eric M. Mutua, MBChB, M.Med</div>
      </div>
      <div class="form-field">
        <div class="field-label">KMPDC Registration License No:</div>
        <div class="field-box">[KMPDC REG NO.]</div>
      </div>
    </div>

    <div class="sign-off-container" style="margin-top: 14px;">
      <div>
        ${getSignatureSvg('Dr. Eric M. Mutua, MBChB', 'Sub-County Medical Officer of Health')}
      </div>
      <div>
        ${getMedicalStampSvg({ date: 'JAN 2026', facility: 'KALULINI SUB-COUNTY HOSPITAL' })}
      </div>
    </div>
  </div>
  `;
}

module.exports = {
  generateMedicalHtml
};
