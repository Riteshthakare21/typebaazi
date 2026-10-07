const fs = require('fs');

let sm = fs.readFileSync('src/components/SevenMinuteTypingTest.astro', 'utf8');

// Find references to button IDs
console.log('btn-start-seven-test:', sm.match(/.{0,50}btn-start-seven-test.{0,100}/g));
console.log('btn-seven-restart:', sm.match(/.{0,50}btn-seven-restart.{0,100}/g));
console.log('btn-seven-finish:', sm.match(/.{0,50}btn-seven-finish.{0,100}/g));
console.log('btn-seven-config-back:', sm.match(/.{0,50}btn-seven-config-back.{0,100}/g));
