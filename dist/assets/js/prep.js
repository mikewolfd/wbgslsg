$(document).ready(function() {
    // for the scrolling breadcrumb nav with relevant card selections
    window.addEventListener('scroll', function() {
        toggleScrollClass()
    });
})
const unHide = (query, state) => {
    const interventions = islGuide.filter(i => i.Context == parseInt(state.Context) && i.Objective == parseInt(state.Objective));
    const cards = interventions.map(i => i.Intervention);
    unhideCards(query, cards);

}

const getGuidancePrep = (state) => {
    const interventions = islGuide.filter(i => i.Context == parseInt(state.Context) && i.Objective == parseInt(state.Objective) && i.Intervention == parseInt(state.Intervention));
    const cards = interventions.map(i => i.Guidance);
    return cards[0]
};

const pageState = {
    Context: undefined,
    Objective: undefined,
    Intervention: undefined
};

const hide = Boolean(true);

const highlightFunction = (e) => {
    const parent = e.parentElement;
    // disables button
    e.onclick = null;

    // if animated
    if (hide === true) {
        // finds the difference between the position of the clicked button and the first button in it's column
        let zeroCard = [...parent.children].filter(i => i.style.display != 'none')[0];
        let last = zeroCard.getBoundingClientRect();
        let first = e.getBoundingClientRect()
        const deltaX = first.left - last.left;
        const deltaY = first.top - last.top;
        let animated = false;

        // iterates over non-clicked buttons in immediate parent column
        Object.values(parent.children).filter(item => item != e).forEach(function(item) {
            // disables button
            item.onclick = null;
            // animates unclicked cards
            item.classList.add("flipOutY");
            // hides cards, and initiates the slide up animation
            setTimeout(function() {
                item.classList.add('hidden-object')
                if (!animated) {
                    e.animate([{
                        transformOrigin: 'bottom right',
                        transform: `
                        translate(${deltaX}px, ${deltaY}px)
                                `
                    }, {
                        transformOrigin: 'top left',
                        transform: 'none'
                    }], {
                        duration: 300,
                        easing: 'ease-in-out',
                        fill: 'both'
                    });
                }
            }, 1000);
        });
        // If not animated
    } else {
        // highlights button
        e.classList.add('selected')
        // loops over all the cards
        Object.values(parent.children).forEach(function(item) {
            //removes hover and disables clicking
            item.classList.remove('card-hover')
            item.onclick = null;
        })
    }

    setTimeout(function() {
        // looks to see if there are any more hidden column sections
        const hidCol = document.getElementsByClassName('hidden-section animated card-col')
        // if it's the last column
        if (hidCol.length == 0) {
            // Updates the page object state
            pageState.Intervention = e.getAttribute('index')

            guidance = getGuidancePrep(pageState);

            updateGuidance(guidance);

            // if animated, it hides the cards
            if (hide == true) {
                document.getElementById('card-section').classList.remove('card-section-max')
            }
            // unhides the data section
            Object.values(document.getElementsByClassName('data-section')).forEach((elm) => {
                elm.classList.remove('hidden-object')
            })
            setTimeout(function() {
                toggleScrollClass()
            }, 1800)
            //scrolls to data section if cards aren't hidden
            if (hide == false) {
                const bread = document.querySelector('.breadcrumb-data')
                bread.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
            //if there are more hidden columns
        } else {
            //This is where you would modify the cards in the column
            const index = e.getAttribute('index')

            if (parent.id == 'context-data') {
                // Updates the page object state
                pageState.Context = e.getAttribute('index')

            } else
            if (parent.id == 'obj-data') {
                // Updates the page object state
                pageState.Objective = index;
                // Unhides all the cards and dropdown cards that correspond to the chosen objective
                unHide('#inter-data .card, #inter-header .card li', pageState, index)
            }

            //get next column, unhide and animate it. 
            const col = hidCol[0]
            col.classList.remove('hidden-section')
            col.classList.add('fadeInLeft')
        }
    }, 1100)

    // gets scrolling breadcrumb nav with relevant card selections
    let breadcrumb = document.getElementById(e.parentElement.attributes['data-target'].value)
    // Update span with selected card text
    breadcrumb.getElementsByTagName('span')[0].innerText = e.innerText
    if (hide == false) {
        breadcrumb.classList.add('unclickable');
        breadcrumb.querySelector('.dropdown-toggle').classList.remove('dropdown-toggle');
    } else {
        let dropdown = breadcrumb.getElementsByTagName('div')[0]
        // Remove duplicate selection in dropdown list
        let duplicateItem = dropdown.querySelector("li[index='" + e.getAttribute('index') + "']").remove()
    }
}

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

let guidance;
// This is run when the final guidanceID is chosen, 
// waits for the markdown to be updated, 
// and then updates the icons.
const updateGuidance = async (guidanceID) => {
    await updateTabs(guidanceID);
    swapPrincp('#envrioGuidance');
}

// Unhides cards / list-items as needed
const unhideCards = (query, cards) => {
    Object.values(document.querySelectorAll(query)).map(i => {
        if (cards.includes(parseInt(i.getAttribute('index')))) {
            if (i.tagName === 'LI') {
                i.style.display = 'list-item'

            } else {
                i.style.display = 'block'
            }
        }
    })
}

$(document).ready(function() {
    //Changes the principle icons on each tab press
    $('a[data-toggle="tab"]').on('show.bs.tab', function(e) {
        swapPrincp(e.target.getAttribute('href'))
    })
});

// this is kinda a hack, searched the contents of the page using a regex for "P1."
// format principle text, and returns unique principles. 
// You could do a database lookup here or something
const swapPrincp = (initPage) => {
    const page = document.querySelector(initPage);
    const type = page.id.charAt(0)
    let re = new RegExp('[P][0-7]\.', 'g')
    const principles = page.innerHTML.match(re).map(i => parseInt(i.replace('.', '').replace('P', '')))
    const uniquePrinc = new Set(principles);
    iconSwap([...uniquePrinc], type)

}

// Actually swaps the icons with the respective url/type from iconMatrix in /assets/data/map.js
const iconSwap = (principles = [], type) => {
    $('[data-toggle="tooltip"]').tooltip('dispose')
    const princSection = document.getElementById('rel-princp')
    princSection.classList.add('hide');
    setTimeout(function() {
        princSection.innerHTML = ""
        const icons = iconMatrix.filter(i => principles.includes(i.Principle) && i.Type == type)
        icons.map(i =>
            document.getElementById('rel-princp').innerHTML += cardIcon(i.Icon, i.Type, i.Principle)
        )
        princSection.classList.remove('hide');
        $('[data-toggle="tooltip"]').tooltip()
    }, 300);
}

// The icon template
const cardIcon = (icon, type, index) => {
    return `<div class='card' data-toggle="tooltip" data-placement="top" title="Principle ${index}">
                <a href="/principle_${type}_${index}.html"> 
                    <img class='card-img' src="/assets/images/icons/${icon}">
                    </a>
                    </div>`
}

// Reset Button
const refreshFunction = () => {
    location.reload()
};

const addReport = () => {
    console.log(guidance);
}

const updateTabs = (guidance) => {
    const enviroG = document.getElementById('envrioGuidance');
    const aniG = document.getElementById('aniGuidance');
    return new Promise(resolve => {
        fetch("/assets/data/guidance" + '/e/guidance_index_' + guidance + ".html").then(i => {
                if (!i.ok) {
                    throw new Error("Guidance Not Found")
                } else {
                    return i.text()
                }
            })
            .then(i => enviroG.innerHTML = i).then(z =>
                fetch("/assets/data/guidance" + '/ah/guidance_index_' + guidance + '.html').then(i => {
                    if (!i.ok) {
                        throw new Error("Guidance Not Found")
                    } else {
                        return i.text()
                    }
                }).then(i => aniG.innerHTML = i)).then(o => resolve('resolved'))
    })
}