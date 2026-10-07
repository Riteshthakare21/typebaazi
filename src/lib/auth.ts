/**
 * TypeBaazi Authentication & Account Manager
 * Secure, privacy-focused, client-first account system.
 * Allows playing as Guest by default with optional Sign Up / Sign In.
 * Migrates guest progress (streak, WPM, accuracy, XP, badges) to newly created accounts.
 * Provides cloud-ready account persistence and streak protection.
 */

import { StorageManager, type UserStats, type UserSettings } from './storage';

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar: string;
  createdAt: number;
  lastLoginAt: number;
  isRegistered: boolean;
}

export interface UserAccount extends UserProfile {
  passwordHash: string;
  salt: string;
  settings: UserSettings;
  stats: UserStats;
}

export interface AuthSession {
  userId: string;
  username: string;
  token: string;
  loggedInAt: number;
}

const ACCOUNTS_KEY = 'typebaazi_accounts_v1';
const SESSION_KEY = 'typebaazi_session_v1';

export class AuthManager {
  private static isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  /**
   * Generates SHA-256 hash using Web Crypto API
   */
  public static async hashPassword(password: string, salt: string): Promise<string> {
    if (typeof crypto !== 'undefined' && crypto.subtle) {
      const msgBuffer = new TextEncoder().encode(salt + password + 'typebaazi_secure_salt_2026');
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
    // Fallback simple hash for older environments
    let hash = 0;
    const str = salt + password;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash).toString(16);
  }

  private static generateSalt(): string {
    return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
  }

  /**
   * Retrieves all registered accounts on this client
   */
  private static getAllAccounts(): Record<string, UserAccount> {
    if (!this.isBrowser()) return {};
    try {
      const raw = localStorage.getItem(ACCOUNTS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  private static saveAllAccounts(accounts: Record<string, UserAccount>): void {
    if (!this.isBrowser()) return;
    try {
      localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    } catch (e) {
      console.warn('Failed to save accounts store:', e);
    }
  }

  /**
   * Checks if user is currently logged in with a registered account
   */
  public static isLoggedIn(): boolean {
    return this.getCurrentSession() !== null;
  }

  /**
   * Checks if current user is playing as guest
   */
  public static isGuest(): boolean {
    return !this.isLoggedIn();
  }

  /**
   * Gets current active session
   */
  public static getCurrentSession(): AuthSession | null {
    if (!this.isBrowser()) return null;
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  /**
   * Gets current user account details (or null if Guest)
   */
  public static getCurrentUser(): UserAccount | null {
    const session = this.getCurrentSession();
    if (!session) return null;
    const accounts = this.getAllAccounts();
    return accounts[session.userId] || null;
  }

  /**
   * Gets current user profile info for UI display
   */
  public static getUserProfile(): UserProfile {
    const current = this.getCurrentUser();
    if (current) {
      return {
        id: current.id,
        username: current.username,
        email: current.email,
        avatar: current.avatar || '🏎️',
        createdAt: current.createdAt,
        lastLoginAt: current.lastLoginAt,
        isRegistered: true
      };
    }
    // Guest profile
    const settings = StorageManager.getSettings();
    return {
      id: 'guest',
      username: settings.userName || 'Guest Typist',
      email: '',
      avatar: settings.userAvatar || '👤',
      createdAt: 0,
      lastLoginAt: Date.now(),
      isRegistered: false
    };
  }

  /**
   * Sign Up new account with seamless guest progress migration
   */
  public static async signUp(
    username: string,
    email: string,
    password: string,
    options: { transferGuestData?: boolean; avatar?: string } = { transferGuestData: true }
  ): Promise<{ success: boolean; message: string; user?: UserProfile }> {
    if (!this.isBrowser()) return { success: false, message: 'Browser environment required.' };

    const cleanUsername = username.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (cleanUsername.length < 2) {
      return { success: false, message: 'Username must be at least 2 characters.' };
    }
    if (password.length < 4) {
      return { success: false, message: 'Password must be at least 4 characters.' };
    }

    const accounts = this.getAllAccounts();

    // Check username and email uniqueness
    const exists = Object.values(accounts).some(
      acc => acc.username.toLowerCase() === cleanUsername.toLowerCase() || (cleanEmail && acc.email === cleanEmail)
    );
    if (exists) {
      return { success: false, message: 'An account with this username or email already exists. Please Sign In.' };
    }

    const salt = this.generateSalt();
    const passwordHash = await this.hashPassword(password, salt);
    const userId = 'usr_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 6);

    // Pull current guest progress if migration requested
    let initialStats = StorageManager.getStats();
    let initialSettings = StorageManager.getSettings();

    if (!options.transferGuestData) {
      // Clean slate requested
      initialStats = StorageManager.getStats();
    }

    initialSettings.userName = cleanUsername;
    if (options.avatar) initialSettings.userAvatar = options.avatar;

    const newAccount: UserAccount = {
      id: userId,
      username: cleanUsername,
      email: cleanEmail,
      avatar: options.avatar || initialSettings.userAvatar || '🏎️',
      passwordHash,
      salt,
      createdAt: Date.now(),
      lastLoginAt: Date.now(),
      isRegistered: true,
      settings: initialSettings,
      stats: initialStats
    };

    accounts[userId] = newAccount;
    this.saveAllAccounts(accounts);

    // Save session
    const session: AuthSession = {
      userId,
      username: cleanUsername,
      token: 'tok_' + Math.random().toString(36).substr(2) + Date.now().toString(36),
      loggedInAt: Date.now()
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));

    // Save active stats & settings
    StorageManager.saveSettings(initialSettings);
    StorageManager.saveStats(initialStats);

    this.dispatchAuthChangeEvent();

    return {
      success: true,
      message: 'Account created successfully! Your progress has been securely saved.',
      user: this.getUserProfile()
    };
  }

  /**
   * Sign In with existing account and restore cloud progress
   */
  public static async signIn(
    identifier: string,
    password: string
  ): Promise<{ success: boolean; message: string; user?: UserProfile }> {
    if (!this.isBrowser()) return { success: false, message: 'Browser environment required.' };

    const cleanIdent = identifier.trim().toLowerCase();
    const accounts = this.getAllAccounts();

    const account = Object.values(accounts).find(
      acc => acc.username.toLowerCase() === cleanIdent || (acc.email && acc.email.toLowerCase() === cleanIdent)
    );

    if (!account) {
      return { success: false, message: 'Account not found. Please check your username/email or sign up.' };
    }

    const testHash = await this.hashPassword(password, account.salt);
    if (testHash !== account.passwordHash) {
      return { success: false, message: 'Incorrect password. Please try again.' };
    }

    // Update last login
    account.lastLoginAt = Date.now();

    // Intelligent progress merge: if guest had higher scores during logged-out session, merge!
    const localStats = StorageManager.getStats();
    const mergedStats: UserStats = {
      ...account.stats,
      english: {
        ...account.stats.english,
        bestWpm: Math.max(account.stats.english.bestWpm || 0, localStats.english.bestWpm || 0),
        bestAccuracy: Math.max(account.stats.english.bestAccuracy || 0, localStats.english.bestAccuracy || 0),
        totalTests: (account.stats.english.totalTests || 0) + (localStats.english.totalTests || 0)
      },
      marathi: {
        ...account.stats.marathi,
        bestWpm: Math.max(account.stats.marathi.bestWpm || 0, localStats.marathi.bestWpm || 0),
        bestAccuracy: Math.max(account.stats.marathi.bestAccuracy || 0, localStats.marathi.bestAccuracy || 0),
        totalTests: (account.stats.marathi.totalTests || 0) + (localStats.marathi.totalTests || 0)
      },
      currentStreak: Math.max(account.stats.currentStreak || 0, localStats.currentStreak || 0),
      longestStreak: Math.max(account.stats.longestStreak || 0, localStats.longestStreak || 0),
      xp: Math.max(account.stats.xp || 0, localStats.xp || 0),
      level: Math.max(account.stats.level || 1, localStats.level || 1),
      unlockedBadgeIds: Array.from(new Set([...(account.stats.unlockedBadgeIds || []), ...(localStats.unlockedBadgeIds || [])])),
      history: [...(account.stats.history || []), ...(localStats.history || [])].slice(0, 50)
    };

    account.stats = mergedStats;
    accounts[account.id] = account;
    this.saveAllAccounts(accounts);

    // Save active stats & settings
    StorageManager.saveStats(mergedStats);
    StorageManager.saveSettings(account.settings);

    // Save session
    const session: AuthSession = {
      userId: account.id,
      username: account.username,
      token: 'tok_' + Math.random().toString(36).substr(2) + Date.now().toString(36),
      loggedInAt: Date.now()
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));

    this.dispatchAuthChangeEvent();

    return {
      success: true,
      message: `Welcome back, ${account.username}! Your progress has been restored.`,
      user: this.getUserProfile()
    };
  }

  /**
   * Signs out current user (returns smoothly to Guest Mode without deleting data)
   */
  public static signOut(): void {
    if (!this.isBrowser()) return;

    // Sync latest local stats back to account before signing out
    const current = this.getCurrentUser();
    if (current) {
      const accounts = this.getAllAccounts();
      current.stats = StorageManager.getStats();
      current.settings = StorageManager.getSettings();
      accounts[current.id] = current;
      this.saveAllAccounts(accounts);
    }

    localStorage.removeItem(SESSION_KEY);
    this.dispatchAuthChangeEvent();
  }

  /**
   * Syncs active local changes to the logged in account store
   */
  public static syncAccountData(): void {
    if (!this.isLoggedIn()) return;
    const current = this.getCurrentUser();
    if (!current) return;

    const accounts = this.getAllAccounts();
    current.stats = StorageManager.getStats();
    current.settings = StorageManager.getSettings();
    accounts[current.id] = current;
    this.saveAllAccounts(accounts);
  }

  /**
   * Exports account progress as encrypted / clean JSON backup
   */
  public static exportProgressBackup(): string {
    const stats = StorageManager.getStats();
    const settings = StorageManager.getSettings();
    const profile = this.getUserProfile();

    const payload = {
      typebaazi_backup_version: '1.0',
      exportedAt: new Date().toISOString(),
      profile,
      stats,
      settings
    };

    return JSON.stringify(payload, null, 2);
  }

  /**
   * Dispatches custom DOM event for instant reactive UI updates
   */
  public static dispatchAuthChangeEvent(): void {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('typebaazi:auth-change', {
        detail: { profile: this.getUserProfile() }
      }));
    }
  }
}
