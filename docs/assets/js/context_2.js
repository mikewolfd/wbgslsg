let switchNavMenuItem = () => {
    let current = location.pathname.split('/').pop();
    if (current === "") return;
    let menuItems = document.querySelectorAll('.sidenavr ul li a');
    for (let menuItem of menuItems) {
        if (location.pathname.includes(menuItem.getAttribute("href").split('/').pop())) {
            menuItem.className = "active";
        }
    }
}
$(document).ready(() => {
    switchNavMenuItem()
})

$(document).ready(() => {
    /* always keep at least 1 open by preventing the current to close itself */
    $('[data-toggle="collapse"]').on('click', function(e) {
        if (true === JSON.parse(e.currentTarget.getAttribute('aria-expanded'))) {
            e.stopPropagation();
        }
    })
});