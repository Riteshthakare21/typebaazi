/**
 * TypeBaazi LocalStorage Manager
 * Persistent local storage for user metrics, personal bests,
 * daily streaks, XP progression, badges, and customizable settings.
 */

import type { Language, Difficulty } from './texts';
import type { SoundProfile } from './audio';

export interface UserSettings {
  theme: 'dark' | 'light' | 'cyberpunk';
  soundEnabled: boolean;
  soundVolume: number;
  soundProfile: SoundProfile;
  showKeyboard: boolean;
  strictMode: boolean;
  fontSize: 'sm' | 'md' | 'lg' | 'xl';
  defaultLanguage: Language;
  defaultDifficulty: Difficulty;
  userName?: string;
  userAvatar?: string;
  dailyGoal?: number; // Target number of runs per day (default 1)
}

export interface LanguageRecord {
  bestWpm: number;
  bestAccuracy: number;
  bestRaceTimeSec: number;
  bestGameScore?: number;
  totalTests: number;
  totalRaces: number;
  totalChars: number;
}

export interface TestResultItem {
  id: string;
  timestamp: number;
  language: Language;
  mode: 'timed' | 'words' | 'quote' | 'race' | 'daily' | 'game';
  wpm: number;
  netWpm: number;
  accuracy: number;
  errors: number;
  durationSec: number;
  difficulty: Difficulty;
  isPersonalBest: boolean;
}

export interface UserStats {
  english: LanguageRecord;
  marathi: LanguageRecord;
  hindi: LanguageRecord;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
  xp: number;
  level: number;
  unlockedBadgeIds: string[];
  history: TestResultItem[];
}

const DEFAULT_SETTINGS: UserSettings = {
  theme: 'light',
  soundEnabled: true,
  soundVolume: 0.6,
  soundProfile: 'creamy-thock',
  showKeyboard: true,
  strictMode: false,
  fontSize: 'md',
  defaultLanguage: 'english',
  defaultDifficulty: 'medium',
  userName: 'Speed Champion',
  userAvatar: '🏎️',
  dailyGoal: 1
};

const DEFAULT_RECORD: LanguageRecord = {
  bestWpm: 0,
  bestAccuracy: 0,
  bestRaceTimeSec: 0,
  bestGameScore: 0,
  totalTests: 0,
  totalRaces: 0,
  totalChars: 0
};

const DEFAULT_STATS: UserStats = {
  english: { ...DEFAULT_RECORD },
  marathi: { ...DEFAULT_RECORD },
  hindi: { ...DEFAULT_RECORD },
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: '',
  xp: 0,
  level: 1,
  unlockedBadgeIds: ['badge-welcome'],
  history: []
};

const SETTINGS_KEY = 'typebaazi_settings_v1';
const STATS_KEY = 'typebaazi_stats_v1';

export class StorageManager {
  private static isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  public static getSettings(): UserSettings {
    if (!this.isBrowser()) return DEFAULT_SETTINGS;
    try {
      const data = localStorage.getItem(SETTINGS_KEY) || localStorage.getItem('typedhaav_settings_v1');
      if (!data) return DEFAULT_SETTINGS;
      return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
    } catch {
      return DEFAULT_SETTINGS;
    }
  }

  public static saveSettings(settings: Partial<UserSettings>): UserSettings {
    if (!this.isBrowser()) return DEFAULT_SETTINGS;
    try {
      const current = this.getSettings();
      const updated = { ...current, ...settings };
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));

      // Sync with active account if logged in
      const sessionRaw = localStorage.getItem('typebaazi_session_v1');
      if (sessionRaw) {
        const session = JSON.parse(sessionRaw);
        const accountsRaw = localStorage.getItem('typebaazi_accounts_v1');
        if (accountsRaw) {
          const accounts = JSON.parse(accountsRaw);
          if (accounts[session.userId]) {
            accounts[session.userId].settings = updated;
            localStorage.setItem('typebaazi_accounts_v1', JSON.stringify(accounts));
          }
        }
      }

      return updated;
    } catch {
      return DEFAULT_SETTINGS;
    }
  }

  public static getStats(): UserStats {
    if (!this.isBrowser()) return DEFAULT_STATS;
    try {
      const data = localStorage.getItem(STATS_KEY) || localStorage.getItem('typedhaav_stats_v1');
      if (!data) return DEFAULT_STATS;
      const parsed = JSON.parse(data);
      const stats: UserStats = {
        ...DEFAULT_STATS,
        ...parsed,
        english: { ...DEFAULT_RECORD, ...(parsed.english || {}) },
        marathi: { ...DEFAULT_RECORD, ...(parsed.marathi || {}) },
        hindi: { ...DEFAULT_RECORD, ...(parsed.hindi || {}) }
      };

      // 48-Hour Streak Break Rule:
      // If user doesn't open the website or practice for 48 hours (diffDays >= 2), the streak breaks!
      const todayStr = new Date().toISOString().split('T')[0];
      if (stats.lastActiveDate && stats.currentStreak > 0) {
        const lastDate = new Date(stats.lastActiveDate);
        const nowDate = new Date(todayStr);
        const diffDays = Math.floor((nowDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays >= 2) {
          stats.currentStreak = 0;
          try {
            localStorage.setItem(STATS_KEY, JSON.stringify(stats));
          } catch {}
        }
      }

      return stats;
    } catch {
      return DEFAULT_STATS;
    }
  }

  public static saveStats(stats: Partial<UserStats>): UserStats {
    if (!this.isBrowser()) return DEFAULT_STATS;
    try {
      const current = this.getStats();
      const updated = { ...current, ...stats };
      localStorage.setItem(STATS_KEY, JSON.stringify(updated));

      // Sync with active account if logged in (Streak & Score protection)
      const sessionRaw = localStorage.getItem('typebaazi_session_v1');
      if (sessionRaw) {
        const session = JSON.parse(sessionRaw);
        const accountsRaw = localStorage.getItem('typebaazi_accounts_v1');
        if (accountsRaw) {
          const accounts = JSON.parse(accountsRaw);
          if (accounts[session.userId]) {
            accounts[session.userId].stats = updated;
            localStorage.setItem('typebaazi_accounts_v1', JSON.stringify(accounts));
          }
        }
      }

      return updated;
    } catch {
      return DEFAULT_STATS;
    }
  }

  /**
   * Records a completed test or race and updates personal bests, XP, and streak
   */
  public static recordTestResult(result: Omit<TestResultItem, 'id' | 'timestamp' | 'isPersonalBest'>): {
    stats: UserStats;
    isPersonalBest: boolean;
    xpGained: number;
    newBadges: string[];
  } {
    const current = this.getStats();
    const langKey = result.language === 'marathi' ? 'marathi' : 'english';
    const langRecord = { ...current[langKey] };

    let isPersonalBest = false;
    if (result.wpm > langRecord.bestWpm) {
      langRecord.bestWpm = Math.round(result.wpm);
      isPersonalBest = true;
    }
    if (result.accuracy > langRecord.bestAccuracy) {
      langRecord.bestAccuracy = Math.round(result.accuracy);
    }
    if (result.mode === 'race' && (langRecord.bestRaceTimeSec === 0 || result.durationSec < langRecord.bestRaceTimeSec)) {
      langRecord.bestRaceTimeSec = Number(result.durationSec.toFixed(1));
    }

    if (result.mode === 'race') {
      langRecord.totalRaces += 1;
    } else {
      langRecord.totalTests += 1;
    }

    // Calculate XP: 10 base + (WPM * 1.5) + (Accuracy > 95 ? 20 : 0)
    const baseXP = 15;
    const speedXP = Math.floor(result.wpm * 1.2);
    const accuracyBonus = result.accuracy >= 98 ? 30 : result.accuracy >= 95 ? 15 : 0;
    const xpGained = baseXP + speedXP + accuracyBonus;

    const totalXP = current.xp + xpGained;
    const newLevel = Math.floor(Math.sqrt(totalXP / 50)) + 1;

    // Update daily streak with strict 48-Hour Break Rule
    const today = new Date().toISOString().split('T')[0];
    let currentStreak = current.currentStreak;
    let longestStreak = current.longestStreak;

    if (current.lastActiveDate !== today) {
      if (current.lastActiveDate) {
        const lastDate = new Date(current.lastActiveDate);
        const nowDate = new Date(today);
        const diffDays = Math.floor((nowDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
        
        // If practiced yesterday (diffDays === 1, within 48 hours): Increment streak!
        if (diffDays === 1) {
          currentStreak = Math.max(1, currentStreak + 1);
        } else {
          // If 48 hours or more elapsed (diffDays >= 2): Streak broke, restarts at 1 on new test
          currentStreak = 1;
        }
      } else {
        currentStreak = 1;
      }
      longestStreak = Math.max(longestStreak, currentStreak);
    }

    // Check newly unlocked badges
    const newBadges: string[] = [];
    const unlocked = new Set(current.unlockedBadgeIds || []);

    if (langRecord.totalTests + langRecord.totalRaces >= 1 && !unlocked.has('badge-first-step')) {
      unlocked.add('badge-first-step');
      newBadges.push('badge-first-step');
    }
    if (result.wpm >= 40 && !unlocked.has('badge-speed-40')) {
      unlocked.add('badge-speed-40');
      newBadges.push('badge-speed-40');
    }
    if (result.wpm >= 60 && !unlocked.has('badge-speed-60')) {
      unlocked.add('badge-speed-60');
      newBadges.push('badge-speed-60');
    }
    if (result.wpm >= 80 && !unlocked.has('badge-speed-80')) {
      unlocked.add('badge-speed-80');
      newBadges.push('badge-speed-80');
    }
    if (result.wpm >= 100 && !unlocked.has('badge-speed-100')) {
      unlocked.add('badge-speed-100');
      newBadges.push('badge-speed-100');
    }
    if (result.accuracy === 100 && result.wpm >= 30 && !unlocked.has('badge-perfectionist')) {
      unlocked.add('badge-perfectionist');
      newBadges.push('badge-perfectionist');
    }
    if (result.language === 'marathi' && result.wpm >= 40 && !unlocked.has('badge-marathi-master')) {
      unlocked.add('badge-marathi-master');
      newBadges.push('badge-marathi-master');
    }
    if (result.mode === 'race' && !unlocked.has('badge-racer')) {
      unlocked.add('badge-racer');
      newBadges.push('badge-racer');
    }
    if (currentStreak >= 7 && !unlocked.has('badge-streak-7')) {
      unlocked.add('badge-streak-7');
      newBadges.push('badge-streak-7');
    }
    if (currentStreak >= 25 && !unlocked.has('badge-streak-25')) {
      unlocked.add('badge-streak-25');
      newBadges.push('badge-streak-25');
    }
    if (currentStreak >= 50 && !unlocked.has('badge-streak-50')) {
      unlocked.add('badge-streak-50');
      newBadges.push('badge-streak-50');
    }
    if (currentStreak >= 100 && !unlocked.has('badge-streak-100')) {
      unlocked.add('badge-streak-100');
      newBadges.push('badge-streak-100');
    }
    if (currentStreak >= 365 && !unlocked.has('badge-streak-365')) {
      unlocked.add('badge-streak-365');
      newBadges.push('badge-streak-365');
    }

    const testItem: TestResultItem = {
      ...result,
      id: 'test_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      timestamp: Date.now(),
      isPersonalBest
    };

    const newHistory = [testItem, ...(current.history || [])].slice(0, 50);

    const updatedStats: UserStats = {
      ...current,
      [langKey]: langRecord,
      xp: totalXP,
      level: newLevel,
      currentStreak,
      longestStreak,
      lastActiveDate: today,
      unlockedBadgeIds: Array.from(unlocked),
      history: newHistory
    };

    this.saveStats(updatedStats);

    return {
      stats: updatedStats,
      isPersonalBest,
      xpGained,
      newBadges
    };
  }

  /**
   * Explicitly records beating the AI Bot in a Grand Prix Race
   */
  public static recordBotVictory(wpm: number, accuracy: number, durationSec: number): {
    newBadges: string[];
    xpBonus: number;
  } {
    const current = this.getStats();
    const unlocked = new Set(current.unlockedBadgeIds || []);
    const newBadges: string[] = [];
    const xpBonus = 150;

    if (!unlocked.has('badge-bot-slayer')) {
      unlocked.add('badge-bot-slayer');
      newBadges.push('badge-bot-slayer');
    }
    if (!unlocked.has('badge-racer')) {
      unlocked.add('badge-racer');
      newBadges.push('badge-racer');
    }

    const totalXP = current.xp + xpBonus;
    const newLevel = Math.floor(Math.sqrt(totalXP / 50)) + 1;

    const updatedStats: UserStats = {
      ...current,
      xp: totalXP,
      level: newLevel,
      unlockedBadgeIds: Array.from(unlocked)
    };

    this.saveStats(updatedStats);

    return {
      newBadges,
      xpBonus
    };
  }

  /**
   * Gets the all-time high score for Word Defender / Falling Words game
   */
  public static getGameHighScore(lang?: Language): number {
    const stats = this.getStats();
    const l = lang === 'marathi' ? 'marathi' : 'english';
    return stats[l]?.bestGameScore || 0;
  }

  /**
   * Records an arcade game score, checks for new high score & awards XP
   */
  public static recordGameScore(score: number, lang?: Language, wordsDestroyed: number = 0): {
    isNewHighScore: boolean;
    highScore: number;
    xpGained: number;
  } {
    const current = this.getStats();
    const langKey = lang === 'marathi' ? 'marathi' : 'english';
    const langRecord = { ...(current[langKey] || DEFAULT_RECORD) };
    const currentHigh = langRecord.bestGameScore || 0;

    let isNewHighScore = false;
    if (score > currentHigh) {
      isNewHighScore = true;
      langRecord.bestGameScore = score;
    }

    const xpGained = Math.max(15, Math.round(score / 5) + wordsDestroyed * 2);
    const totalXP = current.xp + xpGained;
    const newLevel = Math.floor(Math.sqrt(totalXP / 50)) + 1;

    const updatedStats: UserStats = {
      ...current,
      [langKey]: langRecord,
      xp: totalXP,
      level: newLevel
    };

    this.saveStats(updatedStats);

    return {
      isNewHighScore,
      highScore: Math.max(score, currentHigh),
      xpGained
    };
  }

  public static clearData() {
    if (!this.isBrowser()) return;
    localStorage.removeItem(SETTINGS_KEY);
    localStorage.removeItem(STATS_KEY);
  }
}
