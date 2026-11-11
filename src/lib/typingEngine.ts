/**
 * TypeBaazi Core Typing Engine
 * High-performance, low-latency typing state engine.
 * Supports English & Devanagari Unicode grapheme clustering, real-time WPM,
 * strict mode, anti-paste protection, and dynamic HUD updates.
 */

import { UnicodeHelper } from './unicode';
import { soundEngine } from './audio';
import type { Language, Difficulty } from './texts';

export interface TypingConfig {
  language: Language;
  mode: 'timed' | 'words' | 'quote' | 'race' | 'daily' | 'game';
  durationSec?: number; // 15, 30, 60, 120
  wordCount?: number;   // 25, 50, 100
  difficulty: Difficulty;
  strictMode: boolean;
  soundEnabled: boolean;
}

export interface TypingMetrics {
  wpm: number;
  netWpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  totalKeystrokes: number;
  errors: number;
  elapsedSec: number;
  remainingSec: number;
  progressPercent: number;
  currentIndex: number;
  isFinished: boolean;
}

export type StateListener = (metrics: TypingMetrics) => void;
export type FinishListener = (metrics: TypingMetrics) => void;

export class TypingEngine {
  private targetText: string = '';
  private tokens: string[] = [];
  private typedChars: string[] = [];
  private charStatuses: ('pending' | 'correct' | 'incorrect')[] = [];
  
  private config: TypingConfig;
  private isStarted: boolean = false;
  private isFinished: boolean = false;
  private startTime: number = 0;
  private endTime: number = 0;
  private timerInterval: number | null = null;
  private elapsedSec: number = 0;
  private totalErrors: number = 0;
  private totalKeystrokes: number = 0;

  private onUpdateCallbacks: StateListener[] = [];
  private onFinishCallbacks: FinishListener[] = [];

  constructor(config: Partial<TypingConfig> = {}) {
    this.config = {
      language: config.language || 'english',
      mode: config.mode || 'timed',
      durationSec: config.durationSec || 60,
      wordCount: config.wordCount || 50,
      difficulty: config.difficulty || 'medium',
      strictMode: config.strictMode ?? false,
      soundEnabled: config.soundEnabled ?? true
    };
  }

  public setText(text: string) {
    this.targetText = UnicodeHelper.normalize(text.trim());
    this.tokens = UnicodeHelper.splitGraphemes(this.targetText);
    this.reset();
  }

  public setConfig(newConfig: Partial<TypingConfig>) {
    this.config = { ...this.config, ...newConfig };
  }

  public getConfig(): TypingConfig {
    return { ...this.config };
  }

  public reset() {
    this.stopTimer();
    this.isStarted = false;
    this.isFinished = false;
    this.startTime = 0;
    this.endTime = 0;
    this.elapsedSec = 0;
    this.totalErrors = 0;
    this.totalKeystrokes = 0;
    this.typedChars = [];
    this.charStatuses = new Array(this.tokens.length).fill('pending');
    this.notifyUpdate();
  }

  public start() {
    if (this.isStarted || this.isFinished) return;
    this.isStarted = true;
    this.startTime = performance.now();
    soundEngine.init();

    this.timerInterval = window.setInterval(() => {
      if (!this.isStarted || this.isFinished) return;
      this.elapsedSec = (performance.now() - this.startTime) / 1000;

      if (this.config.mode === 'timed' || this.config.mode === 'daily') {
        const limit = this.config.durationSec || 60;
        if (this.elapsedSec >= limit) {
          this.elapsedSec = limit;
          this.finish();
          return;
        }
      }
      this.notifyUpdate();
    }, 100);
  }

  private stopTimer() {
    if (this.timerInterval !== null) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  /**
   * Main Keystroke / Character Input Handler
   */
  public handleInput(char: string): boolean {
    if (this.isFinished) return false;
    if (!this.isStarted) {
      this.start();
    }

    this.totalKeystrokes++;
    const currentIndex = this.typedChars.length;
    if (currentIndex >= this.tokens.length) {
      this.finish();
      return true;
    }

    const expected = this.tokens[currentIndex];
    const isMatch = char === expected;

    if (this.config.strictMode && !isMatch) {
      // In strict mode, error sound plays and input is rejected until correct
      try { soundEngine.playError(); } catch {}
      this.totalErrors++;
      this.notifyUpdate();
      return false;
    }

    if (isMatch) {
      this.typedChars.push(char);
      this.charStatuses[currentIndex] = 'correct';
      try { soundEngine.playKey(char); } catch {}
    } else {
      this.typedChars.push(char);
      this.charStatuses[currentIndex] = 'incorrect';
      this.totalErrors++;
      try { soundEngine.playError(); } catch {}
    }

    if (this.typedChars.length >= this.tokens.length) {
      this.finish();
    } else {
      this.notifyUpdate();
    }

    return isMatch;
  }

  /**
   * Backspace Handler
   */
  public handleBackspace() {
    if (this.isFinished || this.typedChars.length === 0) return;
    const removedIndex = this.typedChars.length - 1;
    this.typedChars.pop();
    this.charStatuses[removedIndex] = 'pending';
    try { soundEngine.playBackspace(); } catch {}
    this.notifyUpdate();
  }

  /**
   * Complete the test
   */
  public finish() {
    if (this.isFinished) return;
    this.isFinished = true;
    this.stopTimer();
    this.endTime = performance.now();
    this.elapsedSec = (this.endTime - this.startTime) / 1000;
    if (this.elapsedSec < 0.1) this.elapsedSec = 0.1;

    const metrics = this.getMetrics();
    try { soundEngine.playVictory(); } catch {}

    this.onFinishCallbacks.forEach(cb => {
      try {
        cb(metrics);
      } catch (err) {
        console.error('Error in onFinish callback:', err);
      }
    });

    this.notifyUpdate();
  }

  /**
   * Calculates current WPM, Accuracy and stats
   */
  public getMetrics(): TypingMetrics {
    const elapsedMinutes = Math.max(0.001, this.elapsedSec / 60);
    const correctCount = this.charStatuses.filter(s => s === 'correct').length;
    const incorrectCount = this.charStatuses.filter(s => s === 'incorrect').length;

    // Standard WPM = (correctChars / 5) / elapsedMinutes
    const rawWpm = (correctCount / 5) / elapsedMinutes;
    const wpm = Math.max(0, Math.round(rawWpm));

    // Net WPM factoring uncorrected errors
    const netWpm = Math.max(0, Math.round(((correctCount - incorrectCount) / 5) / elapsedMinutes));

    const totalTyped = this.typedChars.length;
    const accuracy = totalTyped > 0 
      ? Number(((correctCount / totalTyped) * 100).toFixed(1))
      : 100;

    const durationLimit = this.config.durationSec || 60;
    const remainingSec = (this.config.mode === 'timed' || this.config.mode === 'daily')
      ? Math.max(0, Math.ceil(durationLimit - this.elapsedSec))
      : 0;

    const progressPercent = this.tokens.length > 0
      ? Math.min(100, Math.round((this.typedChars.length / this.tokens.length) * 100))
      : 0;

    return {
      wpm,
      netWpm,
      accuracy,
      correctChars: correctCount,
      incorrectChars: incorrectCount,
      totalKeystrokes: this.totalKeystrokes,
      errors: this.totalErrors,
      elapsedSec: Number(this.elapsedSec.toFixed(2)),
      remainingSec,
      progressPercent,
      currentIndex: this.typedChars.length,
      isFinished: this.isFinished
    };
  }

  public getState(): 'idle' | 'running' | 'finished' {
    if (this.isFinished) return 'finished';
    if (this.isStarted) return 'running';
    return 'idle';
  }

  public getTokens(): string[] {
    return [...this.tokens];
  }

  public getCharStatuses(): ('pending' | 'correct' | 'incorrect')[] {
    return [...this.charStatuses];
  }

  public getCurrentToken(): string {
    const idx = this.typedChars.length;
    return idx < this.tokens.length ? this.tokens[idx] : '';
  }

  public onUpdate(callback: StateListener) {
    this.onUpdateCallbacks.push(callback);
  }

  public onFinish(callback: FinishListener) {
    this.onFinishCallbacks.push(callback);
  }

  private notifyUpdate() {
    const metrics = this.getMetrics();
    this.onUpdateCallbacks.forEach(cb => {
      try {
        cb(metrics);
      } catch (err) {
        console.error('Error in onUpdate callback:', err);
      }
    });
  }
}
