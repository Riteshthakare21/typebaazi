const fs = require('fs');
const content = fs.readFileSync('scratch/Layout.CbF6uma4.css', 'utf8');

// Let's search for keywords that appear at the beginning of games.css
const gamesKeywords = ['.games-hud', '.game-page', '.matrix-', '.arcade-', '.game-container', '.game-wrapper', '.falling-words', '.game-arena', '.game-toolbar'];

for (const kw of gamesKeywords) {
  const idx = content.indexOf(kw);
  console.log(kw, 'index:', idx);
}
