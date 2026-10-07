const fs = require('fs');

const pageHtml = fs.readFileSync('scratch/seven_minute_page.html', 'utf8');
const css = fs.readFileSync('scratch/SevenMinuteTypingTest.7WWc2wse.css', 'utf8');
const js = fs.readFileSync('scratch/SevenMinuteTypingTest.astro_astro_type_script_index_0_lang.HvHH95b_.js', 'utf8');

// Find the exact <div class="seven-min-container glass-panel"
const startMarker = '<div class="seven-min-container glass-panel" id="seven-min-root"';
const startIdx = pageHtml.indexOf(startMarker);

// Find the end before Virtual Keyboard
const endMarker = '<!-- Virtual Keyboard -->';
const endIdx = pageHtml.indexOf(endMarker);

const markup = pageHtml.substring(startIdx, endIdx);

// Remove data-astro-cid-pbnmgesb from markup
const cleanMarkup = markup.replace(/ data-astro-cid-[a-zA-Z0-9_-]+/g, '');

const component = `---
interface Props {
  initialLang?: 'english' | 'hindi' | 'marathi';
  initialTarget?: number;
}

const { initialLang = 'english', initialTarget = 30 } = Astro.props;
---

${cleanMarkup}

<style>
${css}
</style>

<script>
${js}
</script>
`;

fs.writeFileSync('src/components/SevenMinuteTypingTest.astro', component);
console.log('Successfully written clean SevenMinuteTypingTest.astro! Length:', component.length);
