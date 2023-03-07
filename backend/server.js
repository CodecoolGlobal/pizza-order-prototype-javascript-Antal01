const express = require('express')
const app = express()
const port = 9007;
const fs = require('fs');
const path = require("path");

app.use(express.json());

const rawData = JSON.parse(fs.readFileSync('./backend/data.json', "utf8"));
const cards = rawData;

for (let index = 0; index < cards.length; index++) {
    cards[index].id = index;
    cards[index].url = `../frontend/images/${index}.png`
}
//console.log(cards)

app.get("/", (req, res) => {
    res.redirect(301, '/cards');
})

app.get(["/cards", "/cards/:id"], (req, res, next) => {
    res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
});

app.use('/frontend', express.static('./frontend'))

app.get('/api/cards', (req, res) => {
    res.send(cards)
})

app.post('/api/cards', (req, res) => {
    let criteriObj = req.body;
    let filteredCards = [];

    /*for (let i = 0; i < cards.length; i++) {
        if (cards[i].region === criteriObj.region) {
            filteredCards.push(cards[i])
        } 
    }
    for(let j = 0; j < filteredCards.length; j++) {
      if(filteredCards[j].type === criteriObj.type) {
        filteredCards.push(filteredCards[j])
      } 
    }
    for(let k = 0; k < filteredCards.length; k++) {
      if(filteredCards[k].rarity === criteriObj.rarity) {
        filteredCards.push(filteredCards[k])
      }
    }*/
    //for( let i = 0; i < )
    

    console.log(criteriObj)
    res.send(filteredCards)
})










app.listen(port, _ => console.log(`http://127.0.0.1:${port}`));