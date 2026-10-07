const fs = require('fs');

let sm = fs.readFileSync('src/components/SevenMinuteTypingTest.astro', 'utf8');

// Replace keydown handler in SevenMinuteTypingTest.astro
const oldKeydown = 'window.addEventListener(`keydown`,e=>{if(d!==`running`)return;let t=e.target?.tagName;(t!==`INPUT`||e.target===B)&&t!==`TEXTAREA`&&t!==`SELECT`&&e.target!==B&&(e.key===`Backspace`?(e.preventDefault(),X()):e.key===`Tab`?e.preventDefault():e.key.length===1&&!e.ctrlKey&&!e.altKey&&!e.metaKey&&(e.preventDefault(),Y(e.key)))})';

const newKeydown = 'window.addEventListener(`keydown`,e=>{if(d!==`running`)return;let target=e.target;(target===B||(target?.tagName!==`INPUT`&&target?.tagName!==`TEXTAREA`&&target?.tagName!==`SELECT`))&&(e.key===`Backspace`?(e.preventDefault(),X()):e.key===`Tab`?e.preventDefault():e.key.length===1&&!e.ctrlKey&&!e.altKey&&!e.metaKey&&(e.preventDefault(),Y(e.key)))})';

sm = sm.replace(oldKeydown, newKeydown);

fs.writeFileSync('src/components/SevenMinuteTypingTest.astro', sm);
console.log('Successfully fixed keydown in SevenMinuteTypingTest.astro!');
