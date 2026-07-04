// 各單元的教學寫實 SVG 圖形。每個 key 對應一個階段/步驟，
// 由 app.js 依當前階段切換顯示（只顯示一張正確的圖）。

/* ============ 探究歷程 7 階段（情境:窗邊 vs 靠牆的黃金葛） ============ */

// 共用:一株黃金葛的畫法
function pothos(x, y, scale, healthy) {
  const leaf = healthy ? "#3faa4f" : "#c9b24a";
  const leafEdge = healthy ? "#2e7d3a" : "#a08a2c";
  const s = scale;
  return `
  <g transform="translate(${x},${y}) scale(${s})">
    <path d="M0 60 L8 20 H52 L44 60 Z" fill="#c1663b" stroke="#8a4a28" stroke-width="2"/>
    <rect x="6" y="14" width="48" height="8" fill="#a9552f"/>
    <path d="M30 22 q-2 -18 -2 -24" fill="none" stroke="#2e7d3a" stroke-width="3"/>
    <path d="M28 4 q-16 -4 -22 6 q10 12 22 -6" fill="${leaf}" stroke="${leafEdge}" stroke-width="1.5"/>
    <path d="M30 8 q16 -6 24 2 q-8 14 -24 -2" fill="${leaf}" stroke="${leafEdge}" stroke-width="1.5"/>
    <path d="M29 -2 q-6 -14 2 -20 q8 8 -2 20" fill="${leaf}" stroke="${leafEdge}" stroke-width="1.5"/>
  </g>`;
}

const observe = `
<svg viewBox="0 0 300 220" role="img" aria-label="觀察:同一盆黃金葛靠窗葉大深綠、靠牆葉小偏黃">
  <rect x="0" y="150" width="300" height="6" fill="#d7c4a3"/>
  <rect x="6" y="30" width="30" height="120" fill="#eaf6ff" stroke="#6fa8d6" stroke-width="2"/>
  <text x="21" y="170" font-size="11" fill="#4a5b52" text-anchor="middle">窗</text>
  ${pothos(60, 92, 1.15, true)}
  ${pothos(200, 104, 0.8, false)}
  <text x="92" y="180" font-size="12" fill="#1f6b54" text-anchor="middle" font-weight="700">靠窗:大又綠</text>
  <text x="228" y="180" font-size="12" fill="#8a6d1b" text-anchor="middle" font-weight="700">靠牆:小又黃</text>
  <g class="anim-pulse"><circle cx="150" cy="40" r="16" fill="none" stroke="#f2a93b" stroke-width="3"/><line x1="161" y1="51" x2="175" y2="65" stroke="#f2a93b" stroke-width="3"/></g>
  <text x="150" y="205" font-size="12" fill="#4a5b52" text-anchor="middle">仔細看:記下可量測的差異</text>
</svg>`;

const question = `
<svg viewBox="0 0 300 220" role="img" aria-label="提出問題:光照多寡會不會影響葉片生長">
  ${pothos(40, 110, 1, true)}
  <g class="anim-pulse">
    <circle cx="185" cy="80" r="46" fill="#e2f2eb" stroke="#2e8b6f" stroke-width="3"/>
    <text x="185" y="98" font-size="46" fill="#2e8b6f" text-anchor="middle" font-weight="800">?</text>
  </g>
  <text x="150" y="180" font-size="14" fill="#1f6b54" text-anchor="middle" font-weight="700">光照多寡會不會</text>
  <text x="150" y="200" font-size="14" fill="#1f6b54" text-anchor="middle" font-weight="700">影響葉片大小與顏色?</text>
  <text x="150" y="26" font-size="12" fill="#4a5b52" text-anchor="middle">「改變什麼 → 觀察什麼」</text>
</svg>`;

const hypothesis = `
<svg viewBox="0 0 300 220" role="img" aria-label="提出假設:光越充足葉片越大越綠">
  <rect x="30" y="40" width="240" height="70" rx="12" fill="#fff" stroke="#2e8b6f" stroke-width="2"/>
  <text x="150" y="70" font-size="13" fill="#1f6b54" text-anchor="middle" font-weight="700">如果 光照越充足，</text>
  <text x="150" y="94" font-size="13" fill="#1f6b54" text-anchor="middle" font-weight="700">那麼 葉片會長得越大、越綠。</text>
  <text x="150" y="30" font-size="12" fill="#4a5b52" text-anchor="middle">假設 = 可被推翻的預測</text>
  <line x1="90" y1="120" x2="90" y2="140" stroke="#f2a93b" stroke-width="2" marker-end="url(#hyA)"/>
  <line x1="210" y1="120" x2="210" y2="140" stroke="#f2a93b" stroke-width="2" marker-end="url(#hyA)"/>
  <g class="anim-fade"><text x="90" y="175" font-size="30" text-anchor="middle">☀</text></g>
  ${pothos(180, 150, 0.75, true)}
  <defs><marker id="hyA" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#f2a93b"/></marker></defs>
</svg>`;

const experimentFig = `
<svg viewBox="0 0 300 220" role="img" aria-label="設計實驗:兩組黃金葛只差光照，其他條件相同">
  <!-- 光照組 -->
  <rect x="12" y="20" width="130" height="180" rx="10" fill="#fffdf0" stroke="#f2a93b" stroke-width="2"/>
  <g class="anim-fade"><text x="77" y="52" font-size="26" text-anchor="middle">☀☀</text></g>
  ${pothos(52, 120, 0.95, true)}
  <text x="77" y="190" font-size="12" fill="#8a6512" text-anchor="middle" font-weight="700">充足光照</text>
  <!-- 陰暗組 -->
  <rect x="158" y="20" width="130" height="180" rx="10" fill="#eceef0" stroke="#9aa6ac" stroke-width="2"/>
  <text x="223" y="52" font-size="22" text-anchor="middle" fill="#6b7780">☁ 陰暗</text>
  ${pothos(198, 128, 0.7, false)}
  <text x="223" y="190" font-size="12" fill="#5b6a72" text-anchor="middle" font-weight="700">陰暗處</text>
  <text x="150" y="14" font-size="11" fill="#c0392b" text-anchor="middle" font-weight="700">只改「光照」，其他（水/溫度/土/盆）全相同</text>
</svg>`;

const dataFig = `
<svg viewBox="0 0 300 220" role="img" aria-label="蒐集資料:兩組葉片長度折線圖，光照組持續上升">
  <line x1="40" y1="20" x2="40" y2="175" stroke="#4a5b52" stroke-width="2"/>
  <line x1="40" y1="175" x2="285" y2="175" stroke="#4a5b52" stroke-width="2"/>
  <text x="18" y="100" font-size="10" fill="#4a5b52" transform="rotate(-90 18 100)">葉長 (cm)</text>
  <text x="160" y="200" font-size="11" fill="#4a5b52" text-anchor="middle">觀察天數 →</text>
  <polyline points="50,160 100,130 150,95 200,60 250,35" fill="none" stroke="#3faa4f" stroke-width="3" class="flow-line" stroke-dasharray="300"/>
  <polyline points="50,162 100,150 150,142 200,138 250,135" fill="none" stroke="#c9a22c" stroke-width="3" stroke-dasharray="6 4"/>
  <circle cx="250" cy="35" r="4" fill="#3faa4f" class="anim-pulse"/>
  <circle cx="250" cy="135" r="4" fill="#c9a22c" class="anim-pulse" style="animation-delay:.5s"/>
  <rect x="150" y="26" width="12" height="8" fill="#3faa4f"/><text x="166" y="34" font-size="11" fill="#1f6b54">充足光照</text>
  <rect x="150" y="42" width="12" height="8" fill="#c9a22c"/><text x="166" y="50" font-size="11" fill="#8a6512">陰暗處</text>
</svg>`;

const conclusion = `
<svg viewBox="0 0 300 220" role="img" aria-label="結論:充足光照下葉片較大較綠，支持假設">
  <g class="anim-pulse"><circle cx="150" cy="70" r="42" fill="#e4f5ea" stroke="#2e8b57" stroke-width="3"/>
  <path d="M132 70 l12 12 l24 -26" fill="none" stroke="#2e8b57" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></g>
  <text x="150" y="140" font-size="13" fill="#1f6b54" text-anchor="middle" font-weight="700">充足光照的葉片較大、較綠</text>
  <text x="150" y="162" font-size="13" fill="#1f6b54" text-anchor="middle" font-weight="700">→ 資料支持假設</text>
  <text x="150" y="192" font-size="11" fill="#4a5b52" text-anchor="middle">結論要以資料為根據，並說明成立範圍</text>
</svg>`;

const communicate = `
<svg viewBox="0 0 300 220" role="img" aria-label="溝通與再探究:分享報告並引出新問題">
  <rect x="40" y="30" width="90" height="110" rx="6" fill="#fff" stroke="#2e8b6f" stroke-width="2"/>
  <line x1="52" y1="50" x2="118" y2="50" stroke="#c9d8d0" stroke-width="3"/>
  <line x1="52" y1="64" x2="118" y2="64" stroke="#c9d8d0" stroke-width="3"/>
  <polyline points="52,110 70,90 90,100 118,72" fill="none" stroke="#3faa4f" stroke-width="2.5"/>
  <text x="85" y="158" font-size="11" fill="#1f6b54" text-anchor="middle" font-weight="700">分享報告</text>
  <path d="M138 85 h34" stroke="#f2a93b" stroke-width="2.5" marker-end="url(#coA)"/>
  <g class="anim-pulse"><circle cx="222" cy="60" r="30" fill="#fdeccf" stroke="#f2a93b" stroke-width="2"/><text x="222" y="70" font-size="30" fill="#c9821e" text-anchor="middle" font-weight="800">?</text></g>
  <text x="222" y="120" font-size="11" fill="#8a6512" text-anchor="middle">光太強會不會受傷?</text>
  <text x="222" y="138" font-size="11" fill="#8a6512" text-anchor="middle">別種植物一樣嗎?</text>
  <text x="150" y="185" font-size="11" fill="#4a5b52" text-anchor="middle">一次探究的結論，是下一次的起點</text>
  <defs><marker id="coA" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#f2a93b"/></marker></defs>
</svg>`;

export const INQUIRY_FIGS = { observe, question, hypothesis, experiment: experimentFig, data: dataFig, conclusion, communicate };

/* ============ 顯微鏡構造圖（可點選 part 高亮） ============ */
// 各構造以 data-part 標記，app.js 點選時加 .part-hi
export const MICROSCOPE_SVG = `
<svg viewBox="0 0 300 340" role="img" aria-label="複式顯微鏡構造圖" id="microFig">
  <!-- 鏡座 -->
  <path data-part="arm" class="mpart" d="M150 300 q-70 0 -70 -70 v-40 q0 -14 14 -14 h20 v18 h-16 q-4 0 -4 6 v30 q0 46 56 46 q10 0 18 -2 v18 q-8 8 -18 8 z" fill="#b9c4cc" stroke="#7c8a92" stroke-width="2"/>
  <ellipse data-part="arm" class="mpart" cx="150" cy="316" rx="70" ry="14" fill="#9aa8b0" stroke="#7c8a92" stroke-width="2"/>
  <!-- 目鏡 -->
  <rect data-part="eyepiece" class="mpart" x="132" y="24" width="34" height="40" rx="6" fill="#4a5b6b" stroke="#2f3b47" stroke-width="2"/>
  <rect data-part="eyepiece" class="mpart" x="138" y="14" width="22" height="14" rx="4" fill="#5d7080"/>
  <!-- 鏡筒 -->
  <rect x="140" y="62" width="18" height="46" fill="#6b7b88"/>
  <!-- 旋轉盤 -->
  <ellipse data-part="nosepiece" class="mpart" cx="149" cy="116" rx="40" ry="12" fill="#5d6c78" stroke="#33414c" stroke-width="2"/>
  <!-- 物鏡 x3 -->
  <g data-part="objective" class="mpart">
    <rect x="120" y="120" width="12" height="30" rx="3" fill="#2e6fb7"/>
    <rect x="143" y="122" width="12" height="38" rx="3" fill="#2e8b57"/>
    <rect x="166" y="120" width="12" height="26" rx="3" fill="#c0392b"/>
  </g>
  <!-- 載物台 -->
  <rect data-part="stage" class="mpart" x="96" y="172" width="108" height="16" rx="3" fill="#8b98a1" stroke="#5f6d75" stroke-width="2"/>
  <rect x="138" y="176" width="24" height="8" fill="#d7e5ec" stroke="#8b98a1"/>
  <!-- 壓片夾 -->
  <rect x="120" y="170" width="16" height="4" fill="#5f6d75"/>
  <rect x="164" y="170" width="16" height="4" fill="#5f6d75"/>
  <!-- 光圈/光源 -->
  <circle data-part="diaphragm" class="mpart" cx="150" cy="210" r="14" fill="#f2c14e" stroke="#c99a1e" stroke-width="2"/>
  <circle cx="150" cy="210" r="6" fill="#fff3cf"/>
  <!-- 粗調節輪 -->
  <circle data-part="coarse" class="mpart" cx="86" cy="212" r="20" fill="#6b7b88" stroke="#3b4750" stroke-width="2"/>
  <circle cx="86" cy="212" r="8" fill="#8b98a1"/>
  <!-- 細調節輪 -->
  <circle data-part="fine" class="mpart" cx="86" cy="246" r="12" fill="#8b98a1" stroke="#3b4750" stroke-width="2"/>
  <!-- 標籤定位點 -->
  <g id="microLabel"></g>
</svg>`;

// 各構造中心點（用於高亮時畫指示圈）
export const MICRO_PART_POS = {
  eyepiece: [149, 40], objective: [149, 138], stage: [150, 180], nosepiece: [149, 116],
  coarse: [86, 212], fine: [86, 246], diaphragm: [150, 210], arm: [110, 300]
};

/* ============ 顯微鏡操作步驟圖 ============ */
const carry = `
<svg viewBox="0 0 300 200" role="img" aria-label="取鏡:一手握鏡臂一手托鏡座">
  <path d="M150 150 q-40 0 -40 -40 v-30 h14 v30 q0 26 26 26 z" fill="#b9c4cc" stroke="#7c8a92" stroke-width="2"/>
  <rect x="132" y="40" width="24" height="30" rx="5" fill="#4a5b6b"/>
  <ellipse cx="140" cy="158" rx="40" ry="10" fill="#9aa8b0" stroke="#7c8a92" stroke-width="2"/>
  <g class="anim-pulse"><circle cx="118" cy="92" r="12" fill="none" stroke="#2e8b6f" stroke-width="3"/></g>
  <text x="118" y="80" font-size="11" fill="#1f6b54" text-anchor="middle">握鏡臂</text>
  <g class="anim-pulse" style="animation-delay:.5s"><circle cx="140" cy="158" r="12" fill="none" stroke="#2e8b6f" stroke-width="3"/></g>
  <text x="200" y="162" font-size="11" fill="#1f6b54">托鏡座</text>
  <line x1="188" y1="158" x2="154" y2="158" stroke="#2e8b6f" stroke-width="1.5"/>
</svg>`;

const mount = `
<svg viewBox="0 0 300 200" role="img" aria-label="放玻片:標本對準透光孔並用壓片夾固定">
  <rect x="70" y="90" width="160" height="20" rx="3" fill="#8b98a1" stroke="#5f6d75" stroke-width="2"/>
  <circle cx="150" cy="100" r="8" fill="#d7e5ec"/>
  <g class="anim-drop"><rect x="120" y="84" width="60" height="12" rx="2" fill="#cfe8ff" stroke="#6fa8d6" stroke-width="1.5"/><circle cx="150" cy="90" r="3" fill="#8e44ad"/></g>
  <rect x="96" y="86" width="18" height="5" fill="#5f6d75"/>
  <rect x="186" y="86" width="18" height="5" fill="#5f6d75"/>
  <text x="150" y="150" font-size="12" fill="#1f6b54" text-anchor="middle" font-weight="700">標本對準透光孔，壓片夾固定</text>
</svg>`;

const lowfocus = `
<svg viewBox="0 0 300 200" role="img" aria-label="低倍對焦:先靠近再由目鏡拉遠找影像">
  <rect x="140" y="24" width="20" height="34" rx="4" fill="#4a5b6b"/>
  <rect x="143" y="58" width="14" height="30" rx="3" fill="#2e8b57"/>
  <rect x="90" y="100" width="120" height="14" rx="3" fill="#8b98a1" stroke="#5f6d75" stroke-width="2"/>
  <rect x="130" y="94" width="40" height="8" fill="#cfe8ff" stroke="#6fa8d6"/>
  <g class="anim-drop"><line x1="150" y1="66" x2="150" y2="88" stroke="#f2a93b" stroke-width="3" marker-end="url(#lfA)"/></g>
  <text x="150" y="150" font-size="12" fill="#1f6b54" text-anchor="middle" font-weight="700">先靠近，再由目鏡慢慢拉遠</text>
  <text x="150" y="170" font-size="11" fill="#c0392b" text-anchor="middle">低倍才用粗調節輪</text>
  <defs><marker id="lfA" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#f2a93b"/></marker></defs>
</svg>`;

const center = `
<svg viewBox="0 0 300 200" role="img" aria-label="移到中央:影像上下左右相反，往反方向推玻片">
  <circle cx="150" cy="95" r="66" fill="#eef7f2" stroke="#6fa8d6" stroke-width="3"/>
  <circle cx="110" cy="60" r="12" fill="#7fc47f" stroke="#3a8f3a" stroke-width="2"/>
  <path d="M110 60 q30 20 30 30" fill="none" stroke="#e4572e" stroke-width="2.5" stroke-dasharray="4 4"/>
  <circle cx="150" cy="95" r="7" fill="none" stroke="#e4572e" stroke-width="2"/>
  <line x1="118" y1="52" x2="102" y2="42" stroke="#c0392b" stroke-width="2.5" marker-end="url(#ceA)"/>
  <text x="150" y="180" font-size="12" fill="#1f6b54" text-anchor="middle" font-weight="700">物在左上 → 玻片往右下推</text>
  <defs><marker id="ceA" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#c0392b"/></marker></defs>
</svg>`;

const highfocus = `
<svg viewBox="0 0 300 200" role="img" aria-label="換高倍:旋轉旋轉盤換高倍物鏡只用細調節輪">
  <ellipse cx="150" cy="40" rx="40" ry="12" fill="#5d6c78"/>
  <g class="spin-origin anim-pulse"><rect x="144" y="44" width="12" height="40" rx="3" fill="#c0392b"/></g>
  <path d="M120 40 a34 12 0 0 1 60 0" fill="none" stroke="#2e8b6f" stroke-width="2.5" marker-end="url(#hfA)"/>
  <circle cx="70" cy="130" r="12" fill="#8b98a1" stroke="#3b4750" stroke-width="2"/>
  <text x="70" y="160" font-size="11" fill="#1f6b54" text-anchor="middle">細調節輪</text>
  <text x="180" y="120" font-size="12" fill="#1f6b54" font-weight="700">高倍:視野變小變暗</text>
  <text x="180" y="140" font-size="11" fill="#c0392b">只用細調節輪!</text>
  <defs><marker id="hfA" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#2e8b6f"/></marker></defs>
</svg>`;

const record = `
<svg viewBox="0 0 300 200" role="img" aria-label="繪圖紀錄:圓形視野單線繪圖並標註倍率與日期">
  <circle cx="110" cy="90" r="60" fill="#fff" stroke="#4a5b52" stroke-width="3"/>
  <!-- 植物細胞單線繪圖 -->
  <g fill="none" stroke="#2e7d3a" stroke-width="2">
    <rect x="78" y="60" width="30" height="34" rx="3"/>
    <rect x="108" y="60" width="30" height="34" rx="3"/>
    <rect x="78" y="94" width="30" height="30" rx="3"/>
    <rect x="108" y="94" width="30" height="30" rx="3"/>
  </g>
  <circle cx="93" cy="77" r="5" fill="#2e7d3a"/>
  <circle cx="123" cy="109" r="5" fill="#2e7d3a"/>
  <line x1="123" y1="77" x2="185" y2="55" stroke="#4a5b52" stroke-width="1"/>
  <text x="188" y="58" font-size="10" fill="#4a5b52">細胞核</text>
  <line x1="140" y1="90" x2="185" y2="90" stroke="#4a5b52" stroke-width="1"/>
  <text x="188" y="93" font-size="10" fill="#4a5b52">細胞壁</text>
  <text x="150" y="150" font-size="11" fill="#1f6b54" text-anchor="middle" font-weight="700">鉛筆單線 · 只畫看到的</text>
  <text x="150" y="168" font-size="10" fill="#4a5b52" text-anchor="middle">洋蔥表皮 100× · 2026/07/04</text>
</svg>`;

export const MICRO_STEP_FIGS = { carry, mount, lowfocus, center, highfocus, record };

/* ============ 實驗資料判讀 4 階段 ============ */
const tableFig = `
<svg viewBox="0 0 300 200" role="img" aria-label="整理資料表:施肥量與植株高度">
  <rect x="30" y="30" width="240" height="140" fill="#fff" stroke="#2e8b6f" stroke-width="2"/>
  <line x1="30" y1="62" x2="270" y2="62" stroke="#2e8b6f" stroke-width="2"/>
  <line x1="150" y1="30" x2="150" y2="170" stroke="#c9d8d0" stroke-width="1.5"/>
  <line x1="30" y1="98" x2="270" y2="98" stroke="#e6efe9"/>
  <line x1="30" y1="134" x2="270" y2="134" stroke="#e6efe9"/>
  <text x="90" y="52" font-size="12" fill="#1f6b54" text-anchor="middle" font-weight="700">施肥量(匙)</text>
  <text x="210" y="52" font-size="12" fill="#1f6b54" text-anchor="middle" font-weight="700">高度(cm)</text>
  <text x="90" y="86" font-size="13" text-anchor="middle">0</text><text x="210" y="86" font-size="13" text-anchor="middle">8</text>
  <text x="90" y="122" font-size="13" text-anchor="middle">1</text><text x="210" y="122" font-size="13" text-anchor="middle">14</text>
  <text x="90" y="158" font-size="13" text-anchor="middle">2</text><text x="210" y="158" font-size="13" text-anchor="middle">15</text>
  <text x="150" y="190" font-size="11" fill="#4a5b52" text-anchor="middle">欄位標明變因與單位</text>
</svg>`;

const chartFig = `
<svg viewBox="0 0 300 200" role="img" aria-label="畫成長條圖:高度隨施肥量增加">
  <line x1="50" y1="20" x2="50" y2="160" stroke="#4a5b52" stroke-width="2"/>
  <line x1="50" y1="160" x2="280" y2="160" stroke="#4a5b52" stroke-width="2"/>
  <text x="24" y="95" font-size="10" fill="#4a5b52" transform="rotate(-90 24 95)">高度(cm)</text>
  <rect class="anim-bar" x="80" y="112" width="40" height="48" fill="#cbd6cf"/>
  <rect class="anim-bar" x="140" y="76" width="40" height="84" fill="#6b8e23" style="animation-delay:.2s"/>
  <rect class="anim-bar" x="200" y="70" width="40" height="90" fill="#2e8b57" style="animation-delay:.4s"/>
  <text x="100" y="174" font-size="11" text-anchor="middle">0匙</text>
  <text x="160" y="174" font-size="11" text-anchor="middle">1匙</text>
  <text x="220" y="174" font-size="11" text-anchor="middle">2匙</text>
  <text x="165" y="192" font-size="11" fill="#4a5b52" text-anchor="middle">施肥量（操縱變因）→</text>
</svg>`;

const trendFig = `
<svg viewBox="0 0 300 200" role="img" aria-label="判讀趨勢:先升後持平">
  <line x1="50" y1="20" x2="50" y2="160" stroke="#4a5b52" stroke-width="2"/>
  <line x1="50" y1="160" x2="280" y2="160" stroke="#4a5b52" stroke-width="2"/>
  <polyline points="80,148 160,80 240,72" fill="none" stroke="#2e8b57" stroke-width="3" class="flow-line" stroke-dasharray="220"/>
  <circle cx="80" cy="148" r="4" fill="#2e8b57"/>
  <circle cx="160" cy="80" r="4" fill="#2e8b57"/>
  <circle cx="240" cy="72" r="4" fill="#2e8b57"/>
  <path d="M95 130 q30 -34 60 -46" fill="none" stroke="#e4572e" stroke-width="2" marker-end="url(#trA)"/>
  <text x="120" y="112" font-size="10" fill="#e4572e">明顯上升</text>
  <path d="M175 76 h50" stroke="#c9a22c" stroke-width="2" marker-end="url(#trB)"/>
  <text x="200" y="66" font-size="10" fill="#8a6512">幾乎持平</text>
  <text x="165" y="190" font-size="11" fill="#4a5b52" text-anchor="middle">依實際數字描述關係</text>
  <defs>
    <marker id="trA" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#e4572e"/></marker>
    <marker id="trB" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#c9a22c"/></marker>
  </defs>
</svg>`;

const concludeFig = `
<svg viewBox="0 0 300 200" role="img" aria-label="下結論與檢討:依證據回答並檢討誤差">
  <g class="anim-pulse"><circle cx="80" cy="70" r="34" fill="#e4f5ea" stroke="#2e8b57" stroke-width="3"/>
  <path d="M66 70 l10 10 l20 -22" fill="none" stroke="#2e8b57" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></g>
  <text x="180" y="55" font-size="12" fill="#1f6b54" text-anchor="middle" font-weight="700">施肥增加使小白菜</text>
  <text x="180" y="74" font-size="12" fill="#1f6b54" text-anchor="middle" font-weight="700">長得較高（有範圍）</text>
  <rect x="40" y="120" width="220" height="56" rx="8" fill="#fdeccf" stroke="#f2a93b" stroke-width="1.5"/>
  <text x="150" y="142" font-size="11" fill="#8a6512" text-anchor="middle">檢討:樣本少、測量誤差</text>
  <text x="150" y="162" font-size="11" fill="#8a6512" text-anchor="middle">→ 提出改進與新問題</text>
</svg>`;

export const EXP_DATA_FIGS = { table: tableFig, chart: chartFig, trend: trendFig, conclude: concludeFig };
