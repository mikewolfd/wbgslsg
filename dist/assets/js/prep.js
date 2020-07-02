
    $(document).ready(function () {
        // for the scrolling breadcrumb nav with relevant card selections
        window.addEventListener('scroll', function () { toggleScrollClass() });
    })
    const prep_state = { context: undefined, objectives: undefined, interventions: undefined };

    const hide = true;

    const highlightFunction = (e) => {

        // if animated
        if (hide == true) {

            // disables button
            e.onclick = null

            // finds the difference between the position of the clicked button and the first button in it's column
            let last = e.parentElement.children[0].getBoundingClientRect();
            let first = e.getBoundingClientRect()
            const deltaX = first.left - last.left;
            const deltaY = first.top - last.top;
            let animated = false;

            // iterates over non-clicked buttons in immediate parent column
            Object.values(e.parentElement.children).filter(item => item != e).forEach(function (item) {
                // disables button
                item.onclick = null;
                // animates unclicked cards
                item.classList.add("flipOutY");
                // hides cards, and initiates the slide up animation
                setTimeout(function () {
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
            Object.values(e.parentElement.children).forEach(function (item) {
                //removes hover and disables clicking
                item.classList.remove('card-hover')
                item.onclick = null;
            })
        }

        setTimeout(function () {
            // looks to see if there are any more hidden column sections
            const hidCol = document.getElementsByClassName('hidden-section animated card-col')
            // if it's the last column
            if (hidCol.length == 0) {
                // if animated, it hides the cards
                if (hide == true) {
                    document.getElementById('card-section').classList.remove('card-section-max')
                }
                // unhides the data section
                Object.values(document.getElementsByClassName('data-section')).forEach((elm) => {
                    elm.classList.remove('hidden-object')
                })
                //scrolls to data section if cards aren't hidden
                if (hide == false) {
                    document.getElementsByClassName('breadcrumb-data')[0].scrollIntoView({ behavior: "smooth", block: "start" });
                }
                //if there are more hidden columns
            } else {
                //get next column, unhide and animate it. 
                //This is where you would modify the cards in the column
                const col = hidCol[0]
                col.classList.remove('hidden-section')
                col.classList.add('fadeInLeft')
            }
        }, 1100)

        // gets scrolling breadcrumb nav with relevant card selections
        let breadcrumb = document.getElementById(e.parentElement.attributes['data-target'].value)
        // Update span with selected card text
        breadcrumb.getElementsByTagName('span')[0].innerText = e.innerText
        let dropdown = breadcrumb.getElementsByTagName('div')[0]
        let duplicateItem = dropdown.getElementsByClassName(e.attributes['index'].value)[0].remove()

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
