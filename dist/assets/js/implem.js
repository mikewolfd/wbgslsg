
    $(document).ready(function () {
        // for the scrolling breadcrumb nav with relevant card selections
        window.addEventListener('scroll', function () { toggleScrollClass() });
    })
    const pageState = { Context: undefined, Intervention: undefined };

    const unHide = (query, state) => {
        const interventions = islGuide.filter(i => i.Intervention == parseInt(state.Intervention));
        const cards = interventions.map(i => i.Context);
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


    // Animation settings for this page, active: true hides all the cards when done, partial leaves the selected cards viewable. 
    // If animations are disabled, scrolling nav dropdown will be disabled aswell 
    const cardAnimationSettings = { active: false, partial: false }

    // for the context button selection, happens last before data is shown
    const contextFunction = (e) => {

        // highlights button
        e.classList.add('selected');

        // get intervention index value
        const index = e.getAttribute('index');

        // Sets the pageState variable  
        pageState.Context = index;


        // get context column
        let parent = document.getElementById('context-section')

        // disables buttons, removes hover animation, hides cards if active
        Object.values(parent.getElementsByClassName('button-card')).forEach(function (item) {
            item.onclick = null;
            if (cardAnimationSettings.active == true && item != e) {
                item.classList.add("flipOutY");
            }
            item.classList.remove('card-hover');
        })

        // gets scrolling breadcrumb nav with relevant card selections
        let breadcrumb = document.getElementById(parent.attributes['data-target'].value)

        // Update span with selected card text
        breadcrumb.getElementsByTagName('span')[0].innerText = e.innerText

        // Search and remove selected card from dropdown 
        let dropdown = breadcrumb.getElementsByTagName('div')[0]
        let duplicateItem = dropdown.querySelector("li[index='" + e.getAttribute('index') + "']").remove()

        // if animation is disabled, disables the scrolling nav dropdown feature
        if (cardAnimationSettings.active == false) {
            breadcrumb.classList.add('unclickable');
            breadcrumb.getElementsByTagName('a')[0].classList.remove('dropdown-toggle');
        }

        // const interventions = islGuide.filter(i => i.Intervention == parseInt(pageState.Intervention) && i.Context == parseInt(pageState.Context)).map(i => i.Guidance)[0];
        // let enviroG = document.getElementById('envrioGuidance');
        // let aniG = document.getElementById('aniGuidance');

        // fetch("/assets/data/guidance/e/guidance_index_" + interventions +".html").then(i => i.text()).then(i => enviroG.innerHTML = i)
        // fetch('/assets/data/guidance/ah/guidance_index_' + interventions +'.html').then(i => i.text()).then(i => aniG.innerHTML = i)

        if (cardAnimationSettings.active == true) {

            setTimeout(function () {
                // This sections enables the animated hiding
                const cardSection = document.getElementById('card-section');
                if (cardAnimationSettings.partial == true) {
                    cardSection.classList.add('reduced');
                } else {
                    cardSection.classList.add('hidden-object');
                }
                // Un-hides the content section
                Object.values(document.getElementsByClassName('data-section')).forEach(function (item) {
                    item.classList.remove('hidden-object')
                })
                // scrolls down to the data section
                setTimeout(() => {
                    breadcrumb.parentElement.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 700)
            }, 700)
        } else {
            
            Object.values(document.getElementsByClassName('data-section')).forEach(function (item) {
                item.classList.remove('hidden-object')
            });
            setTimeout(() => {
                breadcrumb.parentElement.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 850)
        };
    }

    // for the intervention button selection, happens first, at the end of this is when 
    // you can modify which cards you want in the context-section

    const interventionFunction = (e) => {
        // highlights button
        e.classList.add('selected');

        // get intervention index value
        const index = e.getAttribute('index');

        // Sets the pageState variable
        pageState.Intervention = index;

        // get internvention column
        let parent = document.getElementById('intervention-section')

        //get all intervention cards
        const interventions = Object.values(parent.getElementsByClassName('button-card'))

        // gets scrolling breadcrumb nav with relevant card selections
        let breadcrumb = document.getElementById(parent.getAttribute('data-target'))

        // Update span with selected card text
        breadcrumb.getElementsByTagName('span')[0].innerText = e.innerText

        if (cardAnimationSettings.active == true) {
            // Search and remove selected card from dropdown 
            let dropdown = breadcrumb.getElementsByTagName('div')[0]
            let duplicateItem = dropdown.querySelector("li[index='" + index + "']").remove()

            // Color the dropdown text based on the column colors, it gets the id value and 
            // adds it as a class, which I have added as a css style
            breadcrumb.getElementsByTagName('a')[0].classList.add(e.closest('.parent').id)
        } else

            // if animation is disabled, disables the scrolling nav dropdown feature
            if (cardAnimationSettings.active == false) {
                breadcrumb.classList.add('unclickable');
                breadcrumb.getElementsByTagName('a')[0].classList.remove('dropdown-toggle');
            }

        // if animated
        if (cardAnimationSettings.active == true) {
            // disables button
            e.onclick = null;
            // finds the difference between the position of the clicked button and the first button in it's column
            let last = e.parentElement.children[0].getBoundingClientRect();
            let first = e.getBoundingClientRect()
            const deltaX = first.left - last.left;
            const deltaY = first.top - last.top;
            let animated = false;
            // iterates over non-clicked buttons
            interventions.filter(item => item != e).forEach(function (item) {
                // removes hover styling
                item.classList.remove('card-hover');
                // hides unclicked cards
                item.classList.add("flipOutY");
                // hides cards, and initiates the slide up animation
                setTimeout(function () {
                    item.classList.add('hidden-object')
                    if (!animated) {
                        animated = true;
                        e.animate([{
                            transformOrigin: 'bottom right',
                            transform: `
                        translate(${deltaX}px, ${deltaY}px)
                                `
                        }, {
                            transformOrigin: 'top left',
                            transform: 'none'
                        }], {
                            duration: 500,
                            easing: 'ease-in-out',
                            fill: 'both'
                        });
                    }
                }, 1000);
            });
            // Shrinks the intervention section
            parent.classList.remove('intervention-section-max');
        } else {
            // If not animated
            // loops over all the cards
            interventions.forEach(function (item) {
                //removes hover and disables clicking
                item.classList.remove('card-hover');
                item.onclick = null;
            })
        }
        // Hides the context card section
        // Here is where you could modify which cards is there
        setTimeout(function () {
            // finds context card section
            const hidCol = document.getElementById('context-section');

            // Unhides all the cards and dropdown cards that correspond to the chosen intervention

            unHide('#context-data .card, #context-header .card li', pageState);

            //unhides and animates it
            hidCol.classList.remove('hidden-object');
            hidCol.classList.add('fadeInUp');

            // if not animated, it scrolls down to the context section, as the intervention section is tall
            if (cardAnimationSettings.active == false) {
                setTimeout(() => {
                    hidCol.scrollIntoView({ behavior: "smooth", block: "end" });
                }, 250)
            }
        }, 900)
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

    // Reset Button
    const refreshFunction = () => {
        location.reload()
    };
