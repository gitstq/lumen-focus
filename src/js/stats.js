/* Lumen Focus · session analytics stored in localStorage. */

const KEY = 'lumenFocus:log.v1';
const DAY = 86400000;

function todayKey(d = new Date()) {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export class Stats {
  constructor() {
    this.log = null;
    this.load();
  }

  load() {
    try {
      this.log = JSON.parse(localStorage.getItem(KEY)) || { days: {}, sessions: 0 };
    } catch (_) {
      this.log = { days: {}, sessions: 0 };
    }
    if (!this.log.days) this.log.days = {};
    if (typeof this.log.sessions !== 'number') this.log.sessions = 0;
  }

  save() {
    try { localStorage.setItem(KEY, JSON.stringify(this.log)); } catch (_) { /* full */ }
  }

  /* Record a completed deep-work session (minutes). */
  recordFocus(minutes) {
    const k = todayKey();
    const day = this.log.days[k] || { m: 0 };
    day.m += minutes;
    this.log.days[k] = day;
    this.log.sessions += 1;
    this.save();
  }

  minutesOn(date) {
    return this.log.days[todayKey(date)]?.m || 0;
  }

  /* Minutes focused today. */
  today() { return this.minutesOn(new Date()); }

  /* Minutes focused in the trailing 7 days (including today). */
  week() {
    let total = 0;
    for (let i = 0; i < 7; i++) total += this.minutesOn(new Date(Date.now() - i * DAY));
    return total;
  }

  /* Consecutive streak of days with ≥1 focus session. */
  streak() {
    let streak = 0;
    for (let i = 0; i < 3650; i++) {
      if (this.minutesOn(new Date(Date.now() - i * DAY)) > 0) streak++;
      else break;
    }
    return streak;
  }

  sessions() { return this.log.sessions; }

  /* Last 7 days (oldest → newest) minutes for the chart. */
  weekSeries() {
    const out = [];
    for (let i = 6; i >= 0; i--) out.push(this.minutesOn(new Date(Date.now() - i * DAY)));
    return out;
  }
}