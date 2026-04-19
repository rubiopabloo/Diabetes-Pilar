const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// I will fix the missing closing div for Pie Diabetico
// Let's replace the EXACT block

const badBlock = `                            <!-- Pie Diabético -->
                            <div class="accordion-item" data-service="piediabetico" onclick="handleServiceClick('piediabetico', this)">
                                <img src="assets/piediabetico.jpg" alt="Pie Diabético" loading="lazy">
                                <div class="accordion-overlay"></div>
                                <span class="accordion-caption">Pie Diabético</span>
                                <div class="accordion-expand-content">
                                    <button class="btn-saber-mas">Saber más <i data-lucide="arrow-right"></i></button>
                                </div>

                            <!-- Oftalmología -->`;

const goodBlock = `                            <!-- Pie Diabético -->
                            <div class="accordion-item" data-service="piediabetico" onclick="handleServiceClick('piediabetico', this)">
                                <img src="assets/piediabetico.jpg" alt="Pie Diabético" loading="lazy">
                                <div class="accordion-overlay"></div>
                                <span class="accordion-caption">Pie Diabético</span>
                                <div class="accordion-expand-content">
                                    <button class="btn-saber-mas">Saber más <i data-lucide="arrow-right"></i></button>
                                </div>
                            </div>

                            <!-- Oftalmología -->`;

// Wait, the line endings might be \r\n, let's use regex to be safe.
html = html.replace(/(<div class="accordion-expand-content">\s*<button class="btn-saber-mas">Saber m(?:á|\&aacute\;|)s <i data-lucide="arrow-right"><\/i><\/button>\s*<\/div>\s*)(<!-- Oftalmolog(?:í|\&iacute\;|)a -->)/g, '$1</div>\n\n                            $2');

fs.writeFileSync('index.html', html, 'utf8');
console.log('HTML fix applied.');
