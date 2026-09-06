/**
 * TypeBaazi Haptic Feedback Engine
 * Provides crisp, subtle button tap vibrations on mobile devices (Android / WebView).
 * Strictly excludes paragraph typing and character inputs.
 */

export class HapticsManager {
  private static isSupported(): boolean {
    return typeof window !== 'undefined' && typeof navigator !== 'undefined' && 'vibrate' in navigator;
  }

  /**
   * Triggers a subtle, crisp vibration pulse (default 12ms)
   */
  public static trigger(durationMs = 12): void {
    if (!this.isSupported()) return;
    try {
      navigator.vibrate(durationMs);
    } catch {
      // Haptics might be disabled by system battery saver or permission policy
    }
  }

  /**
   * Success / Achievement double tap (e.g. Test Completed / Level Up)
   */
  public static success(): void {
    if (!this.isSupported()) return;
    try {
      navigator.vibrate([15, 40, 15]);
    } catch {}
  }

  /**
   * Initializes global delegated listener for all UI buttons while ignoring typing inputs
   */
  public static initGlobalListener(): void {
    if (typeof document === 'undefined') return;

    // Use pointerdown for instant zero-latency haptic response upon physical contact
    document.addEventListener(
      'pointerdown',
      (event: PointerEvent) => {
        const target = event.target as HTMLElement | null;
        if (!target) return;

        // 1. STRICT EXCLUSION: Ignore typing arena, text inputs, textareas, and typing keyboard
        if (
          target.closest(
            'input, textarea, [contenteditable="true"], .typing-input, #typing-input, #typing-area, .typing-container, .word-token, .char-token, .key-cap'
          )
        ) {
          return;
        }

        // 2. TARGET: Any button, link, tab, chip, or interactive control
        const clickable = target.closest(
          'button, a, .btn, .btn-primary, .btn-secondary, .quick-btn, .nav-item, .tab-btn, .mode-btn, .time-btn, .lang-chip, .diff-chip, .word-count-btn, .avatar-opt, [role="button"]'
        );

        if (clickable) {
          this.trigger(12); // Crisp 12ms native micro-tap
        }
      },
      { passive: true }
    );
  }
}
