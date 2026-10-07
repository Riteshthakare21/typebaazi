const fs = require('fs');

const html = fs.readFileSync('scratch/seven_minute_page.html', 'utf8');

// Extract the SevenMinute section
const startIdx = html.indexOf('<div class="seven-page-wrapper');
const endIdx = html.indexOf('</main>');

console.log('Seven minute HTML section:', html.substring(startIdx, endIdx !== -1 ? endIdx : startIdx + 2000));
