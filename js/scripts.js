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

  return {
    getAll: getAll,
    add: add
  };
})();



// replaced the for loop with a forEach() function to clean up my code.
pokemonRepository.getAll().forEach(function(pokemon) {
  console.log('<p>' + pokemon.name + ' ' + 'Height: ' + pokemon.height + ' ' + pokemon.type + '<p>');
  document.write('<p>' + pokemon.name + ' ' + 'Height: ' + pokemon.height + ' ' +  pokemon.type + '<p>');
});
