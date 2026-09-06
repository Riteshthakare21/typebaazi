const fs = require('fs');

const transcriptPath = 'C:\\Users\\Dell\\.gemini\\antigravity-ide\\brain\\21696141-fcf3-4f59-a8c5-97e746454a05\\.system_generated\\logs\\transcript_full.jsonl';
const content = fs.readFileSync(transcriptPath, 'utf8');
const lines = content.split('\n');

function parseViewFileOutput(outputStr) {
  const linePattern = /^\d+:\s*(.*)$/;
  const result = [];
  const rawLines = outputStr.split('\n');
  for (const rawLine of rawLines) {
    const match = rawLine.match(linePattern);
    if (match) {
      result.push(match[1]);
    }
  }
  return result.join('\n');
}

// Search for the full view of TypingArena.astro (1 to 800 and 801 to end)
let typingArenaPart1 = null;
let typingArenaPart2 = null;
let sevenMinutePart1 = null;
let sevenMinutePart2 = null;
let sevenMinutePart3 = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (!line.trim()) continue;
  try {
    const obj = JSON.parse(line);
    if (obj.content && typeof obj.content === 'string') {
      if (obj.content.includes('File Path: `file:///d:/typebaazi/src/components/TypingArena.astro`')) {
        if (obj.content.includes('Showing lines 1 to 800')) {
          typingArenaPart1 = parseViewFileOutput(obj.content);
        } else if (obj.content.includes('Showing lines 801 to')) {
          typingArenaPart2 = parseViewFileOutput(obj.content);
        }
      }
      if (obj.content.includes('File Path: `file:///d:/typebaazi/src/components/SevenMinuteTypingTest.astro`')) {
        if (obj.content.includes('Showing lines 1 to 800')) {
          sevenMinutePart1 = parseViewFileOutput(obj.content);
        } else if (obj.content.includes('Showing lines 801 to 1600')) {
          sevenMinutePart2 = parseViewFileOutput(obj.content);
        } else if (obj.content.includes('Showing lines 1601 to')) {
          sevenMinutePart3 = parseViewFileOutput(obj.content);
        }
      }
    }
  } catch (e) {}
}

console.log('TypingArena Part 1 found:', !!typingArenaPart1);
console.log('TypingArena Part 2 found:', !!typingArenaPart2);
console.log('SevenMinute Part 1 found:', !!sevenMinutePart1);
console.log('SevenMinute Part 2 found:', !!sevenMinutePart2);
console.log('SevenMinute Part 3 found:', !!sevenMinutePart3);

if (typingArenaPart1 && typingArenaPart2) {
  fs.writeFileSync('src/components/TypingArena.astro', typingArenaPart1 + '\n' + typingArenaPart2);
  console.log('Successfully reconstructed TypingArena.astro!');
}

if (sevenMinutePart1 && sevenMinutePart2) {
  const smContent = sevenMinutePart1 + '\n' + sevenMinutePart2 + (sevenMinutePart3 ? '\n' + sevenMinutePart3 : '');
  fs.writeFileSync('src/components/SevenMinuteTypingTest.astro', smContent);
  console.log('Successfully reconstructed SevenMinuteTypingTest.astro!');
}
