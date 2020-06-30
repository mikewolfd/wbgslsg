

function toggleScrollClass() {
    let nav = document.getElementsByClassName('nav-bread')[0];

    if (nav.getBoundingClientRect().y > 0) {
        $('.nav-bread .breadcrumb').removeClass('fadein').addClass('fadeout')
    } else {
        $('.nav-bread .breadcrumb').addClass('fadein').removeClass('fadeout')
    }
}