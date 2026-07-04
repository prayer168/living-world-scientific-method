// 跨頁面學習進度:記錄造訪過的頁面到 localStorage
const KEY = "lwsm-progress-v1";
export const TRACK_PAGES = ["home", "inquiry", "microscope", "experiment", "apply", "quiz", "resources"];

export function loadProgress() {
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
  catch { return {}; }
}
export function markVisited(page) {
  const p = loadProgress();
  p[page] = true;
  try { localStorage.setItem(KEY, JSON.stringify(p)); } catch {}
}
export function saveQuizScore(score, total) {
  const p = loadProgress();
  p.quizScore = score; p.quizTotal = total; p.quiz = true;
  try { localStorage.setItem(KEY, JSON.stringify(p)); } catch {}
}
export function progressPercent() {
  const p = loadProgress();
  const visited = TRACK_PAGES.filter(pg => p[pg]).length;
  return Math.round((visited / TRACK_PAGES.length) * 100);
}
export function renderProgressBar(el) {
  if (!el) return;
  const pct = progressPercent();
  el.innerHTML = `
    <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
    <div class="progress-label">學習進度:已完成 ${pct}%（造訪教材頁面自動累計，紀錄保存在本機）</div>`;
}
