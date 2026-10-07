/**
 * TypeBaazi Real-Time AI Racing Engine
 * Simulates intelligent virtual opponents with realistic non-linear speed variations,
 * vector track physics, countdown synchronization, and nitro particle effects.
 */

import { soundEngine } from './audio';
import type { Difficulty, Language } from './texts';

export type TrackTheme = 'neon-city' | 'expressway' | 'synthwave' | 'midnight';

export interface RaceConfig {
  language: Language;
  difficulty: Difficulty;
  trackTheme: TrackTheme;
  targetText: string;
}

export interface RacerState {
  id: 'player' | 'bot';
  name: string;
  nameMr: string;
  color: string;
  progressPercent: number; // 0 to 100
  currentWpm: number;
  isFinished: boolean;
  finishTimeSec: number;
}

export interface RaceMetrics {
  state: 'idle' | 'countdown' | 'racing' | 'finished';
  countdownValue: number; // 3, 2, 1, 0 (GO)
  player: RacerState;
  bot: RacerState;
  winner: 'player' | 'bot' | null;
  elapsedSec: number;
  deltaMeters: number; // Positive = player leading, Negative = bot leading
  isNitroActive: boolean;
}

export type RaceUpdateListener = (metrics: RaceMetrics) => void;
export type RaceFinishListener = (metrics: RaceMetrics) => void;

export class RaceEngine {
  private config: RaceConfig;
  private state: 'idle' | 'countdown' | 'racing' | 'finished' = 'idle';
  private countdownValue: number = 3;
  private countdownTimer: number | null = null;
  private raceInterval: number | null = null;

  private startTime: number = 0;
  private elapsedSec: number = 0;
  private playerProgress: number = 0;
  private botProgress: number = 0;
  private playerWpm: number = 0;
  private botTargetWpm: number = 40;
  private botCurrentWpm: number = 40;
  private totalChars: number = 100;

  private playerFinished: boolean = false;
  private botFinished: boolean = false;
  private playerFinishTime: number = 0;
  private botFinishTime: number = 0;
  private winner: 'player' | 'bot' | null = null;
  private isNitroActive: boolean = false;
  private graceTimer: number | null = null;

  private onUpdateCallbacks: RaceUpdateListener[] = [];
  private onFinishCallbacks: RaceFinishListener[] = [];

  constructor(config: RaceConfig) {
    this.config = config;
    this.totalChars = Math.max(20, config.targetText.length);
    this.setupBotSpeed();
  }

  private setupBotSpeed() {
    const isMarathi = this.config.language === 'marathi';
    let minSpeed = 18;
    let maxSpeed = 24;

    switch (this.config.difficulty) {
      case 'easy':
        // Beginner friendly: smooth, accessible pace so beginners and learners can win
        minSpeed = isMarathi ? 12 : 18;
        maxSpeed = isMarathi ? 18 : 24;
        break;
      case 'medium':
        // Intermediate: typical everyday typist / GCC-TBC 30 WPM baseline
        minSpeed = isMarathi ? 24 : 35;
        maxSpeed = isMarathi ? 32 : 44;
        break;
      case 'hard':
        // Advanced: fast touch typist / GCC-TBC 40 WPM baseline
        minSpeed = isMarathi ? 38 : 58;
        maxSpeed = isMarathi ? 48 : 68;
        break;
      case 'extreme':
        // Grand Prix Legend: peak competitive velocity for elite typists
        minSpeed = isMarathi ? 55 : 82;
        maxSpeed = isMarathi ? 70 : 102;
        break;
    }

    this.botTargetWpm = minSpeed + Math.random() * (maxSpeed - minSpeed);
    this.botCurrentWpm = this.botTargetWpm;
  }

  public startCountdown(onGo?: () => void) {
    if (this.state === 'countdown' || this.state === 'racing') return;

    this.reset();
    this.state = 'countdown';
    this.countdownValue = 3;
    try {
      soundEngine.init();
      soundEngine.playCountdownBeep(false);
    } catch {}
    this.notifyUpdate();

    this.countdownTimer = window.setInterval(() => {
      this.countdownValue--;
      if (this.countdownValue > 0) {
        try { soundEngine.playCountdownBeep(false); } catch {}
        this.notifyUpdate();
      } else if (this.countdownValue === 0) {
        // "GO!" - Immediately transition to racing and enable typing
        if (this.countdownTimer) {
          clearInterval(this.countdownTimer);
          this.countdownTimer = null;
        }
        try { soundEngine.playCountdownBeep(true); } catch {}
        this.state = 'racing';
        this.startTime = performance.now();
        this.startRaceLoop();
        this.notifyUpdate();
        if (onGo) onGo();
      }
    }, 850);
  }

  private startRaceLoop() {
    this.raceInterval = window.setInterval(() => {
      if (this.state !== 'racing') return;

      const now = performance.now();
      this.elapsedSec = (now - this.startTime) / 1000;
      const elapsedMinutes = Math.max(0.001, this.elapsedSec / 60);

      // Realistic human acceleration curve: start at ~50% in first 2.5 seconds, then ramp to full speed
      const ramp = Math.min(1, Math.max(0.45, this.elapsedSec / 2.5));

      // Natural human rhythm jitter (+- 7%)
      const jitter = (Math.sin(this.elapsedSec * 2.2) * 0.07) + ((Math.random() - 0.5) * 0.04);
      this.botCurrentWpm = Math.max(10, this.botTargetWpm * ramp * (1 + jitter));

      // Characters typed by bot = (botWPM * 5) * elapsedMinutes
      const botCharsTyped = (this.botCurrentWpm * 5) * elapsedMinutes;
      this.botProgress = Math.min(100, (botCharsTyped / this.totalChars) * 100);

      if (this.botProgress >= 100 && !this.botFinished) {
        this.botFinished = true;
        this.botFinishTime = this.elapsedSec;
        if (!this.winner) {
          this.winner = 'bot';
        }
        // If player hasn't finished, start a grace timer so the race concludes smoothly
        if (!this.playerFinished && !this.graceTimer) {
          this.graceTimer = window.setTimeout(() => {
            if (this.state === 'racing') {
              this.finishRace();
            }
          }, 12000);
        }
      }

      if (this.playerFinished && this.botFinished) {
        this.finishRace();
      } else {
        this.notifyUpdate();
      }
    }, 80);
  }

  public updatePlayerProgress(typedCount: number, currentWpm: number) {
    if (this.state !== 'racing') return;
    this.playerWpm = currentWpm;
    this.playerProgress = Math.min(100, (typedCount / this.totalChars) * 100);

    // Trigger nitro sound & effect on high speed surge
    if (currentWpm >= 75 && !this.isNitroActive) {
      this.isNitroActive = true;
      soundEngine.playNitroBoost();
    } else if (currentWpm < 65) {
      this.isNitroActive = false;
    }

    if (this.playerProgress >= 100 && !this.playerFinished) {
      this.playerFinished = true;
      this.playerProgress = 100;
      this.playerFinishTime = Number((this.elapsedSec || ((performance.now() - this.startTime) / 1000)).toFixed(2));
      if (!this.winner) {
        this.winner = 'player';
      }
      this.finishRace();
    } else {
      this.notifyUpdate();
    }
  }

  public finishRace() {
    if (this.state === 'finished') return;
    this.state = 'finished';
    if (this.raceInterval) clearInterval(this.raceInterval);
    this.raceInterval = null;
    if (this.graceTimer) {
      clearTimeout(this.graceTimer);
      this.graceTimer = null;
    }

    if (!this.winner) {
      this.winner = this.playerProgress >= this.botProgress ? 'player' : 'bot';
    }

    if (this.winner === 'player') {
      try { soundEngine.playVictory(); } catch {}
    } else {
      try { soundEngine.playDefeat(); } catch {}
    }

    const metrics = this.getMetrics();
    this.onFinishCallbacks.forEach(cb => cb(metrics));
    this.notifyUpdate();
  }

  public reset() {
    if (this.countdownTimer) clearInterval(this.countdownTimer);
    if (this.raceInterval) clearInterval(this.raceInterval);
    if (this.graceTimer) clearTimeout(this.graceTimer);
    this.countdownTimer = null;
    this.raceInterval = null;
    this.graceTimer = null;
    this.raceInterval = null;

    this.state = 'idle';
    this.countdownValue = 3;
    this.startTime = 0;
    this.elapsedSec = 0;
    this.playerProgress = 0;
    this.botProgress = 0;
    this.playerWpm = 0;
    this.playerFinished = false;
    this.botFinished = false;
    this.playerFinishTime = 0;
    this.botFinishTime = 0;
    this.winner = null;
    this.isNitroActive = false;
    this.setupBotSpeed();
  }

  public getMetrics(): RaceMetrics {
    // Delta in virtual meters based on progress difference
    const deltaProgress = this.playerProgress - this.botProgress;
    const deltaMeters = Number((deltaProgress * 2.5).toFixed(1));

    const botName = this.config.difficulty === 'extreme' ? 'Nitro Bot AI (⚡ Legend)' :
      this.config.difficulty === 'hard' ? 'Cyber Racer AI (🔴 Pro)' :
      this.config.difficulty === 'medium' ? 'Speedy Bot AI (🟡 Intermediate)' : 'Cruise Bot AI (🟢 Beginner)';

    const botNameMr = this.config.difficulty === 'extreme' ? 'नायट्रो बॉट (⚡ लेजेंड)' :
      this.config.difficulty === 'hard' ? 'सायबर रेसर (🔴 प्रो)' :
      this.config.difficulty === 'medium' ? 'स्पीड बॉट (🟡 मध्यम)' : 'क्रूझ बॉट (🟢 नवशिका)';

    return {
      state: this.state,
      countdownValue: this.countdownValue,
      player: {
        id: 'player',
        name: 'You (Player)',
        nameMr: 'तुम्ही (खेळाडू)',
        color: '#00f0ff',
        progressPercent: this.playerProgress,
        currentWpm: this.playerWpm,
        isFinished: this.playerFinished,
        finishTimeSec: this.playerFinishTime
      },
      bot: {
        id: 'bot',
        name: botName,
        nameMr: botNameMr,
        color: '#ff007a',
        progressPercent: this.botProgress,
        currentWpm: Math.round(this.botCurrentWpm),
        isFinished: this.botFinished,
        finishTimeSec: this.botFinishTime
      },
      winner: this.winner,
      elapsedSec: Math.round(this.elapsedSec * 10) / 10,
      deltaMeters,
      isNitroActive: this.isNitroActive
    };
  }

  public getState(): 'idle' | 'countdown' | 'racing' | 'finished' {
    return this.state;
  }

  public setText(targetText: string) {
    this.config.targetText = targetText;
    this.totalChars = Math.max(20, targetText.length);
    this.reset();
  }

  public setConfig(newConfig: Partial<RaceConfig>) {
    this.config = { ...this.config, ...newConfig };
    if (newConfig.targetText) {
      this.totalChars = Math.max(20, newConfig.targetText.length);
    }
    this.setupBotSpeed();
    this.reset();
  }

  public onUpdate(callback: RaceUpdateListener) {
    this.onUpdateCallbacks.push(callback);
  }

  public onFinish(callback: RaceFinishListener) {
    this.onFinishCallbacks.push(callback);
  }

  private notifyUpdate() {
    const metrics = this.getMetrics();
    this.onUpdateCallbacks.forEach(cb => cb(metrics));
  }
}
