const https = require('https');
const fs = require('fs');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let loc = res.headers.location;
        if (loc.startsWith('/')) {
          loc = 'https://da491294.typebaazi.pages.dev' + loc;
        }
        return fetchUrl(loc).then(resolve, reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function main() {
  const html = await fetchUrl('https://da491294.typebaazi.pages.dev/seven-minute-typing-test/');
  fs.writeFileSync('scratch/seven_minute_page.html', html);
  console.log('Fetched seven-minute HTML:', html.length, 'bytes');

  const matches = html.matchAll(/src="(\/_astro\/[^"]+\.js)"/g);
  for (const m of matches) {
    const jsUrl = 'https://da491294.typebaazi.pages.dev' + m[1];
    const js = await fetchUrl(jsUrl);
    console.log('Fetched', m[1], js.length, 'bytes');
    fs.writeFileSync('scratch/' + m[1].replace('/_astro/', ''), js);
  }
}

main().catch(console.error);
