import os
import re

combined_footer = """
    <!-- Desktop Footer -->
    <footer class="footer-desktop">
        <div class="container">
            <div class="footer-main">
                <div class="footer-col footer-brand">
                    <div class="logo">
                        <div class="logo-icon"></div>
                    </div>
                    <p style="margin-top:20px; font-size:15px; max-width:320px; opacity:0.8;">Centro especializado de referencia en el tratamiento integral de la diabetes. Excelencia m&eacute;dica y calidez humana al servicio de tu bienestar.</p>
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
                <div class="footer-col footer-contact" style="padding-top:10px;">
                    <h4 style="color:#4FC3F7; font-size:16px;">CONTACTO</h4>
                    <p><i data-lucide="map-pin" style="color:#4FC3F7; width:18px;"></i> V&iacute;ctor Vergani 575, Pilar<br>Italia 1184 Piso 2, San Miguel</p>
                    <p><i data-lucide="phone" style="color:#4FC3F7; width:18px;"></i> 11 2166-1818 | 11 2470-6777</p>
                    <p><i data-lucide="mail" style="color:#4FC3F7; width:18px;"></i> pilardiabetes@gmail.com</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 Centro M&eacute;dico Diabetes Pilar. Excelencia en Cuidado Diabetol&oacute;gico - Creado por HAze &#9786;</p>
                <div class="footer-legal">
                    <a href="index.html#faq">Preguntas Frecuentes</a>
                    <a href="terminos.html">Aviso Legal</a>
                    <a href="privacidad.html">Privacidad</a>
                    <a href="#">Cookies</a>
                </div>
            </div>
        </div>
    </footer>

    <!-- Mobile Footer (Minimal) -->
    <footer class="footer-minimal">
        <div class="container">
            <div class="footer-minimal-top">
                <div class="footer-minimal-contact">
                    <p><i data-lucide="map-pin"></i> V&iacute;ctor Vergani 575, Pilar &nbsp;|&nbsp; Italia 1184 Piso 2, San Miguel</p>
                    <p><i data-lucide="phone"></i> 11 2166-1818 &nbsp;|&nbsp; 11 2470-6777 &nbsp;&nbsp; <i data-lucide="mail"></i> pilardiabetes@gmail.com</p>
                </div>
            </div>
            <div class="footer-minimal-bottom">
                <span>&copy; 2026 Diabetes Pilar &mdash; Creado por HAze &#9786;</span>
                <div class="footer-minimal-links">
                    <a href="index.html#faq">Preguntas Frecuentes</a>
                    <a href="terminos.html">Aviso Legal</a>
                    <a href="privacidad.html">Privacidad</a>
                    <a href="#">Cookies</a>
                </div>
            </div>
        </div>
    </footer>
"""

for root, dirs, files in os.walk('.'):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            # Pattern for original footer (which doesn't have class="footer-desktop" yet)
            pattern_original = r'(?s)(?:\s*<!-- Footer -->\s*)?<footer>\s*<div class="container">\s*<div class="footer-main">.*?</footer>'
            
            # Pattern for minimal footer only (in case it's like index.html)
            pattern_minimal = r'(?s)(?:\s*<!-- Footer -->\s*)?<footer class="footer-minimal">.*?</footer>'

            new_content = content
            if re.search(pattern_original, content):
                new_content = re.sub(pattern_original, combined_footer, content)
                print(f"Updated (from original): {file}")
            elif re.search(pattern_minimal, content):
                new_content = re.sub(pattern_minimal, combined_footer, content)
                print(f"Updated (from minimal): {file}")
            else:
                print(f"NO MATCH: {file}")

            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
