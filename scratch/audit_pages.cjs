const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '../src/pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.astro'));

const audit = files.map(file => {
  const content = fs.readFileSync(path.join(pagesDir, file), 'utf8');
  const titleMatch = content.match(/title="([^"]+)"/);
  const descMatch = content.match(/description="([^"]+)"/);
  const canonicalMatch = content.match(/canonical="([^"]+)"/);
  const langMatch = content.match(/lang="([^"]+)"/);
  const activePathMatch = content.match(/activePath="([^"]+)"/);

  return {
    file,
    title: titleMatch ? titleMatch[1] : 'NONE',
    description: descMatch ? descMatch[1] : 'NONE',
    canonical: canonicalMatch ? canonicalMatch[1] : 'AUTO',
    lang: langMatch ? langMatch[1] : 'DEFAULT (en)',
    activePath: activePathMatch ? activePathMatch[1] : 'NONE',
    hasHindiMention: /hindi|हिंदी/i.test(content),
    hasMarathiMention: /marathi|मराठी/i.test(content),
    hasEnglishMention: /english/i.test(content)
  };
});

console.log(JSON.stringify(audit, null, 2));
