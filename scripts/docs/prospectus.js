// scripts/docs/prospectus.js
const {
  renderLetterhead,
  renderRunningHeader,
  renderDocHeader,
  getLocalImageBase64,
  getSchoolCrestSvg,
  getRubberStampSvg,
  getSignatureSvg,
  SCHOOL_INFO
} = require('../shared/components');

function generateProspectusHtml() {
  const campusImg = getLocalImageBase64('campus-main.jpg');
  const labImg = getLocalImageBase64('science-lab.jpg');
  const ictImg = getLocalImageBase64('ict-center.jpg');
  const dormImg = getLocalImageBase64('dormitory.jpg');
  const sportsImg = getLocalImageBase64('sports-field.jpg');
  const principalImg = getLocalImageBase64('principal.jpg');

  return `
  <!-- PAGE 1: COVER & FORMAL TITLE -->
  <div class="page-container">
    ${renderLetterhead({ showCrest: true })}
    ${renderDocHeader({
      title: '2026 Academic Prospectus & Information Guide',
      subTitle: 'Comprehensive Guide to Institutional Heritage, Curriculum Pathways, Boarding Life & Enrolment',
      refNo: 'KBHS/PUB/2026/001',
      issueDate: 'January 2026',
      version: 'Edition 2026.1'
    })}

    <div style="margin: 10px 0; border: 2px solid #007fa3; border-radius: 6px; overflow: hidden; height: 320px; position: relative;">
      <img src="${campusImg}" style="width: 100%; height: 100%; object-fit: cover;" alt="Kalulini Campus" />
      <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(0deg, rgba(11,69,88,0.95) 0%, rgba(11,69,88,0.7) 70%, transparent 100%); padding: 14px 18px; color: #ffffff;">
        <span style="font-size: 8pt; font-weight: 800; text-transform: uppercase; color: #ffd84d; letter-spacing: 1px;">Kalulini Boys High School Academic Quadrangle</span>
        <h2 style="font-size: 14pt; font-weight: 900; margin-top: 2px;">Nurturing Intellectual Titans &amp; Disciplined Leaders</h2>
        <p style="font-size: 8pt; color: #e2e8f0; margin-top: 2px;">Makueni County, Eastern Region &bull; Extra-County Public Boarding School</p>
      </div>
    </div>

    <div class="form-grid-3" style="margin-top: 14px;">
      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-top: 3px solid #007fa3; padding: 10px; border-radius: 4px;">
        <div style="font-size: 8pt; font-weight: 800; color: #0b4558; text-transform: uppercase;">Academic Excellence</div>
        <p style="font-size: 7.5pt; color: #475569; margin-top: 4px;">Mean score of 8.7+ in national examinations with over 92% direct university transition into STEM and professional faculties.</p>
      </div>
      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-top: 3px solid #f5c400; padding: 10px; border-radius: 4px;">
        <div style="font-size: 8pt; font-weight: 800; color: #b45309; text-transform: uppercase;">Holistic Character</div>
        <p style="font-size: 7.5pt; color: #475569; margin-top: 4px;">Values-led mentoring, inter-house fraternity, spiritual devotions, and leadership responsibility instilled in every scholar.</p>
      </div>
      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-top: 3px solid #047857; padding: 10px; border-radius: 4px;">
        <div style="font-size: 8pt; font-weight: 800; color: #047857; text-transform: uppercase;">Modern Infrastructure</div>
        <p style="font-size: 7.5pt; color: #475569; margin-top: 4px;">Dedicated Physics, Chemistry, and Biology laboratories, 100-seat ICT Centre with fiber connectivity, and expansive sports grounds.</p>
      </div>
    </div>

    <div class="notice-box" style="margin-top: 14px;">
      <strong>OFFICIAL NOTICE:</strong> This Prospectus provides statutory guidelines for prospective parents, newly selected Form 1 candidates, continuing scholars, and academic partners. All institutional regulations are ratified under the Ministry of Education Basic Education Act.
    </div>
  </div>

  <!-- PAGE 2: WELCOME MESSAGE & INSTITUTIONAL HISTORY -->
  <div class="page-break"></div>
  <div class="page-container">
    ${renderRunningHeader('2026 Academic Prospectus & Information Guide', 'KBHS/PUB/2026/001')}

    <div class="section-heading">
      <span><span class="section-num">01</span> Executive Welcome &bull; Office of the Chief Principal</span>
      <span style="font-size: 7pt; color: #64748b;">Makueni County</span>
    </div>

    <div style="display: flex; gap: 14px; margin: 10px 0; align-items: flex-start;">
      <div style="width: 140px; flex-shrink: 0; text-align: center;">
        <div style="border: 2px solid #007fa3; border-radius: 4px; overflow: hidden; height: 160px;">
          <img src="${principalImg}" style="width: 100%; height: 100%; object-fit: cover;" alt="Dr. Josephat M. Ndambuki" />
        </div>
        <div style="font-size: 7.5pt; font-weight: 800; color: #0b4558; margin-top: 4px;">Dr. Josephat M. Ndambuki</div>
        <div style="font-size: 6.5pt; color: #64748b;">Chief Principal &amp; Secretary to BOM</div>
        <div style="font-size: 6.5pt; color: #b45309; font-weight: 600;">Ph.D. Ed. Admin (KU)</div>
      </div>
      <div style="flex: 1; font-size: 8pt; color: #334155; line-height: 1.45;">
        <p style="margin-bottom: 6px;">
          It gives me immense honor and joy to welcome you to <strong>Kalulini Boys High School</strong>. As a premier Extra-County public boarding institution, our solemn pledge is to mold young men into intellectually distinguished, morally anchored, and patriotic servant leaders.
        </p>
        <p style="margin-bottom: 6px;">
          Education at Kalulini transcends mere memorization for examinations. We place immense emphasis on analytical problem-solving, technological competence, empirical scientific inquiry, and athletic vigor. We cultivate an atmosphere where discipline is voluntary, curiosity is celebrated, and hard work is recognized as the ultimate differentiator.
        </p>
        <p style="margin-bottom: 6px;">
          Our dedicated faculty, robust Board of Management, supportive alumni association, and vibrant parent community collaborate harmoniously to guarantee that every learner entrusts his secondary school journey to an empowering, safe, and academically stimulating home away from home.
        </p>
        <p>
          I urge every scholar joining our ranks to embrace our motto: <em>&ldquo;Strive for Excellence, Integrity and Service&rdquo;</em> and prepare to write his own chapter in Kalulini&apos;s proud legacy.
        </p>
      </div>
    </div>

    <div class="section-heading" style="margin-top: 16px;">
      <span><span class="section-num">02</span> Historical Evolution &amp; Institutional Profile</span>
      <span style="font-size: 7pt; color: #64748b;">Founded on Academic Titans</span>
    </div>

    <p style="font-size: 8pt; color: #334155; line-height: 1.45; margin-bottom: 8px;">
      Kalulini Boys High School was established to fulfill the community&apos;s profound desire for a disciplined, high-caliber secondary boarding school for boys in Makueni County. From humble beginnings with two classrooms and an initial cohort of 60 determined boys, the school has expanded into an acclaimed four-stream Extra-County institution accommodating over 800 boarding students.
    </p>
    <p style="font-size: 8pt; color: #334155; line-height: 1.45; margin-bottom: 8px;">
      Across more than two decades of dedicated pedagogical practice, Kalulini has consistently registered exemplary results in the Kenya Certificate of Secondary Education (KCSE), sending hundreds of alumni to national and international universities to train as doctors, software engineers, attorneys, architects, and business innovators.
    </p>

    <div class="form-grid-2" style="margin-top: 10px;">
      <div style="border: 1px solid #cbd5e1; padding: 10px; border-radius: 4px; background: #f8fafc;">
        <div style="font-size: 8pt; font-weight: 800; color: #0b4558; margin-bottom: 4px;">Strategic Location</div>
        <p style="font-size: 7.5pt; color: #475569;">Situated in Kalulini, Makueni County along the serene Eastern Kenya topography, providing an idyllic, tranquil environment far removed from urban distractions, ideal for intensive academic focus.</p>
      </div>
      <div style="border: 1px solid #cbd5e1; padding: 10px; border-radius: 4px; background: #f8fafc;">
        <div style="font-size: 8pt; font-weight: 800; color: #0b4558; margin-bottom: 4px;">Institutional Governance</div>
        <p style="font-size: 7.5pt; color: #475569;">Governed by an active Board of Management (BOM) comprising seasoned educationists, corporate leaders, and community trustees, supported by an energetic Parents-Teachers Association (PTA).</p>
      </div>
    </div>
  </div>

  <!-- PAGE 3: VISION, MISSION, CORE VALUES & CURRICULUM -->
  <div class="page-break"></div>
  <div class="page-container">
    ${renderRunningHeader('2026 Academic Prospectus & Information Guide', 'KBHS/PUB/2026/001')}

    <div class="section-heading">
      <span><span class="section-num">03</span> Vision, Mission &amp; Foundational Core Values</span>
      <span style="font-size: 7pt; color: #64748b;">Guiding Principles</span>
    </div>

    <div class="form-grid-2" style="margin-bottom: 12px;">
      <div style="background: #eafaff; border: 1.5px solid #007fa3; padding: 12px; border-radius: 6px;">
        <div style="font-size: 8.5pt; font-weight: 900; color: #07536a; text-transform: uppercase;">Our Institutional Vision</div>
        <p style="font-size: 8pt; color: #0f172a; margin-top: 4px; line-height: 1.4;">
          To be a leading center of academic excellence and holistic character formation that produces upright, self-driven, and transformational leaders for the nation and the world.
        </p>
      </div>
      <div style="background: #fffbea; border: 1.5px solid #d9a900; padding: 12px; border-radius: 6px;">
        <div style="font-size: 8.5pt; font-weight: 900; color: #78350f; text-transform: uppercase;">Our Institutional Mission</div>
        <p style="font-size: 8pt; color: #0f172a; margin-top: 4px; line-height: 1.4;">
          To provide quality, holistic, and value-based secondary education that nurtures cognitive excellence, empirical curiosity, moral integrity, physical fitness, and servant leadership.
        </p>
      </div>
    </div>

    <div style="font-size: 8.5pt; font-weight: 800; color: #0b4558; text-transform: uppercase; margin: 10px 0 6px 0;">Our Six Pillars of Excellence</div>
    <table class="doc-table">
      <thead>
        <tr>
          <th style="width: 25%;">Core Value Pillar</th>
          <th style="width: 75%;">Practical Operational Meaning for Scholars</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Academic Distinction</strong></td>
          <td>Relentless pursuit of intellectual mastery, disciplined personal revision, punctuality in prep, and active classroom participation.</td>
        </tr>
        <tr>
          <td><strong>Moral Integrity</strong></td>
          <td>Unwavering honesty in examinations, transparent peer relationships, respect for personal truth, and rejection of all forms of corruption or cheating.</td>
        </tr>
        <tr>
          <td><strong>Discipline &amp; Self-Control</strong></td>
          <td>Adherence to the daily school routine without coercion, respect for the uniform, punctuality, and stewardship of personal time and property.</td>
        </tr>
        <tr>
          <td><strong>Servant Leadership</strong></td>
          <td>Leading through humility, empathy, and active participation in community service, mentorship of juniors, and institutional duties.</td>
        </tr>
        <tr>
          <td><strong>Innovation &amp; Research</strong></td>
          <td>Application of science and technology to resolve real-world community challenges through science fairs, robotics, and creative arts.</td>
        </tr>
        <tr>
          <td><strong>Brotherhood &amp; Respect</strong></td>
          <td>Fostering harmony across all ethnic and social backgrounds, zero tolerance for bullying or harassment, and mutual peer upliftment.</td>
        </tr>
      </tbody>
    </table>

    <div class="section-heading" style="margin-top: 14px;">
      <span><span class="section-num">04</span> Academic Curriculum &amp; Subject Departments</span>
      <span style="font-size: 7pt; color: #64748b;">KNEC / MOE Approved</span>
    </div>

    <p style="font-size: 8pt; color: #334155; margin-bottom: 6px;">
      Kalulini Boys High School offers a comprehensive secondary curriculum accredited by the Ministry of Education and the Kenya National Examinations Council (KNEC), seamlessly transitioning between the 8-4-4 system and the Senior School Competency Based Curriculum (CBC) pathways.
    </p>

    <div class="form-grid-2">
      <div style="border: 1px solid #cbd5e1; padding: 8px 10px; border-radius: 4px; background: #ffffff;">
        <div style="font-size: 8pt; font-weight: 800; color: #0b4558; border-bottom: 1px solid #e2e8f0; padding-bottom: 3px; margin-bottom: 4px;">Cluster 1: Compulsory Core Subjects</div>
        <ul style="font-size: 7.5pt; color: #334155; margin-left: 14px; line-height: 1.45;">
          <li><strong>Mathematics:</strong> Advanced Pure Mathematics, Statistics, Geometry &amp; Calculus foundations.</li>
          <li><strong>English:</strong> Grammar, Comprehension, Public Speaking, and Classical/African Literature.</li>
          <li><strong>Kiswahili:</strong> Sarufi, Insha, Fasihi Simulizi, and Tamthilia.</li>
        </ul>
      </div>

      <div style="border: 1px solid #cbd5e1; padding: 8px 10px; border-radius: 4px; background: #ffffff;">
        <div style="font-size: 8pt; font-weight: 800; color: #0b4558; border-bottom: 1px solid #e2e8f0; padding-bottom: 3px; margin-bottom: 4px;">Cluster 2: Pure &amp; Applied Sciences</div>
        <ul style="font-size: 7.5pt; color: #334155; margin-left: 14px; line-height: 1.45;">
          <li><strong>Physics:</strong> Mechanics, Optics, Electromagnetism, Electronics, and Thermodynamics.</li>
          <li><strong>Chemistry:</strong> Organic, Inorganic, Stoichiometry, and Quantitative Laboratory Analysis.</li>
          <li><strong>Biology:</strong> Genetics, Physiology, Ecology, Cell Biology, and Field Studies.</li>
        </ul>
      </div>

      <div style="border: 1px solid #cbd5e1; padding: 8px 10px; border-radius: 4px; background: #ffffff;">
        <div style="font-size: 8pt; font-weight: 800; color: #0b4558; border-bottom: 1px solid #e2e8f0; padding-bottom: 3px; margin-bottom: 4px;">Cluster 3: Humanities &amp; Social Sciences</div>
        <ul style="font-size: 7.5pt; color: #334155; margin-left: 14px; line-height: 1.45;">
          <li><strong>History &amp; Government:</strong> Kenyan, African, and World History; Constitutional governance.</li>
          <li><strong>Geography:</strong> Physical, Human, and Economic Geography; Field mapping &amp; GIS.</li>
          <li><strong>Christian Religious Education (CRE):</strong> Old/New Testament ethics and contemporary moral living.</li>
        </ul>
      </div>

      <div style="border: 1px solid #cbd5e1; padding: 8px 10px; border-radius: 4px; background: #ffffff;">
        <div style="font-size: 8pt; font-weight: 800; color: #0b4558; border-bottom: 1px solid #e2e8f0; padding-bottom: 3px; margin-bottom: 4px;">Cluster 4: Technical &amp; Applied Sciences</div>
        <ul style="font-size: 7.5pt; color: #334155; margin-left: 14px; line-height: 1.45;">
          <li><strong>Computer Studies:</strong> Software programming, databases, web development, and digital ethics.</li>
          <li><strong>Agriculture:</strong> Crop husbandry, livestock production, soil science, and agribusiness.</li>
          <li><strong>Business Studies:</strong> Accounting, Commerce, Economics, and Entrepreneurship.</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- PAGE 4: FACILITIES & INFRASTRUCTURE -->
  <div class="page-break"></div>
  <div class="page-container">
    ${renderRunningHeader('2026 Academic Prospectus & Information Guide', 'KBHS/PUB/2026/001')}

    <div class="section-heading">
      <span><span class="section-num">05</span> World-Class Learning &amp; Boarding Infrastructure</span>
      <span style="font-size: 7pt; color: #64748b;">Campus Facilities</span>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 10px 0;">
      <div style="border: 1px solid #cbd5e1; border-radius: 4px; overflow: hidden; background: #ffffff;">
        <div style="height: 130px; overflow: hidden;">
          <img src="${labImg}" style="width: 100%; height: 100%; object-fit: cover;" alt="Science Lab" />
        </div>
        <div style="padding: 8px 10px;">
          <div style="font-size: 8pt; font-weight: 800; color: #0b4558;">Modern Science &amp; Innovation Complex</div>
          <p style="font-size: 7pt; color: #475569; margin-top: 2px;">
            Three independent, fully equipped laboratories for Physics, Chemistry, and Biology complying with international safety standards, digital sensors, prep rooms, and emergency eye-wash stations.
          </p>
        </div>
      </div>

      <div style="border: 1px solid #cbd5e1; border-radius: 4px; overflow: hidden; background: #ffffff;">
        <div style="height: 130px; overflow: hidden;">
          <img src="${ictImg}" style="width: 100%; height: 100%; object-fit: cover;" alt="ICT Suite" />
        </div>
        <div style="padding: 8px 10px;">
          <div style="font-size: 8pt; font-weight: 800; color: #0b4558;">Ultra-Modern ICT Center &amp; E-Library</div>
          <p style="font-size: 7pt; color: #475569; margin-top: 2px;">
            100 dedicated computer workstations powered by dedicated fiber broadband, connected to the Kenya Education Cloud and digital revision archives with uninterrupted solar backup power.
          </p>
        </div>
      </div>

      <div style="border: 1px solid #cbd5e1; border-radius: 4px; overflow: hidden; background: #ffffff;">
        <div style="height: 130px; overflow: hidden;">
          <img src="${dormImg}" style="width: 100%; height: 100%; object-fit: cover;" alt="Boarding Dormitory" />
        </div>
        <div style="padding: 8px 10px;">
          <div style="font-size: 8pt; font-weight: 800; color: #0b4558;">Modern Residential Boarding Houses</div>
          <p style="font-size: 7pt; color: #475569; margin-top: 2px;">
            Four residential houses (Simba, Chui, Kifaru, and Twiga) featuring spacious cubicles, robust personal lockers, hot shower systems, dedicated resident housemasters, and 24/7 security surveillance.
          </p>
        </div>
      </div>

      <div style="border: 1px solid #cbd5e1; border-radius: 4px; overflow: hidden; background: #ffffff;">
        <div style="height: 130px; overflow: hidden;">
          <img src="${sportsImg}" style="width: 100%; height: 100%; object-fit: cover;" alt="Sports Complex" />
        </div>
        <div style="padding: 8px 10px;">
          <div style="font-size: 8pt; font-weight: 800; color: #0b4558;">Sports Stadium &amp; Recreation Complex</div>
          <p style="font-size: 7pt; color: #475569; margin-top: 2px;">
            Full-size standard rugby and football pitches, standard 400m running track, outdoor basketball and volleyball courts, table tennis pavilion, and fully equipped physical fitness amenities.
          </p>
        </div>
      </div>
    </div>

    <div class="form-grid-3" style="margin-top: 6px;">
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px; border-radius: 4px;">
        <div style="font-size: 7.5pt; font-weight: 800; color: #0b4558;">Assembly &amp; Dining Hall</div>
        <p style="font-size: 7pt; color: #64748b; margin-top: 2px;">1,000-seat multi-purpose auditorium for meals, devotions, academic clinics, and cultural drama presentations.</p>
      </div>
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px; border-radius: 4px;">
        <div style="font-size: 7.5pt; font-weight: 800; color: #0b4558;">School Sanatorium</div>
        <p style="font-size: 7pt; color: #64748b; margin-top: 2px;">On-campus 12-bed infirmary staffed by resident clinical nurses with 24-hour ambulance liaison to Kalulini Sub-County Hospital.</p>
      </div>
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px; border-radius: 4px;">
        <div style="font-size: 7.5pt; font-weight: 800; color: #0b4558;">Borehole Water &amp; Green Energy</div>
        <p style="font-size: 7pt; color: #64748b; margin-top: 2px;">High-yield solar-pumped borehole water treatment plant ensuring continuous pure clean drinking water across campus.</p>
      </div>
    </div>
  </div>

  <!-- PAGE 5: CO-CURRICULAR & ADMISSION OVERVIEW -->
  <div class="page-break"></div>
  <div class="page-container">
    ${renderRunningHeader('2026 Academic Prospectus & Information Guide', 'KBHS/PUB/2026/001')}

    <div class="section-heading">
      <span><span class="section-num">06</span> Co-Curricular Distinction &amp; Student Societies</span>
      <span style="font-size: 7pt; color: #64748b;">Holistic Development</span>
    </div>

    <p style="font-size: 8pt; color: #334155; margin-bottom: 8px;">
      Participation in at least one club or sport is mandatory for every student at Kalulini Boys. We believe physical conditioning and creative expression build teamwork, resilience, and lifelong emotional intelligence.
    </p>

    <div class="form-grid-2">
      <div style="border: 1px solid #cbd5e1; padding: 8px 10px; border-radius: 4px;">
        <div style="font-size: 8pt; font-weight: 800; color: #007fa3;">Sports &amp; Athletics Disciplines</div>
        <ul style="font-size: 7.5pt; color: #334155; margin-left: 14px; margin-top: 4px; line-height: 1.45;">
          <li><strong>Rugby (15s &amp; 7s):</strong> Renowned regional contenders with seasoned coaching staff.</li>
          <li><strong>Football (Soccer):</strong> Inter-school tournament finalists and talent incubator.</li>
          <li><strong>Athletics &amp; Cross Country:</strong> Long-distance and sprint champions in county meets.</li>
          <li><strong>Basketball &amp; Volleyball:</strong> Competitive league teams with dedicated courts.</li>
          <li><strong>Indoor Games:</strong> Chess, Scrabble, Table Tennis, and Badminton clubs.</li>
        </ul>
      </div>

      <div style="border: 1px solid #cbd5e1; padding: 8px 10px; border-radius: 4px;">
        <div style="font-size: 8pt; font-weight: 800; color: #007fa3;">Academic Clubs &amp; Service Societies</div>
        <ul style="font-size: 7.5pt; color: #334155; margin-left: 14px; margin-top: 4px; line-height: 1.45;">
          <li><strong>STEM &amp; Robotics Club:</strong> Coding, microcontroller circuit building, and KSEF exhibits.</li>
          <li><strong>Drama &amp; Music Society:</strong> Multi-lingual plays, choral verse, and traditional folk dance.</li>
          <li><strong>Scouts Movement &amp; St. John Ambulance:</strong> First aid response, drill leadership, survival skills.</li>
          <li><strong>Debating &amp; Model UN Club:</strong> Public speaking, parliamentary debate, and diplomacy.</li>
          <li><strong>Young Farmers &amp; Environmental Club:</strong> School orchard management and SDG tree planting.</li>
        </ul>
      </div>
    </div>

    <div class="section-heading" style="margin-top: 14px;">
      <span><span class="section-num">07</span> Admission Protocols &amp; Direct Selection Overview</span>
      <span style="font-size: 7pt; color: #64748b;">Enrolment Criteria</span>
    </div>

    <div class="form-grid-3" style="margin-top: 8px;">
      <div style="background: #f8fafc; border: 1px solid #cbd5e1; padding: 10px; border-radius: 4px;">
        <div style="font-size: 8pt; font-weight: 800; color: #0b4558;">Form 1 Ministry Selection</div>
        <p style="font-size: 7.5pt; color: #475569; margin-top: 4px;">
          National placement via the Ministry of Education NEMIS portal. Candidates with demonstrated high aggregate performance and sound moral discipline are allocated places directly.
        </p>
      </div>

      <div style="background: #f8fafc; border: 1px solid #cbd5e1; padding: 10px; border-radius: 4px;">
        <div style="font-size: 8pt; font-weight: 800; color: #0b4558;">Special Direct Applications</div>
        <p style="font-size: 7.5pt; color: #475569; margin-top: 4px;">
          Limited BOM replacement slots available for candidates of exemplary character, proven talent in STEM or athletics, upon formal application to the Chief Principal.
        </p>
      </div>

      <div style="background: #f8fafc; border: 1px solid #cbd5e1; padding: 10px; border-radius: 4px;">
        <div style="font-size: 8pt; font-weight: 800; color: #0b4558;">Inter-School Transfers</div>
        <p style="font-size: 7.5pt; color: #475569; margin-top: 4px;">
          Strictly regulated transfers into Forms 2 and 3 subject to vacancies, entrance assessment examination, and official NEMIS clearance from the releasing school.
        </p>
      </div>
    </div>

    <div class="sign-off-container" style="margin-top: 16px;">
      <div>
        ${getSignatureSvg('Dr. Josephat M. Ndambuki, Ph.D.', 'Chief Principal & Secretary to BOM')}
      </div>
      <div>
        ${getRubberStampSvg({ office: 'OFFICE OF THE CHIEF PRINCIPAL', date: 'JAN 2026', ref: 'PROSPECTUS-2026' })}
      </div>
    </div>
  </div>
  `;
}

module.exports = {
  generateProspectusHtml
};
