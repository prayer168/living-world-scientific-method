# 設計規格 Design Spec

## 架構
- 多頁式網站，每個單元一個 HTML 檔，以真實 `<a>` 連結切換。
- 共用版面（頁首／頁籤／上一頁下一頁／頁尾）由 `js/chrome.js` 依 `<body data-page>` 動態產生。
- `js/app.js` 依當前頁面載入 JSON、渲染內容並啟動互動。
- 內容與邏輯分離:文字存於 `data/*.json`，SVG 與互動存於 `js/`。

## 模組
| 檔案 | 職責 |
|------|------|
| `chrome.js` | 頁首、頁籤導覽、上一頁／下一頁、鍵盤切換、掛載進度 |
| `progress.js` | 跨頁面進度與測驗分數（localStorage） |
| `app.js` | 各頁面渲染路由 |
| `interactions.js` | 階段流程元件（圖／流程列／說明同步）、顯微鏡構造高亮 |
| `figures.js` | 探究、顯微鏡、實驗的教學寫實 SVG |
| `applyAnim.js` | 生活應用每則專屬會動 SVG（key→svg） |
| `quiz.js` | 闖關挑戰邏輯 |

## 互動與動畫原則
- 階段切換直接以 SVG 依 key 換入，確保「每階段只顯示一張正確的圖」。
- SVG 圖層若需隱藏，使用 attribute `[hidden]` + CSS `display:none`，不用 `element.hidden`。
- SVG 子元素變形設 `transform-box: fill-box; transform-origin`。
- 所有動畫納入 `prefers-reduced-motion` 關閉清單，靜止時畫面仍可理解。

## 視覺
- 主色:自然綠 `#2e8b6f`；強調橙 `#f2a93b`；變因三色（操縱紅／應變藍／控制綠）。
- 字體:微軟正黑體系；正文 17px、行高 1.75；卡片式分區、圓角、留白充足。
- 對比與焦點:`:focus-visible` 明顯外框，不只用顏色傳達資訊。

## 無障礙
- SVG 加 `role="img"`／`aria-label`；可互動元素加 `tabindex`、`role="button"`、鍵盤支援。
- 測驗回饋以文字與圖示雙重呈現。
