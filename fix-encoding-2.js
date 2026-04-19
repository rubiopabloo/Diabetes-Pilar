const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const doubleEncMap = {
    'í¢â€ â€™': '→',
    'í"': 'Ó',
    'í"': 'Ó',
    'í¿': '¿',
    'í¢â‚¬â„¢': '\'',
    'í¢â‚¬â€œ': '–',
    'í¢': 'â¢', 
};

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    
    // Quick specific fixes for the images
    content = content.replace(/í¢â‚¬â„¢/g, "'");
    content = content.replace(/í¿Quieres/g, "¿Quieres");
    content = content.replace(/í"seo/g, "Óseo");
    content = content.replace(/í¢â€ â€™/g, "→");
    content = content.replace(/í\u00A2â\u0080\u0099/g, "'");   // hex representation incase

    fs.writeFileSync(f, content, 'utf8');
});
console.log('Fixed encoding errors via script.');
