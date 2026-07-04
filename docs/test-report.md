# 品質檢核報告 Test Report

- 檢核日期:2026-07-04
- 版本:v1.0.0
- 方式:本機 Vite 伺服器（localhost:5173）於瀏覽器實測，並檢查主控台。

## 功能檢查
| 項目 | 結果 | 說明 |
|------|------|------|
| 頁籤（各獨立 HTML）連結切換 | ✅ | 7 頁皆可互相連結，active 標示正確 |
| 上一頁／下一頁、鍵盤左右鍵 | ✅ | chrome.js 動態產生，首末頁正確隱藏 |
| 探究七步驟圖文同步 | ✅ | 點步驟 4 僅顯示 1 張 SVG（設計實驗），標題與說明一致 |
| 顯微鏡構造互動 | ✅ | 8 個構造可點選高亮並展開說明，滑鼠＋鍵盤皆可 |
| 顯微鏡操作六步驟 | ✅ | 流程列＋SVG＋警語同步 |
| 實驗變因與資料判讀四階段 | ✅ | 3 變因卡、設計表、4 階段流程、4 陷阱皆渲染 |
| 生活應用六則動畫 | ✅ | 每則皆有專屬 SVG 且 animation-name 實際套用（grow/wander/barRise/dash/fadePulse） |
| 闖關挑戰作答計分 | ✅ | 作答顯示解析＋回看連結，可重新挑戰，分數存 localStorage |
| 進度跨頁面記錄 | ✅ | 造訪頁面累計，首頁進度條反映 |
| 外部連結 | ✅ | resources 8 筆均 target=_blank |

## 內容檢查
| 項目 | 結果 |
|------|------|
| 原理正確、用語符合七年級 | ✅ |
| 題目來自教材、答案與解釋一致 | ✅ |
| 課綱代碼標註「待教師依正式手冊確認」，未杜撰 | ✅ |
| 生活應用連結教材概念 | ✅ |

## 技術檢查
| 項目 | 結果 | 說明 |
|------|------|------|
| JavaScript 主控台錯誤 | ✅ 無 | 各頁 error log 皆為空 |
| RWD | ✅ | responsive.css 於 860/560 斷點調整 |
| 相對路徑、無本機絕對路徑 | ✅ | 資源均相對路徑 |
| SVG 圖層切換用 attribute | ✅ | 階段切換直接換入 SVG，`.svg-layer[hidden]` 規則備援 |
| prefers-reduced-motion | ✅ | animation.css 統一關閉清單 |
| SVG 替代說明 | ✅ | role="img" + aria-label |
| og-cover.png 1200×630 + 各頁 og meta | ✅ | 圖已產出並檢視無溢出 |
| 無敏感金鑰 | ✅ | .gitignore 排除 config.js/.env |

## 待部署後複驗
- GitHub Pages 子路徑資源載入（build base 已設 `/living-world-scientific-method/`）。
- `curl` 確認 og-cover 回 200、首頁含 og:image。
- Facebook 分享偵錯工具重新抓取預覽。

## 結論
本機測試全部通過，無主控台錯誤。教材功能、內容與技術檢核符合規範，可進行部署。
