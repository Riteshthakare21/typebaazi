const fs = require('fs');
const readline = require('readline');

async function recoverFromTranscript() {
  const logPath = 'C:\\Users\\Dell\\.gemini\\antigravity-ide\\brain\\ffba7317-2e74-48dc-8d9d-2e59c4358d23\\.system_generated\\logs\\transcript_full.jsonl';
  
  if (!fs.existsSync(logPath)) {
    console.log('Log file does not exist at', logPath);
    return;
  }

  const fileStream = fs.createReadStream(logPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let lastTypingArena = null;
  let lastSevenMinute = null;

  for await (const line of rl) {
    if (line.includes('TypingArena.astro') && line.includes('---')) {
      // Check if it has the full component
      const match = line.match(/"CodeContent":"(---.*?<\/script>)"/s);
      if (match) {
        lastTypingArena = match[1];
      }
    }
  }
}

recoverFromTranscript().catch(console.error);
