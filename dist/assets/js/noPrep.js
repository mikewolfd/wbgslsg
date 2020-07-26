$(document).ready(function() {
    // for the scrolling breadcrumb nav with relevant card selections
    window.addEventListener('scroll', function() {
        toggleScrollClass()
    });
    Object.values(document.querySelectorAll('#card-section .card')).map(i => i.addEventListener('click', function() {
        highlightFunction(this)
    }))

})
const getInterventionCards = () => {
    return islGuide.filter(i => i.Context == parseInt(pageState.Context) && i.Objective == parseInt(pageState.Objective)).map(i => i.Intervention);
}

const unHide = (query) => {
    const cards = getInterventionCards()
    unhideCards(query, cards);
}

const getGuidancePrep = () => {
    const interventions = islGuide.filter(i => i.Context == parseInt(pageState.Context) && i.Objective == parseInt(pageState.Objective) && i.Intervention == parseInt(pageState.Intervention));
    return interventions[0].Guidance;
};

const pageState = {
    Context: undefined,
    Objective: undefined,
    Intervention: undefined,
    Guidance: undefined
};
let activeState = false;
let renderedPage = false;

const interResetFunction = () => {

    const cards = Object.values(document.querySelectorAll('#inter-data .card'));

    pageState.guidance = undefined;
    pageState.Intervention = undefined;
    cardMap = getInterventionCards()
    // This changes around the context cards based on the updated intervention
    cards.map(i => {
        if (!cardMap.includes(parseInt(i.getAttribute('index')))) {
            if (i.style.display === 'block') {
                i.classList.add("flipOutY");
                setTimeout(function() {
                    i.style.display = 'none'
                    i.classList.remove("flipOutY");
                }, 1000)
            }
        } else {
            if (i.style.display === 'none') {
                setTimeout(function() {
                    i.classList.add('fadeInUp');
                    i.style.display = 'block'

                    setTimeout(function() {
                        i.classList.remove("fadeInUp");
                    }, 1000)
                }, 1000)
            }
        }
    });

    cards.map(item =>
        item.classList.remove('selected')
    )

}


const highlightFunction = (e) => {
    const parent = e.parentElement;
    const index = e.getAttribute('index')
    // loops over all the cards
    Object.values(parent.children).map(item =>
        //removes hover and disables clicking
        item.classList.remove('selected')
    )
    // highlights button
    e.classList.add('selected')
    setTimeout(function() {
        if (parent.id == "inter-data") {
            // Updates the page object state
            pageState.Intervention = index

            pageState.guidance = getGuidancePrep(pageState);

            updateGuidance(pageState.guidance);

            renderedPage = true;
            // unhides the data section
            Object.values(document.getElementsByClassName('data-section')).forEach((elm) => {
                elm.classList.remove('hidden-object')
            })
            //scrolls to data section if cards aren't hidden
            const bread = document.querySelector('.breadcrumb-data')
            bread.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        } else {

            if (renderedPage) {
                document.querySelector('#card-section').scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
                setTimeout(function() {

                    Object.values(document.getElementsByClassName('data-section')).forEach((elm) => {
                        elm.classList.add('hidden-object')
                    })
                }, 300)
                renderedPage = false;
            }

            let col;
            //This is where you would modify the cards in the column
            if (parent.id == 'context-data') {
                // Updates the page object state
                pageState.Context = index
                col = document.getElementById('obj-data').parentNode.parentNode
            }

            if (parent.id == 'obj-data') {

                col = document.getElementById('inter-data').parentNode.parentNode
                // Updates the page object state
                pageState.Objective = index;
                if (!activeState) {
                    // Unhides all the cards and dropdown cards that correspond to the chosen objective
                    unHide('#inter-data .card')
                    activeState = true;
                }
            }
            if (activeState) {
                interResetFunction()
            }
            //get next column, unhide and animate it. 
            col.classList.remove('hidden-section')
            col.classList.add('fadeInLeft')
        }
    }, 700)
    // gets scrolling breadcrumb nav with relevant card selections
    let breadcrumb = document.getElementById(e.parentElement.attributes['data-target'].value)
    // Update span with selected card text
    breadcrumb.getElementsByTagName('span')[0].innerText = e.innerText
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