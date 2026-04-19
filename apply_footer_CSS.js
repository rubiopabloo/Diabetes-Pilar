const fs = require('fs');

const overrides = `
/* Overrides for Footer Adjustments */
footer {
    padding: 100px 40px 0px !important; /* more padding top and lateral inside the footer block itself, 0 bottom because footer-bottom will handle it */
}
@media (min-width: 992px) {
    footer {
        padding: 100px 80px 0px !important; /* Even more lateral padding on desktop */
    }
}

.footer-main {
    gap: 100px !important; /* More gap between columns */
    margin-bottom: 80px !important; /* More space below columns */
}

.footer-col h4 {
    margin-bottom: 40px !important; /* More space between titles and items */
}

.footer-bottom {
    padding: 35px 0 !important; /* More height/padding for the copyright bar */
    border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
}
`;

fs.appendFileSync('styles.css', overrides, 'utf8');
console.log('Footer CSS overrides appended.');
