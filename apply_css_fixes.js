const fs = require('fs');

const cssChanges = `
/* Overrides for recent requests */
header.glass-header.scrolled {
    background: rgba(255, 255, 255, 0.98) !important;
    backdrop-filter: blur(10px) !important;
    -webkit-backdrop-filter: blur(10px) !important;
    border-bottom: none !important;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1) !important;
}

header.glass-header:not(.scrolled) .logo-icon {
    background-image: url('assets/logoblancodiabetes.png') !important;
}

.interactive-accordion {
    gap: 8px !important;
}
.accordion-item {
    width: 60px !important; 
}
@media (max-width: 1200px) {
    .accordion-item { width: 45px !important; }
}
@media (max-width: 768px) {
    .accordion-item { width: 35px !important; }
}

.cf-tags-group {
    gap: 6px !important;
    margin-bottom: 5px !important;
}
.cf-tag-btn {
    padding: 6px 12px !important;
    font-size: 12px !important;
}
.contact-form-container {
    padding: 30px !important; 
}
.contact-submit-btn {
    padding: 12px 24px !important; 
}
`;

fs.appendFileSync('styles.css', cssChanges, 'utf8');
console.log('CSS fixes appended.');
