function getSinglePokemon(url) {
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
}
async function getSinglePokemonDetails(name) {
    let cards = "";  
    var url = "https://pokeapi.co/api/v2/pokemon/"+name;
    const pokemon_data = await getSinglePokemon(url)
    .then((data) => {
        return data;    
    })
    .catch((error) => {
        console.log("Error ", error);
    });

    console.log(pokemon_data.name);

    cards = await createModalCardPokemon(pokemon_data);

    return cards;
}

async function createModalCardPokemon(pokemon_data) {
    let abilities = pokemon_data.abilities;
    let abilities_html = "";
    for(let element of abilities) { 
        abilities_html += `<li>${element.ability.name}</li>`
    }
    let cardPokemon =`<div class="col-md-3 col-sm-6">
                    <div class="bs-pricing-item xs-last-border">
                        <div class="bs-icon">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon_data.id}.png" alt="" />
                        </div>
                        <div class="head ">
                            <div class="price-title">
                                <h2 class="text-uppercase">${pokemon_data.name}</h2>
                            </div>
                            <div class="price">
                                <h1><small>Habilidades</small></h1>
                            </div>
                            <ul class="text-uppercase">
                                ${abilities_html}
                            </ul>
                        </div>
                        <ul>
                            <li>Height: ${pokemon_data.height}</li>
                            <li>Weight: ${pokemon_data.weight}</li>
                        </ul>
                    </div>
                </div>`;
    return cardPokemon;
}