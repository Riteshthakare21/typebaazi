const fs = require('fs');
const content = fs.readFileSync('scratch/Layout.CbF6uma4.css', 'utf8');

// Find boundaries
// Let's search for first rule of racing.css
// In racing.css, what was at the top?
// Let's print snippets around 125000-126500 and 148500-150000
console.log('--- 124500 to 126500 ---');
console.log(content.substring(124500, 126500));

console.log('--- 148000 to 150000 ---');
console.log(content.substring(148000, 150000));
