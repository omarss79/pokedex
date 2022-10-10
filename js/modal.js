// MODAL SHOW DETAILS

async function showPokemonDetails(pokemon, id){
    // Get the modal
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("myBtn_"+pokemon);
    modal.style.display = "block";

    let card = await getSinglePokemonDetails(pokemon);
    let modalCard = document.getElementById("modalCardPokemon");
    
    modalCard.innerHTML=card;
    document.getElementById("modalContent").style.height = "80%";
    document.getElementById("modalContent").style.width = "80%";

}


let closeModalSpan = document.getElementById("closeModal");
closeModalSpan.addEventListener('click', function(e) {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
});


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}