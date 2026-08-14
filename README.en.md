<div align="center">

<img src="assets/logo.svg" width="96" height="96" alt="Lumen Focus logo" />

# 🌅 Lumen Focus

**An immersive, zero-dependency, offline-capable focus timer with Web-Audio generative ambient soundscapes and focus analytics.**

[简体中文](README.md) · [繁體中文](README.zh-TW.md) · [English](README.en.md)

![version](https://img.shields.io/badge/version-v1.0.0-7c9bff) ![license](https://img.shields.io/badge/license-MIT-6ee7a0) ![deps](https://img.shields.io/badge/dependencies-0-green) ![offline](https://img.shields.io/badge/offline-ready-blue)

</div>

---

## 🎉 Introduction

> In an age where attention is scarce, **Lumen Focus** crafts deep, quiet, and perceivable focus time for you.

It is a **pure frontend, zero third-party dependency, fully offline** immersive focus tool:
- 🌌 A minimalist "lumen" aesthetic that gracefully shifts its ambient glow between focus / break modes;
- 🔊 Built-in **Web Audio generative ambient soundscapes** (Deep, Rain, Cafe, Ocean) — synthesized in real time, no audio files shipped;
- 📊 Local analytics: today / this week focus minutes, streak, completed rounds, and a 7-day distribution chart;
- 📦 One build produces a **single self-contained HTML file** — double-click and go, with PWA offline installation.

No sign-up, no network required, no tracking — just open it and focus.

---

## ✨ Features

| Feature | Description |
| --- | --- |
| 🎯 Three focus modes | Deep Focus / Short Break / Long Break, customizable durations |
| 🔊 Generative ambient | Deep, Rain, Cafe, Ocean — synthesized live via Web Audio |
| 📊 Focus analytics | Today / Week / Streak / Rounds / 7-day chart |
| 🔁 Round counter | Auto-tracks current round and transitions to break |
| 🌗 Light & dark themes | One-click toggle, ideal for day & night |
| ⌨️ Global shortcuts | `Space` start/pause, `R` reset |
| 📦 Zero-dependency + offline | Single-file build, installable PWA, zero network requests |
| ♿ Accessible | Semantic markup, keyboard support, `prefers-reduced-motion` |

---

## 🚀 Quick Start

### Option 1: Use directly (recommended)

Grab `lumen-focus-v1.0.0.html` (single-file offline build) from the [Releases](https://github.com/gitstq/lumen-focus/releases) page and open it in any browser.

### Option 2: Run from source

Requires **Node.js ≥ 18** (zero dependencies — no `npm install` needed):

```bash
git clone https://github.com/gitstq/lumen-focus.git
cd lumen-focus

npm run serve     # local preview → http://localhost:4173
# or build the single-file offline version
npm run build     # outputs dist/index.html
```

### Option 3: Open directly

Open `index.html` in a browser. Note: the modular source needs a local server; the single-file build has no such requirement.

---

## 📖 Usage Guide

### 1. Choose a mode

The top nav offers three modes — click to switch and reset the timer:

- **Deep Focus** (default 25 min)
- **Short Break** (default 5 min)
- **Long Break** (default 15 min)

> 💡 Durations can be tuned in `DEFAULTS` inside `src/js/app.js`, or customized via localStorage.

### 2. Start focusing

Click **Start**, or press `Space`. The timer ring advances with a "lumen" animation as the ambient glow shifts with the mode.

### 3. Ambient sound

Pick a soundscape at the bottom:

- **Silence** — no sound
- **Deep** — warm low pad + brown noise
- **Rain** — high-pass filtered rainfall
- **Cafe** — room tone with sparse cup clinks
- **Ocean** — rolling waves via a slow LFO

All sounds are **synthesized in real time by the Web Audio API** — no audio files are loaded, fully offline.

### 4. View analytics

Click the 📈 icon (top-right) to open the "Focus Data" panel: today / week focus minutes, streak, rounds, and a 7-day chart. Data lives in browser `localStorage` — local only.

### 5. Theme & shortcuts

| Action | Method |
| --- | --- |
| Toggle ambient sound | 🎧 button (top) |
| Toggle theme | ☾ button (top) |
| Start / Pause | `Space` |
| Reset current segment | `R` |

---

## 💡 Design & Roadmap

### Design thinking

- **"Lumen" narrative**: soft ambient glow is the visual anchor — the main glow during focus, a warm palette during breaks, making state intuitively perceivable.
- **Zero-dependency principle**: no third-party runtime libraries, keeping the project maintainable, offline, and auditable.
- **Generative audio**: versus pre-recorded files, Web Audio synthesis is near-zero in size and infinitely loopable and varied.

### Roadmap

- [ ] Custom duration settings panel
- [ ] Daily goal & reminders (Notification API)
- [ ] More soundscapes (forest, campfire, deep-night white noise)
- [ ] Focus tags / project-level stats
- [ ] Data export (JSON / CSV)
- [ ] Desktop packaging (Tauri / Electron)

PRs and [Issues](https://github.com/gitstq/lumen-focus/issues) are welcome.

---

## 📦 Build & Deploy

### Single-file offline build

```bash
npm run build
```

This produces **`dist/index.html`** — CSS and JS are inlined into one file (~33 KB) with the PWA manifest and Service Worker. You can:

- Open it locally, fully offline;
- Deploy to any static host (GitHub Pages / Vercel / Netlify / object storage);
- Install it as a PWA via "Add to Home Screen".

### Deploy to GitHub Pages

```bash
npm run build
# Publish the contents of dist/ to the gh-pages branch
```

---

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Follow the [Angular commit convention](https://www.conventionalcommits.org/), keep it zero-dependency, and run `npm test` before submitting.

---

## 📄 License

Licensed under the **MIT License**. See [LICENSE](LICENSE).

<div align="center"><sub>Made with 💙 · Lumen Focus</sub></div>