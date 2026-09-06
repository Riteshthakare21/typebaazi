const fs = require('fs');
const content = fs.readFileSync('scratch/Layout.CbF6uma4.css', 'utf8');

console.log('--- 144200 to 144600 ---');
console.log(content.substring(144200, 144600));
