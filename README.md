# 生命世界與科學方法:生物入門

國中七年級自然科學（生物）互動教材 — 帶學生像科學家一樣**觀察、提問、驗證**。

🔗 **線上教材:** https://prayer168.github.io/living-world-scientific-method/

---

## 教材簡介

生物學不只是背名詞，而是一套「怎麼認識生命世界」的方法。本教材以真實情境（窗邊 vs 靠牆的黃金葛、施肥對小白菜的影響）帶學生走完整段科學探究:從觀察現象、提出可檢驗的問題與假設，到用顯微鏡看見細胞、設計對照實驗、控制變因、判讀圖表，最後做出以證據為依據的結論。

## 適用對象

- **年級:** 國中七年級（亦適合國小高年級延伸）
- **領域:** 自然科學（生物）
- **學習時間:** 約 40 分鐘

## 學習目標

1. 說出自然科學探究的主要階段，並依現象提出可檢驗的問題與假設。
2. 正確辨識複式顯微鏡的構造與使用步驟，並畫出規範的觀察紀錄。
3. 在實驗中分辨操縱變因、應變變因與控制變因，判讀圖表資料並下結論。

## 教材特色

- **多頁式互動網站**:每個單元獨立成頁，以頁籤與上一頁／下一頁連結切換。
- **圖文逐階段同步**:探究七步驟、顯微鏡操作、資料判讀皆以「流程列＋SVG 圖＋說明」三者同步呈現。
- **教學寫實 SVG**:顯微鏡構造可點選高亮、生活應用每則配專屬會動動畫。
- **素養導向闖關**:12 題情境與圖表判讀題，附解析與回看教材連結，可重複挑戰。
- **跨頁面進度保存**（localStorage）、支援 `prefers-reduced-motion`。
- **RWD**:電腦、平板、手機皆可使用。

## 頁籤內容

| 頁面 | 內容 |
|------|------|
| 🏠 學習任務 | 學習目標、單元導覽、學習進度 |
| 🔍 探究歷程 | 觀察→提問→假設→實驗→資料→結論→溝通 七步驟互動 |
| 🔬 顯微鏡觀察 | 構造互動、操作六步驟、繪圖紀錄規範 |
| 🧪 實驗與變因 | 三種變因、對照組、資料判讀四階段、常見陷阱 |
| 🌱 生活應用 | 六則生活情境 + 專屬會動 SVG |
| 🏆 闖關挑戰 | 12 題素養導向測驗 |
| 📚 自主學習 | 8 個可信賴延伸資源 |

## 使用方式

直接開啟線上網址即可，無需安裝。用滑鼠點選、或鍵盤 ← → 切換頁面。

## 本機啟動

```bash
npm install
npm run dev      # 開發預覽 (http://localhost:5173)
npm run build    # 打包到 dist/
npm run preview  # 預覽打包結果
```

## 專案結構

```
living-world-scientific-method/
├─ index.html / inquiry / microscope / experiment / apply / quiz / resources.html
├─ css/  (style / animation / responsive)
├─ js/   (chrome / app / interactions / figures / applyAnim / quiz / progress)
├─ data/ (content / quiz / resources / curriculum.json)
├─ assets/images/og-cover.png
├─ share/facebook-post.html
└─ docs/ (lesson-plan / design-spec / references / test-report)
```

## 使用技術

HTML5、CSS3、SVG、原生 JavaScript（ES Modules）、JSON、Vite。內容與程式邏輯分離，動畫以教學正確性優先。

## 課綱對應

對應十二年國教自然科學領域「科學探究與實作」精神（探究歷程、變因控制、觀察工具、資料判讀）。正式課綱代碼請依《十二年國民基本教育課程綱要—自然科學領域》手冊確認，詳見 [`docs/references.md`](docs/references.md) 與 `data/curriculum.json`。

## GitHub Pages

https://prayer168.github.io/living-world-scientific-method/

## 授權與引用

本教材採 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.zh_TW) 授權，歡迎教學使用與改作，請保留出處。
