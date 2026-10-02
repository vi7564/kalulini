// scripts/docs/rules.js
const {
  renderLetterhead,
  renderRunningHeader,
  renderDocHeader,
  getLocalImageBase64,
  getRubberStampSvg,
  getSignatureSvg,
  SCHOOL_INFO
} = require('../shared/components');

function generateRulesHtml() {
  const assemblyImg = getLocalImageBase64('assembly.jpg');

  return `
  <!-- PAGE 1: PREAMBLE & GENERAL RULES -->
  <div class="page-container">
    ${renderLetterhead({ showCrest: true })}
    ${renderDocHeader({
      title: 'Institutional Rules, Code of Conduct & Prefects Charter',
      subTitle: 'Statutory Student Handbook, Disciplinary Framework & Student Council Governance Manual',
      refNo: 'KBHS/POL/2026/005',
      issueDate: 'January 2026',
      version: 'Rev. 2026.1',
      category: 'Policies'
    })}

    <div class="info-box">
      <strong>PREAMBLE:</strong> Kalulini Boys High School operates on the premise that genuine character formation and academic distinction thrive only within an environment of self-discipline, mutual respect, and strict adherence to institutional order. This charter is formulated in conformity with the Basic Education Act 2013 and the Constitution of Kenya.
    </div>

    <div class="section-heading">
      <span><span class="section-num">PART I</span> General Institutional Conduct &amp; Daily Routine</span>
      <span style="font-size: 7pt; color: #64748b;">Daily Order</span>
    </div>

    <div style="font-size: 7.5pt; color: #334155; line-height: 1.45;">
      <p style="margin-bottom: 6px;">
        <strong>1. Time Stewardship &amp; Daily Schedule:</strong> Punctuality is non-negotiable. The official rising bell rings at <strong>5:00 AM</strong>. Morning devotion and physical conditioning commence at <strong>5:45 AM</strong>. Morning classes begin promptly at <strong>7:30 AM</strong> after flag-raising assembly. Evening prep runs strictly from <strong>7:00 PM to 9:30 PM</strong>, followed by lights out at <strong>10:00 PM</strong>.
      </p>
      <p style="margin-bottom: 6px;">
        <strong>2. Bounds of School Compound:</strong> The perimeter hedge and fencing delineate the school bounds. No student may venture outside the school gates without an official written Exeat / Gate Pass signed personally by the Deputy Principal (Administration). Sneaking or leaving without permission constitutes gross misconduct.
      </p>
      <p style="margin-bottom: 6px;">
        <strong>3. Language Policy:</strong> To foster academic eloquence and national unity, <strong>English</strong> and <strong>Kiswahili</strong> are the only authorized media of instruction and social communication within the school. Speaking vernacular, tribal dialects, or street slang is strictly prohibited.
      </p>
      <p style="margin-bottom: 6px;">
        <strong>4. Property Conservation:</strong> School property—including laboratory apparatus, library books, computers, and desks—must be preserved with utmost care. Any student found guilty of vandalism or willful destruction of property will be required to make full financial restitution and face the Disciplinary Committee.
      </p>
    </div>

    <div class="section-heading" style="margin-top: 10px;">
      <span><span class="section-num">PART II</span> Uniform, Dress Code &amp; Grooming Standards</span>
      <span style="font-size: 7pt; color: #64748b;">Appearance &amp; Hygiene</span>
    </div>

    <div style="font-size: 7.5pt; color: #334155; line-height: 1.45;">
      <p style="margin-bottom: 5px;">
        <strong>1. Class Wear:</strong> White long-sleeved shirt neatly tucked in, charcoal grey trousers with black leather belt, official school tie, navy V-neck sweater with school crest stripes, and well-polished black leather lace-up shoes. Blazers are mandatory on Mondays, Fridays, and official academic functions.
      </p>
      <p style="margin-bottom: 5px;">
        <strong>2. Dormitory &amp; Games Wear:</strong> Official school tracksuit or house t-shirt with sports shorts during games time. Civilian clothing of any kind (jeans, t-shirts with commercial slogans, hooded jackets) is contraband.
      </p>
      <p style="margin-bottom: 5px;">
        <strong>3. Hair &amp; Personal Hygiene:</strong> Hair must be kept neat, clean, and evenly trimmed (standard short cut, combable). Beards, sideburns, fancy carvings, tinted hair, or afros are strictly forbidden. Daily bathing and oral hygiene are mandatory.
      </p>
    </div>
  </div>

  <!-- PAGE 2: BOARDING RULES, DISCIPLINE CODE & CONTRABAND -->
  <div class="page-break"></div>
  <div class="page-container">
    ${renderRunningHeader('Institutional Rules, Code of Conduct & Prefects Charter', 'KBHS/POL/2026/005')}

    <div class="section-heading">
      <span><span class="section-num">PART III</span> Boarding House Regulations &amp; Dormitory Order</span>
      <span style="font-size: 7pt; color: #64748b;">Residential Life</span>
    </div>

    <div style="font-size: 7.5pt; color: #334155; line-height: 1.45;">
      <p style="margin-bottom: 5px;">
        <strong>1. Dormitory Access:</strong> Dormitories are strictly closed between <strong>7:30 AM and 4:30 PM</strong> on weekdays. No student is permitted in the residential halls during lesson or prep hours without written authorization from the Boarding Master.
      </p>
      <p style="margin-bottom: 5px;">
        <strong>2. Bedding &amp; Cleanliness:</strong> Every student must make his bed with the official school bedspread immediately upon rising. Daily dormitory inspections are conducted at 6:45 AM by housemasters and house captains.
      </p>
      <p style="margin-bottom: 5px;">
        <strong>3. Inter-House Trespass:</strong> Students are strictly restricted to their designated boarding house (Simba, Chui, Kifaru, or Twiga). Unauthorized entry into other dormitories after lights out is treated as an offense of trespass.
      </p>
    </div>

    <div class="section-heading" style="margin-top: 10px;">
      <span><span class="section-num">PART IV</span> Disciplinary Framework &amp; Sanctions Protocol</span>
      <span style="font-size: 7pt; color: #64748b;">Basic Education Act 2013</span>
    </div>

    <table class="doc-table">
      <thead>
        <tr>
          <th style="width: 20%;">Offense Level</th>
          <th style="width: 45%;">Nature of Infractions</th>
          <th style="width: 35%;">Standard Sanctions Applied</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Category A: Minor</strong></td>
          <td>Lateness, untidy uniform, failure to complete homework, talking during prep, minor littering.</td>
          <td>Verbal caution, campus community service (flower garden weeding, hall sweeping), loss of leisure privilege.</td>
        </tr>
        <tr>
          <td><strong>Category B: Serious</strong></td>
          <td>Vernacular speaking, defiance to student leaders, missed roll call, examination irregularity, truancy.</td>
          <td>Written warning letter placed in permanent file, parental summons to school, internal suspension from privileges.</td>
        </tr>
        <tr>
          <td><strong>Category C: Gross Misconduct</strong></td>
          <td>Sneaking out, theft, bullying/ragging, fighting, substance abuse (alcohol, narcotics, cigarettes), possession of mobile phones, arson.</td>
          <td>Immediate exclusion, formal Board of Management Disciplinary Hearing, suspension (up to 14 days), potential expulsion.</td>
        </tr>
      </tbody>
    </table>

    <div class="section-heading" style="margin-top: 10px;">
      <span><span class="section-num">PART V</span> Strictly Prohibited Contraband Items</span>
      <span style="font-size: 7pt; color: #64748b;">Immediate Confiscation</span>
    </div>

    <div class="notice-box">
      <strong>CONTRABAND RESTRICTION:</strong> Possession of contraband results in immediate confiscation and disciplinary hearing. Confiscated contraband items are officially destroyed and will NEVER be returned.
    </div>

    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; font-size: 7.5pt; color: #334155; margin-top: 6px;">
      <div style="background: #f8fafc; border: 1px solid #cbd5e1; padding: 6px; border-radius: 3px;">
        <strong>Electronics:</strong> Mobile phones, SIM cards, tablets, smart watches, earphones, flash disks, Bluetooth speakers.
      </div>
      <div style="background: #f8fafc; border: 1px solid #cbd5e1; padding: 6px; border-radius: 3px;">
        <strong>Appliances:</strong> Immersion heaters (coils), electric kettles, irons, hotplates, extension cables.
      </div>
      <div style="background: #f8fafc; border: 1px solid #cbd5e1; padding: 6px; border-radius: 3px;">
        <strong>Substances &amp; Weapons:</strong> Alcohol, cigarettes, drugs, energy drinks, knives, matchboxes, lighters, fireworks.
      </div>
    </div>
  </div>

  <!-- PAGE 3: PREFECTS' CHARTER, DUTIES & OATH -->
  <div class="page-break"></div>
  <div class="page-container">
    ${renderRunningHeader('Institutional Rules, Code of Conduct & Prefects Charter', 'KBHS/POL/2026/005')}

    <div class="section-heading">
      <span><span class="section-num">PART VI</span> Prefects' Governance Charter &amp; Leadership Roles</span>
      <span style="font-size: 7pt; color: #64748b;">Student Council</span>
    </div>

    <p style="font-size: 7.5pt; color: #334155; margin-bottom: 6px;">
      The Kalulini Boys High School Student Council represents the vital bridge between the student body and school administration. Prefects are chosen annually through a rigorous three-tier process: student democratic voting, teacher vetting, and oral interview by the Disciplinary Board.
    </p>

    <div class="form-grid-2">
      <div style="border: 1px solid #cbd5e1; padding: 8px; border-radius: 4px; background: #ffffff;">
        <div style="font-size: 8pt; font-weight: 800; color: #0b4558;">1. School Captain (Head Boy)</div>
        <p style="font-size: 7pt; color: #475569; margin-top: 2px;">
          Overall head of the student council; coordinates all departmental prefects; delivers student reports at staff briefing; presides over student assemblies; acts as chief representative of the school.
        </p>
      </div>
      <div style="border: 1px solid #cbd5e1; padding: 8px; border-radius: 4px; background: #ffffff;">
        <div style="font-size: 8pt; font-weight: 800; color: #0b4558;">2. Deputy School Captain</div>
        <p style="font-size: 7pt; color: #475569; margin-top: 2px;">
          Direct supervisor of daily routines, roll calls, and prep silence; coordinates class monitors; deputizes for the School Captain in his absence.
        </p>
      </div>
      <div style="border: 1px solid #cbd5e1; padding: 8px; border-radius: 4px; background: #ffffff;">
        <div style="font-size: 8pt; font-weight: 800; color: #0b4558;">3. Academic &amp; Library Captain</div>
        <p style="font-size: 7pt; color: #475569; margin-top: 2px;">
          Monitors prep attendance and academic silence; oversees classroom order; assists the Dean of Studies during internal and national continuous assessments.
        </p>
      </div>
      <div style="border: 1px solid #cbd5e1; padding: 8px; border-radius: 4px; background: #ffffff;">
        <div style="font-size: 8pt; font-weight: 800; color: #0b4558;">4. Dining Hall Captain</div>
        <p style="font-size: 7pt; color: #475569; margin-top: 2px;">
          Maintains queue discipline, hygiene, and equitable food distribution in the dining hall; liaises with the school caterer regarding student dietary welfare.
        </p>
      </div>
      <div style="border: 1px solid #cbd5e1; padding: 8px; border-radius: 4px; background: #ffffff;">
        <div style="font-size: 8pt; font-weight: 800; color: #0b4558;">5. House Captains (Simba, Chui, Kifaru, Twiga)</div>
        <p style="font-size: 7pt; color: #475569; margin-top: 2px;">
          Oversee dormitory hygiene, bed-making standards, nighttime roll calls, and inter-house athletics competitions; report welfare issues directly to resident Housemasters.
        </p>
      </div>
      <div style="border: 1px solid #cbd5e1; padding: 8px; border-radius: 4px; background: #ffffff;">
        <div style="font-size: 8pt; font-weight: 800; color: #0b4558;">6. Sanitation &amp; Environment Captain</div>
        <p style="font-size: 7pt; color: #475569; margin-top: 2px;">
          Supervises compound cleanliness, tree planting initiatives, waste sorting, and ensures campus ablution blocks meet strict public health standards.
        </p>
      </div>
    </div>

    <div class="notice-box" style="margin-top: 8px;">
      <strong>LIMITS OF PREFECTURAL AUTHORITY:</strong> In compliance with Kenyan law, <strong>CORPORAL PUNISHMENT IS STRICTLY ILLEGAL</strong>. Prefects are mentors and order-keepers; they possess NO authority to physically strike, abuse, or assign punitive manual labor to fellow students. Any prefect violating this directive will be immediately stripped of his badge.
    </div>

    <div class="section-heading" style="margin-top: 10px;">
      <span><span class="section-num">PART VII</span> The Prefects' Solemn Oath of Office</span>
      <span style="font-size: 7pt; color: #64748b;">Investiture Pledge</span>
    </div>

    <div style="background: #fffbea; border: 1.5px solid #d9a900; padding: 10px; border-radius: 4px; font-size: 7.5pt; color: #78350f; font-style: italic; line-height: 1.5;">
      &ldquo;I, having been duly elected and commissioned as a Student Leader of Kalulini Boys High School, do solemnly swear that I will execute my duties with absolute integrity, fairness, humility, and without fear or favor. I shall lead by positive example, honor the trust bestowed upon me by my peers and teachers, and diligently protect the honor and dignity of our school. So help me God.&rdquo;
    </div>

    <div class="sign-off-container" style="margin-top: 14px;">
      <div>
        ${getSignatureSvg('Mr. Peter K. Mumo', 'Deputy Principal (Administration)')}
      </div>
      <div>
        ${getSignatureSvg('Dr. Josephat M. Ndambuki, Ph.D.', 'Chief Principal & Secretary to BOM')}
      </div>
      <div>
        ${getRubberStampSvg({ office: 'DIRECTORATE OF DISCIPLINE & STUDENT AFFAIRS', date: 'JAN 2026', ref: 'CHARTER RATIFIED' })}
      </div>
    </div>
  </div>
  `;
}

module.exports = {
  generateRulesHtml
};
