const fs = require('fs');

let sm = fs.readFileSync('src/components/SevenMinuteTypingTest.astro', 'utf8');

// Let's inspect the keydown handler in SevenMinuteTypingTest.astro
const keydownMatch = sm.match(/window\.addEventListener\(`keydown`[^}]+\}\)/g);
console.log('Keydown match:', keydownMatch);

// Look for where start button, restart button, submit button, change options button are bound
const btnMatches = sm.match(/\.[a-zA-Z0-9_$]+\?\.addEventListener\(`click`[^}]+\}/g);
console.log('Button click listeners:', btnMatches);
