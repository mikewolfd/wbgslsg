
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

     const updateTabs = (guidance) => {
                const enviroG = document.getElementById('envrioGuidance');
                const aniG = document.getElementById('aniGuidance');
                return new Promise(resolve => {
                fetch("/assets/data/guidance/e/guidance_index_" + guidance +".html").then(i => i.text()).then(i => enviroG.innerHTML = i).then(z => 
                fetch('/assets/data/guidance/ah/guidance_index_' + guidance +'.html').then(i => i.text()).then(i => aniG.innerHTML = i)).then(o => resolve('resolved'))
                })
    }
