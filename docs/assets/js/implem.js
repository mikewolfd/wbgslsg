$(document).ready(function() {
    // for the scrolling breadcrumb nav with relevant card selections
    window.addEventListener('scroll', function() {
        toggleScrollClass()
    });
    Object.values(document.querySelectorAll('#intervention-section .button-card')).map(i => i.addEventListener('click', function() {
        interventionFunction(this)
    }))
    Object.values(document.querySelectorAll('#context-section .button-card')).map(i => i.addEventListener('click', function() {
        contextFunction(this)
    }))

})
const pageState = {
    Context: undefined,
    Intervention: undefined
};

let activeState = false;
let renderedPage = false;

const getCards = () => {
    const interventions = islGuide.filter(i => i.Intervention == parseInt(pageState.Intervention));
    const cards = interventions.map(i => i.Context);
    return cards
}

const unHide = (query) => {
    unhideCards(query, getCards())
}

const interResetFunction = (e) => {

    const interParent = document.getElementById('intervention-section')
    const contextParent = document.getElementById('context-section')
    const contextCards = Object.values(contextParent.getElementsByClassName('button-card'))
    const cardIndexMap = getCards();

    guidance = undefined;
    pageState.Context = undefined;

    contextCards.map(i => {
        if (!cardIndexMap.includes(parseInt(i.getAttribute('index')))) {
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

    contextParent.scrollIntoView({
        behavior: "smooth",
        block: "end"
    });

    Object.values(interParent
            .getElementsByClassName('button-card')).filter(i => e !== i)
        .forEach(function(item) {
            item.classList.remove('selected');
            item.classList.add('card-hover');
        })
    renderedPage = false;
    document.querySelector('#card-section').scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
    setTimeout(function() {

        Object.values(document.getElementsByClassName('data-section')).forEach(function(item) {
            item.classList.add('hidden-object')
        });
    }, 300)

    contextCards.forEach(function(item) {
        item.classList.add('card-hover');
        item.classList.remove('selected');
    })

}
// for the context button selection, happens last before data is shown
const contextFunction = (e) => {
    Object.values(e.parentElement.getElementsByClassName('button-card')).filter(i => e !== i).map(item => {
        item.classList.add('card-hover');
        item.classList.remove('selected');
    })

    // highlights button
    e.classList.add('selected');
    e.classList.remove('card-hover');

    // get intervention index value
    const index = e.getAttribute('index');

    // Sets the pageState variable  
    pageState.Context = parseInt(index);

    // get context column
    let parent = document.getElementById('context-section')

    // gets scrolling breadcrumb nav with relevant card selections
    let breadcrumb = document.getElementById(parent.attributes['data-target'].value)

    // Update span with selected card text
    breadcrumb.getElementsByTagName('span')[0].innerText = e.innerText

    // Search and remove selected card from dropdown 
    let dropdown = breadcrumb.getElementsByTagName('div')[0]
    guidance = islGuide.filter(i => i.Intervention == parseInt(pageState.Intervention) && i.Context == parseInt(pageState.Context)).map(i => i.Guidance)[0];

    updateGuidance(guidance);

    if (!renderedPage) {
        Object.values(document.getElementsByClassName('data-section')).forEach(function(item) {
            item.classList.remove('hidden-object')
        });
    }
    setTimeout(() => {
        breadcrumb.parentElement.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }, 850)
    renderedPage = true;

};


// for the intervention button selection, happens first, at the end of this is when 
// you can modify which cards you want in the context-section

const interventionFunction = (e) => {
    // get intervention index value
    const index = e.getAttribute('index');
    // Sets the pageState variable
    pageState.Intervention = parseInt(index);

    if (activeState) {
        interResetFunction(e)
    }
    // highlights button
    e.classList.add('selected');
    e.classList.remove('card-hover');

    // get internvention column
    let parent = document.getElementById('intervention-section')

    // gets scrolling breadcrumb nav with relevant card selections
    let breadcrumb = document.getElementById(parent.getAttribute('data-target'))

    // Update span with selected card text
    breadcrumb.getElementsByTagName('span')[0].innerText = e.innerText

    // Hides the context card section
    // Here is where you could modify which cards is there
    if (!activeState) {
        setTimeout(function() {
            // finds context card section
            const hidCol = document.getElementById('context-section');

            // Unhides all the cards and dropdown cards that correspond to the chosen intervention

            unHide('#context-data .card');

            //unhides and animates it
            hidCol.classList.remove('hidden-object');
            hidCol.classList.add('fadeInUp');

            // It scrolls down to the context section, as the intervention section is tall
            setTimeout(() => {
                hidCol.scrollIntoView({
                    behavior: "smooth",
                    block: "end"
                });
            }, 250)
        }, 900)
    }
    activeState = true;
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
                <a href="/wbgslsg/principle_${type}_${index}.html"> 
                    <img class='card-img' src="/wbgslsg/assets/images/icons/${icon}">
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
        fetch("/wbgslsg/assets/data/guidance" + '/e/guidance_index_' + guidance + ".html").then(i => {
                if (!i.ok) {
                    throw new Error("Guidance Not Found")
                } else {
                    return i.text()
                }
            })
            .then(i => enviroG.innerHTML = i).then(z =>
                fetch("/wbgslsg/assets/data/guidance" + '/ah/guidance_index_' + guidance + '.html').then(i => {
                    if (!i.ok) {
                        throw new Error("Guidance Not Found")
                    } else {
                        return i.text()
                    }
                }).then(i => aniG.innerHTML = i)).then(o => resolve('resolved'))
    })
}