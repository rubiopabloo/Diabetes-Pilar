const fs = require('fs');

let css = fs.readFileSync('styles.css', 'utf8');
css = css.replace('    padding-left: 20px; /* Shift to the right to match page padding */\\r\\n', '');
css = css.replace('    padding-left: 20px; /* Shift to the right to match page padding */\n', '');
fs.writeFileSync('styles.css', css, 'utf8');

console.log('Padding fix applied to styles.css');
