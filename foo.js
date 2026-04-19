const fs = require('fs');

const overrides = `
@media (min-width: 992px) {
    .footer-col.footer-contact {
        /* Ensure the Contact column content snaps to the right edge to align with the footer-bottom cookies */
        display: flex;
        flex-direction: column;
        align-items: flex-end; /* This will right align the whole block. But wait, we want the text to be aligned left but block on the right? */
        /* If we want text left aligned but block on the right: */
    }
    
    /* Actually justify-self: end on the grid item is better */
    .footer-col.footer-contact {
        justify-self: end;
        width: 100%; /* Actually if it's width 100%, justify-self doesn't do much. */
    }
}
`;

// Wait, I shouldn't just append randomly, let me see if justify-self: end works without breaking the layout. Instead of that, what if we just set the exact padding or margin? No, that's brittle.
