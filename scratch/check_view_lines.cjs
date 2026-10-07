const fs = require('fs');

const transcriptPath = 'C:\\Users\\Dell\\.gemini\\antigravity-ide\\brain\\21696141-fcf3-4f59-a8c5-97e746454a05\\.system_generated\\logs\\transcript_full.jsonl';
const content = fs.readFileSync(transcriptPath, 'utf8');
const lines = content.split('\n');

for (let i = lines.length - 1; i >= 0; i--) {
  const line = lines[i];
  if (line.includes('TypingArena.astro') && line.includes('File Path:')) {
    const obj = JSON.parse(line);
    console.log('Line', i, 'snippet:', obj.content.substring(0, 150));
  }
}
