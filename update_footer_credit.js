const fs = require('fs');
const path = require('path');

const directoryPath = '.';
const files = fs.readdirSync(directoryPath);

files.forEach(file => {
    if (path.extname(file).toLowerCase() === '.html') {
        const filePath = path.join(directoryPath, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Handle potential character encoding or HTML entity variations
        const find1 = 'Creado por HAze Studio&copy;';
        const find2 = 'Creado por HAze Studio©';
        const replace = 'Creado por HAze ☺';
        
        let changed = false;
        if (content.includes(find1)) {
            content = content.split(find1).join(replace);
            changed = true;
        }
        if (content.includes(find2)) {
            content = content.split(find2).join(replace);
            changed = true;
        }
        
        if (changed) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated: ${file}`);
        }
    }
});
