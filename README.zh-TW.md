<div align="center">

<img src="assets/logo.svg" width="96" height="96" alt="Lumen Focus logo" />

# 🌅 Lumen Focus · 光域專注

**一款零依賴、可離線執行的沉浸式專注計時器，內建 Web Audio 生成式環境音與專注數據分析。**

[简体中文](README.md) · [繁體中文](README.zh-TW.md) · [English](README.en.md)

![version](https://img.shields.io/badge/version-v1.0.0-7c9bff) ![license](https://img.shields.io/badge/license-MIT-6ee7a0) ![deps](https://img.shields.io/badge/dependencies-0-green) ![offline](https://img.shields.io/badge/offline-ready-blue)
[![release](https://img.shields.io/badge/download-Releases-ff6b6b)](https://github.com/gitstq/lumen-focus/releases)

</div>

---

## 🎉 專案介紹

> 在注意力越來越稀缺的時代，**Lumen Focus** 為您打造一段深邃、安靜、可感知的專注時光。

它是一款**純前端、零第三方依賴、可完全離線執行**的沉浸式專注工具：
- 🌌 極簡「光域」美學介面，隨專注 / 休息模式優雅切換主題光暈；
- 🔊 內建 **Web Audio 生成式環境音**（深度、雨聲、咖啡館、海浪），無需任何音訊檔案，即時合成；
- 📊 本地數據分析：今日 / 本週專注時長、連續天數、完成輪次與近 7 天分布圖；
- 📦 一次「打包」即可獲得**單一 HTML 檔案**，雙擊即用，支援 PWA 離線安裝。

無需註冊、無需連網、無任何追蹤——開啟即專注。

---

## ✨ 核心特色

| 特色 | 說明 |
| --- | --- |
| 🎯 三種專注模式 | 深度專注 / 短休息 / 長休息，時長可自訂 |
| 🔊 生成式環境音 | 深度、雨聲、咖啡館、海浪，Web Audio 即時合成 |
| 📊 專注數據分析 | 今日 / 本週 / 連續天數 / 輪次 / 7 天分布圖 |
| 🔁 循環輪次計數 | 自動記錄目前第幾輪，進入休息 |
| 🌗 深淺主題 | 一鍵切換，貼合晝夜使用習慣 |
| ⌨️ 全域快捷鍵 | `Space` 開始/暫停，`R` 重置 |
| 📦 零依賴 + 離線 | 單檔打包，PWA 可安裝，無任何網路請求 |
| ♿ 無障礙友善 | 語意化標籤、鍵盤操作、`prefers-reduced-motion` 支援 |

---

## 🚀 快速開始

### 方式一：直接使用（建議）

下載 [Releases](https://github.com/gitstq/lumen-focus/releases) 中的 `lumen-focus-v1.0.0.html`（單檔離線版），雙擊用瀏覽器開啟即可。

### 方式二：本地執行原始碼

需求 **Node.js ≥ 18**（零依賴，無需 `npm install` 三方套件）：

```bash
git clone https://github.com/gitstq/lumen-focus.git
cd lumen-focus

npm run serve     # 本地預覽 → http://localhost:4173
# 或直接建置單檔離線版
npm run build     # 生成 dist/index.html
```

### 方式三：直接開啟

直接用瀏覽器開啟倉庫根目錄的 `index.html` 即可（模組化原始碼需本地伺服器，單檔版無此限制）。

---

## 📖 詳細使用指南

### 1. 選擇模式

頂部導覽提供三種模式，點擊即切換並重置計時：

- **深度專注**（預設 25 分鐘）
- **短休息**（預設 5 分鐘）
- **長休息**（預設 15 分鐘）

> 💡 時長可在 `src/js/app.js` 的 `DEFAULTS` 中調整，或透過 localStorage 自訂。

### 2. 開始專注

點擊 **開始** 按鈕，或按鍵盤 `Space`。計時環會以「光域」動畫推進，介面光暈隨模式柔和變化。

### 3. 環境音

點擊底部「環境音」選項，選擇：

- **靜音** — 無聲音
- **深度** — 溫暖的低頻環境音墊 + 棕色雜訊
- **雨聲** — 高頻濾波雨聲
- **咖啡館** — 背景人流 + 稀疏杯具聲
- **海浪** — 帶緩慢漲落 LFO 的滾湧浪聲

所有聲音均由 **Web Audio API 即時合成**，不載入任何音訊檔案，完全離線。

### 4. 查看數據

點擊右上角 📈 圖示開啟「專注數據」面板：今日 / 本週專注時長、連續天數、完成輪次及近 7 天分布圖。數據保存在瀏覽器 `localStorage` 中，僅存在於本地。

### 5. 主題與快捷鍵

| 操作 | 方式 |
| --- | --- |
| 切換環境音開關 | 頂部 🎧 按鈕 |
| 切換深淺主題 | 頂部 ☾ 按鈕 |
| 開始 / 暫停 | `Space` |
| 重置目前段落 | `R` |

---

## 💡 設計思路與迭代規劃

### 設計思路

- **「光域」敘事**：以柔和光暈作為視覺錨點，專注時為主體光暈，休息時切換為溫潤配色，讓「狀態」可被直覺感知。
- **零依賴原則**：不引入任何第三方執行期函式庫，保證長期可維護、可離線、可稽核。
- **生成式音訊**：相比預錄音訊檔案，Web Audio 合成體積近乎為零，且可無限循環、無限變化。

### 迭代規劃

- [ ] 自訂倒數時長設定面板
- [ ] 每日目標與提醒（Notification API）
- [ ] 更多環境音（林間、營火、深夜白噪）
- [ ] 專注標籤 / 專案維度統計
- [ ] 數據匯出（JSON / CSV）
- [ ] 桌面端（Tauri / Electron）封裝

歡迎提交 [Issue](https://github.com/gitstq/lumen-focus/issues) 與 [PR](https://github.com/gitstq/lumen-focus/pulls) 參與共建。

---

## 📦 打包與部署指南

### 單檔離線打包

```bash
npm run build
```

執行後會生成 **`dist/index.html`**，CSS 與 JS 已內聯為單一檔案（約 33 KB），附帶 PWA 清單與 Service Worker，可：

- 雙擊本地開啟，完全離線使用；
- 部署到任意靜態託管（GitHub Pages / Vercel / Netlify / 物件儲存）；
- 透過瀏覽器「新增至主畫面」安裝為 PWA。

### 部署到 GitHub Pages

```bash
npm run build
# 將 dist/ 目錄內容發布到 gh-pages 分支即可
```

---

## 🤝 貢獻指南

請閱讀 [CONTRIBUTING.md](CONTRIBUTING.md)。遵循 [Angular 提交規範](https://www.conventionalcommits.org/)、保持零依賴、提交前執行 `npm test`。

---

## 📄 開源授權說明

本專案基於 **MIT License** 開源，可自由使用、修改與散佈。詳見 [LICENSE](LICENSE)。

<div align="center"><sub>Made with 💙 · Lumen Focus 光域專注</sub></div>