let chosen
const items = document.querySelectorAll('.item')

items.forEach(item => {
    item.children[0].addEventListener('click', (e) => {
        chosen = item
        items.forEach(x => x.classList.remove('chosen'))
        item.classList.add('chosen')
    })
})