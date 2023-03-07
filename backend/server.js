const express = require('express')
const app = express()
const port = 9007;
const fs = require('fs');
const path = require("path");

let newData;




app.use(express.json());

const rawData = JSON.parse(fs.readFileSync('./backend/data.json', "utf8"));
const cards = rawData;

for (let index = 0; index < cards.length; index++) {
    cards[index].id = index;
    cards[index].url =`./frontend/images/${index}.png`
  }
console.log(cards)

app.get("/", (req, res) => {
    res.redirect(301, '/cards');
  })

app.get(["/cards","/cards/:id"], (req, res, next) => {
    res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
  });

app.use('/frontend', express.static('./frontend'))

app.get('/api/cards', (req,res) => {
    res.send(cards)
})












app.listen(port, _ => console.log(`http://127.0.0.1:${port}`));