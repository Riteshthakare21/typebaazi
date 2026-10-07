const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\Dell\\.gemini\\antigravity-ide\\brain';

function searchBrain(dir) {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        searchBrain(fullPath);
      } else if (entry.name.endsWith('.jsonl') || entry.name.endsWith('.log') || entry.name.endsWith('.astro')) {
        const stats = fs.statSync(fullPath);
        if (stats.size > 1000) {
          // Search in file
          const content = fs.readFileSync(fullPath, 'utf8');
          if (content.includes('TypingArena.astro') && content.includes('timerDisplay')) {
            console.log('Found TypingArena in:', fullPath, 'size:', stats.size);
          }
          if (content.includes('SevenMinuteTypingTest') && content.includes('seven-time')) {
            console.log('Found SevenMinute in:', fullPath, 'size:', stats.size);
          }
        }
      }
    }
  } catch (e) {}
}

searchBrain(brainDir);
