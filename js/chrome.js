// 共用版面:頁首、頁籤導覽、上一頁/下一頁、頁尾。依 <body data-page> 產生。
import { markVisited, renderProgressBar } from "./progress.js";

const PAGES = [
  { page: "home", file: "index.html", tab: "學習任務", icon: "🏠" },
  { page: "inquiry", file: "inquiry.html", tab: "探究歷程", icon: "🔍" },
  { page: "microscope", file: "microscope.html", tab: "顯微鏡觀察", icon: "🔬" },
  { page: "experiment", file: "experiment.html", tab: "實驗與變因", icon: "🧪" },
  { page: "apply", file: "apply.html", tab: "生活應用", icon: "🌱" },
  { page: "quiz", file: "quiz.html", tab: "闖關挑戰", icon: "🏆" },
  { page: "resources", file: "resources.html", tab: "自主學習", icon: "📚" }
];

const SITE = "生命世界與科學方法:生物入門";
const SUB = "國中七年級 · 自然科學（生物）· 探究與實作互動教材";

function buildHeader(current) {
  const tabs = PAGES.map(p =>
    `<a href="${p.file}" class="${p.page === current ? "active" : ""}"${p.page === current ? ' aria-current="page"' : ""}>${p.icon} ${p.tab}</a>`
  ).join("");
  return `
  <header class="site-header">
    <div class="wrap">
      <div class="brand-row">
        <span class="brand-mark">🧬</span>
        <div>
          <p class="brand-title">${SITE}</p>
          <p class="brand-sub">${SUB}</p>
        </div>
      </div>
      <nav class="tabnav" aria-label="教材單元導覽">${tabs}</nav>
    </div>
  </header>`;
}

function buildPager(current) {
  const idx = PAGES.findIndex(p => p.page === current);
  const prev = PAGES[idx - 1];
  const next = PAGES[idx + 1];
  const prevHtml = prev
    ? `<a class="prev" href="${prev.file}"><span class="dir">← 上一頁</span><span class="ttl">${prev.icon} ${prev.tab}</span></a>`
    : `<a class="prev disabled" aria-hidden="true"></a>`;
  const nextHtml = next
    ? `<a class="next" href="${next.file}"><span class="dir">下一頁 →</span><span class="ttl">${next.icon} ${next.tab}</span></a>`
    : `<a class="next disabled" aria-hidden="true"></a>`;
  return `<nav class="pager" aria-label="上一頁與下一頁">${prevHtml}${nextHtml}</nav>`;
}

function buildFooter() {
  return `
  <footer class="site-footer">
    <div class="wrap">
      <p>${SITE}｜國中七年級自然科學互動教材</p>
      <p>本教材採 <a href="https://creativecommons.org/licenses/by/4.0/deed.zh_TW" target="_blank" rel="noopener">CC BY 4.0</a> 授權，歡迎教學使用。動畫與內容以教學正確性為優先。</p>
    </div>
  </footer>`;
}

export function mountChrome() {
  const current = document.body.dataset.page || "home";
  document.body.insertAdjacentHTML("afterbegin", buildHeader(current));

  const main = document.querySelector("main");
  if (main) main.insertAdjacentHTML("beforeend", buildPager(current));

  document.body.insertAdjacentHTML("beforeend", buildFooter());

  markVisited(current);
  document.querySelectorAll("[data-progress-bar]").forEach(renderProgressBar);

  // 鍵盤左右鍵切換頁面
  document.addEventListener("keydown", (e) => {
    if (e.target.matches("input, textarea, button, a, select")) return;
    const idx = PAGES.findIndex(p => p.page === current);
    if (e.key === "ArrowLeft" && PAGES[idx - 1]) location.href = PAGES[idx - 1].file;
    if (e.key === "ArrowRight" && PAGES[idx + 1]) location.href = PAGES[idx + 1].file;
  });
}
