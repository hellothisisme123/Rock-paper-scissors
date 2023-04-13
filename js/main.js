let chosen
const items = [...document.querySelectorAll('.item')]
const shoot = document.querySelector('.shootBtn')
const itemsWrapper = document.querySelector('.itemsWrapper')

items.forEach(item => {
    item.children[0].addEventListener('click', (e) => {
        chosen = item.dataset.type
        items.forEach(x => x.classList.remove('chosen'))
        item.classList.add('chosen')

        console.log(chosen)
    })
})

shoot.addEventListener('click', (e) => {
    if (!chosen) {
        alert('must select an option for rock, paper, or scissors')
        return
    }
    const randSelection = Math.floor(Math.random() * 3)
    console.log(randSelection);

    // let currentTypes = [...items].filter(x => x != chosen && x != items[randSelection])
    // console.log(currentTypes)

    let chosenItem = items.filter(x => {
        if (x.dataset.type == chosen) return x
    })[0]
    console.log(chosenItem)

    let unchosenItems = items.filter(x => {
        if (x.dataset.type != chosen) return x
    })
    
    unchosenItems.forEach(item => {
        item.style.top = '-100%'
    })
    console.log(unchosenItems)

    let battleItem = document.createElement('div')
    battleItem.classList.add('item')
    itemsWrapper.appendChild(battleItem)
    console.log(battleItem)

    let battleItemImg = document.createElement('img')
    if (randSelection == 0) {
        battleItemImg.src = './production/svg/Rock.svg'
    } else if (randSelection == 1) {
        battleItemImg.src = './production/svg/Paper.svg'
        
    } else if (randSelection == 2) {
        battleItemImg.src = './production/svg/Scissors.svg'
    }
    battleItem.style.left = '150%'
    battleItem.appendChild(battleItemImg)
    setTimeout(() => {
        battleItem.style.left = '75%'
        setTimeout(() => {
            
        }, 250);
    }, 250);
    


    if (chosen == 0 && randSelection == 0) {
        // tie
        // rock ties

    } else if (chosen == 0 && randSelection == 1) {
        // they win
        // paper beats rock

    } else if (chosen == 0 && randSelection == 2) {
        // you win
        // rock beats scissors

    } else if (chosen == 1 && randSelection == 0) {
        // you win
        // paper beats rock

    } else if (chosen == 1 && randSelection == 1) {
        // tie
        // paper ties

    } else if (chosen == 1 && randSelection == 2) {
        // they win
        // scissors beats paper

    } else if (chosen == 2 && randSelection == 0) {
        // they win
        // rock beats scissors

    } else if (chosen == 2 && randSelection == 1) {
        // you win
        // scissors beats paper

    } else if (chosen == 2 && randSelection == 2) {
        // tie
        // scissors ties

    }
})
