const fs = require('fs');

const sm = fs.readFileSync('src/components/SevenMinuteTypingTest.astro', 'utf8');
const scriptIdx = sm.indexOf('<script>');
const script = sm.substring(scriptIdx);

// Look for token class creation
const matches = script.match(/char-token|t-char|current|active-cursor/g);
console.log('Class occurrences:', matches);

const renderTokens = script.match(/.{0,50}span class=.char.{0,100}/g);
console.log('Render spans:', renderTokens);
