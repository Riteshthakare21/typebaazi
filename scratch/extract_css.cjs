const https = require('https');
const fs = require('fs');
const path = require('path');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function main() {
  const pages = ['/', '/race', '/games', '/typing-test', '/seven-minute-typing-test', '/learn', '/daily-challenge'];
  const cssUrls = new Set();
  for (const p of pages) {
    try {
      const html = await fetchUrl('https://da491294.typebaazi.pages.dev' + p);
      const matches = html.matchAll(/href="(\/_astro\/[^"]+\.css)"/g);
      for (const m of matches) {
        cssUrls.add(m[1]);
      }
    } catch (e) {
      console.error('Error fetching page', p, e.message);
    }
  }

  console.log('Discovered CSS files:', Array.from(cssUrls));

  for (const cssPath of cssUrls) {
    const fullUrl = 'https://da491294.typebaazi.pages.dev' + cssPath;
    const content = await fetchUrl(fullUrl);
    const filename = path.basename(cssPath);
    console.log(`Fetched ${filename} (${content.length} bytes)`);
    fs.writeFileSync(path.join(__dirname, filename), content);
  }
}

main().catch(console.error);
