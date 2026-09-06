const fs = require('fs');

const css = fs.readFileSync('scratch/SevenMinuteTypingTest.7WWc2wse.css', 'utf8');
const js = fs.readFileSync('scratch/SevenMinuteTypingTest.astro_astro_type_script_index_0_lang.HvHH95b_.js', 'utf8');

// Let's create SevenMinuteTypingTest.astro
// Frontmatter:
const frontmatter = `---
import VirtualKeyboard from './VirtualKeyboard.astro';

interface Props {
  initialLang?: 'english' | 'hindi' | 'marathi';
  initialTarget?: number;
}

const { initialLang = 'english', initialTarget = 30 } = Astro.props;
---
`;

// In seven_minute_page.html, let's extract the HTML markup of SevenMinute
const pageHtml = fs.readFileSync('scratch/seven_minute_page.html', 'utf8');
const markupStart = pageHtml.indexOf('<div class="seven-page-wrapper');
const markupEnd = pageHtml.indexOf('<!-- Educational & Exam Guidelines Section -->');
const templateMarkup = pageHtml.substring(markupStart, markupEnd);

// Let's build the full SevenMinuteTypingTest.astro
const fullComponent = `${frontmatter}
${templateMarkup}

<style>
${css}
</style>

<script>
${js}
</script>
`;

fs.writeFileSync('src/components/SevenMinuteTypingTest.astro', fullComponent);
console.log('Successfully created SevenMinuteTypingTest.astro! Length:', fullComponent.length);
