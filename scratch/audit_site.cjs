const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
  console.error('dist directory does not exist. Run npm run build first.');
  process.exit(1);
}

const htmlFiles = [];
function findHtml(dir) {
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) findHtml(full);
    else if (full.endsWith('.html')) htmlFiles.push(full);
  }
}
findHtml(distDir);

console.log('Auditing', htmlFiles.length, 'HTML pages in dist...\n');
let warningCount = 0;
let errorCount = 0;

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(distDir, file);

  // Check 1: <h1> tag
  const h1Matches = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi);
  if (!h1Matches) {
    console.warn(`[WARN] Missing <h1> in: ${rel}`);
    warningCount++;
  }

  // Check 2: <title> tag
  if (!content.includes('<title>')) {
    console.error(`[ERROR] Missing <title> in: ${rel}`);
    errorCount++;
  }

  // Check 3: Meta description
  if (!content.includes('name="description"') && !content.includes("name='description'")) {
    console.error(`[ERROR] Missing meta description in: ${rel}`);
    errorCount++;
  }

  // Check 4: Canonical link
  if (!content.includes('rel="canonical"') && !content.includes("rel='canonical'")) {
    console.warn(`[WARN] Missing canonical link in: ${rel}`);
    warningCount++;
  }

  // Check 5: Schema.org structured data
  const schemas = content.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi);
  if (schemas) {
    console.log(`✓ ${rel} has ${schemas.length} JSON-LD schemas`);
  }
}

console.log(`\nAudit Complete: ${errorCount} Errors, ${warningCount} Warnings across ${htmlFiles.length} pages.`);
