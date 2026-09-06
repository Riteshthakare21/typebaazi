const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '../dist');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const htmlFiles = walk(distDir);

console.log(`Found ${htmlFiles.length} generated HTML files in dist.`);

const auditResults = [];

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const relPath = path.relative(distDir, file).replace(/\\/g, '/');

  const titleMatch = content.match(/<title>([^<]+)<\/title>/);
  const descMatch = content.match(/<meta\s+name="description"\s+content="([^"]+)"/);
  const canonicalMatch = content.match(/<link\s+rel="canonical"\s+href="([^"]+)"/);
  const schemaMatches = content.match(/<script type="application\/ld\+json">/g) || [];

  // Check for any legacy "English & Marathi" or "English and Marathi" that lacks Hindi
  const outdatedMatches = [];
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (/(?:English\s*&\s*Marathi|English\s+and\s+Marathi|English,\s*Marathi)(?!\s*,\s*Hindi|\s*and\s*Hindi|\s*&\s*Hindi)/i.test(line)) {
      if (!/hindi/i.test(line)) {
        outdatedMatches.push(`Line ${idx + 1}: ${line.trim().slice(0, 100)}`);
      }
    }
  });

  auditResults.push({
    file: relPath,
    title: titleMatch ? titleMatch[1] : 'MISSING',
    descLength: descMatch ? descMatch[1].length : 0,
    canonical: canonicalMatch ? canonicalMatch[1] : 'MISSING',
    schemaCount: schemaMatches.length,
    outdatedPhrases: outdatedMatches
  });
});

console.log(JSON.stringify(auditResults, null, 2));
