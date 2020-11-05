
function createDiv(matchList){
    if (document.querySelector('.target')) {
        $('.target').remove();
    };

    // iterate
     for (let item = 0; item < matchList.length; item += 1) { 
     const cat = matchList[item].category;
     const zip = matchList[item].zip;
     const name = matchList[item].name;       

     // create div 
     const div = document.createElement('div');
     div.className = 'target'; 
    //text
    div.innerHTML = `<h3>Restaurant Name: ${name}</h3> 
                           <h4>zipcode: ${zip}</h4> 
                           <h4>category: ${cat}</h4>`;
     $('.form').append(div);
    }      
}

function displayRestaurants(jsonFromServer){

    const restaurants = findRestaurants("Public School", jsonFromServer); //This test the search term input by the user but the function is meant to display the items that match search term
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