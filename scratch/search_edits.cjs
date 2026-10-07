const fs = require('fs');

// Check the surrounding lines of SevenMinuteTypingTest
const brainDir = 'C:\\Users\\Dell\\.gemini\\antigravity-ide\\brain';

function searchSnippets(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  for (const line of lines) {
    if (line.includes('SevenMinuteTypingTest.astro')) {
      if (line.includes('TargetContent') || line.includes('ReplacementContent') || line.includes('CodeContent')) {
        console.log('Found edit/write in:', filePath);
      }
    }
  }
}

// Also check all files in scratch/
searchSnippets('C:\\Users\\Dell\\.gemini\\antigravity-ide\\brain\\21696141-fcf3-4f59-a8c5-97e746454a05\\.system_generated\\logs\\transcript_full.jsonl');
searchSnippets('C:\\Users\\Dell\\.gemini\\antigravity-ide\\brain\\ffba7317-2e74-48dc-8d9d-2e59c4358d23\\.system_generated\\logs\\transcript_full.jsonl');
