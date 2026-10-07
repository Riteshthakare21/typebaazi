const fs = require('fs');
const path = require('path');

const transcripts = [
  'C:\\Users\\Dell\\.gemini\\antigravity-ide\\brain\\21696141-fcf3-4f59-a8c5-97e746454a05\\.system_generated\\logs\\transcript_full.jsonl',
  'C:\\Users\\Dell\\.gemini\\antigravity-ide\\brain\\ffba7317-2e74-48dc-8d9d-2e59c4358d23\\.system_generated\\logs\\transcript_full.jsonl'
];

for (const tPath of transcripts) {
  if (!fs.existsSync(tPath)) continue;
  const content = fs.readFileSync(tPath, 'utf8');
  console.log('Searching in', tPath, 'size:', content.length);

  // Search for lines where TypingArena.astro is viewed or modified
  const lines = content.split('\n');
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i];
    if (line.includes('TypingArena.astro')) {
      // Find output with file content
      const idx = line.indexOf('File Path: `file:///d:/typebaazi/src/components/TypingArena.astro`');
      if (idx !== -1) {
        console.log('Found view_file output for TypingArena in line', i);
      }
    }
  }
}
