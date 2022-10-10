"use strict";



var URL_LIST = "https://pokeapi.co/api/v2/pokemon";
  
async function asyncPokemons(url) {

                
    const data = await getData(url)
    .then((data) => {
        return data;  
    })
    .catch((error) => {
        console.log("Error ", error);
    });    

    // CREATE CARDS
    const cards = await getDetails(data.results);

    // SHOW CARDS
    await showPokemon(cards);
         
    URL_LIST = data.next;

}
// ON LOAD
document.body.onload = function() {
    asyncPokemons(URL_LIST);
}

// ADD MORE
let showMoreBtn = document.getElementById("btnShowMore");
showMoreBtn.addEventListener('click', function(e) {
    asyncPokemons(URL_LIST);
});
