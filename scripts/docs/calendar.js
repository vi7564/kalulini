// scripts/docs/calendar.js
const {
  renderLetterhead,
  renderRunningHeader,
  renderDocHeader,
  getRubberStampSvg,
  getSignatureSvg,
  SCHOOL_INFO
} = require('../shared/components');

function generateCalendarHtml() {
  return `
  <!-- PAGE 1: TERM 1 2026 SUMMARY & WEEKS 1-7 -->
  <div class="page-container">
    ${renderLetterhead({ showCrest: true })}
    ${renderDocHeader({
      title: 'Comprehensive Term 1 2026 Academic Calendar',
      subTitle: 'Statutory 13-Week Teaching Term, Examination Schedule & Co-Curricular Timetable',
      refNo: 'KBHS/ACAD/2026/006',
      issueDate: '6th January 2026',
      version: 'Circular No. 02/2026',
      category: 'Academics'
    })}

    <div class="form-grid-3" style="margin-bottom: 10px;">
      <div style="background: #eafaff; border: 1px solid #007fa3; padding: 8px; border-radius: 4px; text-align: center;">
        <span style="font-size: 7pt; font-weight: bold; color: #007fa3; text-transform: uppercase;">Term Commencement</span>
        <div style="font-size: 9.5pt; font-weight: 900; color: #0b4558; margin-top: 2px;">Monday, 6th Jan 2026</div>
        <span style="font-size: 6.5pt; color: #64748b;">Form 1 Admission Day</span>
      </div>
      <div style="background: #fffbea; border: 1px solid #f5c400; padding: 8px; border-radius: 4px; text-align: center;">
        <span style="font-size: 7pt; font-weight: bold; color: #b45309; text-transform: uppercase;">Mid-Term Break</span>
        <div style="font-size: 9.5pt; font-weight: 900; color: #78350f; margin-top: 2px;">18th - 22nd Feb 2026</div>
        <span style="font-size: 6.5pt; color: #64748b;">Departs 8:00 AM &bull; Return 4:00 PM</span>
      </div>
      <div style="background: #f0fdf4; border: 1px solid #16a34a; padding: 8px; border-radius: 4px; text-align: center;">
        <span style="font-size: 7pt; font-weight: bold; color: #166534; text-transform: uppercase;">Term 1 Concludes</span>
        <div style="font-size: 9.5pt; font-weight: 900; color: #14532d; margin-top: 2px;">Friday, 3rd April 2026</div>
        <span style="font-size: 6.5pt; color: #64748b;">Closing Assembly &amp; Reports Release</span>
      </div>
    </div>

    <div class="section-heading">
      <span><span class="section-num">01</span> Week-by-Week Instructional Schedule (First Half: Weeks 1 - 7)</span>
      <span style="font-size: 7pt; color: #64748b;">Term 1 2026</span>
    </div>

    <table class="doc-table">
      <thead>
        <tr>
          <th style="width: 8%;">Week</th>
          <th style="width: 17%;">Calendar Dates</th>
          <th style="width: 35%;">Curriculum &amp; Examination Activity</th>
          <th style="width: 22%;">Co-Curricular &amp; Sports</th>
          <th style="width: 18%;">Pastoral / Admin</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Wk 1</strong></td>
          <td>Jan 06 – Jan 09</td>
          <td>Form 1 Induction &amp; Orientation; Timetable release; Book issuance.</td>
          <td>Physical conditioning; sports kit check.</td>
          <td>Form 1 reporting Mon; Forms 2-4 report Tue.</td>
        </tr>
        <tr>
          <td><strong>Wk 2</strong></td>
          <td>Jan 12 – Jan 16</td>
          <td>Syllabus rollout; Form 4 baseline diagnostics in Science/Maths.</td>
          <td>Clubs registration; Choir &amp; Drama auditions.</td>
          <td>Staff academic planning council meeting.</td>
        </tr>
        <tr>
          <td><strong>Wk 3</strong></td>
          <td>Jan 19 – Jan 23</td>
          <td>Full teaching across all subjects; Science practical classes start.</td>
          <td>Inter-house rugby &amp; football training starts.</td>
          <td>House roll calls; prefects meeting.</td>
        </tr>
        <tr>
          <td><strong>Wk 4</strong></td>
          <td>Jan 26 – Jan 30</td>
          <td>Form 3 &amp; 4 Academic clinics; Topic tests; Lab inventory checks.</td>
          <td>Inter-House Cross Country Championships.</td>
          <td>Dean of studies department review.</td>
        </tr>
        <tr>
          <td><strong>Wk 5</strong></td>
          <td>Feb 02 – Feb 06</td>
          <td><strong>Continuous Assessment Test 1 (CAT 1)</strong> across all Forms.</td>
          <td>Scouts camping drill; Robotics project prep.</td>
          <td>CAT 1 marking &amp; departmental entry.</td>
        </tr>
        <tr>
          <td><strong>Wk 6</strong></td>
          <td>Feb 09 – Feb 13</td>
          <td>CAT 1 revision &amp; remedial tutorials; Science Fair exhibits review.</td>
          <td>Sub-County Kenya Science Fair heats.</td>
          <td>PTA Executive Committee meeting.</td>
        </tr>
        <tr>
          <td><strong>Wk 7</strong></td>
          <td>Feb 16 – Feb 20</td>
          <td>Mid-Term tests &amp; assessments; Syllabus review; Departure briefing.</td>
          <td>Inter-dormitory indoor games tournament.</td>
          <td><strong>MID-TERM BREAK</strong> (Departs Wed 18 Feb).</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- PAGE 2: WEEKS 8-13, EXAMS & PARENTS DAY -->
  <div class="page-break"></div>
  <div class="page-container">
    ${renderRunningHeader('Comprehensive Term 1 2026 Academic Calendar', 'KBHS/ACAD/2026/006')}

    <div class="section-heading">
      <span><span class="section-num">02</span> Week-by-Week Instructional Schedule (Second Half: Weeks 8 - 13)</span>
      <span style="font-size: 7pt; color: #64748b;">Term 1 2026</span>
    </div>

    <table class="doc-table">
      <thead>
        <tr>
          <th style="width: 8%;">Week</th>
          <th style="width: 17%;">Calendar Dates</th>
          <th style="width: 35%;">Curriculum &amp; Examination Activity</th>
          <th style="width: 22%;">Co-Curricular &amp; Sports</th>
          <th style="width: 18%;">Pastoral / Admin</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Wk 8</strong></td>
          <td>Feb 23 – Feb 27</td>
          <td>Scholars report back from Mid-Term Mon 8:00 AM; Class resume.</td>
          <td>Athletics track training; Drama festival prep.</td>
          <td><strong>Form 1 Parents' Orientation Day</strong> (Sat 28 Feb).</td>
        </tr>
        <tr>
          <td><strong>Wk 9</strong></td>
          <td>Mar 02 – Mar 06</td>
          <td>Intensive syllabus coverage; Form 4 early morning and evening prep.</td>
          <td>Eastern Region Rugby 15s tournament heats.</td>
          <td>BOM Academic Committee sitting.</td>
        </tr>
        <tr>
          <td><strong>Wk 10</strong></td>
          <td>Mar 09 – Mar 13</td>
          <td><strong>Continuous Assessment Test 2 (CAT 2)</strong>; Moderation.</td>
          <td>Inter-House Drama &amp; Choral competition.</td>
          <td>Departmental progress reviews.</td>
        </tr>
        <tr>
          <td><strong>Wk 11</strong></td>
          <td>Mar 16 – Mar 20</td>
          <td><strong>End of Term 1 Examinations Begin</strong> for Forms 1, 2, 3, &amp; 4.</td>
          <td>Co-curricular wind-down; library prep.</td>
          <td>Examination invigilation strictly enforced.</td>
        </tr>
        <tr>
          <td><strong>Wk 12</strong></td>
          <td>Mar 23 – Mar 27</td>
          <td>End of Term 1 Examinations conclude; Marking &amp; grading.</td>
          <td>Games equipment inventory and check-in.</td>
          <td>Faculty departmental marking symposium.</td>
        </tr>
        <tr>
          <td><strong>Wk 13</strong></td>
          <td>Mar 30 – Apr 03</td>
          <td>Report card generation; Academic awards; Dorm cleaning &amp; clearing.</td>
          <td>Closing cross-country run &amp; awards assembly.</td>
          <td><strong>Term Closes Fri 3rd April</strong> (Easter recess).</td>
        </tr>
      </tbody>
    </table>

    <div class="section-heading" style="margin-top: 14px;">
      <span><span class="section-num">03</span> Key Institutional Dates &amp; Term 2 Advance Notice</span>
      <span style="font-size: 7pt; color: #64748b;">Diary Milestones</span>
    </div>

    <div class="form-grid-2">
      <div style="background: #f8fafc; border: 1px solid #cbd5e1; padding: 10px; border-radius: 4px;">
        <div style="font-size: 8pt; font-weight: 800; color: #0b4558;">Public Holidays Observed</div>
        <ul style="font-size: 7.5pt; color: #334155; margin-left: 14px; margin-top: 4px; line-height: 1.45;">
          <li><strong>Good Friday:</strong> Friday, 3rd April 2026 (Official school closing day).</li>
          <li><strong>Easter Monday:</strong> Monday, 6th April 2026 (Holiday during term recess).</li>
        </ul>
      </div>

      <div style="background: #f8fafc; border: 1px solid #cbd5e1; padding: 10px; border-radius: 4px;">
        <div style="font-size: 8pt; font-weight: 800; color: #0b4558;">Term 2 2026 Opening Schedule</div>
        <ul style="font-size: 7.5pt; color: #334155; margin-left: 14px; margin-top: 4px; line-height: 1.45;">
          <li><strong>All Students Report:</strong> Monday, 27th April 2026 by 4:00 PM.</li>
          <li><strong>Term 2 Fees Clearance:</strong> Bank deposit slips presented at gate check-in.</li>
        </ul>
      </div>
    </div>

    <div class="sign-off-container" style="margin-top: 20px;">
      <div>
        ${getSignatureSvg('Mrs. Florence Nduku', 'Dean of Studies & Academic Registrar')}
      </div>
      <div>
        ${getSignatureSvg('Dr. Josephat M. Ndambuki, Ph.D.', 'Chief Principal & Secretary to BOM')}
      </div>
      <div>
        ${getRubberStampSvg({ office: 'OFFICE OF THE DEAN OF STUDIES', date: 'JAN 2026', ref: 'CALENDAR ISSUED' })}
      </div>
    </div>
  </div>
  `;
}

module.exports = {
  generateCalendarHtml
};
