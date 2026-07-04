// 互動元件:階段流程（圖／流程列／說明三者同步）與顯微鏡構造高亮。

/**
 * 建立階段流程互動:上方為可點選的流程列，下方左圖右文，逐階段同步。
 * 圖層以 SVG 直接依 key 換入（只顯示一張正確的圖）。
 */
export function buildStageFlow({ mount, stages, figs, keyOf, labelOf, renderText }) {
  const flowId = "flow-" + Math.floor(performance.now() % 100000);
  mount.innerHTML = `
    <div class="stageflow" role="tablist" aria-label="階段流程">
      ${stages.map((s, i) => `
        ${i > 0 ? '<span class="stage-arrow" aria-hidden="true">→</span>' : ""}
        <button class="stage-btn ${i === 0 ? "active" : ""}" role="tab"
          aria-selected="${i === 0}" data-idx="${i}">${i + 1}. ${labelOf(s)}</button>`).join("")}
    </div>
    <div class="controls">
      <button class="btn ghost small" data-act="prev">← 上一步</button>
      <button class="btn ghost small" data-act="next">下一步 →</button>
      <button class="btn ghost small" data-act="reset">↺ 回到第一步</button>
    </div>
    <div class="stage-view">
      <div class="stage-figure" id="${flowId}-fig"></div>
      <div class="stage-text" id="${flowId}-txt" aria-live="polite"></div>
    </div>`;

  const figBox = mount.querySelector(`#${flowId}-fig`);
  const txtBox = mount.querySelector(`#${flowId}-txt`);
  const btns = [...mount.querySelectorAll(".stage-btn")];
  let idx = 0;

  function show(i) {
    idx = Math.max(0, Math.min(stages.length - 1, i));
    const s = stages[idx];
    figBox.innerHTML = figs[keyOf(s)] || "";
    txtBox.innerHTML = renderText(s);
    btns.forEach((b, j) => {
      const on = j === idx;
      b.classList.toggle("active", on);
      b.setAttribute("aria-selected", on);
    });
  }

  mount.addEventListener("click", (e) => {
    const b = e.target.closest(".stage-btn");
    if (b) return show(+b.dataset.idx);
    const act = e.target.closest("[data-act]")?.dataset.act;
    if (act === "prev") show(idx - 1);
    if (act === "next") show(idx + 1);
    if (act === "reset") show(0);
  });

  show(0);
}

/**
 * 顯微鏡構造:點選左側清單或圖上構造，高亮對應零件並展開說明。
 */
export function wireMicroscopeParts(root, partPos) {
  const svg = root.querySelector("#microFig");
  const list = root.querySelector("#partsList");
  if (!svg || !list) return;

  const items = [...list.querySelectorAll("li")];

  function select(key) {
    // 圖上高亮
    svg.querySelectorAll(".mpart").forEach(p => p.classList.remove("part-hi"));
    svg.querySelectorAll(`.mpart[data-part="${key}"]`).forEach(p => p.classList.add("part-hi"));
    // 指示圈
    const label = svg.querySelector("#microLabel");
    const pos = partPos[key];
    label.innerHTML = pos
      ? `<circle cx="${pos[0]}" cy="${pos[1]}" r="20" fill="none" stroke="#f2a93b" stroke-width="3" class="anim-pulse"/>`
      : "";
    // 清單狀態
    items.forEach(li => {
      const on = li.dataset.part === key;
      li.classList.toggle("active", on);
      const desc = li.querySelector(".part-desc");
      if (desc) desc.hidden = !on;
    });
  }

  items.forEach(li => {
    li.addEventListener("click", () => select(li.dataset.part));
    li.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(li.dataset.part); }
    });
  });

  svg.querySelectorAll(".mpart").forEach(p => {
    p.style.cursor = "pointer";
    p.addEventListener("click", () => select(p.dataset.part));
  });

  select("eyepiece");
}
