const fs = require('fs');

// 1. Update TypingArena.astro active cursor
let ta = fs.readFileSync('src/components/TypingArena.astro', 'utf8');
ta = ta.replace(
  /\.char-token\.active-cursor\s*\{[\s\S]*?animation:\s*cursorPulse[\s\S]*?\}/,
  `.char-token.active-cursor {
    color: #060913 !important;
    background: #00f0ff !important;
    border-radius: 4px !important;
    border-bottom: 2.5px solid #ffffff !important;
    box-shadow: 0 0 14px rgba(0, 240, 255, 0.95), 0 2px 8px rgba(0, 0, 0, 0.6) !important;
    font-weight: 900 !important;
    animation: cursorPulse 1.2s ease-in-out infinite;
  }`
);
fs.writeFileSync('src/components/TypingArena.astro', ta);

// 2. Update SevenMinuteTypingTest.astro active cursor in dark theme
let sm = fs.readFileSync('src/components/SevenMinuteTypingTest.astro', 'utf8');
sm = sm.replace(
  /\.t-char\.current\s*\{[\s\S]*?color:\s*#ffffff\s*!important;\s*border-radius:\s*2px;\s*\}/,
  `.t-char.current {
  background: #00f0ff !important;
  color: #060913 !important;
  border-radius: 4px !important;
  border-bottom: 2.5px solid #ffffff !important;
  box-shadow: 0 0 14px rgba(0, 240, 255, 0.95), 0 2px 8px rgba(0, 0, 0, 0.6) !important;
  font-weight: 900 !important;
}`
);
fs.writeFileSync('src/components/SevenMinuteTypingTest.astro', sm);

// 3. Update racing.css dark cursor
let rc = fs.readFileSync('src/styles/racing.css', 'utf8');
rc = rc.replace(
  /\.char-token\.active-cursor\s*\{[\s\S]*?animation:\s*1s infinite alternate pulseCursor;[\s\S]*?box-shadow:\s*0 2px 8px #0009\s*!important;\s*\}/,
  `.char-token.active-cursor {
  color: #060913 !important;
  background: #00f0ff !important;
  border-bottom: 2.5px solid #ffffff !important;
  border-radius: 4px !important;
  box-shadow: 0 0 14px rgba(0, 240, 255, 0.95), 0 2px 8px rgba(0, 0, 0, 0.6) !important;
  font-weight: 900 !important;
}`
);
fs.writeFileSync('src/styles/racing.css', rc);

// 4. Update global.css with top priority rules for dark mode light cursor
let gc = fs.readFileSync('src/styles/global.css', 'utf8');
const darkCursorRules = `
/* Light & High-Contrast Glowing Cursor for Dark Theme */
.char-token.active-cursor,
.t-char.current,
.race-typing-box .char-token.active-cursor {
  color: #060913 !important;
  background: #00f0ff !important;
  border-radius: 4px !important;
  border-bottom: 2.5px solid #ffffff !important;
  box-shadow: 0 0 14px rgba(0, 240, 255, 0.95), 0 2px 8px rgba(0, 0, 0, 0.6) !important;
  font-weight: 900 !important;
}

[data-theme="light"] .char-token.active-cursor,
[data-theme="light"] .t-char.current,
[data-theme="light"] .race-typing-box .char-token.active-cursor {
  color: #ffffff !important;
  background: #000000 !important;
  border-bottom: 3px solid #000000 !important;
  border-radius: 4px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4) !important;
  font-weight: 900 !important;
}
`;
gc += '\n' + darkCursorRules;
fs.writeFileSync('src/styles/global.css', gc);

console.log('Successfully updated cursor contrast for dark and light modes!');
