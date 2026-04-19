const fs = require('fs');
const path = require('path');

const rootDir = '.';
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

const mapping = [
    { target: /í"seo/g, replacement: 'Óseo' },
    { target: /í\u00A2â\u0080\u0099/g, replacement: "'" },
    { target: /í¢â‚¬â„¢/g, replacement: "'" },
    { target: /i¢â€â€™/g, replacement: '→' },
    { target: /í¢â€ â€™/g, replacement: '→' },
    { target: /í\u00A2â\u0080\u00A0â\u0080\u0099/g, replacement: '→' }, // Complex variant
    { target: /í\u00A2â\u0080\u00A0/g, replacement: '→' },
    { target: /í\u00A2/g, replacement: '→' }, // Risky but often 'í¢' is the start of a broken arrow
    { target: /í\?/g, replacement: '¿' },
    { target: /í¿/g, replacement: '¿' },
    { target: /í\u00A2â\u0080\u009D/g, replacement: '—' },
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // Hard replacements for strings seen in images
    content = content.replace(/í¢â€ â€™/g, '→');
    content = content.replace(/í"seo/g, 'Óseo');
    content = content.replace(/Ver más i¢â€â€™™/g, 'Ver más →');
    content = content.replace(/Ver más i¢â€/g, 'Ver más →');
    content = content.replace(/i¢â€â€™™/g, '→');

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Fixed encoding in ${file}`);
    }
});
