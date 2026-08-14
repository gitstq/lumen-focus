<div align="center">

<img src="assets/logo.svg" width="96" height="96" alt="Lumen Focus logo" />

# 🌅 Lumen Focus · 光域专注

**一款零依赖、可离线运行的沉浸式专注计时器，内置 Web Audio 生成式环境音与专注数据分析。**

[简体中文](README.md) · [繁體中文](README.zh-TW.md) · [English](README.en.md)

![version](https://img.shields.io/badge/version-v1.0.0-7c9bff) ![license](https://img.shields.io/badge/license-MIT-6ee7a0) ![deps](https://img.shields.io/badge/dependencies-0-green) ![offline](https://img.shields.io/badge/offline-ready-blue)
[![release](https://img.shields.io/badge/download-Releases-ff6b6b)](https://github.com/gitstq/lumen-focus/releases)

</div>

---

## 🎉 项目介绍

> 在注意力愈发稀缺的时代，**Lumen Focus** 为您打造一段深邃、安静、可感知的专注时光。

它是一款**纯前端、零第三方依赖、可完全离线运行**的沉浸式专注工具：
- 🌌 极简「光域」美学界面，随专注 / 休息模式优雅切换主题光晕；
- 🔊 内置 **Web Audio 生成式环境音**（深度、雨声、咖啡馆、海浪），无需任何音频文件，实时合成；
- 📊 本地数据分析：今日 / 本周专注时长、连续天数、完成轮次与近 7 天分布图；
- 📦 一次「打包」即可获得**单个 HTML 文件**，双击即用，支持 PWA 离线安装。

无需注册、无需联网、无任何追踪——打开即专注。

---

## ✨ 核心特性

| 特性 | 说明 |
| --- | --- |
| 🎯 三种专注模式 | 深度专注 / 短休息 / 长休息，时长可自定义 |
| 🔊 生成式环境音 | 深度、雨声、咖啡馆、海浪，Web Audio 实时合成 |
| 📊 专注数据分析 | 今日 / 本周 / 连续天数 / 轮次 / 7 天分布图 |
| 🔁 循环轮次计数 | 自动记录当前第几轮，进入休息 |
| 🌗 深浅主题 | 一键切换，贴合昼夜使用习惯 |
| ⌨️ 全局快捷键 | `Space` 开始/暂停，`R` 重置 |
| 📦 零依赖 + 离线 | 单文件打包，PWA 可安装，无任何网络请求 |
| ♿ 无障碍友好 | 语义化标签、键盘操作、`prefers-reduced-motion` 支持 |

---

## 🚀 快速开始

### 方式一：直接使用（推荐）

下载 [Releases](https://github.com/gitstq/lumen-focus/releases) 中的 `lumen-focus-v1.0.0.html`（单文件离线版），双击用浏览器打开即可。

### 方式二：本地运行源码

要求 **Node.js ≥ 18**（零依赖，无需 `npm install` 三方包）：

```bash
git clone https://github.com/gitstq/lumen-focus.git
cd lumen-focus

npm run serve     # 本地预览 → http://localhost:4173
# 或直接构建单文件离线版
npm run build     # 生成 dist/index.html
```

### 方式三：直接打开

直接用浏览器打开仓库根目录的 `index.html` 即可（模块化源码需本地服务器，单文件版无此限制）。

---

## 📖 详细使用指南

### 1. 选择模式

顶部导航提供三种模式，点击即切换并重置计时：

- **深度专注**（默认 25 分钟）
- **短休息**（默认 5 分钟）
- **长休息**（默认 15 分钟）

> 💡 时长可在 `src/js/app.js` 的 `DEFAULTS` 中调整，或通过 localStorage 自定义。

### 2. 开始专注

点击 **开始** 按钮，或按键盘 `Space`。计时环会以「光域」动画推进，界面光晕随模式柔和变化。

### 3. 环境音

点击底部「环境音」选项，选择：

- **静音** — 无声音
- **深度** — 温暖的低频环境音垫 + 棕色噪声
- **雨声** — 高频滤波雨声
- **咖啡馆** — 背景人流 + 稀疏杯具声
- **海浪** — 带缓慢涨落 LFO 的滚涌浪声

所有声音均由 **Web Audio API 实时合成**，不载入任何音频文件，完全离线。

### 4. 查看数据

点击右上角 📈 图标打开「专注数据」面板：今日 / 本周专注时长、连续天数、完成轮次及近 7 天分布图。数据保存在浏览器 `localStorage` 中，仅存在于本地。

### 5. 主题与快捷键

| 操作 | 方式 |
| --- | --- |
| 切换环境音开关 | 顶部 🎧 按钮 |
| 切换深浅主题 | 顶部 ☾ 按钮 |
| 开始 / 暂停 | `Space` |
| 重置当前段 | `R` |

---

## 💡 设计思路与迭代规划

### 设计思路

- **「光域」叙事**：以柔和光晕作为视觉锚点，专注时为主体光晕，休息时切换为温润配色，让「状态」可被直觉感知。
- **零依赖原则**：不引入任何第三方运行时库，保证长期可维护、可离线、可审计。
- **生成式音频**：相比预录音频文件，Web Audio 合成体积近乎为零，且可无限循环、无限变化。

### 迭代规划

- [ ] 自定义倒计时时长设置面板
- [ ] 每日目标与提醒（Notification API）
- [ ] 更多环境音（林间、篝火、深夜白噪）
- [ ] 专注标签 / 项目维度统计
- [ ] 数据导出（JSON / CSV）
- [ ] 桌面端（Tauri / Electron）封装

欢迎提交 [Issue](https://github.com/gitstq/lumen-focus/issues) 与 [PR](https://github.com/gitstq/lumen-focus/pulls) 参与共建。

---

## 📦 打包与部署指南

### 单文件离线打包

```bash
npm run build
```

运行后会生成 **`dist/index.html`**，CSS 与 JS 已内联为单个文件（约 33 KB），附带 PWA 清单与 Service Worker，可：

- 双击本地打开，完全离线使用；
- 部署到任意静态托管（GitHub Pages / Vercel / Netlify / 对象存储）；
- 通过浏览器「添加到主屏幕」安装为 PWA。

### 部署到 GitHub Pages

```bash
npm run build
# 将 dist/ 目录内容发布到 gh-pages 分支即可
```

---

## 🤝 贡献指南

请阅读 [CONTRIBUTING.md](CONTRIBUTING.md)。遵循 [Angular 提交规范](https://www.conventionalcommits.org/)、保持零依赖、提交前运行 `npm test`。

---

## 📄 开源协议说明

本项目基于 **MIT License** 开源，可自由使用、修改与分发。详见 [LICENSE](LICENSE)。

<div align="center"><sub>Made with 💙 · Lumen Focus 光域专注</sub></div>