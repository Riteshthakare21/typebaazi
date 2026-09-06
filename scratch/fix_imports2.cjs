const fs = require('fs');

let sm = fs.readFileSync('src/components/SevenMinuteTypingTest.astro', 'utf8');

sm = sm.replace(
  "import { AudioEngine as n } from '../lib/audio';",
  "import { soundEngine as n } from '../lib/audio';"
);

sm = sm.replace(
  "import { splitDevanagariGraphemes as r } from '../lib/unicode';",
  "import { UnicodeHelper as r } from '../lib/unicode';"
);

fs.writeFileSync('src/components/SevenMinuteTypingTest.astro', sm);
console.log('Updated soundEngine and UnicodeHelper imports in SevenMinuteTypingTest.astro!');
