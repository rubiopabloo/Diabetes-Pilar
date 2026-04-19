const fs = require('fs');

// 1. Update all HTML files for the footer copyright and logo
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const oldCopyright = '&copy; 2024 Centro Médico Diabetes Pilar. Excelencia en Cuidado Diabetológico.';
const newCopyright = '&copy; 2026 Centro Médico Diabetes Pilar. Excelencia en Cuidado Diabetológico - Creado por HAze Studio&copy;';

for (const file of files) {
    let html = fs.readFileSync(file, 'utf8');
    
    // Update copyright
    if (html.includes(oldCopyright)) {
        html = html.replace(oldCopyright, newCopyright);
    }
    
    // If it's footer logo, check if we need to change it
    // Wait, the main glass-header logo is handled in CSS. Is there a footer logo?
    // User says: "FOOTER: Tenes que cambiar el logo por el logo blanco"
    // The footer logo has `<div class="logo-icon"></div>` which uses `.logo-icon` CSS (logo-transparent.png).
    // I can just inline logic or update CSS. I will update CSS to use logoblancodiabetes.png globally for footer.
    
    fs.writeFileSync(file, html, 'utf8');
}

// 2. Fix noticias.html "leer nota completa"
let noticias = fs.readFileSync('noticias.html', 'utf8');
// remove the <a> blocks for btn-more
noticias = noticias.replace(/<a href="#" class="btn-more"[^>]*>Leer nota completa[\s\S]*?<\/a>/g, '');
fs.writeFileSync('noticias.html', noticias, 'utf8');

console.log('HTML fixes applied!');
