const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\Dell\\.gemini\\antigravity-ide\\brain';
const sevenMinuteLines = new Map();

function cleanNumberedContent(str) {
  const fileLines = [];
  const raw = str.split('\n');
  for (const r of raw) {
    const m = r.match(/^(\d+):\s(.*)$/);
    if (m) {
      fileLines.push({ num: parseInt(m[1]), text: m[2] });
    }
  }
  return fileLines;
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    if (!content.includes('SevenMinuteTypingTest.astro')) return;
    const lines = content.split('\n');
    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const obj = JSON.parse(line);
        if (obj.content && typeof obj.content === 'string' && obj.content.includes('SevenMinuteTypingTest.astro')) {
          const parsed = cleanNumberedContent(obj.content);
          for (const item of parsed) {
            sevenMinuteLines.set(item.num, item.text);
          }
        }
      } catch (e) {}
    }
  } catch (e) {}
}

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (entry.name.endsWith('.jsonl')) {
      processFile(fullPath);
    }
  }
}

scanDir(brainDir);

console.log('Total SevenMinute lines collected across all transcripts:', sevenMinuteLines.size);
const maxLine = Math.max(...Array.from(sevenMinuteLines.keys()));
console.log('SevenMinute max line:', maxLine);

const missing = [];
const fullFile = [];
for (let l = 1; l <= maxLine; l++) {
  if (sevenMinuteLines.has(l)) {
    fullFile.push(sevenMinuteLines.get(l));
  } else {
    missing.push(l);
    fullFile.push('');
  }
}

console.log('Missing line count:', missing.length);
if (missing.length > 0) {
  console.log('Missing line numbers:', missing);
} else {
  fs.writeFileSync('src/components/SevenMinuteTypingTest.astro', fullFile.join('\n'));
  console.log('SevenMinuteTypingTest.astro completely restored!');
}
