const rootElement = document.getElementById('root')

fetch('http://127.0.0.1:9007/api/cards')
.then((response) => response.json())
.then((data) => display(data))


function display(data) {
    data.map(card => rootElement.insertAdjacentHTML('beforeend',
     `<div>
     Name: ${card.name}
     Type: ${card.type}
     Rarity: ${card.rarity}
     Region: ${card.region}
     Cost: ${card.cost}
     </div>`))
}
    