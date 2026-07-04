import { mountChrome } from "./chrome.js";
import { renderProgressBar } from "./progress.js";
import { INQUIRY_FIGS, MICROSCOPE_SVG, MICRO_PART_POS, MICRO_STEP_FIGS, EXP_DATA_FIGS } from "./figures.js";
import { APPLY_ANIM } from "./applyAnim.js";
import { buildStageFlow, wireMicroscopeParts } from "./interactions.js";

const DATA_URL = "data/content.json";

async function getContent() {
  const res = await fetch(DATA_URL);
  if (!res.ok) throw new Error("無法載入 content.json");
  return res.json();
}

function el(id) { return document.getElementById(id); }

/* ---------------- Home ---------------- */
function renderHome(c) {
  const h = c.home;
  el("home-hero").innerHTML = `
    <div class="hero">
      <span class="chip accent">探究與實作 · 素養導向</span>
      <h1>${h.title}</h1>
      <p class="lead">${h.subtitle}</p>
      <div class="meta-row">
        <span class="chip">${h.grade}</span>
        <span class="chip">${h.duration}</span>
      </div>
      <p>${h.intro}</p>
      <a class="btn" href="inquiry.html">開始學習 →</a>
    </div>`;

  el("home-goals").innerHTML = `
    <h2>🎯 學習目標</h2>
    <ol class="goal-list">${h.goals.map(g => `<li>${g}</li>`).join("")}</ol>
    <h3>需要的先備知識</h3>
    <ul class="prior-list">${h.prior.map(p => `<li>${p}</li>`).join("")}</ul>`;

  el("home-units").innerHTML = `
    <h2>📖 三個學習單元</h2>
    <div class="unit-grid">
      ${h.units.map(u => `
        <a class="unit-card" href="${u.file}">
          <div class="ic">${u.icon}</div>
          <h3>${u.name}</h3>
          <p>${u.desc}</p>
        </a>`).join("")}
    </div>`;

  renderProgressBar(el("home-progress"));
}

/* ---------------- Inquiry ---------------- */
function renderInquiry(c) {
  const d = c.inquiry;
  el("inq-head").innerHTML = `
    <h1 class="page-title">🔍 ${d.title}</h1>
    <p class="lead">${d.lead}</p>
    <div class="tip">${d.scenario}</div>`;

  buildStageFlow({
    mount: el("inq-flow"),
    stages: d.stages,
    figs: INQUIRY_FIGS,
    keyOf: s => s.key,
    labelOf: s => s.name,
    renderText: s => `
      <span class="stage-name-badge">${s.name}｜${s.short}</span>
      <h3>${s.name}</h3>
      <p>${s.text}</p>
      <div class="tip">💡 ${s.tip}</div>`
  });
}

/* ---------------- Microscope ---------------- */
function renderMicroscope(c) {
  const d = c.microscope;
  el("mic-head").innerHTML = `
    <h1 class="page-title">🔬 ${d.title}</h1>
    <p class="lead">${d.lead}</p>`;

  // 構造互動
  el("mic-parts").innerHTML = `
    <h2>🧩 認識構造（點名稱看說明）</h2>
    <div class="parts-layout">
      <div class="stage-figure">${MICROSCOPE_SVG}</div>
      <div>
        <ul class="parts-list" id="partsList">
          ${d.parts.map(p => `<li data-part="${p.key}" tabindex="0" role="button" aria-label="${p.name}"><b>${p.name}</b><div class="part-desc" hidden>${p.desc}</div></li>`).join("")}
        </ul>
        <p class="progress-label">提示:放大率 = 目鏡倍率 × 物鏡倍率。</p>
      </div>
    </div>`;
  wireMicroscopeParts(el("mic-parts"), MICRO_PART_POS);

  // 操作步驟 stage flow
  el("mic-steps-head").innerHTML = `<h2>🪜 正確操作步驟</h2>`;
  buildStageFlow({
    mount: el("mic-steps"),
    stages: d.steps,
    figs: MICRO_STEP_FIGS,
    keyOf: s => s.key,
    labelOf: s => s.name,
    renderText: s => `
      <span class="stage-name-badge">${s.name}</span>
      <h3>${s.name}</h3>
      <p>${s.text}</p>
      <div class="caution">⚠️ ${s.caution}</div>`
  });

  // 繪圖規範
  el("mic-rules").innerHTML = `
    <h2>✏️ 觀察紀錄（繪圖）規範</h2>
    <ul class="goal-list">${d.recordRules.map(r => `<li>${r}</li>`).join("")}</ul>`;
}

/* ---------------- Experiment ---------------- */
function renderExperiment(c) {
  const d = c.experiment;
  el("exp-head").innerHTML = `
    <h1 class="page-title">🧪 ${d.title}</h1>
    <p class="lead">${d.lead}</p>`;

  el("exp-vars").innerHTML = `
    <h2>🎛️ 三種變因</h2>
    <div class="var-grid">
      ${d.variables.map(v => `
        <div class="var-card ${v.color}">
          <h3>${v.name} <span class="var-en">${v.en}</span></h3>
          <p>${v.desc}</p>
        </div>`).join("")}
    </div>
    <div class="tip" style="margin-top:14px">${d.controlText}</div>`;

  const dg = d.design;
  el("exp-design").innerHTML = `
    <h2>🧫 一個完整的實驗設計</h2>
    <p><b>${dg.question}</b></p>
    <table class="data-table">
      <tr><th>操縱變因</th><td>${dg.iv}</td></tr>
      <tr><th>應變變因</th><td>${dg.dv}</td></tr>
      <tr><th>控制變因</th><td>${dg.cv}</td></tr>
      <tr><th>對照組</th><td>${dg.control}</td></tr>
    </table>`;

  el("exp-data-head").innerHTML = `<h2>📊 從資料到結論</h2>`;
  buildStageFlow({
    mount: el("exp-data"),
    stages: d.dataStages,
    figs: EXP_DATA_FIGS,
    keyOf: s => s.key,
    labelOf: s => s.name,
    renderText: s => `
      <span class="stage-name-badge">${s.name}</span>
      <h3>${s.name}</h3>
      <p>${s.text}</p>`
  });

  el("exp-pitfalls").innerHTML = `
    <h2>🚫 常見陷阱</h2>
    <ul class="goal-list">${d.pitfalls.map(p => `<li>${p}</li>`).join("")}</ul>`;
}

/* ---------------- Apply ---------------- */
function renderApply(c) {
  const d = c.apply;
  el("apply-head").innerHTML = `
    <h1 class="page-title">🌱 ${d.title}</h1>
    <p class="lead">${d.lead}</p>`;

  el("apply-grid").innerHTML = d.items.map(it => `
    <div class="card apply-card">
      <div class="apply-anim" aria-hidden="false">${APPLY_ANIM[it.anim] || ""}</div>
      <h3>${it.title}</h3>
      <p>${it.text}</p>
      <p class="apply-principle"><b>對應原理:</b>${it.principle}</p>
      <p class="apply-q">🤔 想一想:${it.question}</p>
    </div>`).join("");
}

/* ---------------- Resources ---------------- */
async function renderResources() {
  const res = await fetch("data/resources.json");
  const { resources } = await res.json();
  el("res-grid").innerHTML = resources.map(r => `
    <div class="card res-card">
      <span class="res-type">${r.type}</span>
      <a class="res-title" href="${r.url}" target="_blank" rel="noopener">${r.title} ↗</a>
      <p>${r.description}</p>
      <span class="res-meta">適用:${r.grade}｜檢核日:${r.checkedAt}</span>
    </div>`).join("");
}

/* ---------------- Boot ---------------- */
async function boot() {
  mountChrome();
  const page = document.body.dataset.page;
  try {
    if (page === "resources") { await renderResources(); return; }
    if (page === "quiz") return; // quiz.js 自行處理
    const c = await getContent();
    if (page === "home") renderHome(c);
    else if (page === "inquiry") renderInquiry(c);
    else if (page === "microscope") renderMicroscope(c);
    else if (page === "experiment") renderExperiment(c);
    else if (page === "apply") renderApply(c);
  } catch (e) {
    console.error(e);
    const main = document.querySelector("main .wrap") || document.querySelector("main");
    if (main) main.insertAdjacentHTML("beforeend", `<div class="caution">內容載入失敗，請以本機伺服器（如 npm run dev）開啟，或稍後再試。</div>`);
  }
}

document.addEventListener("DOMContentLoaded", boot);
