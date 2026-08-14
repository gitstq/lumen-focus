/* Lumen Focus · 光域专注 — main controller. */

import { SoundEngine, SOUNDS } from './audio.js';
import { Stats } from './stats.js';

const MODES = {
  deep: { label: '深度专注', minutes: 25, accent: [124, 155, 255] },
  short: { label: '短休息', minutes: 5, accent: [110, 231, 160] },
  long: { label: '长休息', minutes: 15, accent: [169, 140, 255] },
};

const DEFAULTS = { deep: 25, short: 5, long: 15 };

const $ = (sel) => document.querySelector(sel);
const pad = (n) => String(n).padStart(2, '0');
const fmt = (s) => `${pad(Math.floor(s / 60))}:${pad(s % 60)}`;

class App {
  constructor() {
    this.audio = new SoundEngine();
    this.stats = new Stats();
    this.mode = 'deep';
    this.total = MODES.deep.minutes * 60;
    this.remaining = this.total;
    this.running = false;
    this.round = 1;
    this.interval = null;
    this.el = {
      time: $('#timeDisplay'),
      meta: $('#timerMeta'),
      ring: $('#timerRing'),
      startBtn: $('#startBtn'),
      startLabel: $('#startLabel'),
      startIcon: $('#startIcon'),
      ambient: $('#ambient'),
      soundOptions: $('#soundOptions'),
      soundToggle: $('#soundToggle'),
      modeNav: $('#modeNav'),
      toast: $('#toast'),
      statsPanel: $('#statsPanel'),
    };
    this.bind();
    this.applyMode();
    this.renderStats();
    this.hydrateSettings();
  }

  bind() {
    this.el.startBtn.addEventListener('click', () => this.toggle());
    $('#resetBtn').addEventListener('click', () => this.reset());
    $('#skipBtn').addEventListener('click', () => this.skip());
    this.el.modeNav.addEventListener('click', (e) => {
      const btn = e.target.closest('.mode-btn');
      if (btn && btn.dataset.mode) {
        this.setMode(btn.dataset.mode);
        this.saveSettings();
      }
    });
    this.el.soundOptions.addEventListener('click', (e) => {
      const c = e.target.closest('.chip');
      if (!c) return;
      this.audio.ensure();
      const name = this.audio.toggle(c.dataset.sound, 0.5);
      this.syncSoundChips();
      localStorage.setItem('lumenFocus:sound', name);
    });
    this.el.soundToggle.addEventListener('click', () => {
      this.audio.ensure();
      const cur = this.el.soundOptions.querySelector('.chip.is-active')?.dataset.sound || 'silence';
      const next = cur === 'silence' ? 'deep' : 'silence';
      this.audio.setSound(next, 0.5);
      this.selectSound(next);
      this.toast(`环境音：${SOUNDS[next].label}`);
    });
    $('#themeToggle').addEventListener('click', () => this.toggleTheme());
    $('#statsToggle').addEventListener('click', () => this.toggleStats(true));
    $('#statsClose').addEventListener('click', () => this.toggleStats(false));

    document.addEventListener('keydown', (e) => {
      if (e.target.matches('input, textarea, select')) return;
      if (e.code === 'Space') { e.preventDefault(); this.toggle(); }
      else if (e.key === 'r' || e.key === 'R') this.reset();
    });

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && this.running) this.tick();
    });
  }

  hydrateSettings() {
    const sound = localStorage.getItem('lumenFocus:sound');
    if (sound && SOUNDS[sound]) this.selectSound(sound);
  }

  selectSound(name) {
    document.querySelectorAll('.chip').forEach((c) => {
      c.classList.toggle('is-active', c.dataset.sound === name);
    });
  }

  syncSoundChips() {
    const cur = this.audio.current;
    document.querySelectorAll('.chip').forEach((c) => {
      c.classList.toggle('is-active', c.dataset.sound === cur);
    });
  }

  setMode(name) {
    this.mode = name;
    this.total = this.roundTotal();
    this.reset();
    this.applyMode();
    document.querySelectorAll('.mode-btn').forEach((b) => {
      const on = b.dataset.mode === name;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });
  }

  roundTotal() {
    const saved = this.loadCustom();
    return (saved[this.mode] ?? DEFAULTS[this.mode]) * 60;
  }

  loadCustom() {
    try { return JSON.parse(localStorage.getItem('lumenFocus:durations')) || {}; }
    catch (_) { return {}; }
  }

  saveSettings() {
    localStorage.setItem('lumenFocus:durations', JSON.stringify({
      deep: Math.round(this.roundTotal() / 60),
      short: Math.round((this.roundTotalFor('short')) / 60),
      long: Math.round((this.roundTotalFor('long')) / 60),
    }));
  }

  roundTotalFor(m) {
    const saved = this.loadCustom();
    return (saved[m] ?? DEFAULTS[m]) * 60;
  }

  applyMode() {
    const m = MODES[this.mode];
    document.documentElement.style.setProperty('--accent', `rgb(${m.accent.join(',')})`);
    document.documentElement.style.setProperty('--ambient-a', m.accent.join(','));
    document.documentElement.style.setProperty('--ambient-b', '124,155,255');
    this.el.meta.textContent = `${m.label} · 第 ${this.round} 轮`;
    this.render();
  }

  render() {
    this.el.time.textContent = fmt(this.remaining);
    const pct = ((this.total - this.remaining) / this.total) * 100;
    this.el.ring.style.setProperty('--p', pct.toFixed(2));
  }

  toggle() {
    if (this.running) this.pause();
    else this.start();
  }

  start() {
    this.running = true;
    this.el.startBtn.classList.add('is-running');
    this.el.startLabel.textContent = '暂停';
    this.el.startIcon.innerHTML = '<path d="M6 4h4v16H6zM14 4h4v16h-4z"/>';
    document.querySelector('.timer').classList.add('is-running');
    this.interval = setInterval(() => this.tick(), 250);
  }

  pause() {
    this.running = false;
    clearInterval(this.interval);
    this.syncPlayIcon();
  }

  syncPlayIcon() {
    this.el.startLabel.textContent = '继续';
    this.el.startIcon.innerHTML = '<path d="M8 5v14l11-7z"/>';
    document.querySelector('.timer').classList.remove('is-running');
  }

  tick() {
    if (!this.running) return;
    this.remaining -= 0.25;
    if (this.remaining <= 0) this.complete();
    else this.render();
  }

  complete() {
    this.pause();
    this.beep();
    if (this.mode === 'deep') {
      this.stats.recordFocus(Math.round(this.total / 60));
      this.renderStats();
      this.toast('专注完成，休息一下吧 ✦', true);
    } else {
      this.toast('休息结束，重新出发');
    }
    this.round++;
    this.reset();
  }

  reset() {
    this.pause();
    this.remaining = this.total;
    this.render();
  }

  skip() {
    this.complete();
  }

  beep() {
    if (!this.audio.ensure()) return;
    const ctx = this.audio.ctx;
    const t = ctx.currentTime;
    [0, 0.18, 0.36].forEach((off, i) => {
      const o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.value = i === 2 ? 660 : 520;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t + off);
      g.gain.exponentialRampToValueAtTime(0.25, t + off + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + off + 0.16);
      o.connect(g).connect(ctx.destination);
      o.start(t + off);
      o.stop(t + off + 0.2);
    });
  }

  toggleTheme() {
    const root = document.documentElement;
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('lumenFocus:theme', next);
  }

  toggleStats(open) {
    this.el.statsPanel.hidden = !open;
    if (open) this.renderStats();
  }

  renderStats() {
    $('#statToday').innerHTML = `${this.stats.today()}<span class="stat__unit">分</span>`;
    $('#statWeek').innerHTML = `${this.stats.week()}<span class="stat__unit">分</span>`;
    $('#statStreak').innerHTML = `${this.stats.streak()}<span class="stat__unit">天</span>`;
    $('#statSessions').innerHTML = `${this.stats.sessions()}<span class="stat__unit">轮</span>`;
    this.renderChart();
  }

  renderChart() {
    const wrap = $('#weekChart');
    const series = this.stats.weekSeries();
    const max = Math.max(1, ...series);
    const todayIdx = 6;
    wrap.innerHTML = '';
    series.forEach((m, i) => {
      const bar = document.createElement('div');
      bar.className = 'week-chart__bar' + (i === todayIdx ? ' is-today' : '');
      bar.style.height = `${Math.max(4, (m / max) * 100)}%`;
      bar.title = `${m} 分钟`;
      wrap.appendChild(bar);
    });
  }

  toast(msg, good = false) {
    this.el.toast.textContent = msg;
    this.el.toast.classList.toggle('is-good', good);
    this.el.toast.classList.add('is-show');
    clearTimeout(this._t);
    this._t = setTimeout(() => this.el.toast.classList.remove('is-show'), 2200);
  }
}

/* PWA: register service worker (production only). */
if ('serviceWorker' in navigator && location.protocol === 'https:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}

/* Restore theme. */
document.documentElement.setAttribute(
  'data-theme',
  localStorage.getItem('lumenFocus:theme') || 'dark'
);

new App();