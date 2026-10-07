/**
 * TypeBaazi Daily Challenge Generator
 * Deterministic date-based challenge generator.
 * Generates identical daily goals worldwide for each calendar day without a backend.
 */

import { ENGLISH_TEXTS, MARATHI_TEXTS, HINDI_TEXTS, type TypingTextItem, type Language } from './texts';

export interface DailyChallengeInfo {
  dateString: string; // YYYY-MM-DD
  dayNumber: number;
  englishChallenge: {
    textItem: TypingTextItem;
    targetWpm: number;
    targetAccuracy: number;
    durationSec: number;
  };
  hindiChallenge: {
    textItem: TypingTextItem;
    targetWpm: number;
    targetAccuracy: number;
    durationSec: number;
  };
  marathiChallenge: {
    textItem: TypingTextItem;
    targetWpm: number;
    targetAccuracy: number;
    durationSec: number;
  };
  bonusXp: number;
}

export class DailyChallengeManager {
  private static hashDate(dateStr: string): number {
    let hash = 0;
    for (let i = 0; i < dateStr.length; i++) {
      hash = ((hash << 5) - hash) + dateStr.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  public static getTodaysChallenge(customDate?: string): DailyChallengeInfo {
    const today = customDate || new Date().toISOString().split('T')[0];
    const hash = this.hashDate(today);

    // Pick deterministic text for English, Hindi, and Marathi
    const enIndex = hash % ENGLISH_TEXTS.length;
    const hiIndex = (hash * 5 + 13) % HINDI_TEXTS.length;
    const mrIndex = (hash * 3 + 7) % MARATHI_TEXTS.length;

    const enText = ENGLISH_TEXTS[enIndex];
    const hiText = HINDI_TEXTS[hiIndex];
    const mrText = MARATHI_TEXTS[mrIndex];

    // Varied target speeds based on weekday
    const dayOfWeek = new Date(today).getDay(); // 0 (Sun) to 6 (Sat)
    const baseTargetEn = 45 + (dayOfWeek * 3);
    const baseTargetHi = 30 + (dayOfWeek * 2);
    const baseTargetMr = 30 + (dayOfWeek * 2);

    return {
      dateString: today,
      dayNumber: dayOfWeek,
      englishChallenge: {
        textItem: enText,
        targetWpm: baseTargetEn,
        targetAccuracy: 95,
        durationSec: 60
      },
      hindiChallenge: {
        textItem: hiText,
        targetWpm: baseTargetHi,
        targetAccuracy: 93,
        durationSec: 60
      },
      marathiChallenge: {
        textItem: mrText,
        targetWpm: baseTargetMr,
        targetAccuracy: 93,
        durationSec: 60
      },
      bonusXp: 100
    };
  }

  public static isChallengeCompletedToday(lastCompletedDate: string): boolean {
    const today = new Date().toISOString().split('T')[0];
    return lastCompletedDate === today;
  }
}
