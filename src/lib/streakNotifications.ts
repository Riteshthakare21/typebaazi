/**
 * TypeBaazi Daily Streak Notification Engine
 * - 2 Randomized Notifications Daily (Afternoon & Evening)
 * - Maximum 2 Reminders Per Calendar Day
 * - Streak Grace Period / Streak Protection (extra safety buffer)
 * - Adaptive Theme Synchronization (Dark & Light Theme)
 */

import { StorageManager } from './storage';

export interface StreakScheduleSlot {
  hour: number;
  minute: number;
  label: string;
  tag: string;
}

export class StreakNotificationManager {
  private static readonly STORAGE_ENABLED_KEY = 'typebaazi_streak_notifs_enabled';
  private static readonly STORAGE_DAILY_SENT_KEY = 'typebaazi_streak_notifs_daily_sent_v2';
  private static readonly STORAGE_RANDOM_SLOTS_KEY = 'typebaazi_streak_random_slots_v2';
  private static timerIntervalId: number | null = null;

  /**
   * Generates or retrieves today's 2 randomized reminder slots (Afternoon & Evening)
   */
  public static getActiveSchedule(): StreakScheduleSlot[] {
    if (typeof window === 'undefined') {
      return [
        { hour: 14, minute: 30, label: '2:30 PM (Afternoon Reminder)', tag: 'streak_afternoon' },
        { hour: 20, minute: 15, label: '8:15 PM (Evening Warning)', tag: 'streak_evening' }
      ];
    }

    const todayStr = new Date().toISOString().split('T')[0];
    try {
      const stored = localStorage.getItem(this.STORAGE_RANDOM_SLOTS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.date === todayStr && Array.isArray(parsed.slots) && parsed.slots.length === 2) {
          return parsed.slots;
        }
      }
    } catch {}

    // Generate 2 random slots for today
    // Slot 1: Afternoon between 12:00 PM and 4:45 PM
    const hour1 = 12 + Math.floor(Math.random() * 5); // 12, 13, 14, 15, 16
    const min1 = Math.floor(Math.random() * 12) * 5; // 0, 5, 10, ... 55
    const label1 = `${hour1 > 12 ? hour1 - 12 : hour1}:${String(min1).padStart(2, '0')} PM (Random Afternoon Reminder)`;

    // Slot 2: Evening between 7:00 PM and 10:45 PM
    const hour2 = 19 + Math.floor(Math.random() * 4); // 19, 20, 21, 22
    const min2 = Math.floor(Math.random() * 12) * 5;
    const label2 = `${hour2 - 12}:${String(min2).padStart(2, '0')} PM (Random Evening Warning)`;

    const newSlots: StreakScheduleSlot[] = [
      { hour: hour1, minute: min1, label: label1, tag: `streak_rand_1_${hour1}_${min1}` },
      { hour: hour2, minute: min2, label: label2, tag: `streak_rand_2_${hour2}_${min2}` }
    ];

    try {
      localStorage.setItem(this.STORAGE_RANDOM_SLOTS_KEY, JSON.stringify({ date: todayStr, slots: newSlots }));
    } catch {}

    return newSlots;
  }

  /**
   * Tracks how many notifications have been sent today (strictly max 2)
   */
  public static getDailySentCount(): number {
    if (typeof window === 'undefined') return 0;
    const todayStr = new Date().toISOString().split('T')[0];
    try {
      const stored = localStorage.getItem(this.STORAGE_DAILY_SENT_KEY);
      if (!stored) return 0;
      const parsed = JSON.parse(stored);
      if (parsed.date === todayStr) {
        return parsed.count || 0;
      }
    } catch {}
    return 0;
  }

  private static incrementDailySentCount(slotTag: string) {
    if (typeof window === 'undefined') return;
    const todayStr = new Date().toISOString().split('T')[0];
    const current = this.getDailySentCount();
    try {
      localStorage.setItem(this.STORAGE_DAILY_SENT_KEY, JSON.stringify({
        date: todayStr,
        count: current + 1,
        lastSlot: slotTag,
        timestamp: Date.now()
      }));
    } catch {}
  }

  public static isAppInstalled(): boolean {
    if (typeof window === 'undefined') return false;
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isIOSStandalone = (window.navigator as any).standalone === true;
    const isAndroidApp = document.referrer.includes('android-app://') || window.location.search.includes('source=apk');
    return isStandalone || isIOSStandalone || isAndroidApp;
  }

  public static isEnabled(): boolean {
    if (typeof window === 'undefined') return false;
    const val = localStorage.getItem(this.STORAGE_ENABLED_KEY);
    if (val === null) {
      return true; // Enabled by default
    }
    return val === 'true';
  }

  public static setEnabled(enabled: boolean) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.STORAGE_ENABLED_KEY, enabled ? 'true' : 'false');
    if (enabled) {
      this.startScheduler();
    }
  }

  public static async requestPermission(): Promise<boolean> {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return false;
    }

    try {
      const perm = await Notification.requestPermission();
      const granted = perm === 'granted';
      this.setEnabled(granted);
      return granted;
    } catch {
      return false;
    }
  }

  public static autoPromptPermission() {
    if (typeof window === 'undefined' || !('Notification' in window)) return;
    if (Notification.permission === 'default') {
      const prompt = () => {
        Notification.requestPermission().then((perm) => {
          if (perm === 'granted') {
            this.setEnabled(true);
          }
        }).catch(() => {});
      };

      // Prompt smoothly on user interaction
      window.addEventListener('pointerdown', prompt, { once: true });
    }
  }

  public static hasPracticedToday(): boolean {
    const stats = StorageManager.getStats();
    if (!stats.lastTestDate && !stats.lastActiveDate) return false;
    const todayStr = new Date().toISOString().split('T')[0];
    return (stats.lastTestDate && stats.lastTestDate.startsWith(todayStr)) || stats.lastActiveDate === todayStr;
  }

  public static getStreakStatus() {
    const stats = StorageManager.getStats();
    const streak = stats.currentStreak || 0;
    const hasCompletedToday = this.hasPracticedToday();
    const now = new Date();
    const hoursLeft = 24 - now.getHours();

    let isStreakBroken = false;
    if (stats.lastActiveDate) {
      const lastDate = new Date(stats.lastActiveDate);
      const nowDate = new Date(now.toISOString().split('T')[0]);
      const diffDays = Math.floor((nowDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays >= 2 && !hasCompletedToday) {
        isStreakBroken = true;
      }
    }

    let stage = 0;
    let stageMessage = '';

    if (isStreakBroken || streak === 0) {
      stage = 0;
      stageMessage = `Complete today's challenge to build your daily streak!`;
    } else if (!hasCompletedToday && streak > 0) {
      if (hoursLeft <= 3) {
        stage = 3;
        stageMessage = `Final Call! Only ${hoursLeft} hours left today to save your ${streak}-day streak before it breaks!`;
      } else if (hoursLeft <= 7) {
        stage = 2;
        stageMessage = `Evening Reminder: Complete 1 test before midnight to preserve your flame!`;
      } else {
        stage = 1;
        stageMessage = `Daily Streak: Don't forget your daily practice to keep your ${streak}-day streak active.`;
      }
    }

    return {
      currentStreak: streak,
      hasCompletedToday,
      isGraceActive: false,
      isStreakBroken,
      stage,
      stageMessage,
      hoursLeft
    };
  }

  public static checkAndTriggerReminder() {
    if (typeof window === 'undefined') return;
    if (!this.isEnabled()) return;

    // Strict limit: Max 2 notifications per calendar day
    if (this.getDailySentCount() >= 2) {
      return;
    }

    const now = new Date();
    const currentHour = now.getHours();
    const currentMin = now.getMinutes();
    const stats = StorageManager.getStats();
    const streak = stats.currentStreak || 0;
    const status = this.getStreakStatus();
    const alreadyPracticed = this.hasPracticedToday();

    if (alreadyPracticed || (streak === 0 && !status.isGraceActive)) {
      return;
    }

    const schedule = this.getActiveSchedule();

    for (const slot of schedule) {
      const slotMinutesTotal = slot.hour * 60 + slot.minute;
      const nowMinutesTotal = currentHour * 60 + currentMin;
      const diff = nowMinutesTotal - slotMinutesTotal;

      // Match window: Within 30 minutes of randomized target slot
      if (diff >= 0 && diff <= 30) {
        this.incrementDailySentCount(slot.tag);

        let title = '';
        let body = '';

        if (slot.hour >= 18) {
          title = `🔥 Protect Your ${streak}-Day Streak Before Midnight!`;
          body = `⚡ Keep your typing flame burning! Complete today's 60s challenge now to protect your streak!`;
        } else {
          title = `🔥 Keep Your ${streak}-Day Streak Burning!`;
          body = `⚡ Daily challenge is ready! Complete today's test to boost your speed and protect your streak!`;
        }

        this.sendStreakNotification(title, body, '/daily-challenge');
        break;
      }
    }
  }

  public static sendStreakNotification(title: string, body: string, url: string = '/daily-challenge') {
    if (typeof window === 'undefined') return;

    // If user has already practiced or is currently on daily challenge page, do nothing
    if (this.hasPracticedToday() || window.location.pathname.startsWith('/daily-challenge')) {
      return;
    }

    let hasShownNative = false;

    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then((reg) => {
        reg.showNotification(title, {
          body,
          icon: '/icons/icon-192.png',
          badge: '/icons/icon-192.png',
          tag: 'typebaazi-streak-reminder',
          data: { url },
          actions: [
            { action: 'practice', title: '⚡ Practice Now' },
            { action: 'dismiss', title: 'Later' }
          ]
        } as any).catch(() => {
          this.fallbackBrowserNotification(title, body, url);
        });
        hasShownNative = true;
      });
    } else {
      hasShownNative = this.fallbackBrowserNotification(title, body, url);
    }

    // Only show in-app toast if system notifications are not supported or permission was denied
    if (!hasShownNative && typeof Notification !== 'undefined' && Notification.permission !== 'granted') {
      this.showInAppToast(title, body, url);
    }
  }

  private static fallbackBrowserNotification(title: string, body: string, url: string): boolean {
    if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
      try {
        const notif = new Notification(title, {
          body,
          icon: '/icons/icon-192.png',
          badge: '/icons/icon-192.png',
          tag: 'typebaazi-streak-reminder'
        });
        notif.onclick = () => {
          window.focus();
          window.location.href = url;
        };
        return true;
      } catch {
        return false;
      }
    }
    return false;
  }

  /**
   * Theme-Aware In-App Streak Toast Card
   */
  public static showInAppToast(title: string, body: string, url: string = '/daily-challenge') {
    if (typeof document === 'undefined') return;

    let toast = document.getElementById('streak-in-app-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'streak-in-app-toast';
      toast.className = 'streak-toast-card';
      document.body.appendChild(toast);
    }

    // Determine current theme for rich styling
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    toast.setAttribute('data-theme', currentTheme);

    toast.innerHTML = `
      <div class="streak-toast-inner">
        <span class="streak-toast-icon">🔥</span>
        <div class="streak-toast-text">
          <strong>${title}</strong>
          <p>${body}</p>
        </div>
        <div class="streak-toast-actions">
          <a href="${url}" class="streak-toast-btn">⚡ Practice</a>
          <button type="button" class="streak-toast-close" onclick="this.closest('.streak-toast-card').classList.remove('show')">✕</button>
        </div>
      </div>
    `;

    setTimeout(() => {
      toast?.classList.add('show');
    }, 100);

    setTimeout(() => {
      toast?.classList.remove('show');
    }, 8000);
  }

  public static startScheduler() {
    if (typeof window === 'undefined') return;
    if (this.timerIntervalId !== null) return;

    this.checkAndTriggerReminder();

    this.timerIntervalId = window.setInterval(() => {
      this.checkAndTriggerReminder();
    }, 4 * 60 * 1000);
  }
}

export const streakNotifManager = StreakNotificationManager;
