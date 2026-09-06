const fs = require('fs');

const sm = fs.readFileSync('src/components/SevenMinuteTypingTest.astro', 'utf8');
const scriptIdx = sm.indexOf('<script>');
const script = sm.substring(scriptIdx);

// Search for where S (dropdown) and w (preview title) are set
const dropdownSet = script.match(/.{0,50}S\.innerHTML.{0,200}/g);
console.log('Dropdown population:', dropdownSet);

const previewTitleSet = script.match(/.{0,50}w\.textContent.{0,200}/g);
console.log('Preview title population:', previewTitleSet);
