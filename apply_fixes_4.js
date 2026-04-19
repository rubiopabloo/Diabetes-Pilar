const fs = require('fs');

let css = fs.readFileSync('styles.css', 'utf8');

// Fix UL padding in footer
css = css.replace('.footer-col ul {\\r\\n    list-style: none;\\r\\n}', '.footer-col ul {\\n    list-style: none;\\n    padding: 0;\\n    margin: 0;\\n}');

// Backup replace in case of line endings difference
if (!css.includes('padding: 0;')) {
    css = css.replace('.footer-col ul {\n    list-style: none;\n}', '.footer-col ul {\n    list-style: none;\n    padding: 0;\n    margin: 0;\n}');
}

fs.writeFileSync('styles.css', css, 'utf8');
console.log('Padding for UL fixed.');
