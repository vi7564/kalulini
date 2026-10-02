// scripts/docs/packingList.js
const {
  renderLetterhead,
  renderRunningHeader,
  renderDocHeader,
  getRubberStampSvg,
  getSignatureSvg,
  SCHOOL_INFO
} = require('../shared/components');

function generatePackingListHtml() {
  return `
  <!-- PAGE 1: UNIFORM & BEDDING CHECKLIST -->
  <div class="page-container">
    ${renderLetterhead({ showCrest: true })}
    ${renderDocHeader({
      title: 'Boarding Packing List & Dormitory Uniform Standards',
      subTitle: 'Mandatory Residential Requirements & Equipment Specifications for Resident Scholars',
      refNo: 'KBHS/BRD/2026/007',
      issueDate: 'January 2026',
      version: 'Rev. 2026.1',
      category: 'Boarding'
    })}

    <div class="info-box">
      <strong>BOARDING MASTER'S DIRECTIVE:</strong> All resident students must report with the exact quantities and approved specifications outlined herein. Luggage inspection will be conducted at the main school gate upon arrival. Non-compliant items will be rejected.
    </div>

    <div class="section-heading">
      <span><span class="section-num">01</span> Official Institutional Uniform Specifications</span>
      <span style="font-size: 7pt; color: #64748b;">Class &amp; Formal Wear</span>
    </div>

    <table class="doc-table">
      <thead>
        <tr>
          <th style="width: 5%;">No</th>
          <th style="width: 40%;">Uniform Item Description</th>
          <th style="width: 15%; text-align: center;">Required Qty</th>
          <th style="width: 25%;">Color &amp; Cut Standard</th>
          <th style="width: 15%; text-align: center;">Gate Checked</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>School Blazer with Embroidered Crest</td>
          <td style="text-align: center;">1 Piece</td>
          <td>Navy Blue, single-breasted, brass buttons</td>
          <td style="text-align: center;"><div class="check-square"></div></td>
        </tr>
        <tr>
          <td>2</td>
          <td>White Long-Sleeve Shirts (Cotton)</td>
          <td style="text-align: center;">3 Pieces</td>
          <td>Plain white, hard-collar, button-cuff</td>
          <td style="text-align: center;"><div class="check-square"></div></td>
        </tr>
        <tr>
          <td>3</td>
          <td>Charcoal Grey School Trousers</td>
          <td style="text-align: center;">3 Pairs</td>
          <td>Standard straight cut (no tight/skinny fit)</td>
          <td style="text-align: center;"><div class="check-square"></div></td>
        </tr>
        <tr>
          <td>4</td>
          <td>Official School Tie</td>
          <td style="text-align: center;">2 Pieces</td>
          <td>Navy with gold and aqua diagonal stripes</td>
          <td style="text-align: center;"><div class="check-square"></div></td>
        </tr>
        <tr>
          <td>5</td>
          <td>V-Neck Knit Sweaters (Long-sleeved)</td>
          <td style="text-align: center;">2 Pieces</td>
          <td>Navy with gold/aqua border trims</td>
          <td style="text-align: center;"><div class="check-square"></div></td>
        </tr>
        <tr>
          <td>6</td>
          <td>Sleeveless School Sweater / Vest</td>
          <td style="text-align: center;">1 Piece</td>
          <td>Navy knit with school crest border</td>
          <td style="text-align: center;"><div class="check-square"></div></td>
        </tr>
        <tr>
          <td>7</td>
          <td>Official School Tracksuit</td>
          <td style="text-align: center;">1 Full Set</td>
          <td>Aqua &amp; navy with school branding (Games/Prep)</td>
          <td style="text-align: center;"><div class="check-square"></div></td>
        </tr>
        <tr>
          <td>8</td>
          <td>House Sports T-Shirt</td>
          <td style="text-align: center;">2 Pieces</td>
          <td>Simba (Gold), Chui (Blue), Kifaru (Green), Twiga (Purple)</td>
          <td style="text-align: center;"><div class="check-square"></div></td>
        </tr>
        <tr>
          <td>9</td>
          <td>White Laboratory Science Coat</td>
          <td style="text-align: center;">1 Piece</td>
          <td>White heavy cotton, knee-length, breast pocket</td>
          <td style="text-align: center;"><div class="check-square"></div></td>
        </tr>
        <tr>
          <td>10</td>
          <td>Black Leather Shoes &amp; Socks</td>
          <td style="text-align: center;">2 Pairs / 4 Pairs</td>
          <td>Flat-soled lace-up leather shoes; grey socks</td>
          <td style="text-align: center;"><div class="check-square"></div></td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- PAGE 2: BEDDING & TOILETRIES -->
  <div class="page-break"></div>
  <div class="page-container">
    ${renderRunningHeader('Boarding Packing List & Dormitory Uniform Standards', 'KBHS/BRD/2026/007')}

    <div class="section-heading">
      <span><span class="section-num">02</span> Bedding, Dormitory Linen &amp; Secure Storage</span>
      <span style="font-size: 7pt; color: #64748b;">Residential Essentials</span>
    </div>

    <table class="doc-table">
      <thead>
        <tr>
          <th style="width: 5%;">No</th>
          <th style="width: 45%;">Bedding &amp; Storage Equipment</th>
          <th style="width: 15%; text-align: center;">Required Qty</th>
          <th style="width: 20%;">Approved Specification</th>
          <th style="width: 15%; text-align: center;">Gate Checked</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>High-Density Foam Mattress</td>
          <td style="text-align: center;">1 Piece</td>
          <td>Standard 3 x 6 feet, 4-inch thickness</td>
          <td style="text-align: center;"><div class="check-square"></div></td>
        </tr>
        <tr>
          <td>2</td>
          <td>Sky Blue Cotton Bed Sheets</td>
          <td style="text-align: center;">2 Pairs</td>
          <td>Plain light sky-blue color (no prints)</td>
          <td style="text-align: center;"><div class="check-square"></div></td>
        </tr>
        <tr>
          <td>3</td>
          <td>Official School Branded Bedspread</td>
          <td style="text-align: center;">1 Piece</td>
          <td>Purchased at school uniform store</td>
          <td style="text-align: center;"><div class="check-square"></div></td>
        </tr>
        <tr>
          <td>4</td>
          <td>Heavy Warm Blankets</td>
          <td style="text-align: center;">2 Pieces</td>
          <td>Warm wool/acrylic, dark solid shade</td>
          <td style="text-align: center;"><div class="check-square"></div></td>
        </tr>
        <tr>
          <td>5</td>
          <td>Sleeping Pillow &amp; 2 Pillowcases</td>
          <td style="text-align: center;">1 Set</td>
          <td>Standard size with plain white cases</td>
          <td style="text-align: center;"><div class="check-square"></div></td>
        </tr>
        <tr>
          <td>6</td>
          <td>Insecticide-Treated Mosquito Net</td>
          <td style="text-align: center;">1 Piece</td>
          <td>Rectangular standard single-bed size</td>
          <td style="text-align: center;"><div class="check-square"></div></td>
        </tr>
        <tr>
          <td>7</td>
          <td>Heavy Metal Trunk / Box &amp; Padlocks</td>
          <td style="text-align: center;">1 Trunk + 2 Locks</td>
          <td>Name clearly painted in white; brass padlocks</td>
          <td style="text-align: center;"><div class="check-square"></div></td>
        </tr>
      </tbody>
    </table>

    <div class="section-heading" style="margin-top: 12px;">
      <span><span class="section-num">03</span> Personal Hygiene, Toiletries &amp; Cleaning Kit</span>
      <span style="font-size: 7pt; color: #64748b;">Sanitation Supplies</span>
    </div>

    <table class="doc-table">
      <thead>
        <tr>
          <th style="width: 5%;">No</th>
          <th style="width: 45%;">Personal Toiletries Item</th>
          <th style="width: 25%; text-align: center;">Recommended Quantity</th>
          <th style="width: 25%; text-align: center;">Check Verification</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Bath Towels (Heavy cotton)</td>
          <td style="text-align: center;">2 Pieces</td>
          <td style="text-align: center;"><div class="check-square"></div> Verified</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Bathing Soap &amp; Laundry Washing Detergent</td>
          <td style="text-align: center;">Sufficient for entire term (4-6 bars)</td>
          <td style="text-align: center;"><div class="check-square"></div> Verified</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Toothbrush &amp; Large Toothpaste Tube</td>
          <td style="text-align: center;">2 Brushes / 2 Tubes</td>
          <td style="text-align: center;"><div class="check-square"></div> Verified</td>
        </tr>
        <tr>
          <td>4</td>
          <td>Black Shoe Polish &amp; Shoe Polishing Brush</td>
          <td style="text-align: center;">2 Tins (Kiwi) / 1 Stiff Brush</td>
          <td style="text-align: center;"><div class="check-square"></div> Verified</td>
        </tr>
        <tr>
          <td>5</td>
          <td>Durable Bathroom Slippers / Flip-Flops</td>
          <td style="text-align: center;">1 Pair</td>
          <td style="text-align: center;"><div class="check-square"></div> Verified</td>
        </tr>
        <tr>
          <td>6</td>
          <td>10-Litre Plastic Bucket &amp; Small Washing Basin</td>
          <td style="text-align: center;">1 Bucket + 1 Basin</td>
          <td style="text-align: center;"><div class="check-square"></div> Verified</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- PAGE 3: STATIONERY, CUTLERY, CONTRABAND & SIGN-OFF -->
  <div class="page-break"></div>
  <div class="page-container">
    ${renderRunningHeader('Boarding Packing List & Dormitory Uniform Standards', 'KBHS/BRD/2026/007')}

    <div class="section-heading">
      <span><span class="section-num">04</span> Academic Stationery &amp; Dining Hall Cutlery</span>
      <span style="font-size: 7pt; color: #64748b;">Study &amp; Dining Kit</span>
    </div>

    <div class="form-grid-2">
      <div style="border: 1px solid #cbd5e1; padding: 8px 10px; border-radius: 4px; background: #ffffff;">
        <div style="font-size: 8pt; font-weight: 800; color: #0b4558; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px;">Academic Stationery Kit:</div>
        <ul style="font-size: 7.5pt; color: #334155; margin-left: 14px; margin-top: 4px; line-height: 1.45;">
          <li>Oxford Mathematical Geometry Set (Metal case).</li>
          <li>KNEC Approved Scientific Calculator (Casio fx-82MS or equivalent).</li>
          <li>Holy Bible (Good News or RSV) / Holy Quran.</li>
          <li>A4 Exercise Books (12 pieces, 200 pages each), Blue/Black pens, pencils, ruler.</li>
          <li>Spring Folders for revision papers &amp; handouts (4 pieces).</li>
        </ul>
      </div>

      <div style="border: 1px solid #cbd5e1; padding: 8px 10px; border-radius: 4px; background: #ffffff;">
        <div style="font-size: 8pt; font-weight: 800; color: #0b4558; border-bottom: 1px solid #e2e8f0; padding-bottom: 2px;">Dining Hall Cutlery:</div>
        <ul style="font-size: 7.5pt; color: #334155; margin-left: 14px; margin-top: 4px; line-height: 1.45;">
          <li>1 Stainless Steel Food Plate (Engraved with student name).</li>
          <li>1 Stainless Steel Drinking Cup / Mug (With handle).</li>
          <li>2 Stainless Steel Table Spoons &amp; 1 Table Fork.</li>
          <li>1 Food-grade Insulated Water Bottle (1 Litre capacity).</li>
          <li><strong>Note:</strong> Table knives, glass mugs, and ceramic plates are strictly prohibited.</li>
        </ul>
      </div>
    </div>

    <div class="section-heading" style="margin-top: 10px;">
      <span><span class="section-num">05</span> Prohibited Contraband Warning</span>
      <span style="font-size: 7pt; color: #64748b;">Zero Tolerance</span>
    </div>

    <div class="notice-box">
      <strong>STRICTLY FORBIDDEN IN BOARDING HOUSES:</strong> Mobile phones, electronic radios, heating coils, immersion heaters, boiling rings, electric irons, candles, knives, matchboxes, civilian clothing, and perishable cooked food from outside. Such items will be permanently confiscated and destroyed upon inspection.
    </div>

    <div class="sign-off-container" style="margin-top: 14px;">
      <div>
        ${getSignatureSvg('Mr. Titus Kilonzo', 'Senior Boarding Master & Student Welfare')}
      </div>
      <div>
        ${getSignatureSvg('Dr. Josephat M. Ndambuki, Ph.D.', 'Chief Principal & Secretary to BOM')}
      </div>
      <div>
        ${getRubberStampSvg({ office: 'DIRECTORATE OF BOARDING & RESIDENTIAL SERVICES', date: 'JAN 2026', ref: 'PACKING APPROVED' })}
      </div>
    </div>
  </div>
  `;
}

module.exports = {
  generatePackingListHtml
};
