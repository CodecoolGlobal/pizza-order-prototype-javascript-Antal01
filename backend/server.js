const express = require('express')
const app = express()
const port = 9007;
const fs = require('fs');
const path = require("path");

app.use(express.json());

const rawData = JSON.parse(fs.readFileSync('./backend/data.json', "utf8"));
const cards = rawData;

let myDeck=[];

for (let index = 0; index < cards.length; index++) {
    cards[index].id = index;
    cards[index].url = `../frontend/images/${index}.png`
}

app.get("/", (req, res) => {
  res.redirect(301, '/cards');
})

app.get("/cards", (req, res, next) => {
    res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
});

app.use('/frontend', express.static('./frontend'))

app.get('/api/cards', (req, res) => {
    let incomingCard = req.query;
    for (let i = 0; i < cards.length; i++) {
      if(cards[i].id === Number(incomingCard.addDeck)){
        myDeck.push(cards[i])
      }
    }
    // fs.writeFileSync("deck.json", JSON.stringify({name: "my awesome deck", cards: []}))
    // JSON.parse(fs.readFileSync("deck.json"))
    //console.log(myDeck)
    res.send(cards)
})

app.post('/api/cards', (req, res) => {
  let criteriObj = req.body;
  let filteredCards = [];
  
  filteredCards = cards.filter(function(item) {
    for (const key in criteriObj) {
      if (item[key] === undefined || item[key] != criteriObj[key]) {
        return false;
      }
    }
    return true;
  })
  res.send(filteredCards)
})

app.get("/cards/deck", (req, res, next) => {
  res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
});

app.get('/api/cards/deck' , (req, res) => {
  res.send(myDeck)
})

app.delete('/api/cards/deck', (req, res) => {
let deleteData = req.query;

  for(let i = 0;  i < myDeck.length; i++) {
      if(myDeck[i].name === deleteData.DeleteDeck) {
         myDeck.splice(i,1)
          break;
      }
  }
  res.send(myDeck)
})


app.listen(port, _ => console.log(`http://127.0.0.1:${port}`));