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
          if (str.includes('seven-time-val') && str.includes('class SevenMinuteEngine')) {
            console.log('FOUND SevenMinuteTypingTest blob in git:', fullPath, 'length:', str.length);
            fs.writeFileSync('src/components/SevenMinuteTypingTest.astro', str.replace(/^blob \d+\0/, ''));
            console.log('Restored SevenMinuteTypingTest.astro from git blob!');
          }
          if (str.includes('class TypingArenaEngine') && str.includes('initVirtualKeyboard')) {
            console.log('FOUND TypingArena blob in git:', fullPath, 'length:', str.length);
            fs.writeFileSync('src/components/TypingArena.astro', str.replace(/^blob \d+\0/, ''));
            console.log('Restored TypingArena.astro from git blob!');
          }
        } catch (e) {}
      }
    }
  } catch (e) {}
}

scanGitObjects('.git/objects');
