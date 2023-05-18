const startScreen = document.querySelector('.startScreen')
const startButton = document.querySelector('.startButton')
startButton.addEventListener('click', startGame)
function startGame() {
    let chosen
    let myItem
    const items = [...document.querySelectorAll('.item')]
    const shoot = document.querySelector('.shootBtn')
    const itemsWrapper = document.querySelector('.itemsWrapper')
    let shootWorks = true

    let windowWidth = document.documentElement.clientWidth
    console.log(windowWidth)
    let left
    let center
    let right
    if (windowWidth < 850) {
        left = '20%'  
        center = '50%'
        right = '80%'
        console.log(left)
    } else if (windowWidth < 1100) {
        left = '18%'  
        center = '50%'
        right = '82%' 
    } else {
        left = '25%'
        center = '50%'
        right = '75%'
    }


    window.addEventListener('resize', e => {
        windowWidth = document.documentElement.clientWidth
        if (windowWidth < 850) {
            left = '20%'  
            center = '50%'
            right = '80%'
            console.log(left)
        } else if (windowWidth < 1100) {
            left = '18%'  
            center = '50%'
            right = '82%' 
        } else {
            left = '25%'
            center = '50%'
            right = '75%'
        }
    })

    startScreen.classList.add('slideOut')

    setTimeout(() => {
        const titleItems = [...document.querySelectorAll('.title > *')]
        titleItems.forEach((item, i) => {
            item.classList.add(`title-${i + 1}`)
        })

        items.forEach((item, i) => {
            item.classList.add('activate')
        })
    }, 250);


    let score = {
        'select': {
            'you': document.querySelector('.you.score'),
            'them': document.querySelector('.them.score')
        },
        'values': {
            'you': 0,
            'them': 0
        }
    }
    score.select.you.innerHTML = score.values.you
    score.select.them.innerHTML = score.values.them

    items.forEach(item => {
        item.children[0].addEventListener('click', (e) => {
            chosen = item.dataset.type
            items.forEach(x => {
                x.classList.remove('chosen')
                x.animate({filter: 'drop-shadow(0 0 0 #000f) drop-shadow(0 0 0 #0005) drop-shadow(0 0 5px #0007)'},{duration: 1, fill: 'forwards'})
            })
            item.classList.add('chosen')
            item.animate({filter: 'drop-shadow(0 0 5px #000f) drop-shadow(-15px -15px 5px #0005)'},{duration: 1, fill: 'forwards'})
            myItem = item
        })
    })

    let battleItem
    shoot.addEventListener('click', (e) => {
        if (!shootWorks) return
        shootWorks = false
        if (!chosen) {
            alert('must select an option for rock, paper, or scissors')
            return
        }
        const randSelection = Math.floor(Math.random() * 3)

        let chosenItem = items.filter(x => {
            if (x.dataset.type == chosen) return x
        })[0]

        let unchosenItems = items.filter(x => {
            if (x.dataset.type != chosen) return x
        })
        
        unchosenItems.forEach(item => {
            item.style.top = '-100%'
        })

        battleItem = document.createElement('div')
        battleItem.classList.add('item')
        itemsWrapper.appendChild(battleItem)

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
            battleItem.style.left = right
            myItem.animate({left: left}, {duration: 400, fill: 'forwards', ease: 'cubic-bezier(0.075, 0.82, 0.165, 1)'})

            setTimeout(() => {
                // animates the items towards each other
                myItem.animate({left: right}, {duration: 750, fill: 'forwards', easing: 'cubic-bezier(.71,-0.46,.5,1)'})
                
                battleItem.animate({left: left}, {duration: 750, fill: 'forwards', easing: 'cubic-bezier(.71,-0.46,.5,1)'})
                setTimeout(() => {
                    if (chosen == 0 && randSelection == 0) {
                        // console.log("tie rock ties")
                        incrementPoints(0)
                
                    } else if (chosen == 0 && randSelection == 1) {
                        // console.log("they win paper beats rock")
                        incrementPoints(-1)
                
                    } else if (chosen == 0 && randSelection == 2) {
                        // console.log("you win rock beats scissors")
                        incrementPoints(1)
                
                    } else if (chosen == 1 && randSelection == 0) {
                        // console.log("you win paper beats rock")
                        incrementPoints(1)
                
                    } else if (chosen == 1 && randSelection == 1) {
                        // console.log("tie paper ties")
                        incrementPoints(0)
                
                    } else if (chosen == 1 && randSelection == 2) {
                        // console.log("they win scissors beats paper")
                        incrementPoints(-1)
                
                    } else if (chosen == 2 && randSelection == 0) {
                        // console.log("they win rock beats scissors")
                        incrementPoints(-1)
                
                    } else if (chosen == 2 && randSelection == 1) {
                        // console.log("you win scissors beats paper")
                        incrementPoints(1)
                
                    } else if (chosen == 2 && randSelection == 2) {
                        // console.log("tie scissors ties")
                        incrementPoints(0)
                
                    }
                }, 0.5 * 750);
            }, 400);
        }, 250);
    })

    // increments the points and adds a little green +1 thing to the side that gains a point
    const incrementPoints = (event) => {
        // -1 = lose
        // 0 = tie 
        // 1 = win
        const youIncrement = document.querySelector('.pointIncrement.you')
        const themIncrement = document.querySelector('.pointIncrement.them')

        // defines youWin to be changed according to whether the use won or lost for the winscreen
        let youWin = document.querySelector('.youWin')

        // animates the items according to which one won
        let select
        if (event == -1) { // lose
            score.values.them++
            select = themIncrement

            youWin.innerHTML = 'You Lose!'
            
            myItem.animate(
                {scale: 0, filter: 'brightness(0.15)'}, {duration: 750 * 0.5, fill: 'forwards'})
        } else if (event == 0) { // tie
            youWin.innerHTML = 'You Tied!'

            myItem.animate(
                {scale: 0, filter: 'brightness(0.15)'}, {duration: 750 * 0.5, fill: 'forwards'})
            
            battleItem.animate(
                {scale: 0, filter: 'brightness(0.15)'}, {duration: 750 * 0.5, fill: 'forwards'})
        } else if (event == 1) { // win
            score.values.you++
            select = youIncrement

            youWin.innerHTML = 'You Win!'

            battleItem.animate(
                {scale: 0, filter: 'brightness(0.15)'}, {duration: 750 * 0.5, fill: 'forwards'})
        } else {
            console.error('incrementPoints() parameter must be integer between -1 and 1')
        }

        const winScreenYouScore = document.querySelector('.score > .you')
        const winScreenThemScore = document.querySelector('.score > .them')
        winScreenYouScore.innerHTML = score.values.you
        winScreenThemScore.innerHTML = score.values.them

        if (select) {
            select.animate(
                {translate: '0 -100%', opacity: '0'}, {duration: 1000})
        }



        const winScreen = document.querySelector('.winScreen')
        setTimeout(() => {
            winScreen.classList.add('active')
        }, 750 * 0.5 + 250);

        score.select.you.innerHTML = score.values.you
        score.select.them.innerHTML = score.values.them
    }

    const againBtn = document.querySelector('.winButtonWrapper > .again')
    const restartBtn = document.querySelector('.winButtonWrapper > .restart')
    const quitBtn = document.querySelector('.winButtonWrapper > .quit')

    againBtn.addEventListener('click', (e) => {
        battleItem.animate({top: '-100%'}, {duration: 250, fill: 'forwards', ease: 'cubic-bezier(0.075, 0.82, 0.165, 1)'})
        setTimeout(() => {
            battleItem.remove()
        }, 250);
        chosen = undefined
        const winScreen = document.querySelector('.winScreen')
        winScreen.classList.remove('active')
        setTimeout(() => {
            items.forEach(item => {
                item.animate({scale: 1, filter: 'brightness(1) drop-shadow(0 0 5px #0007)'}, {duration: 400, fill: 'forwards'})
            })

            setTimeout(() => {
                console.log(left)
                items[0].animate({left: left}, {duration: 400, fill: 'forwards'})
                console.log(left)
                items[1].animate({left: center}, {duration: 400, fill: 'forwards'})
                console.log(left)
                items[2].animate({left: right}, {duration: 400, fill: 'forwards'})
                setTimeout(() => {
                    items.forEach(item => {
                        item.style.top = center
                        item.classList.remove('chosen')
                    })
                    shootWorks = true
                }, 400);
            }, 400);
        }, 400);
    })

    restartBtn.addEventListener('click', (e) => {
        location.reload()
    })

    quitBtn.addEventListener('click', (e) => {
        const sweepScreen = document.querySelector('.sweepScreen')
        // sweepScreen.classList.add('sweep')
        console.log(left)
        sweepScreen.animate({left: '0%'}, {duration: 450})
        
        setTimeout(() => {
            window.close()
        }, 450);
    })


}