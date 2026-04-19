const fs = require('fs');

const cssOverride = `

/* Aligns the contact column EXACTLY with the right edge of the cookies link */
@media (min-width: 992px) {
    .footer-col.footer-contact {
        /* This pushes the entire contact block to the absolute right side of its 1.5fr grid constraint */
        justify-self: end;
        /* Keep text left-aligned inside the block */
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
}
`;

fs.appendFileSync('styles.css', cssOverride, 'utf8');
console.log('Grid align fix applied');
