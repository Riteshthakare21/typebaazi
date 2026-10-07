const fs = require('fs');

fs.copyFileSync('scratch/restored_global.css', 'src/styles/global.css');
fs.copyFileSync('scratch/restored_racing.css', 'src/styles/racing.css');
fs.copyFileSync('scratch/restored_games.css', 'src/styles/games.css');

console.log('Successfully restored global.css, racing.css, and games.css from da491294 deployment!');
