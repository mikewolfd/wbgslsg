
var elements = document.querySelectorAll('.sticky');
Stickyfill.add(elements);

function toggleScrollClass() {
    let nav = document.getElementsByClassName('nav-bread')[0];

    if (nav.getBoundingClientRect().y > 0) {
        $('.nav-bread').removeClass('fadein').addClass('fadeout')
    } else {
        $('.nav-bread').addClass('fadein').removeClass('fadeout')
    }
}