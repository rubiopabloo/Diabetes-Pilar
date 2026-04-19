const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const footerPattern = /<footer>[\s\S]*?<\/footer>/;
const newFooter = `<footer>
        <div class="container">
            <div class="footer-main">
                <div class="footer-col footer-brand">
                    <div class="logo">
                        <div class="logo-icon"></div>
                        <h1 style="color: white; margin-bottom: 5px;">Centro M&eacute;dico<br><span style="color: var(--primary-color);">Diabetes Pilar</span></h1>
                    </div>
                    <p style="margin-top:20px; font-size:15px; max-width:320px; opacity:0.8;">Centro especializado de referencia en el tratamiento integral de la diabetes. Excelencia médica y calidez humana al servicio de tu bienestar.</p>
                    <div class="footer-social-icons">
                        <a href="#" class="footer-social-circle"><i data-lucide="globe" style="width: 18px;"></i></a>
                        <a href="#" class="footer-social-circle"><i data-lucide="share-2" style="width: 18px;"></i></a>
                    </div>
                </div>
                <div class="footer-col" style="padding-top:10px;">
                    <h4 style="color:#4FC3F7; font-size:16px;">NAVEGACI&Oacute;N</h4>
                    <ul>
                        <li><a href="index.html">Inicio</a></li>
                        <li><a href="sobre-nosotros.html">Sobre Nosotros</a></li>
                        <li><a href="diabetologos.html">Diabet&oacute;logos</a></li>
                        <li><a href="diagnostico-por-imagenes.html">Im&aacute;genes</a></li>
                    </ul>
                </div>
                <div class="footer-col" style="padding-top:10px;">
                    <h4 style="color:#4FC3F7; font-size:16px;">NUESTROS SERVICIOS</h4>
                    <ul>
                        <li><a href="diabetologia.html">Diabetolog&iacute;a</a></li>
                        <li><a href="index.html#servicios">Nutrici&oacute;n</a></li>
                        <li><a href="index.html#servicios">Pie Diab&eacute;tico</a></li>
                        <li><a href="index.html#servicios">Laboratorio</a></li>
                        <li><a href="index.html#servicios">Oftalmolog&iacute;a</a></li>
                        <li><a href="index.html#servicios">Ginecolog&iacute;a</a></li>
                        <li><a href="index.html#servicios">Gastroenterolog&iacute;a</a></li>
                    </ul>
                </div>
                <div class="footer-col footer-contact" style="padding-top:10px;">
                    <h4 style="color:#4FC3F7; font-size:16px;">CONTACTO</h4>
                    <p><i data-lucide="map-pin" style="color:#4FC3F7; width:18px;"></i> Pilar Centro, Calle Rivadavia 123<br>Provincia de Buenos Aires</p>
                    <p><i data-lucide="phone" style="color:#4FC3F7; width:18px;"></i> +54 11 4444-5555</p>
                    <p><i data-lucide="mail" style="color:#4FC3F7; width:18px;"></i> info@diabetespilar.com.ar</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 Centro Médico Diabetes Pilar. Excelencia en Cuidado Diabetológico.</p>
                <div class="footer-legal">
                    <a href="index.html#faq">Preguntas Frecuentes</a>
                    <a href="terminos.html">Aviso Legal</a>
                    <a href="privacidad.html">Privacidad</a>
                    <a href="#">Cookies</a>
                </div>
            </div>
        </div>
    </footer>`;

const newActionsPattern = /<div class="header-actions">[\s\S]*?<\/div>/;
const newActions = `<div class="header-actions">
                <a href="#" class="nav-icon-btn nav-icon-dark"><i data-lucide="shopping-cart"></i></a>
                <a href="#" class="nav-icon-btn nav-icon-dark"><i data-lucide="user"></i></a>
                <a href="diabetologos.html" class="btn-consulta-virtual">Consulta Virtual</a>
            </div>`;

for (const file of files) {
    let html = fs.readFileSync(file, 'utf8');
    
    // Replace footer
    if (footerPattern.test(html)) {
        html = html.replace(footerPattern, newFooter);
    }
    
    // Replace actions
    if (newActionsPattern.test(html)) {
        html = html.replace(newActionsPattern, newActions);
    }
    
    // index.html specific:
    if (file === 'index.html') {
        html = html.replace('<header class="solid-header">', '<header class="glass-header">');
        html = html.replace('</head>', '<style>header.glass-header { top: 40px; } header.glass-header.scrolled { top: 0; } .top-bar { position: absolute; z-index: 1001; width: 100%; background: transparent; border-bottom: 1px solid rgba(255,255,255,0.1); }</style>\n</head>');
    }
    
    // sobre-nosotros.html specific:
    if (file === 'sobre-nosotros.html') {
        // Find the history picture, which probably uses multiple ones. Let's just blindly replace the known image
        html = html.replace('assets/hero-sobre-nosotros.jpg', 'assets/contacto.png'); 
        // Wait, "la foto de nuestra historia en la subpagina de sobre nosotros debe ser la foto llamada contacto".
    }

    fs.writeFileSync(file, html, 'utf8');
    console.log('Updated', file);
}
