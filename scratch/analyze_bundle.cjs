const fs = require('fs');
const content = fs.readFileSync('scratch/Layout.CbF6uma4.css', 'utf8');

console.log('Total bundled CSS length:', content.length);

// Let's check for markers of racing.css and games.css
// In racing.css, common classes: race-track-wrapper, nitro-meter, speedo-card, etc.
// In games.css, common classes: matrix-rain, word-canvas, falling-words, etc.
// In global.css, common classes: @tailwind or :root, .hud-card, etc.

const raceIndex = content.indexOf('.race-track') !== -1 ? content.indexOf('.race-track') : content.indexOf('race-arena');
const gamesIndex = content.indexOf('.matrix-rain') !== -1 ? content.indexOf('.matrix-rain') : content.indexOf('game-typing-input');

console.log('raceIndex approx:', raceIndex);
console.log('gamesIndex approx:', gamesIndex);
