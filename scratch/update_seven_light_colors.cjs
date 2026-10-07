const fs = require('fs');

// 1. Update SevenMinuteTypingTest.astro
let sm = fs.readFileSync('src/components/SevenMinuteTypingTest.astro', 'utf8');

const lightStyles = `
/* Light Theme Styling for 7-Minute Test */
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
  border: 1.5px solid #cbd5e1 !important;
  box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.03), 0 4px 20px rgba(15, 23, 42, 0.06) !important;
}

[data-theme='light'] .seven-text-viewport.is-focused,
[data-theme='light'] .seven-text-viewport:focus-within {
  border-color: #0070f3 !important;
  box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.03), 0 0 20px rgba(0, 112, 243, 0.2) !important;
}

[data-theme='light'] .seven-tokens-container,
[data-theme='light'] .seven-tokens-container .t-char,
[data-theme='light'] .t-char {
  color: #1e293b !important;
}

[data-theme='light'] .t-char.current,
[data-theme='light'] .seven-tokens-container .t-char.current {
  color: #ffffff !important;
  background: #000000 !important;
  border-bottom: 3px solid #000000 !important;
  border-radius: 4px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4) !important;
}

[data-theme='light'] .t-char.correct,
[data-theme='light'] .seven-tokens-container .t-char.correct {
  color: #15803d !important;
  background: transparent !important;
}

[data-theme='light'] .t-char.incorrect,
[data-theme='light'] .seven-tokens-container .t-char.incorrect {
  color: #dc2626 !important;
  background: rgba(220, 38, 38, 0.15) !important;
  text-decoration: underline #dc2626 !important;
}

[data-theme='light'] .seven-hud-card {
  background: #ffffff !important;
  border: 1.5px solid #e2e8f0 !important;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04) !important;
}

[data-theme='light'] .seven-hud-card.hud-timer-box {
  background: rgba(245, 158, 11, 0.06) !important;
  border: 1.5px solid rgba(245, 158, 11, 0.4) !important;
}

[data-theme='light'] .seven-hud-val {
  color: #0f172a !important;
}

[data-theme='light'] .seven-hud-lbl {
  color: #64748b !important;
}

[data-theme='light'] .seven-passage-info-bar {
  background: #ffffff !important;
  border: 1.5px solid #e2e8f0 !important;
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

[data-theme='light'] .btn-secondary {
  background: #ffffff !important;
  color: #334155 !important;
  border: 1.5px solid #cbd5e1 !important;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05) !important;
}

[data-theme='light'] .btn-secondary:hover {
  background: #eff6ff !important;
  color: #0070f3 !important;
  border-color: #0070f3 !important;
}

[data-theme='light'] .btn-primary {
  background: linear-gradient(135deg, #0070f3 0%, #2563eb 100%) !important;
  color: #ffffff !important;
  border: 1.5px solid #0070f3 !important;
  box-shadow: 0 4px 14px rgba(0, 112, 243, 0.35) !important;
}
`;

// Replace the light theme block in SevenMinuteTypingTest.astro
const lightStart = sm.indexOf('/* Light Theme Styling */');
const styleEnd = sm.indexOf('</style>');

if (lightStart !== -1 && styleEnd !== -1) {
  sm = sm.substring(0, lightStart) + lightStyles + '\n' + sm.substring(styleEnd);
}

fs.writeFileSync('src/components/SevenMinuteTypingTest.astro', sm);

// 2. Also append comprehensive light theme rules into global.css
let globalCss = fs.readFileSync('src/styles/global.css', 'utf8');
const globalSevenRules = `
/* Global Light Theme Rules for 7-Minute Test and Arenas */
[data-theme="light"] .seven-text-viewport {
  background: #ffffff !important;
  border: 1.5px solid #cbd5e1 !important;
  box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.03), 0 4px 20px rgba(15, 23, 42, 0.06) !important;
}

[data-theme="light"] .seven-tokens-container,
[data-theme="light"] .seven-tokens-container .t-char,
[data-theme="light"] .t-char {
  color: #1e293b !important;
}

[data-theme="light"] .t-char.current,
[data-theme="light"] .seven-tokens-container .t-char.current {
  color: #ffffff !important;
  background: #000000 !important;
  border-bottom: 3px solid #000000 !important;
  border-radius: 4px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4) !important;
}

[data-theme="light"] .t-char.correct,
[data-theme="light"] .seven-tokens-container .t-char.correct {
  color: #15803d !important;
  background: transparent !important;
}

[data-theme="light"] .t-char.incorrect,
[data-theme="light"] .seven-tokens-container .t-char.incorrect {
  color: #dc2626 !important;
  background: rgba(220, 38, 38, 0.15) !important;
  text-decoration: underline #dc2626 !important;
}

[data-theme="light"] .seven-hud-card {
  background: #ffffff !important;
  border: 1.5px solid #e2e8f0 !important;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04) !important;
}

[data-theme="light"] .seven-hud-card.hud-timer-box {
  background: rgba(245, 158, 11, 0.06) !important;
  border: 1.5px solid rgba(245, 158, 11, 0.4) !important;
}

[data-theme="light"] .seven-hud-val {
  color: #0f172a !important;
}

[data-theme="light"] .seven-hud-lbl {
  color: #64748b !important;
}

[data-theme="light"] .seven-passage-info-bar {
  background: #ffffff !important;
  border: 1.5px solid #e2e8f0 !important;
}

[data-theme="light"] .p-info-title {
  color: #0f172a !important;
}
`;

globalCss += '\n' + globalSevenRules;
fs.writeFileSync('src/styles/global.css', globalCss);

console.log('Successfully updated light theme colors for 7-Minute test!');
