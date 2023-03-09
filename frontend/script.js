const rootElement = document.getElementById('root')
const menuElement = document.getElementById('menu')
const titleElement = document.getElementById('mainTitle')

fetch('http://127.0.0.1:9007/api/cards')
   .then((response) => response.json())
   .then((data) => displayMain(data))
   
let new_obj = {
   region: undefined,
   type: undefined,
   rarity: undefined,
};

function displayMain(data) {
   rootElement.replaceChildren();
   menuElement.replaceChildren();
   titleElement.replaceChildren();

   titleElement.insertAdjacentHTML("beforeend", " <div>Legends Of Runterra</div>")
   data.map(card => rootElement.insertAdjacentHTML('beforeend',
     `<div class="listedCardsMain" >
     Name: ${card.name}</br>
     <img src=${card.url}></img>
     Type: ${card.type.charAt(0).toUpperCase()+ card.type.slice(1)}</br>
     Rarity: ${card.rarity.charAt(0).toUpperCase()+ card.rarity.slice(1)}</br>
     Region: ${card.region.charAt(0).toUpperCase()+ card.region.slice(1)}</br>
     Cost: ${card.cost}</br>
     <button id="${card.id}">Add to Deck</button>
     </div>`))

   //Region Selector
   let region = [];

   for (let i = 0; i < data.length; i++) {
      region.push(data[i].region)
   }
   region = [...new Set(region)]

   menuElement.insertAdjacentHTML('beforeend', '<select list=\'region\' id=\'region\'></select>');
   const regionDropdown = document.getElementById('region');
   regionDropdown.insertAdjacentHTML('beforeend', '<option id=blank>Please select region</option>');

   for (let i = 0; i < region.length; i++) {
      regionDropdown.insertAdjacentHTML('beforeend', `<option id="region"> ${region[i]} </option>`);
   }

   ///Type selctor
   let type = [];

   for (let i = 0; i < data.length; i++) {
      if (data[i].type === '') {
         data[i].type = "other"
      }
      type.push(data[i].type)
   }
   type = [...new Set(type)]


   menuElement.insertAdjacentHTML('beforeend', '<select list=\'type\' id=\'type\'></select>');
   const typeDropdown = document.getElementById('type');
   typeDropdown.insertAdjacentHTML('beforeend', '<option id=blank>Please select type</option>');

   for (let i = 0; i < type.length; i++) {
      typeDropdown.insertAdjacentHTML('beforeend', `<option id="type">${type[i]}</option>`);
   }

   ///Rarity Selector
   let rarity = [];

   for (let i = 0; i < data.length; i++) {
      if (data[i].rarity === '') {
         data[i].rarity = "other"
      }
      rarity.push(data[i].rarity)
   }
   rarity = [...new Set(rarity)]

   menuElement.insertAdjacentHTML('beforeend', '<select list=\'rarity\' id=\'rarity\'></select>');
   const rarityDropdown = document.getElementById('rarity');
   rarityDropdown.insertAdjacentHTML('beforeend', '<option id=blank>Please select rarity</option>');

   for (let i = 0; i < rarity.length; i++) {
      rarityDropdown.insertAdjacentHTML('beforeend', `<option id="rarity">${rarity[i]}</option>`);
   }

   menuElement.insertAdjacentHTML("beforeend" , "<button id=nextbtn>My Deck</button>")
   menuElement.insertAdjacentHTML("beforeend" , "<button id=resetbtn>Reset</button>")
}

function displayDeck(data) {
   rootElement.replaceChildren();
   menuElement.replaceChildren();
   titleElement.replaceChildren();

   titleElement.insertAdjacentHTML("beforeend", " <div>My Deck</div>")
   titleElement.insertAdjacentHTML("afterend", `<div class="numberOfMyCards">Number Of My Cards: ${data.length}</div>`)
   data.map(card => rootElement.insertAdjacentHTML('beforeend',
      `<div class="listedCardsMain">
  Name: ${card.name}</br>
  <img src=${card.url}></img>
  Type: ${card.type.charAt(0).toUpperCase() + card.type.slice(1)}</br>
  Rarity: ${card.rarity.charAt(0).toUpperCase() + card.rarity.slice(1)}</br>
  Region: ${card.region.charAt(0).toUpperCase() + card.region.slice(1)}</br>
  Cost: ${card.cost}</br>
  <button id="${card.id}">Add</button>
  <button id="${card.name}">Delete</button>
  </div>`))

  menuElement.insertAdjacentHTML("beforeend" , "<button id=mainPagebtn>Main Page</button>")
}

function FilteringCriterias(event) {

   if (event.target.id === "type") {
      new_obj.type = event.target.value
   }

   if (event.target.id === "region") {
      new_obj.region = event.target.value
   }

   if (event.target.id === "rarity") {
      new_obj.rarity = event.target.value
   }
   console.log(new_obj);

   const url = 'http://127.0.0.1:9007/api/cards';
   fetch(url, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(new_obj),
   })
      .then((response) => response.json())
      .then((data) => displayMain(data))
}

function addDeck(event) {
   if(event.target.value != undefined) {
      fetch(`http://127.0.0.1:9007/api/cards/?addDeck=${event.target.id}`) 

   }  
   if(window.location.href === 'http://127.0.0.1:9007/cards/deck' && event.target.value != undefined) {
      location.reload();
   }
}

if (window.location.href === 'http://127.0.0.1:9007/cards/deck') {
   fetch('http://127.0.0.1:9007/api/cards/deck')
      .then((response) => response.json())
      .then((data) => displayDeck(data))
}

function resetEvent(event) {
   if(event.target.id === "resetbtn"){
      location.reload()
   }
}

function nextPageEvent(event) {
   if(event.target.id === 'nextbtn'){
      location.replace('http://127.0.0.1:9007/cards/deck')
   }
}
 
function mainPageEvent(event) {
   if(event.target.id === 'mainPagebtn'){
      location.replace('http://127.0.0.1:9007/cards')
   }
}

function deleteCard (event) {

   if (window.location.href === 'http://127.0.0.1:9007/cards/deck') {
      console.log(event.target.id)
      fetch(`http://127.0.0.1:9007/api/cards/deck/?DeleteDeck=${event.target.id}`, {
         method: 'DELETE',
      })
   }
} 

menuElement.addEventListener("click", mainPageEvent)
menuElement.addEventListener("click", nextPageEvent)
menuElement.addEventListener("click", resetEvent)
menuElement.addEventListener('change', FilteringCriterias);
rootElement.addEventListener("click", addDeck)
rootElement.addEventListener("click", deleteCard)




