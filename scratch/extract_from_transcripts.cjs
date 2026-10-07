const fs = require('fs');

function extractLatest(transcriptPath) {
  const content = fs.readFileSync(transcriptPath, 'utf8');
  const lines = content.split('\n');
  
  let typingArena = null;
  let sevenMinute = null;

  for (const line of lines) {
    if (!line.trim()) continue;
    try {
      const obj = JSON.parse(line);
      if (obj.tool_calls) {
        for (const tc of obj.tool_calls) {
          if (tc.arguments && tc.arguments.TargetFile) {
            if (tc.arguments.TargetFile.endsWith('TypingArena.astro') && tc.arguments.CodeContent) {
              typingArena = tc.arguments.CodeContent;
            }
            if (tc.arguments.TargetFile.endsWith('SevenMinuteTypingTest.astro') && tc.arguments.CodeContent) {
              sevenMinute = tc.arguments.CodeContent;
            }
          }
        }
      }
    } catch (e) {}
  }
  return { typingArena, sevenMinute };
}

// Check transcript in previous conversation 21696141-fcf3-4f59-a8c5-97e746454a05
const res = extractLatest('C:\\Users\\Dell\\.gemini\\antigravity-ide\\brain\\21696141-fcf3-4f59-a8c5-97e746454a05\\.system_generated\\logs\\transcript_full.jsonl');

if (res.typingArena) {
  fs.writeFileSync('src/components/TypingArena.astro', res.typingArena);
  console.log('Restored TypingArena.astro! Length:', res.typingArena.length);
} else {
  console.log('TypingArena.astro not found in 21696141 full transcript');
}

if (res.sevenMinute) {
  fs.writeFileSync('src/components/SevenMinuteTypingTest.astro', res.sevenMinute);
  console.log('Restored SevenMinuteTypingTest.astro! Length:', res.sevenMinute.length);
} else {
  console.log('SevenMinute not found in 21696141 full transcript');
}
