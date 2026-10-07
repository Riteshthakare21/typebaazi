const fs = require('fs');

const transcriptPath = 'C:\\Users\\Dell\\.gemini\\antigravity-ide\\brain\\21696141-fcf3-4f59-a8c5-97e746454a05\\.system_generated\\logs\\transcript_full.jsonl';
const content = fs.readFileSync(transcriptPath, 'utf8');
const lines = content.split('\n');

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

// Let's collect all lines for TypingArena
const typingArenaLines = new Map();
const sevenMinuteLines = new Map();

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (!line.trim()) continue;
  try {
    const obj = JSON.parse(line);
    if (obj.content && typeof obj.content === 'string') {
      if (obj.content.includes('File Path: `file:///d:/typebaazi/src/components/TypingArena.astro`')) {
        const parsed = cleanNumberedContent(obj.content);
        for (const item of parsed) {
          typingArenaLines.set(item.num, item.text);
        }
      }
      if (obj.content.includes('File Path: `file:///d:/typebaazi/src/components/SevenMinuteTypingTest.astro`')) {
        const parsed = cleanNumberedContent(obj.content);
        for (const item of parsed) {
          sevenMinuteLines.set(item.num, item.text);
        }
      }
    }
  } catch (e) {}
}

console.log('TypingArena collected lines:', typingArenaLines.size);
console.log('SevenMinute collected lines:', sevenMinuteLines.size);

if (typingArenaLines.size > 1000) {
  const maxLine = Math.max(...Array.from(typingArenaLines.keys()));
  console.log('TypingArena max line:', maxLine);
  const fullFile = [];
  let missing = [];
  for (let l = 1; l <= maxLine; l++) {
    if (typingArenaLines.has(l)) {
      fullFile.push(typingArenaLines.get(l));
    } else {
      missing.push(l);
      fullFile.push('');
    }
  }
  console.log('TypingArena missing lines:', missing);
  if (missing.length === 0) {
    fs.writeFileSync('src/components/TypingArena.astro', fullFile.join('\n'));
    console.log('Restored TypingArena.astro successfully!');
  }
}

if (sevenMinuteLines.size > 1000) {
  const maxLine = Math.max(...Array.from(sevenMinuteLines.keys()));
  console.log('SevenMinute max line:', maxLine);
  const fullFile = [];
  let missing = [];
  for (let l = 1; l <= maxLine; l++) {
    if (sevenMinuteLines.has(l)) {
      fullFile.push(sevenMinuteLines.get(l));
    } else {
      missing.push(l);
      fullFile.push('');
    }
  }
  console.log('SevenMinute missing lines:', missing);
  if (missing.length === 0) {
    fs.writeFileSync('src/components/SevenMinuteTypingTest.astro', fullFile.join('\n'));
    console.log('Restored SevenMinuteTypingTest.astro successfully!');
  }
}
