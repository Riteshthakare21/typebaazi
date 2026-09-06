const fs = require('fs');

let sm = fs.readFileSync('src/components/SevenMinuteTypingTest.astro', 'utf8');

// Replace the bundled imports at the beginning of <script>
const bundledImportRegex = /<script>\s*import\{[^}]*\}from"\.\/storage\.[^"]*";import\{[^}]*\}from"\.\/certificateGenerator\.[^"]*";import\{[^}]*\}from"\.\/audio\.[^"]*";import\{[^}]*\}from"\.\/unicode\.[^"]*";/s;

const sourceImports = `<script>
import { StorageManager as e } from '../lib/storage';
import { generateTypingCertificate as t } from '../lib/certificateGenerator';
import { AudioEngine as n } from '../lib/audio';
import { splitDevanagariGraphemes as r } from '../lib/unicode';`;

sm = sm.replace(bundledImportRegex, sourceImports);

fs.writeFileSync('src/components/SevenMinuteTypingTest.astro', sm);
console.log('Fixed imports in SevenMinuteTypingTest.astro!');
