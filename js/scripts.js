//wrapped  my array in an IIFE to avoid accessing the global state.
let pokemonRepository = (function () {
  let pokemonList = [
    {
      name:'Bulbasaur',
      height: .7,
      type: ['grass', 'poison']
    },
    {
      name: 'Charizard',
      height: 1.7,
      type: ['fire', 'flying']
    },
    {
      name: 'Squirtle',
      height: .5,
      type: ['water']
    }
  ];

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function addListItem(pokemon){
    let pokemonList = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
    button.addEventListener ('click', showDetails(pokemon))
  }

  function showDetails(pokemon){
    console.log(pokemon);
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails
  };
})();



// replaced the for loop with a forEach() function to clean up my code.
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});
