/* eslint-disable */ 
function createDiv(matchList){
  if (document.querySelector('.target')) {
    $('.target').remove();
  }
  
  // create div 
  const div = document.createElement('div');
      div.className = 'target';
      $('.form').append(div);
  // div.innerHTML = ""  
  
  // iterate
   for (let item = 0; item < matchList.length; item += 1) { 
    const name = matchList[item].name;  
    const cat = matchList[item].category;
    const address = matchList[item].address_line_1;
    const city = matchList[item].city;
    const zip = matchList[item].zip;
    
    //create div for each block for styling
    const matchDiv = document.createElement('div');
    matchDiv.className = 'block';
    
    //assign div text (restaurant match entry)
    matchDiv.innerHTML = `<h4>${name}</h4>
                          <p>${cat}</p> 
                          <address class='address'>
                          ${address}<br> 
                          ${city}<br>
                          ${zip}<br>
                          </address>`;
    div.append(matchDiv);
  }      
}

function displayRestaurants(jsonFromServer){
  window.onload = loadData(jsonFromServer);
}

async function loadData(jsonFromServer) {
  var searchWord = document.getElementById("search").value;
  searchWord = wordToUpperCase(searchWord);
  console.log("Word:", searchWord);
  if (searchWord === '') {
    searchWord = 'null'
  }
  const restaurants = findRestaurants(searchWord, jsonFromServer); //This test the search term input by the user but the function is meant to display the items that match search term
  console.log("Restaurant that match", restaurants);
  createDiv(restaurants);  
}
// ours fxn returns list 
function findRestaurants(inputValue, restaurantList){
  return restaurantList.filter(restaurant => {
    const regex = new RegExp(inputValue, 'gi');
    return restaurant.category.match(regex) || restaurant.zip.match(regex)  
  });
}
//
//
//

function wordToUpperCase(word){
var tempWord = word.toLowerCase().split(' ');
var upperCaseWord = tempWord[0].charAt(0).toUpperCase() + tempWord[0].slice(1);

for(let i = 1; i < tempWord.length; i++){
  upperCaseWord += " " + tempWord[i].charAt(0).toUpperCase() + tempWord[i].slice(1);
}
return upperCaseWord;
}
const inpt = document.getElementById("search");
console.log($('#search').value, 'val');
console.log($('#search'), 'srch');


$('#search').on('keyup change', async (e) => {// change, keyup

console.log(document.getElementById("search").value);
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray();
  fetch("http://localhost:3000/api", { //dont forget to change it back to /api
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form),
  })
    .then((fromServer) => fromServer.json())
    .then((jsonFromServer) => displayRestaurants(jsonFromServer)) 
    .catch((err) => {
      console.log(err);
    });
}); 
//need erase when empty
// document.getElementById("search").addEventListener("click", function() {
//    document.querySelector('.target').innerHTML = "";
// });