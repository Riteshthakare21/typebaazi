const fs = require('fs');

let sm = fs.readFileSync('src/components/SevenMinuteTypingTest.astro', 'utf8');

console.log('re listener:', sm.match(/.{0,50}re\??\.addEventListener.{0,100}/g));
console.log('ie listener:', sm.match(/.{0,50}ie\??\.addEventListener.{0,100}/g));
console.log('ae listener:', sm.match(/.{0,50}ae\??\.addEventListener.{0,100}/g));
console.log('oe listener:', sm.match(/.{0,50}oe\??\.addEventListener.{0,100}/g));
