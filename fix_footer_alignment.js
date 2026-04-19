const fs = require('fs');

const cssOverride = `

/* Fix horizontal alignment in footer-bottom by removing default paragraph margins */
.footer-bottom p {
    margin: 0 !important;
    display: flex;
    align-items: center;
}

.footer-legal {
    display: flex;
    align-items: center;
}
`;

fs.appendFileSync('styles.css', cssOverride, 'utf8');
console.log('Footer bottom alignment fix applied');
