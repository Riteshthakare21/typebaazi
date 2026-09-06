const fs = require('fs');

let sm = fs.readFileSync('src/components/SevenMinuteTypingTest.astro', 'utf8');

sm = sm.replace(
  "import { generateTypingCertificate as t } from '../lib/certificateGenerator';",
  "import { downloadGrandPrixCertificatePdf as t } from '../lib/certificateGenerator';"
);

fs.writeFileSync('src/components/SevenMinuteTypingTest.astro', sm);
console.log('Updated certificate generator import in SevenMinuteTypingTest.astro!');
