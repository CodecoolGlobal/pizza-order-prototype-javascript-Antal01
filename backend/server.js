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
    cards[index].url =`./frontend/images/${index}.png`
  }

app.get("/", (req, res) => {
    res.redirect(301, '/cards');
  })

app.get(["/cards","/cards/:id"], (req, res, next) => {
    res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
  });

app.use('/frontend', express.static('./frontend'))

app.get('/api/cards', (req,res) => {
    if( req.query.region === undefined) {
        res.send(cards)
    } else {
      if(req.query.region !== 'Please select region') {
        let filteredCards = cards.filter((card) => card.region === req.query.region)
        console.log(filteredCards)
        //console.log(req.query.region)
        res.send(filteredCards);
      }
    }
})











app.listen(port, _ => console.log(`http://127.0.0.1:${port}`));