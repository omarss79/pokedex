"use strict";

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
                        <a href="#" class="btn btn-primary text-uppercase">Show details</a>
                    </div>
                </div>`;
    return cardPokemon;
}

async function showPokemon(cards) {

        const getParentElement = document.getElementById('bs-pricing');

        const createContainer = document.createElement('div');
        createContainer.classList.add('container');

        createContainer.innerHTML =`<div class="col-md-12">
                                        <div class="row">
                                            <div id="containerElements" class="bs-pricing-table-two text-center"></div>
                                        </div>
                                    </div>`;
        getParentElement.appendChild(createContainer);

        const getContainerElement = document.getElementById('containerElements');
        cards += `<a href="#" id="btnShowMore" class="btn btn-more text-uppercase">Show more</a>`
        getContainerElement.innerHTML = cards;


        // let retirarBtn = document.getElementById("retirarBtn");
        // let retirarInput = document.getElementById("retirarInput");
        // retirarBtn.addEventListener('click', function(e) {
        //     let importe = parseInt(retirarInput.value);
        //     if(importe >= 1 && importe <= 990){
        //         let saldoFuturo = SaldoTerminal.saldoActual() - importe;
        //         console.log("Saldo futuro: " + saldoFuturo);
        //         if(saldoFuturo >= 10){
        //             if(importe%5 == 0){
        //                 const fecha = SaldoTerminal.obtenerFechaActual();
        //                 let retiro = {
        //                     user_id: IndexTerminal.logged_client,
        //                     fecha: fecha,
        //                     importe: importe,
        //                     tipo_movto:  'retiro'
        //                 };
        //                 if(movimientosList.push(retiro)){
        //                     let item = clientesList.find(client => client.id == IndexTerminal.logged_client);
        //                     item.saldo += parseInt(importe);
        //                     RetiroTerminal.successEntry(importe);
        //                 } //else RetiroTerminal.errorEntry();    
        //                 console.log("Retiro: " + JSON.stringify(movimientosList));
        //             }  else retirarAlertResiduo.style.display = 'block';
        //         }  else retirarAlertSaldo.style.display = 'block';
        //     }  else retirarAlert.style.display = 'block';
        // });

    
}
  
async function asyncCall() {

    // GET POKEMONS
    const url = "https://pokeapi.co/api/v2/pokemon";
    const data = await getData(url)
    .then((data) => {
        return data;    
    })
    .catch((error) => {
      console.log("Error ", error);
    });    
    console.log(data);

    // CREATE CARDS
    const cards = await getDetails(data.results)
    
    // SHOW CARDS
    await showPokemon(cards);
}
  

  

document.body.onload = function() {
    asyncCall();
}