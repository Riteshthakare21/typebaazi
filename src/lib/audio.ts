/**
 * TypeBaazi Web Audio Procedural Sound Synthesizer
 * High-performance, zero-latency procedural audio engine.
 * No external audio files needed — 100% synthesized in-browser.
 */

export type SoundProfile = 'mechanical-blue' | 'creamy-thock' | 'typewriter' | 'cyberpunk';

export interface AudioSettings {
  enabled: boolean;
  volume: number; // 0.0 to 1.0
  profile: SoundProfile;
}

class SoundEngine {
  private ctx: AudioContext | null = null;
  private settings: AudioSettings = {
    enabled: true,
    volume: 0.5,
    profile: 'creamy-thock'
  };
  private isInitialized = false;

  constructor() {
    // Lazy initialization on first user interaction
  }

  public init() {
    if (this.isInitialized && this.ctx && this.ctx.state !== 'suspended') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        if (!this.ctx) {
          this.ctx = new AudioCtx();
        }
        if (this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
        this.isInitialized = true;
      }
    } catch {
      // Audio context might fail in non-browser or restricted environments
    }
  }

  public setSettings(settings: Partial<AudioSettings>) {
    this.settings = { ...this.settings, ...settings };
  }

  public getSettings(): AudioSettings {
    return { ...this.settings };
  }

  public toggleMute(): boolean {
    this.settings.enabled = !this.settings.enabled;
    return this.settings.enabled;
  }

  private createGain(customVol: number = 1.0): GainNode | null {
    if (!this.ctx || !this.settings.enabled) return null;
    const gain = this.ctx.createGain();
    const master = Math.max(0, Math.min(1, this.settings.volume));
    gain.gain.value = master * customVol;
    gain.connect(this.ctx.destination);
    return gain;
  }

  /**
   * Procedural Keypress Sounds
   */
  public playKey(key: string = '') {
    if (!this.settings.enabled) return;
    this.init();
    if (!this.ctx) return;

    if (key === ' ' || key === 'Space') {
      this.playSpacebar();
      return;
    }
    if (key === 'Backspace') {
      this.playBackspace();
      return;
    }
    if (key === 'Enter') {
      this.playEnter();
      return;
    }

    const now = this.ctx.currentTime;
    const gain = this.createGain(0.4);
    if (!gain) return;

    switch (this.settings.profile) {
      case 'mechanical-blue': {
        // Sharp high-pitch click + fast dampening
        const osc = this.ctx.createOscillator();
        osc.type = 'triangle';
        const baseFreq = 1800 + Math.random() * 400;
        osc.frequency.setValueAtTime(baseFreq, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.025);

        // Click transient noise
        const bufferSize = Math.floor(this.ctx.sampleRate * 0.015);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2));
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        gain.gain.setValueAtTime(this.settings.volume * 0.45, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

        osc.connect(gain);
        noise.connect(gain);
        osc.start(now);
        noise.start(now);
        osc.stop(now + 0.04);
        noise.stop(now + 0.04);
        break;
      }

      case 'typewriter': {
        // Metallic clack
        const osc = this.ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(800 + Math.random() * 200, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.05);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 1400;
        filter.Q.value = 3;

        gain.gain.setValueAtTime(this.settings.volume * 0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

        osc.connect(filter);
        filter.connect(gain);
        osc.start(now);
        osc.stop(now + 0.06);
        break;
      }

      case 'cyberpunk': {
        // High-tech electronic chirp
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200 + Math.random() * 300, now);
        osc.frequency.exponentialRampToValueAtTime(2400, now + 0.03);

        gain.gain.setValueAtTime(this.settings.volume * 0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        osc.connect(gain);
        osc.start(now);
        osc.stop(now + 0.04);
        break;
      }

      case 'creamy-thock':
      default: {
        // Deep, rich mechanical switch thock (subtle low-end body)
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        const pitch = 360 + Math.random() * 60;
        osc.frequency.setValueAtTime(pitch, now);
        osc.frequency.exponentialRampToValueAtTime(90, now + 0.04);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 800;

        gain.gain.setValueAtTime(this.settings.volume * 0.55, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

        osc.connect(filter);
        filter.connect(gain);
        osc.start(now);
        osc.stop(now + 0.05);
        break;
      }
    }
  }

  public playSpacebar() {
    if (!this.settings.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const gain = this.createGain(0.5);
    if (!gain) return;

    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.06);

    gain.gain.setValueAtTime(this.settings.volume * 0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    osc.connect(gain);
    osc.start(now);
    osc.stop(now + 0.08);
  }

  public playBackspace() {
    if (!this.settings.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const gain = this.createGain(0.4);
    if (!gain) return;

    const osc = this.ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(280, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.04);

    gain.gain.setValueAtTime(this.settings.volume * 0.45, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    osc.start(now);
    osc.stop(now + 0.05);
  }

  public playEnter() {
    if (!this.settings.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const gain = this.createGain(0.5);
    if (!gain) return;

    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.08);

    gain.gain.setValueAtTime(this.settings.volume * 0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    osc.start(now);
    osc.stop(now + 0.1);
  }

  public playError() {
    if (!this.settings.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const gain = this.createGain(0.4);
    if (!gain) return;

    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(130, now);
    osc.frequency.setValueAtTime(110, now + 0.04);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 400;

    gain.gain.setValueAtTime(this.settings.volume * 0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(filter);
    filter.connect(gain);
    osc.start(now);
    osc.stop(now + 0.1);
  }

  /**
   * Countdown beep for 3, 2, 1 (tone: 440Hz) and GO! (tone: 880Hz)
   */
  public playCountdownBeep(isGo: boolean = false) {
    if (!this.settings.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const gain = this.createGain(0.5);
    if (!gain) return;

    const osc = this.ctx.createOscillator();
    osc.type = isGo ? 'sawtooth' : 'sine';
    const freq = isGo ? 880 : 440;
    osc.frequency.setValueAtTime(freq, now);

    const dur = isGo ? 0.35 : 0.18;
    gain.gain.setValueAtTime(this.settings.volume * (isGo ? 0.6 : 0.45), now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

    osc.connect(gain);
    osc.start(now);
    osc.stop(now + dur + 0.02);
  }

  /**
   * Nitro Engine acceleration sound
   */
  public playNitroBoost() {
    if (!this.settings.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const gain = this.createGain(0.35);
    if (!gain) return;

    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(480, now + 0.3);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(300, now);
    filter.frequency.linearRampToValueAtTime(1600, now + 0.25);

    gain.gain.setValueAtTime(this.settings.volume * 0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(filter);
    filter.connect(gain);
    osc.start(now);
    osc.stop(now + 0.42);
  }

  /**
   * Victory Fanfare chime
   */
  public playVictory() {
    if (!this.settings.enabled) return;
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, index) => {
      if (!this.ctx) return;
      const now = this.ctx.currentTime + index * 0.1;
      const gain = this.createGain(0.4);
      if (!gain) return;

      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(this.settings.volume * 0.45, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      osc.start(now);
      osc.stop(now + 0.45);
    });
  }

  /**
   * Defeat chime
   */
  public playDefeat() {
    if (!this.settings.enabled) return;
    this.init();
    if (!this.ctx) return;

    const notes = [440, 415.3, 392, 349.23]; // A4, Ab4, G4, F4
    notes.forEach((freq, index) => {
      if (!this.ctx) return;
      const now = this.ctx.currentTime + index * 0.12;
      const gain = this.createGain(0.35);
      if (!gain) return;

      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(this.settings.volume * 0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      osc.start(now);
      osc.stop(now + 0.38);
    });
  }

  /**
   * Level up / Achievement unlock chime
   */
  public playAchievement() {
    if (!this.settings.enabled) return;
    this.init();
    if (!this.ctx) return;

    const chords = [587.33, 739.99, 880, 1174.66]; // D5, F#5, A5, D6
    chords.forEach((freq, i) => {
      if (!this.ctx) return;
      const now = this.ctx.currentTime + i * 0.08;
      const gain = this.createGain(0.45);
      if (!gain) return;

      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(this.settings.volume * 0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.connect(gain);
      osc.start(now);
      osc.stop(now + 0.55);
    });
  }

  /**
   * Plays a live preview sequence of a switch sound profile (e.g. when selecting in settings)
   */
  public playPreview(profile?: SoundProfile) {
    this.init();
    if (!this.ctx) return;
    const prevProfile = this.settings.profile;
    const prevEnabled = this.settings.enabled;
    if (profile) this.settings.profile = profile;
    this.settings.enabled = true;

    // Play 3 rapid keystrokes (tap... tap... space) for realistic feel
    this.playKey('a');
    setTimeout(() => {
      this.playKey('b');
    }, 110);
    setTimeout(() => {
      this.playSpacebar();
      if (!prevEnabled) this.settings.enabled = prevEnabled;
    }, 230);
  }
}

export const soundEngine = new SoundEngine();
