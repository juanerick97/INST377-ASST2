
function displayRestaurants(jsonFromServer){
    test = findResturants("Public School", jsonFromServer); //This test the search term input by the user but the function is meant to display the items that match search term
    console.log("Restaurant that match", test);
    
}

function findResturants(restaurantCategory, restaurantList){
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