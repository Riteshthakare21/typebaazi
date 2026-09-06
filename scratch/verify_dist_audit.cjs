const fs = require('fs');
const path = require('path');

const pages = [
  'index.html',
  '404.html',
  'disclaimer/index.html',
  'cookie-policy/index.html',
  'privacy-policy/index.html',
  'terms-and-conditions/index.html',
  'about/index.html',
  'contact-us/index.html',
  'typing-test/index.html',
  'english-typing-test/index.html',
  'hindi-typing-test/index.html',
  'hindi-typing-practice/index.html',
  'marathi-typing-test/index.html',
  'marathi-typing-practice/index.html',
  'seven-minute-typing-test/index.html',
  'government-exam-typing-practice/index.html',
  'race/index.html',
  'games/index.html',
  'daily-challenge/index.html',
  'leaderboard/index.html',
  'dashboard/index.html',
  'learn/index.html'
];

let errors = 0;
for (const p of pages) {
  const full = path.join(__dirname, '..', 'dist', p);
  if (!fs.existsSync(full)) {
    console.error('MISSING:', p);
    errors++;
    continue;
  }
  const content = fs.readFileSync(full, 'utf8');
  const hasTitle = /<title>[^<]+<\/title>/.test(content);
  const hasH1 = /<h1[^>]*>/.test(content);
  const hasFooter = content.includes('footer-wrapper');
  const hasNavbar = content.includes('navbar-wrapper');
  const hasCanonical = /<link rel="canonical" href="[^"]+"/.test(content);
  
  if (content.includes('18450') && content.includes('aggregateRating')) {
    console.error('FAKE RATING DETECTED IN:', p);
    errors++;
  }

  console.log(`✓ ${p.padEnd(36)} | Title: ${hasTitle ? 'OK' : 'MISSING'} | H1: ${hasH1 ? 'OK' : 'MISSING'} | Canonical: ${hasCanonical ? 'OK' : 'MISSING'} | Nav & Footer: ${hasNavbar && hasFooter ? 'OK' : 'MISSING'}`);
}

console.log(`\nAudit finished with ${errors} errors.`);
