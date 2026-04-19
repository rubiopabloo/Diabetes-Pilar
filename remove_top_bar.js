const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Remove the entire top-bar block
    content = content.replace(/<div class="top-bar">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, function(match) {
        // the regex matches up to a closing div. Let's make it more precise.
        return '';
    });
    
    // safer replace:
    content = content.replace(/<div class="top-bar">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, '');

    fs.writeFileSync(file, content, 'utf8');
}
console.log('Top bar removed');
