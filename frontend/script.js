const rootElement = document.getElementById('root')
const menuElement= document.getElementById('menu')

fetch('http://127.0.0.1:9007/api/cards')
.then((response) => response.json())
.then((data) => display(data))


function display(data) {

    data.map(card => rootElement.insertAdjacentHTML('beforeend',
     `<div>
     Id:${card.id}
     Name: ${card.name}
     Type: ${card.type}
     Rarity: ${card.rarity}
     Region: ${card.region}
     Cost: ${card.cost}
     <img src=${card.url}></img>
     </div>`))
//Region Selector
let regions=[];
     for (let i = 0; i < data.length; i++) {
        regions.push(data[i].region)
        
     }
     regions=[...new Set(regions)]
     console.log(regions)
    
        
     menuElement.insertAdjacentHTML('beforeend', '<select list=\'regions\' id=\'regions\'></select>');
     const regionDropdown = document.getElementById('regions');
     regionDropdown.insertAdjacentHTML('beforeend', '<option id=blank>Please select region</option>');
     for (let i = 0; i < regions.length; i++) {
       regionDropdown.insertAdjacentHTML('beforeend', `<option id=${i}>${regions[i] }</option>`);
     }
///Type selctor
let type=[];
     for (let i = 0; i < data.length; i++) {
        if(data[i].type===''){
            data[i].type="other"
        }
        type.push(data[i].type)
        
     }
     type=[...new Set(type)]
     console.log(type)
    
        
     menuElement.insertAdjacentHTML('beforeend', '<select list=\'type\' id=\'type\'></select>');
     const typeDropdown = document.getElementById('type');
     typeDropdown.insertAdjacentHTML('beforeend', '<option id=blank>Please select type</option>');
     for (let i = 0; i < type.length; i++) {
        typeDropdown.insertAdjacentHTML('beforeend', `<option id=${i}>${type[i] }</option>`);
     }
///      Rarity Selector
   
let rarity=[];
     for (let i = 0; i < data.length; i++) {
        if(data[i].rarity===''){
            data[i].rarity="other"
        }
        rarity.push(data[i].rarity)
        
     }
     rarity=[...new Set(rarity)]
     console.log(rarity)
    
        
     menuElement.insertAdjacentHTML('beforeend', '<select list=\'rarity\' id=\'rarity\'></select>');
     const rarityDropdown = document.getElementById('rarity');
     rarityDropdown.insertAdjacentHTML('beforeend', '<option id=blank>Please select rarity</option>');
     for (let i = 0; i < rarity.length; i++) {
        rarityDropdown.insertAdjacentHTML('beforeend', `<option id=${i}>${rarity[i] }</option>`);
     } 


}




