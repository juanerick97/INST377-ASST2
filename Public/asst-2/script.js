
function createDiv(matchList){
    if (document.querySelector('.target')) {
        $('.target').remove();
    };

    // iterate
     for (let item = 0; item < matchList.length; item += 1) { 
      const name = matchList[item].name;  
      const cat = matchList[item].category;
      const address = matchList[item].address_line_1;
      const city = matchList[item].city;
      const zip = matchList[item].zip;
           

      // create div 
      const div = document.createElement('div');
      div.className = 'target'; 
      //text
      div.innerHTML = `<h4>Restaurant Name: ${name}</h4>
                        <p>Category: ${cat}</p> 
                        <p>Address: ${address}</p> 
                        <p>City: ${city}</p>
                        <p>Zipcode: ${zip}</p>`;

      $('.form').append(div);
    }      
}

function displayRestaurants(jsonFromServer){
    var searchWord = document.getElementById("search").value;
    searchWord = wordToUpperCase(searchWord);
    console.log("Word:", searchWord);
    const restaurants = findRestaurants(searchWord, jsonFromServer); //This test the search term input by the user but the function is meant to display the items that match search term
    console.log("Restaurant that match", restaurants);
    createDiv(restaurants);
}

function findRestaurants(restaurantCategory, restaurantList){
    var restaurantsFound = []; //Stores all te restaurants that match the category
    var j = 0;

    for(var i = 0; i < restaurantList.length; i++){ //Goes through the restaurantList

        var currentRestaurant = restaurantList[i];

        if(restaurantCategory == currentRestaurant.category){ //Adds any object from the restaurant list that matches the search term
            restaurantsFound[j++] = currentRestaurant;
        }
    }

    return restaurantsFound;
}

function wordToUpperCase(word){
  var tempWord = word.toLowerCase().split(' ');
  var upperCaseWord = tempWord[0].charAt(0).toUpperCase() + tempWord[0].slice(1);

  for(let i = 1; i < tempWord.length; i++){
    upperCaseWord += " " + tempWord[i].charAt(0).toUpperCase() + tempWord[i].slice(1);
  }

  return upperCaseWord;
}

document.body.addEventListener('submit', async (e) => {
    e.preventDefault(); // this stops whatever the browser wanted to do itself.
    const form = $(e.target).serializeArray();
    fetch("http://localhost:3000/api", { //dont forget to change it back to /api
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then((fromServer) => fromServer.json())
      .then((jsonFromServer) => displayRestaurants(jsonFromServer)) 
      .catch((err) => {
        console.log(err);
      });
  }); 