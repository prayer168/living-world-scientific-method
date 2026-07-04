// 生活應用:每則情境專屬、會循環播放、帶箭頭/標籤的 SVG。
// 匯出 key -> svg 對照表，由 app.js 依 content.json 的 anim 鍵注入。
// 靜止（reduced-motion）時畫面仍看得懂。

const seed = `
<svg viewBox="0 0 260 170" role="img" aria-label="兩杯綠豆:有澆水的發芽、沒澆水的沒發芽">
  <rect x="0" y="0" width="260" height="170" fill="none"/>
  <!-- 左杯:有澆水,發芽 -->
  <g>
    <path d="M30 150 L45 90 H115 L100 150 Z" fill="#cfe8ff" stroke="#6fa8d6" stroke-width="2"/>
    <rect x="45" y="118" width="63" height="32" fill="#7b5230"/>
    <!-- 發芽的苗 -->
    <g class="anim-grow">
      <rect x="74" y="80" width="4" height="42" fill="#3a8f3a"/>
      <path d="M76 92 q-18 -6 -22 -22 q20 2 22 22" fill="#4caf50"/>
      <path d="M76 86 q18 -6 22 -22 q-20 2 -22 22" fill="#5cc45c"/>
    </g>
    <!-- 水滴 -->
    <circle class="anim-drop" cx="76" cy="60" r="4" fill="#4aa3e0"/>
    <text x="72" y="166" font-size="12" fill="#1f6b54" text-anchor="middle" font-weight="700">有澆水</text>
    <text x="72" y="76" font-size="11" fill="#2e8b57" text-anchor="middle">發芽 ✓</text>
  </g>
  <!-- 右杯:沒澆水,沒發芽 -->
  <g>
    <path d="M150 150 L165 90 H235 L220 150 Z" fill="#e9eef0" stroke="#b6c2c8" stroke-width="2"/>
    <rect x="165" y="118" width="63" height="32" fill="#9b7b58"/>
    <circle cx="188" cy="134" r="3" fill="#6d4c2f"/>
    <circle cx="205" cy="140" r="3" fill="#6d4c2f"/>
    <text x="196" y="166" font-size="12" fill="#8a5a2b" text-anchor="middle" font-weight="700">沒澆水</text>
    <text x="196" y="108" font-size="11" fill="#b5651d" text-anchor="middle">未發芽 ✗</text>
  </g>
  <line x1="130" y1="30" x2="130" y2="150" stroke="#d7e5dc" stroke-width="2" stroke-dasharray="4 4"/>
  <text x="130" y="20" font-size="11" fill="#4a5b52" text-anchor="middle">只差「水」這一個變因</text>
</svg>`;

const microbe = `
<svg viewBox="0 0 260 170" role="img" aria-label="顯微鏡下一滴水中游動的微生物">
  <circle cx="130" cy="90" r="72" fill="#eaf6ff" stroke="#6fa8d6" stroke-width="3"/>
  <clipPath id="dropClip"><circle cx="130" cy="90" r="70"/></clipPath>
  <g clip-path="url(#dropClip)">
    <g class="anim-wander"><ellipse cx="100" cy="70" rx="14" ry="8" fill="#7fc47f" stroke="#3a8f3a" stroke-width="1.5"/><circle cx="100" cy="70" r="3" fill="#2e6b2e"/></g>
    <g class="anim-swim"><ellipse cx="160" cy="110" rx="16" ry="7" fill="#8fd0e0" stroke="#2e6fb7" stroke-width="1.5"/><path d="M176 110 l10 -5 v10 z" fill="#2e6fb7"/></g>
    <g class="anim-wander" style="animation-delay:-2s"><circle cx="150" cy="60" r="9" fill="#f2c14e" stroke="#c99a1e" stroke-width="1.5"/><circle cx="147" cy="58" r="2" fill="#7a5310"/></g>
    <g class="anim-swim" style="animation-delay:-1.5s"><ellipse cx="95" cy="120" rx="12" ry="6" fill="#c58fd0" stroke="#8e44ad" stroke-width="1.5"/></g>
  </g>
  <text x="130" y="178" font-size="12" fill="#1f6b54" text-anchor="middle" font-weight="700">圓形視野 · 400×</text>
  <text x="210" y="40" font-size="11" fill="#4a5b52">會游動</text>
  <line x1="205" y1="44" x2="180" y2="70" stroke="#4a5b52" stroke-width="1" marker-end="url(#aArrow)"/>
  <defs><marker id="aArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#4a5b52"/></marker></defs>
</svg>`;

const label = `
<svg viewBox="0 0 260 170" role="img" aria-label="兩款飲料含糖量長條圖比較">
  <line x1="40" y1="20" x2="40" y2="140" stroke="#4a5b52" stroke-width="2"/>
  <line x1="40" y1="140" x2="240" y2="140" stroke="#4a5b52" stroke-width="2"/>
  <text x="14" y="80" font-size="10" fill="#4a5b52" transform="rotate(-90 14 80)">含糖量 (g/100ml)</text>
  <!-- A 高 -->
  <rect class="anim-bar" x="80" y="45" width="46" height="95" fill="#e4572e" rx="3"/>
  <text x="103" y="158" font-size="12" fill="#8a2f18" text-anchor="middle" font-weight="700">飲料A</text>
  <text x="103" y="40" font-size="12" fill="#8a2f18" text-anchor="middle">11 g</text>
  <!-- B 低 -->
  <rect class="anim-bar" x="160" y="100" width="46" height="40" fill="#2e8b57" rx="3" style="animation-delay:.3s"/>
  <text x="183" y="158" font-size="12" fill="#1f6b54" text-anchor="middle" font-weight="700">飲料B</text>
  <text x="183" y="95" font-size="12" fill="#1f6b54" text-anchor="middle">5 g</text>
  <path d="M215 60 q22 20 0 40" fill="none" stroke="#2e8b57" stroke-width="2" marker-end="url(#lArrow)"/>
  <text x="228" y="82" font-size="10" fill="#2e8b57">糖較少</text>
  <defs><marker id="lArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#2e8b57"/></marker></defs>
</svg>`;

const weather = `
<svg viewBox="0 0 260 170" role="img" aria-label="每日氣溫折線圖逐日描點">
  <line x1="34" y1="20" x2="34" y2="140" stroke="#4a5b52" stroke-width="2"/>
  <line x1="34" y1="140" x2="244" y2="140" stroke="#4a5b52" stroke-width="2"/>
  <text x="14" y="80" font-size="10" fill="#4a5b52" transform="rotate(-90 14 80)">氣溫 (°C)</text>
  <text x="130" y="160" font-size="11" fill="#4a5b52" text-anchor="middle">日期 →</text>
  <polyline class="flow-line" points="50,110 90,95 130,70 170,80 210,50"
    fill="none" stroke="#2e6fb7" stroke-width="3" stroke-dasharray="260" stroke-dashoffset="0"/>
  <g fill="#e4572e">
    <circle class="anim-pulse" cx="50" cy="110" r="4"/>
    <circle class="anim-pulse" cx="90" cy="95" r="4" style="animation-delay:.3s"/>
    <circle class="anim-pulse" cx="130" cy="70" r="4" style="animation-delay:.6s"/>
    <circle class="anim-pulse" cx="170" cy="80" r="4" style="animation-delay:.9s"/>
    <circle class="anim-pulse" cx="210" cy="50" r="4" style="animation-delay:1.2s"/>
  </g>
  <circle class="anim-pulse" cx="210" cy="40" r="12" fill="#f9d448"/>
  <text x="130" y="16" font-size="11" fill="#1f6b54" text-anchor="middle" font-weight="700">定時定法記錄 → 看出趨勢</text>
</svg>`;

const handwash = `
<svg viewBox="0 0 260 170" role="img" aria-label="洗手前後手上殘留多寡對照">
  <!-- 前 -->
  <g>
    <path d="M60 60 q-6 -22 8 -24 q4 -14 10 0 q6 -14 10 0 q6 -12 8 2 q10 4 4 30 q-2 26 -22 30 q-22 0 -26 -20 q0 -14 8 -14 z" fill="#f4d3b0" stroke="#c99a70" stroke-width="1.5"/>
    <g fill="#8e44ad" class="anim-fade">
      <circle cx="66" cy="46" r="3"/><circle cx="78" cy="40" r="3"/><circle cx="88" cy="50" r="3"/>
      <circle cx="72" cy="58" r="3"/><circle cx="84" cy="62" r="3"/><circle cx="62" cy="66" r="3"/>
    </g>
    <text x="70" y="140" font-size="12" fill="#8a2f18" text-anchor="middle" font-weight="700">洗手前</text>
    <text x="70" y="156" font-size="10" fill="#8e44ad" text-anchor="middle">殘留多</text>
  </g>
  <path d="M108 90 h44" stroke="#2e8b6f" stroke-width="3" marker-end="url(#hArrow)"/>
  <text x="130" y="82" font-size="11" fill="#1f6b54" text-anchor="middle">洗手</text>
  <!-- 後 -->
  <g>
    <path d="M180 60 q-6 -22 8 -24 q4 -14 10 0 q6 -14 10 0 q6 -12 8 2 q10 4 4 30 q-2 26 -22 30 q-22 0 -26 -20 q0 -14 8 -14 z" fill="#f4d3b0" stroke="#c99a70" stroke-width="1.5"/>
    <circle cx="196" cy="52" r="3" fill="#c9a9dd" class="anim-fade"/>
    <text x="190" y="140" font-size="12" fill="#1f6b54" text-anchor="middle" font-weight="700">洗手後</text>
    <text x="190" y="156" font-size="10" fill="#2e8b57" text-anchor="middle">殘留少 ✓</text>
  </g>
  <defs><marker id="hArrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" fill="#2e8b6f"/></marker></defs>
</svg>`;

const plantlight = `
<svg viewBox="0 0 260 170" role="img" aria-label="盆栽朝窗戶光源方向彎曲">
  <!-- 窗與光 -->
  <rect x="6" y="20" width="26" height="110" fill="#eaf6ff" stroke="#6fa8d6" stroke-width="2"/>
  <line x1="32" y1="40" x2="70" y2="55" stroke="#f9d448" stroke-width="3" class="anim-fade"/>
  <line x1="32" y1="70" x2="72" y2="78" stroke="#f9d448" stroke-width="3" class="anim-fade" style="animation-delay:.4s"/>
  <line x1="32" y1="100" x2="70" y2="100" stroke="#f9d448" stroke-width="3" class="anim-fade" style="animation-delay:.8s"/>
  <text x="19" y="150" font-size="11" fill="#b5651d" text-anchor="middle">☀ 光</text>
  <!-- 盆 -->
  <path d="M150 150 L160 118 H210 L200 150 Z" fill="#c1663b" stroke="#8a4a28" stroke-width="2"/>
  <rect x="160" y="112" width="50" height="8" fill="#a9552f"/>
  <!-- 朝光彎的莖葉 -->
  <g class="anim-sway">
    <path d="M185 118 q-30 -30 -50 -34" fill="none" stroke="#3a8f3a" stroke-width="5" stroke-linecap="round"/>
    <path d="M150 96 q-14 -10 -22 -6 q6 12 22 6" fill="#4caf50"/>
    <path d="M165 104 q-14 -12 -24 -10 q6 14 24 10" fill="#5cc45c"/>
    <path d="M138 86 q-10 -8 -16 -4 q4 10 16 4" fill="#4caf50"/>
  </g>
  <path d="M120 60 q10 8 18 18" fill="none" stroke="#2e8b6f" stroke-width="2" marker-end="url(#pArrow)"/>
  <text x="128" y="52" font-size="10" fill="#1f6b54">朝光彎</text>
  <defs><marker id="pArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#2e8b6f"/></marker></defs>
</svg>`;

export const APPLY_ANIM = { seed, microbe, label, weather, handwash, plantlight };
