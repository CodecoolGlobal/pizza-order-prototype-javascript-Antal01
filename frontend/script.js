const rootElement = document.getElementById('root')

fetch('http://127.0.0.1:9007/api/cards')
.then((response) => response.json())
.then((data) => display(data))



function display(data) {
    for(let i = 0; i < data.length; i++) {
        rootElement.insertAdjacentHTML('beforeend', `<div>${data[i].name}</div>`)
    }
}