const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function scanGitObjects(dir) {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanGitObjects(fullPath);
      } else {
        try {
          const buffer = fs.readFileSync(fullPath);
          const decompressed = zlib.inflateSync(buffer);
          const str = decompressed.toString('utf8');
          if (str.includes('.seven-page-wrapper') || str.includes('seven-hidden-input')) {
            console.log('FOUND SevenMinute in git:', fullPath, 'length:', str.length);
            fs.writeFileSync('src/components/SevenMinuteTypingTest.astro', str.replace(/^blob \d+\0/, ''));
          }
          if (str.includes('typing-arena-container') || str.includes('arena-footer')) {
            console.log('FOUND TypingArena in git:', fullPath, 'length:', str.length);
            fs.writeFileSync('src/components/TypingArena.astro', str.replace(/^blob \d+\0/, ''));
          }
        } catch (e) {}
      }
    }
  } catch (e) {}
}

scanGitObjects('.git/objects');
