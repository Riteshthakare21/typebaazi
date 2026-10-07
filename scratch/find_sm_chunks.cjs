const fs = require('fs');

const transcriptPath = 'C:\\Users\\Dell\\.gemini\\antigravity-ide\\brain\\ffba7317-2e74-48dc-8d9d-2e59c4358d23\\.system_generated\\logs\\transcript_full.jsonl';
const content = fs.readFileSync(transcriptPath, 'utf8');

// Let's search for all SevenMinuteTypingTest.astro occurrences in transcript
const matches = content.matchAll(/"TargetFile":"[^"]*SevenMinuteTypingTest\.astro","Instruction":"([^"]*)","Description":"([^"]*)","ReplacementChunks":(\[[^\]]*\])/g);

for (const m of matches) {
  console.log('Instruction:', m[1]);
  console.log('Chunks:', m[3]);
}
