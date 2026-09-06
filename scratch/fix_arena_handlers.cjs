const fs = require('fs');

// 1. Update TypingArena.astro
let ta = fs.readFileSync('src/components/TypingArena.astro', 'utf8');

// Ensure activeCleanupFns is defined at top of script
ta = ta.replace(
  `  let currentMode = 'timed';\n  let engine: TypingEngine | null = null;`,
  `  let currentMode = 'timed';\n  let engine: TypingEngine | null = null;\n  let activeCleanupFns: Array<() => void> = [];`
);

// Fix onKeyDown in TypingArena.astro
ta = ta.replace(
  `      if (e.target === hiddenInput || (e.target as HTMLElement)?.tagName === 'INPUT' || (e.target as HTMLElement)?.tagName === 'SELECT' || (e.target as HTMLElement)?.tagName === 'TEXTAREA') {\n        return;\n      }`,
  `      const target = e.target as HTMLElement;\n      if (target && target !== hiddenInput && (target.tagName === 'INPUT' || target.tagName === 'SELECT' || target.tagName === 'TEXTAREA')) {\n        return;\n      }`
);

fs.writeFileSync('src/components/TypingArena.astro', ta);
console.log('Successfully updated TypingArena.astro!');
