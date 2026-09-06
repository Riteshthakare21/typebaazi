const fs = require('fs');

let sm = fs.readFileSync('src/components/SevenMinuteTypingTest.astro', 'utf8');

// Update .chips-label, .passage-select-label, .p-card-snippet
sm = sm.replace(
  '.chips-label{color:var(--text-muted,#94a3b8);align-items:center;gap:6px;font-size:12px;font-weight:800;display:flex}',
  '.chips-label{color:#ffffff;align-items:center;gap:6px;font-size:13px;font-weight:800;display:flex}'
);

sm = sm.replace(
  '.passage-select-label{color:var(--text-muted,#94a3b8);font-size:12px;font-weight:700}',
  '.passage-select-label{color:#ffffff;font-size:13px;font-weight:800;margin-bottom:2px;display:block}'
);

sm = sm.replace(
  '.p-card-snippet{color:var(--text-muted);-webkit-line-clamp:2;-webkit-box-orient:vertical;margin:0;font-size:12.5px;line-height:1.5;display:-webkit-box;overflow:hidden}',
  '.p-card-snippet{color:#e2e8f0;-webkit-line-clamp:3;-webkit-box-orient:vertical;margin:2px 0 0;font-size:13.5px;font-weight:500;line-height:1.6;display:-webkit-box;overflow:hidden}'
);

// Update light theme rules for labels and snippet
const lightThemeAdditions = `
[data-theme=light] .chips-label{color:#0f172a!important;font-weight:800!important}
[data-theme=light] .passage-select-label{color:#0f172a!important;font-weight:800!important}
[data-theme=light] .p-card-snippet{color:#1e293b!important;font-weight:600!important}
[data-theme=light] .p-card-title{color:#0f172a!important;font-weight:800!important}
`;

// Insert before closing </style>
sm = sm.replace('</style>', `${lightThemeAdditions}\n</style>`);

fs.writeFileSync('src/components/SevenMinuteTypingTest.astro', sm);
console.log('Successfully updated text colors in SevenMinuteTypingTest.astro!');
