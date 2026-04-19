const fs = require('fs');

// 1. Hide top-bar globally via CSS
// 2. Adjust contact form to be wider (left margins inside the form)
// 3. Fix accordion widths

const cssUpdates = `
/* Hide Top Bar Completely */
.top-bar {
    display: none !important;
}

/* Contact Form Width Adjustment */
.contact-hero .container {
    max-width: 1200px !important; /* Make sure the container is wide enough */
}
.contact-grid {
    grid-template-columns: 1fr 1.5fr !important; /* Give more horizontal space to the form */
    align-items: flex-start !important;
}
.contact-form-container {
    width: 100% !important;
    max-width: 100% !important;
}
.cf-tags-group {
    display: flex !important;
    gap: 8px !important;
}

/* Fix Accordion Widths to accommodate 9 items */
.interactive-accordion {
    gap: 6px !important;
}
.accordion-item {
    width: 40px !important; /* Shrink inactive items */
}
@media (max-width: 1200px) {
    .accordion-item { width: 35px !important; }
}
@media (max-width: 768px) {
    .accordion-item { width: 30px !important; }
}
`;

fs.appendFileSync('styles.css', cssUpdates, 'utf8');

// Also fix index.html to include the missing 3 services
let indexHtml = fs.readFileSync('index.html', 'utf8');

const targetToReplace = `                            <!-- Pie Diabético -->
                            <div class="accordion-item" data-service="piediabetico" onclick="handleServiceClick('piediabetico', this)">
                                <img src="assets/piediabetico.jpg" alt="Pie Diabético" loading="lazy">
                                <div class="accordion-overlay"></div>
                                <span class="accordion-caption">Pie Diabético</span>
                                <div class="accordion-expand-content">
                                    <button class="btn-saber-mas">Saber más <i data-lucide="arrow-right"></i></button>
                                </div>
                            </div>
                        </div>`;

const newServicesHtml = `                            <!-- Pie Diabético -->
                            <div class="accordion-item" data-service="piediabetico" onclick="handleServiceClick('piediabetico', this)">
                                <img src="assets/piediabetico.jpg" alt="Pie Diabético" loading="lazy">
                                <div class="accordion-overlay"></div>
                                <span class="accordion-caption">Pie Diabético</span>
                                <div class="accordion-expand-content">
                                    <button class="btn-saber-mas">Saber más <i data-lucide="arrow-right"></i></button>
                                </div>
                            </div>

                            <!-- Oftalmología -->
                            <div class="accordion-item" data-service="oftalmologia" onclick="handleServiceClick('oftalmologia', this)">
                                <img src="assets/diagnosticoporimagenes.jpg" alt="Oftalmología" loading="lazy">
                                <div class="accordion-overlay"></div>
                                <span class="accordion-caption">Oftalmología</span>
                                <div class="accordion-expand-content">
                                    <button class="btn-saber-mas">Saber más <i data-lucide="arrow-right"></i></button>
                                </div>
                            </div>

                            <!-- Ginecología -->
                            <div class="accordion-item" data-service="ginecologia" onclick="handleServiceClick('ginecologia', this)">
                                <img src="assets/diagnosticoporimagenes.jpg" alt="Ginecología" loading="lazy">
                                <div class="accordion-overlay"></div>
                                <span class="accordion-caption">Ginecología</span>
                                <div class="accordion-expand-content">
                                    <button class="btn-saber-mas">Saber más <i data-lucide="arrow-right"></i></button>
                                </div>
                            </div>

                            <!-- Gastroenterología -->
                            <div class="accordion-item" data-service="gastroenterologia" onclick="handleServiceClick('gastroenterologia', this)">
                                <img src="assets/diagnosticoporimagenes.jpg" alt="Gastroenterología" loading="lazy">
                                <div class="accordion-overlay"></div>
                                <span class="accordion-caption">Gastro</span>
                                <div class="accordion-expand-content">
                                    <button class="btn-saber-mas">Saber más <i data-lucide="arrow-right"></i></button>
                                </div>
                            </div>
                        </div>`;

if(indexHtml.includes("Oftalmología") && indexHtml.includes("Ginecología") && indexHtml.includes("Gastro")) {
    console.log("Services already exist in index.html, skipping HTML injection.");
} else {
    // Normalizing whitespace slightly for replace
    const rawLines = indexHtml.split('\\n');
    
    // Instead of regex, let's inject right before `                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </section>`
    const anchor = '                            </div>\\r\\n                        </div>\\r\\n                    </div>\\r\\n                </div>\\r\\n            </div>\\r\\n        </section>';
    // Wait, safer to just replace by capturing the Pie Diabetico block using substrings
    
    let pieIndex = indexHtml.indexOf('<!-- Pie Diabético -->');
    if(pieIndex !== -1) {
        let closingDivsIndex = indexHtml.indexOf('</div>', pieIndex + 300); // end of pie diabetico
        let insertionPoint = indexHtml.indexOf('</div>', closingDivsIndex + 6) + 6; // the </div> that closes accordion-item
        
        let newContent = `

                            <!-- Oftalmología -->
                            <div class="accordion-item" data-service="oftalmologia" onclick="handleServiceClick('oftalmologia', this)">
                                <img src="assets/diagnosticoporimagenes.jpg" alt="Oftalmología" loading="lazy">
                                <div class="accordion-overlay"></div>
                                <span class="accordion-caption">Oftalmología</span>
                                <div class="accordion-expand-content">
                                    <button class="btn-saber-mas">Saber más <i data-lucide="arrow-right"></i></button>
                                </div>
                            </div>

                            <!-- Ginecología -->
                            <div class="accordion-item" data-service="ginecologia" onclick="handleServiceClick('ginecologia', this)">
                                <img src="assets/diagnosticoporimagenes.jpg" alt="Ginecología" loading="lazy">
                                <div class="accordion-overlay"></div>
                                <span class="accordion-caption">Ginecología</span>
                                <div class="accordion-expand-content">
                                    <button class="btn-saber-mas">Saber más <i data-lucide="arrow-right"></i></button>
                                </div>
                            </div>

                            <!-- Gastroenterología -->
                            <div class="accordion-item" data-service="gastroenterologia" onclick="handleServiceClick('gastroenterologia', this)">
                                <img src="assets/diagnosticoporimagenes.jpg" alt="Gastroenterología" loading="lazy">
                                <div class="accordion-overlay"></div>
                                <span class="accordion-caption">Gastro</span>
                                <div class="accordion-expand-content">
                                    <button class="btn-saber-mas">Saber más <i data-lucide="arrow-right"></i></button>
                                </div>
                            </div>`;
        indexHtml = indexHtml.slice(0, insertionPoint) + newContent + indexHtml.slice(insertionPoint);
        fs.writeFileSync('index.html', indexHtml, 'utf8');
        console.log("Services successfully injected.");
    } else {
        console.log("Could not find Pie Diabetico anchor.");
    }
}
