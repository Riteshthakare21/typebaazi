const fs = require('fs');

let sm = fs.readFileSync('src/components/SevenMinuteTypingTest.astro', 'utf8');

// Fix duplicate "Passage 1: Passage 1:" in script
sm = sm.replace(
  'Passage ${e.passageNum}: ${e.title}',
  '${e.title}'
);

sm = sm.replace(
  'Passage ${e.passageNum}: ${e.title}',
  '${e.title}'
);

// Comprehensive attractive modern CSS for SevenMinuteTypingTest
const newStyles = `
<style>
.seven-min-container {
  box-sizing: border-box;
  border-radius: var(--radius-lg, 18px);
  background: #0b1329;
  border: 1.5px solid rgba(0, 240, 255, 0.35);
  width: 100%;
  margin: 24px auto;
  padding: clamp(18px, 2.5vw, 28px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);
}

.seven-min-header {
  text-align: center;
  margin-bottom: 22px;
}

.seven-badge-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.seven-min-title {
  color: #ffffff;
  margin: 6px 0 8px;
  font-size: clamp(22px, 3.5vw, 30px);
  font-weight: 900;
  line-height: 1.25;
  letter-spacing: -0.5px;
}

.seven-min-sub {
  color: #cbd5e1;
  max-width: 750px;
  margin: 0 auto;
  font-size: clamp(13px, 1.8vw, 14.5px);
  line-height: 1.6;
}

.seven-selection-card {
  box-sizing: border-box;
  background: #111b33;
  border: 1.5px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  padding: clamp(16px, 2.2vw, 24px);
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.config-step-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.config-step-label {
  color: #ffffff;
  font-size: clamp(13.5px, 1.8vw, 15px);
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 10px;
}

.step-num {
  background: var(--accent-cyan, #00f0ff);
  color: #080c18;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 900;
}

.passage-count-badge {
  color: var(--accent-cyan, #00f0ff);
  background: rgba(0, 240, 255, 0.12);
  border: 1px solid rgba(0, 240, 255, 0.4);
  border-radius: 9999px;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 800;
  margin-left: auto;
}

.config-pill-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.seven-pill-btn {
  flex: 1;
  min-width: 140px;
  min-height: 48px;
  padding: 12px 18px;
  background: #16223e;
  border: 1.5px solid rgba(255, 255, 255, 0.14);
  border-radius: 12px;
  color: #f1f5f9;
  font-size: clamp(13px, 1.6vw, 14px);
  font-weight: 700;
  cursor: pointer;
  user-select: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  pointer-events: auto !important;
}

.seven-pill-btn:hover {
  color: #ffffff;
  background: rgba(0, 240, 255, 0.14);
  border-color: #00f0ff;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 240, 255, 0.25);
}

.seven-pill-btn.active {
  background: linear-gradient(135deg, #0070f3 0%, #2563eb 100%) !important;
  color: #ffffff !important;
  border: 1.5px solid #00f0ff !important;
  font-weight: 900 !important;
  box-shadow: 0 6px 22px rgba(0, 112, 243, 0.5) !important;
  transform: translateY(-1px);
}

.passage-select-wrapper {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}

.passage-select-label {
  color: #ffffff;
  font-size: 13px;
  font-weight: 800;
}

.seven-passage-select {
  width: 100%;
  min-height: 48px;
  padding: 12px 16px;
  background: #090f20;
  border: 1.5px solid rgba(0, 240, 255, 0.35);
  border-radius: 12px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  outline: none;
  cursor: pointer;
  box-sizing: border-box;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
}

.seven-passage-select:focus {
  border-color: #00f0ff;
  box-shadow: 0 0 16px rgba(0, 240, 255, 0.4);
}

.seven-passage-select option {
  background: #090f20;
  color: #ffffff;
  padding: 8px;
}

.passage-chips-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-top: 8px;
  box-sizing: border-box;
}

.chips-label {
  color: #ffffff;
  font-size: 13px;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 6px;
}

.passage-chips-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
  padding: 2px 0;
  box-sizing: border-box;
}

.passage-chip {
  min-width: 44px;
  height: 38px;
  padding: 0 10px;
  background: #14203d;
  border: 1.5px solid rgba(255, 255, 255, 0.16);
  border-radius: 8px;
  color: #f1f5f9;
  font-size: 13px;
  font-weight: 800;
  font-family: var(--font-mono, monospace);
  cursor: pointer;
  user-select: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

.passage-chip:hover {
  color: #ffffff;
  background: rgba(0, 112, 243, 0.25);
  border-color: #00f0ff;
  transform: translateY(-2px);
  box-shadow: 0 4px 14px rgba(0, 240, 255, 0.3);
}

.passage-chip:active {
  transform: scale(0.96);
}

.passage-chip.active {
  background: linear-gradient(135deg, #0070f3 0%, #00f0ff 100%) !important;
  color: #080c18 !important;
  border: 1.5px solid #00f0ff !important;
  font-weight: 900 !important;
  box-shadow: 0 4px 16px rgba(0, 240, 255, 0.5) !important;
  transform: translateY(-1px);
}

.passage-active-card {
  background: rgba(0, 240, 255, 0.06);
  border: 1.5px solid rgba(0, 240, 255, 0.35);
  border-radius: 12px;
  padding: 14px 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
}

.p-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.p-card-title {
  color: #ffffff;
  font-size: 15px;
  font-weight: 800;
}

.p-card-badge {
  color: var(--accent-gold, #fbbf24);
  background: rgba(245, 158, 11, 0.16);
  border: 1px solid rgba(245, 158, 11, 0.3);
  border-radius: 6px;
  padding: 3px 10px;
  font-size: 12px;
  font-weight: 700;
}

.p-card-snippet {
  color: #e2e8f0;
  font-size: 13.5px;
  font-weight: 500;
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.config-action-row {
  margin-top: 8px;
}

.seven-start-btn {
  width: 100%;
  min-height: 54px;
  padding: 14px 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: linear-gradient(135deg, #2563eb 0%, #4f46e5 50%, #7c3aed 100%) !important;
  border: 1px solid rgba(255, 255, 255, 0.4) !important;
  border-radius: 14px !important;
  font-size: clamp(15.5px, 2.5vw, 17.5px) !important;
  font-weight: 900 !important;
  color: #ffffff !important;
  letter-spacing: 0.5px;
  cursor: pointer;
  user-select: none;
  transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 28px rgba(79, 70, 229, 0.5), 0 2px 8px rgba(37, 99, 235, 0.3) !important;
  pointer-events: auto !important;
}

.seven-start-btn:hover {
  filter: brightness(1.1);
  transform: translateY(-2px);
  box-shadow: 0 10px 32px rgba(79, 70, 229, 0.7) !important;
}

.seven-start-btn:active {
  transform: translateY(0);
}

.seven-test-arena {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-sizing: border-box;
}

.seven-hud-bar {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: clamp(6px, 1.2vw, 10px);
  width: 100%;
  box-sizing: border-box;
}

.seven-hud-card {
  background: #101828d9;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: clamp(6px, 1vw, 10px);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.seven-hud-lbl {
  font-size: clamp(9px, 1.2vw, 11px);
  font-weight: 700;
  color: #cbd5e1;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
}

.seven-hud-val {
  font-size: clamp(15px, 2.5vw, 20px);
  font-weight: 900;
  font-family: var(--font-mono, monospace);
  color: #ffffff;
  line-height: 1.1;
}

.hud-timer-box {
  background: rgba(245, 158, 11, 0.08);
  border-color: rgba(245, 158, 11, 0.4);
}

.seven-passage-info-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  flex-wrap: wrap;
  gap: 6px;
}

.p-info-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.p-info-badge {
  padding: 2px 8px;
  background: rgba(0, 240, 255, 0.12);
  border: 1px solid rgba(0, 240, 255, 0.3);
  border-radius: 6px;
  color: var(--accent-cyan);
  font-size: 11px;
  font-weight: 700;
}

.seven-text-viewport {
  min-height: 220px;
  max-height: 280px;
  padding: clamp(14px, 2vw, 20px);
  background: rgba(6, 10, 20, 0.85);
  border: 1.5px solid rgba(0, 240, 255, 0.3);
  border-radius: 12px;
  overflow-y: auto;
  overflow-x: hidden;
  outline: none;
  cursor: text;
  user-select: none;
  scroll-behavior: smooth;
  box-sizing: border-box;
}

.seven-text-viewport:focus-within,
.seven-text-viewport.is-focused {
  border-color: #00f0ff;
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.25);
}

.seven-tokens-container {
  font-family: var(--font-mono, "JetBrains Mono", monospace);
  font-size: clamp(16px, 2.8vw, 20px);
  line-height: 1.8;
  color: #64748b;
  word-break: break-word;
  white-space: pre-wrap;
  letter-spacing: 0.5px;
}

.seven-tokens-container.lang-marathi {
  font-family: 'Mukta', 'Noto Sans Devanagari', sans-serif;
  font-size: clamp(18px, 3.2vw, 22px);
  line-height: 2.0;
}

.t-char {
  position: relative;
  transition: color 0.1s ease;
}

.t-char.correct {
  color: #4ade80 !important;
}

.t-char.incorrect {
  color: #ef4444 !important;
  text-decoration: underline #ef4444;
}

.t-char.current {
  background: rgba(0, 240, 255, 0.35);
  color: #ffffff !important;
  border-radius: 2px;
}

.seven-hidden-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
}

.seven-arena-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  flex-wrap: wrap;
}

.seven-results-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(6, 10, 20, 0.85);
  backdrop-filter: blur(8px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  box-sizing: border-box;
}

.seven-results-card {
  background: #0d1527;
  border: 1px solid rgba(0, 240, 255, 0.3);
  border-radius: 16px;
  padding: clamp(16px, 3vw, 24px);
  width: 100%;
  max-width: 520px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.7);
  animation: modalPopIn 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-sizing: border-box;
}

@keyframes modalPopIn {
  0% { transform: scale(0.94); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

.results-top-header {
  text-align: center;
}

.seven-res-title {
  color: #ffffff;
  font-size: clamp(18px, 3vw, 22px);
  font-weight: 900;
  margin: 4px 0 2px;
}

.seven-res-sub {
  color: #cbd5e1;
  font-size: 12px;
}

.qualification-banner {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-radius: 10px;
  box-sizing: border-box;
}

.qualification-banner.is-passed {
  background: rgba(34, 197, 94, 0.12);
  border: 1.5px solid #22c55e;
}

.qualification-banner.is-passed h4 {
  color: #4ade80;
}

.qualification-banner.is-failed {
  background: rgba(239, 68, 68, 0.12);
  border: 1.5px solid #ef4444;
}

.qualification-banner.is-failed h4 {
  color: #f87171;
}

.q-icon {
  font-size: 26px;
}

.q-body h4 {
  margin: 0 0 2px;
  font-size: 15px;
  font-weight: 900;
}

.q-body p {
  margin: 0;
  font-size: 12px;
  color: #cbd5e1;
}

.seven-stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
}

.seven-stat-box {
  background: rgba(16, 24, 40, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 10px 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.seven-stat-box.highlight-stat {
  background: rgba(245, 158, 11, 0.08);
  border-color: rgba(245, 158, 11, 0.5);
}

.s-lbl {
  font-size: 11px;
  font-weight: 700;
  color: #cbd5e1;
  text-transform: uppercase;
  margin-bottom: 2px;
}

.s-val {
  font-size: 18px;
  font-weight: 900;
  font-family: var(--font-mono, monospace);
}

.seven-modal-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 4px;
}

.seven-cert-hero-btn {
  width: 100%;
  min-height: 46px;
  padding: 12px 18px;
  background: linear-gradient(135deg, #fbbf24 0%, #d97706 100%) !important;
  color: #080c18 !important;
  border-radius: 10px !important;
  font-size: 14.5px !important;
  font-weight: 900 !important;
  border: none !important;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  box-shadow: 0 4px 16px rgba(251, 191, 36, 0.4) !important;
  transition: all 0.2s ease;
}

.seven-cert-hero-btn:hover:not(:disabled) {
  filter: brightness(1.08);
  transform: translateY(-2px);
}

.seven-cert-hero-btn:disabled {
  opacity: 0.75;
  cursor: not-allowed;
}

.seven-modal-btn-row {
  display: flex;
  gap: 8px;
}

@media (max-width: 650px) {
  .seven-hud-bar {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 420px) {
  .seven-hud-bar {
    grid-template-columns: repeat(2, 1fr);
  }
  .seven-pill-btn {
    min-width: 100%;
  }
  .seven-modal-btn-row {
    flex-direction: column;
  }
}

/* Light Theme Styling */
[data-theme='light'] .seven-min-container {
  background: #ffffff !important;
  border: 1.5px solid #e2e8f0 !important;
  box-shadow: 0 10px 32px rgba(15, 23, 42, 0.08) !important;
}

[data-theme='light'] .seven-min-title {
  color: #0f172a !important;
}

[data-theme='light'] .seven-min-sub {
  color: #475569 !important;
}

[data-theme='light'] .seven-selection-card {
  background: #f8fafc !important;
  border: 1.5px solid #e2e8f0 !important;
  box-shadow: 0 2px 12px rgba(15, 23, 42, 0.04) !important;
}

[data-theme='light'] .config-step-label {
  color: #0f172a !important;
}

[data-theme='light'] .seven-pill-btn {
  color: #334155 !important;
  background: #ffffff !important;
  border-color: #cbd5e1 !important;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05) !important;
}

[data-theme='light'] .seven-pill-btn:hover {
  color: #0070f3 !important;
  background: #eff6ff !important;
  border-color: #0070f3 !important;
}

[data-theme='light'] .seven-pill-btn.active {
  background: linear-gradient(135deg, #0070f3 0%, #2563eb 100%) !important;
  color: #ffffff !important;
  border-color: #0070f3 !important;
  box-shadow: 0 4px 14px rgba(0, 112, 243, 0.3) !important;
}

[data-theme='light'] .passage-select-label {
  color: #0f172a !important;
  font-weight: 800 !important;
}

[data-theme='light'] .seven-passage-select {
  color: #0f172a !important;
  background: #ffffff !important;
  border-color: #cbd5e1 !important;
}

[data-theme='light'] .seven-passage-select option {
  color: #0f172a !important;
  background: #ffffff !important;
}

[data-theme='light'] .chips-label {
  color: #0f172a !important;
  font-weight: 800 !important;
}

[data-theme='light'] .passage-chip {
  color: #1e293b !important;
  background: #ffffff !important;
  border: 1.5px solid #cbd5e1 !important;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05) !important;
}

[data-theme='light'] .passage-chip:hover {
  color: #0070f3 !important;
  background: #eff6ff !important;
  border-color: #0070f3 !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 112, 243, 0.15) !important;
}

[data-theme='light'] .passage-chip.active {
  background: linear-gradient(135deg, #0070f3 0%, #2563eb 100%) !important;
  color: #ffffff !important;
  border: 1.5px solid #0070f3 !important;
  font-weight: 900 !important;
  box-shadow: 0 4px 14px rgba(0, 112, 243, 0.3) !important;
}

[data-theme='light'] .passage-active-card {
  background: #f1f5f9 !important;
  border-color: #cbd5e1 !important;
}

[data-theme='light'] .p-card-title {
  color: #0f172a !important;
  font-weight: 800 !important;
}

[data-theme='light'] .p-card-snippet {
  color: #1e293b !important;
  font-weight: 600 !important;
}

[data-theme='light'] .seven-text-viewport {
  background: #ffffff !important;
  border-color: #cbd5e1 !important;
}

[data-theme='light'] .seven-tokens-container,
[data-theme='light'] .seven-tokens-container .char-token.pending {
  color: #334155 !important;
}

[data-theme='light'] .seven-tokens-container .char-token.active-cursor {
  color: #ffffff !important;
  background: #000000 !important;
  border-bottom: 3px solid #000000 !important;
  border-radius: 4px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4) !important;
}

[data-theme='light'] .seven-tokens-container .char-token.correct {
  color: #15803d !important;
}

[data-theme='light'] .seven-tokens-container .char-token.incorrect {
  color: #dc2626 !important;
  background: rgba(220, 38, 38, 0.15) !important;
}

[data-theme='light'] .seven-hud-card {
  background: #ffffff !important;
  border-color: #e2e8f0 !important;
}

[data-theme='light'] .seven-hud-val {
  color: #0f172a !important;
}

[data-theme='light'] .seven-hud-lbl {
  color: #64748b !important;
}

[data-theme='light'] .seven-passage-info-bar {
  background: #ffffff !important;
  border-color: #e2e8f0 !important;
}

[data-theme='light'] .p-info-title {
  color: #0f172a !important;
}

[data-theme='light'] .seven-results-card {
  background: #ffffff !important;
  border-color: #e2e8f0 !important;
}

[data-theme='light'] .seven-res-title {
  color: #0f172a !important;
}

[data-theme='light'] .seven-res-sub {
  color: #64748b !important;
}

[data-theme='light'] .seven-stat-box {
  background: #f8fafc !important;
  border-color: #e2e8f0 !important;
}

[data-theme='light'] .seven-stat-box .s-val {
  color: #0f172a !important;
}

[data-theme='light'] .s-lbl {
  color: #64748b !important;
}

[data-theme='light'] .q-body p {
  color: #64748b !important;
}
</style>
`;

// Replace existing style block with newStyles
const styleStart = sm.indexOf('<style>');
const styleEnd = sm.indexOf('</style>') + '</style>'.length;

sm = sm.substring(0, styleStart) + newStyles + sm.substring(styleEnd);

fs.writeFileSync('src/components/SevenMinuteTypingTest.astro', sm);
console.log('Successfully upgraded SevenMinuteTypingTest.astro with attractive modern design!');
