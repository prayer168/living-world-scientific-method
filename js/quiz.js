import { mountChrome } from "./chrome.js";
import { saveQuizScore } from "./progress.js";

let questions = [], passScore = 7;
let idx = 0, score = 0, answered = false;

const $ = s => document.querySelector(s);

async function load() {
  const res = await fetch("data/quiz.json");
  const data = await res.json();
  questions = data.questions;
  passScore = data.passScore ?? Math.ceil(questions.length * 0.6);
}

function renderQuestion() {
  answered = false;
  const q = questions[idx];
  const total = questions.length;
  const optHtml = q.type === "tf"
    ? [["✔ 正確", "true"], ["✘ 錯誤", "false"]].map(([t, v]) =>
        `<button class="q-option" data-val="${v}">${t}</button>`).join("")
    : q.options.map((o, i) => `<button class="q-option" data-val="${i}">${String.fromCharCode(65 + i)}. ${o}</button>`).join("");

  $("#quiz-area").innerHTML = `
    <div class="quiz-progress">第 ${idx + 1} / ${total} 題　·　題型:${q.level}</div>
    <div class="progress-track" style="margin:8px 0"><div class="progress-fill" style="width:${(idx / total) * 100}%"></div></div>
    <p class="q-stem">${q.stem}</p>
    <div class="q-options" id="opts">${optHtml}</div>
    <div id="fb"></div>
    <div style="margin-top:16px" id="nav"></div>`;

  $("#opts").addEventListener("click", (e) => {
    const b = e.target.closest(".q-option");
    if (b) choose(b);
  });
}

function choose(btn) {
  if (answered) return;
  answered = true;
  const q = questions[idx];
  const val = q.type === "tf" ? (btn.dataset.val === "true") : Number(btn.dataset.val);
  const correct = q.answer;
  const isRight = val === correct;
  if (isRight) score++;

  const opts = [...document.querySelectorAll(".q-option")];
  opts.forEach(o => {
    o.disabled = true;
    const ov = q.type === "tf" ? (o.dataset.val === "true") : Number(o.dataset.val);
    if (ov === correct) o.classList.add("correct");
    else if (o === btn) o.classList.add("wrong");
  });

  $("#fb").innerHTML = `
    <div class="q-feedback ${isRight ? "ok" : "no"}">
      ${isRight ? "✅ 答對了!" : "❌ 再想想。"} ${q.explain}
      <div style="margin-top:8px"><a class="btn ghost small" href="${q.ref}">📖 回看教材</a></div>
    </div>`;

  const last = idx === questions.length - 1;
  $("#nav").innerHTML = `<button class="btn" id="nextBtn">${last ? "看成績 →" : "下一題 →"}</button>`;
  $("#nextBtn").addEventListener("click", () => {
    if (last) showResult();
    else { idx++; renderQuestion(); }
  });
}

function showResult() {
  const total = questions.length;
  saveQuizScore(score, total);
  const pass = score >= passScore;
  const advice = pass
    ? "太棒了!你已能運用科學方法觀察、辨識變因並判讀資料。可以挑戰把生活中的問題設計成一個對照實驗。"
    : "很接近了!建議回到「探究歷程」與「實驗與變因」再看一次流程圖，特別留意『一次只改一個變因』與『對照組』的概念，再來挑戰。";
  $("#quiz-area").innerHTML = `
    <div class="result-box">
      <div class="result-score">${score} / ${total}</div>
      <p class="${pass ? "" : ""}">${pass ? "🏆 通過闖關!" : "💪 尚未通過（通過標準 " + passScore + " 題）"}</p>
      <p class="lead">${advice}</p>
      <button class="btn" id="retry">↺ 重新挑戰</button>
      <a class="btn ghost" href="resources.html">前往自主學習 →</a>
    </div>`;
  $("#retry").addEventListener("click", () => { idx = 0; score = 0; renderQuestion(); });
}

async function boot() {
  mountChrome();
  $("#quiz-head").innerHTML = `
    <h1 class="page-title">🏆 闖關大挑戰</h1>
    <p class="lead">10 餘題情境與圖表判讀題，全部來自本教材內容。作答後會顯示解析與回看連結，可重複挑戰。</p>`;
  await load();
  renderQuestion();
}
document.addEventListener("DOMContentLoaded", boot);
