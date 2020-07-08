

function toggleScrollClass() {
    let nav = document.getElementsByClassName('nav-bread')[0];

    if (nav.getBoundingClientRect().y > 0) {
        $('.nav-bread').removeClass('fadein').addClass('fadeout')
    } else {
        $('.nav-bread').addClass('fadein').removeClass('fadeout')
    }
}

const unHide = (query, matrix, index) => {
    const cards = matrix[index]
    Object.values(document.querySelectorAll(query)).map(i => {
        if (cards.includes(parseInt(i.getAttribute('index')))) {
            if (i.tagName === 'LI'){
                i.style.display = 'list-item'

            } else {
            i.style.display = 'block'
            }
        }
    })
}