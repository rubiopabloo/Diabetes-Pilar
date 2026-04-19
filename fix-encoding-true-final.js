const fs = require('fs');
const path = require('path');

const rootDir = '.';
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

const replacements = [
    { from: /í“seo/g, to: 'Óseo' },
    { from: /íšltima/g, to: 'Última' },
    { from: /í“pticas/g, to: 'Ópticas' },
    { from: /í¢â€ â€™/g, to: '→' },
    { from: /i¢â‚¬â„¢/g, to: "'" },
    { from: /i¢â€/g, to: '→' },
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;
    
    replacements.forEach(r => {
        if (r.from.test(content)) {
            content = content.replace(r.from, r.to);
            modified = true;
        }
    });

    if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Fixed encoding in ${file}`);
    }
});
