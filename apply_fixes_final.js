const fs = require('fs');

let css = fs.readFileSync('styles.css', 'utf8');

// 1. Remove the bad padding-left from footer-main
css = css.replace(/padding-left:\s*20px;\s*\/\*\s*Shift to the right to match page padding\s*\*\//g, '');

// 2. Fix accordion-item !important rules at the end.
// First, find and replace the bad rule in `.accordion-item` that we added recently.
// It's `width: 60px !important;` and `width: 40px !important;` and so on, which ruins `.active`.
// We should replace `.accordion-item {` followed by `width: ... !important;` 
// with `.accordion-item:not(.active) {` 

// It's safer to just rewrite the block we know we added.
// We added this recently:
/*
.accordion-item {
    width: 60px !important; 
}
@media (max-width: 1200px) {
    .accordion-item { width: 45px !important; }
}
@media (max-width: 768px) {
    .accordion-item { width: 35px !important; }
}
*/
// And also this:
/*
.accordion-item {
    width: 40px !important; \/\* Shrink inactive items \*\/
}
@media (max-width: 1200px) {
    .accordion-item { width: 35px !important; }
}
@media (max-width: 768px) {
    .accordion-item { width: 30px !important; }
}
*/

// Let's just string replace them.
css = css.replace(/\.accordion-item\s*\{\s*width:\s*\d+px\s*!important;.*?\}\s*/gs, function(match, offset, string) {
    return match.replace('.accordion-item', '.accordion-item:not(.active)');
});

fs.writeFileSync('styles.css', css, 'utf8');
console.log('Final fixes applied successfully.');
