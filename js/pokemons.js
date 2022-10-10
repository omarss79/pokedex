function getData(url) {
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
function getPokemon(url) {
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
async function getDetails(data) {
    let cards = "";
    for(let pokemon of data) {    
        var url = "https://pokeapi.co/api/v2/pokemon/"+pokemon.name;
        const pokemon_data = await getPokemon(url)
        .then((data) => {
            return data;    
        })
        .catch((error) => {
            console.log("Error ", error);
        });
        cards += await createCardPokemon(pokemon_data);
    }
    return cards;
}

async function createCardPokemon(pokemon_data) {
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
                        <button type="button" id="myBtn_${pokemon_data.name}" onClick="showPokemonDetails('${pokemon_data.name}', ${pokemon_data.id});" class="btn btn-primary btn-lg"> Show details </button>
                    </div>
                </div>`;
    return cardPokemon;
}

async function showPokemon(cards) {
    
    var element = document.getElementById("spinner");
    element.classList.add("show");
    setTimeout(function () {
        if (element != undefined) {
            // $('#spinner').removeClass('show');
            element.classList.remove("show");
            const getContainerElement = document.getElementById('containerElements');
            getContainerElement.insertAdjacentHTML('beforeend', cards);
        }
    }, 2000);

}
