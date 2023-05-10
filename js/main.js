const ball = document.querySelector('.ball')
const tringleText = document.querySelector('.tringleText')
const questionInput = document.querySelector('.questionInput')
const ballContainer = document.querySelector('.ballContainer')

setTimeout(() => {
    ball.classList.remove('onStart')

    
    ball.addEventListener('mouseover', (e) => {
        ball.classList.add('shake')
    })

    ball.addEventListener('mouseleave', (e) => {
        ball.classList.remove('shake')
    })

    const answerQuestion = () => {
        const answers = [
            'It is certain',
            'It is decidedly so',
            'Without a doubt',
            'Yes definitely',
            'You may rely on it',
            'As I see it, yes',
            'Most likely',
            'Outlook good',
            'Yes',
            'Signs point to yes',
            'Reply hazy, try again',
            'Ask again later',
            'Better not tell you now',
            'Cannot predict now',
            'Concentrate and ask again',
            'Don\'t count on it',
            'My reply is no',
            'My sources say no',
            'Outlook not so good',
            'Very doubtful'
        ]
        
        // determines if the ball has the active class or not and converts it to a boolean
        let ballActive = Boolean([...ball.classList].filter(x => x == 'active')[0])

        if (ballActive) {
            ball.classList.remove('active')
            return
        } else if (!ballActive) {
            ball.classList.add('active')
        }
        console.log(ballActive)
        
        const answer = answers[Math.floor(Math.random() * answers.length)]

        tringleText.innerHTML = answer

        
        console.log(answer)
    }

    let canTap = true
    ball.addEventListener('click', (e) => {
        let ballActive = Boolean([...ball.classList].filter(x => x == 'active')[0])

        if (ballActive) {
            setTimeout(() => {
                canTap = true
            }, 1500);
        } else if (!ballActive) {
            canTap = true
        } 
        
        // activates the switch
        if (canTap) answerQuestion()
        if (ballActive) canTap = false
    })

    questionInput.addEventListener('keypress', (e) => {
        if (e.key != 'Enter') return
        if (e.repeat) return
        answerQuestion() 
    })

    window.addEventListener('mousemove', e => {
        const windowWidth = document.body.clientWidth
        const windowHeight = document.body.clientHeight
        const mouseXperc = (e.clientX / windowWidth * 1.5) - 0.5
        const mouseYperc = (e.clientY / windowHeight * 1.5) - 0.5
        
        ballContainer.animate({
            left: `${mouseXperc}%`,
            top: `${mouseYperc}%`
        }, {
            duration: 800,
            fill: 'forwards'
        })
    })
    
}, 3000);

