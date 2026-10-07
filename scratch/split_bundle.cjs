const fs = require('fs');
const content = fs.readFileSync('scratch/Layout.CbF6uma4.css', 'utf8');

// Find the exact boundaries
const racingStartKeyword = '.bot-challenge-banner{';
const racingStartIndex = content.indexOf(racingStartKeyword);

const gamesStartKeyword = '.game-page-wrapper{';
const gamesStartIndex = content.indexOf(gamesStartKeyword);

console.log('racingStartIndex:', racingStartIndex);
console.log('gamesStartIndex:', gamesStartIndex);

const globalCssMin = content.substring(0, racingStartIndex);
const racingCssMin = content.substring(racingStartIndex, gamesStartIndex);
const gamesCssMin = content.substring(gamesStartIndex);

console.log('globalCssMin length:', globalCssMin.length);
console.log('racingCssMin length:', racingCssMin.length);
console.log('gamesCssMin length:', gamesCssMin.length);

fs.writeFileSync('scratch/restored_global.css', globalCssMin);
fs.writeFileSync('scratch/restored_racing.css', racingCssMin);
fs.writeFileSync('scratch/restored_games.css', gamesCssMin);
