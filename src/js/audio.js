/* Lumen Focus · generative ambient soundscapes via Web Audio API. */

export const SOUNDS = {
  silence: { label: '静音' },
  deep: { label: '深度' },
  rain: { label: '雨声' },
  cafe: { label: '咖啡馆' },
  ocean: { label: '海浪' },
};

export class SoundEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.current = 'silence';
    this.nodes = [];
    this.startedWithUserGesture = false;
  }

  /* Lazy init on first user gesture (autoplay policy). */
  ensure() {
    if (!this.ctx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return false;
      this.ctx = new Ctx();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.55;
      this.master.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
    return true;
  }

  setSound(name, { volume = 0.5 } = {}) {
    if (name === this.current) return;
    this.stop();
    this.current = name;
    if (name === 'silence') return;
    if (!this.ensure()) {
      this.toast?.('音频不可用，请更换浏览器');
      return;
    }
    this.build(name, volume);
  }

  toggle(name, volume) {
    if (this.current === name) {
      this.stop();
      this.current = 'silence';
      return 'silence';
    }
    this.setSound(name, volume);
    return name;
  }

  stop() {
    this.nodes.forEach((n) => {
      try { n.stop(); } catch (_) { /* noop */ }
      try { n.disconnect(); } catch (_) { /* noop */ }
    });
    this.nodes = [];
  }

  /* --- Helpers --- */
  noiseBuffer(seconds = 2) {
    const sr = this.ctx.sampleRate;
    const buf = this.ctx.createBuffer(1, sr * seconds, sr);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    return buf;
  }

  biquad(type, freq, q = 1) {
    const f = this.ctx.createBiquadFilter();
    f.type = type;
    f.frequency.value = freq;
    f.Q.value = q;
    return f;
  }

  gain(val, attack = 3) {
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(val, this.ctx.currentTime + attack);
    return g;
  }

  run(node) {
    node.connect(this.master);
    this.nodes.push(node);
  }

  loop(buffer, { filter = null, g = null } = {}) {
    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;
    let tail = src;
    if (filter) { tail.connect(filter); tail = filter; }
    if (g) { tail.connect(g); tail = g; }
    this.run(src);
    return { src, tail };
  }

  /* --- Soundscapes --- */
  build(name, baseVol) {
    const v = (k) => baseVol * k;
    switch (name) {
      case 'deep': {
        // Layered warm brown noise + soft harmonic pad.
        const brown = this.loop(this.noiseBuffer(), {
          filter: this.biquad('lowpass', 420, 0.7),
          g: this.gain(v(0.5)),
        });
        const padA = this.oscPad(110.0, v(0.04));
        const padB = this.oscPad(220.0, v(0.035));
        this.nodes.push(padA, padB);
        break;
      }
      case 'rain': {
        // White noise through a high-pass + gentle random droplet blips.
        const rain = this.loop(this.noiseBuffer(1.5), {
          filter: this.biquad('highpass', 900, 0.6),
          g: this.gain(v(0.35)),
        });
        this.nodes.push(rain);
        break;
      }
      case 'cafe': {
        // Brown noise room tone + sparse cup clinks.
        const room = this.loop(this.noiseBuffer(), {
          filter: this.biquad('lowpass', 500, 0.8),
          g: this.gain(v(0.4)),
        });
        this.scheduleCafe(v(0.12));
        break;
      }
      case 'ocean': {
        // Brown noise with slow amplitude LFO ⇒ rolling waves.
        const lfo = this.ctx.createOscillator();
        lfo.frequency.value = 0.09;
        const lfoGain = this.ctx.createGain();
        lfoGain.gain.value = 0.18;
        const g = this.gain(v(0.5));
        lfo.connect(lfoGain).connect(g.gain);
        const ocean = this.loop(this.noiseBuffer(3), {
          filter: this.biquad('lowpass', 350, 0.7),
          g,
        });
        this.nodes.push(lfo);
        break;
      }
      default:
        break;
    }
  }

  oscPad(freq, vol) {
    const o = this.ctx.createOscillator();
    o.type = 'sine';
    o.frequency.value = freq;
    const g = this.gain(vol, 6);
    // slow tremolo for warmth
    const lfo = this.ctx.createOscillator();
    lfo.frequency.value = 0.05 + Math.random() * 0.04;
    const lfoG = this.ctx.createGain();
    lfoG.gain.value = vol * 0.5;
    lfo.connect(lfoG).connect(g.gain);
    o.connect(g);
    this.run(o);
    this.run(lfo);
    return g;
  }

  scheduleCafe(maxVol) {
    const tick = () => {
      if (this.current !== 'cafe') return;
      // small filtered noise burst ≈ cup clink
      const src = this.ctx.createBufferSource();
      src.buffer = this.noiseBuffer(0.08);
      const f = this.biquad('bandpass', 1500 + Math.random() * 900, 2);
      const g = this.ctx.createGain();
      const t = this.ctx.currentTime;
      g.gain.setValueAtTime(maxVol * (0.4 + Math.random() * 0.6), t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
      src.connect(f).connect(g).connect(this.master);
      src.start(t);
      this.nodes.push(src);
      setTimeout(tick, 1500 + Math.random() * 3500);
    };
    tick();
  }

  setVolume(v) {
    if (this.master) this.master.gain.value = v;
  }
}