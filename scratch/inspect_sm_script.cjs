const fs = require('fs');

const sm = fs.readFileSync('src/components/SevenMinuteTypingTest.astro', 'utf8');
const scriptIdx = sm.indexOf('<script>');
const script = sm.substring(scriptIdx);

// Look for dropdown population
console.log('Script length:', script.length);

const matches = script.match(/seven-passage-dropdown|dropdown|option/g);
console.log('Matches:', matches);

// Find where dropdown options are set
const regex = /document\.getElementById\(['"]seven-passage-dropdown['"]\)/g;
console.log('Dropdown uses:', script.match(/.{0,50}seven-passage-dropdown.{0,150}/g));
