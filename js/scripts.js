//pokedex array
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



function myLoopFunction(pokemon) {
  console.log('<p>' + pokemon.name + ' ' + 'Height: ' + pokemon.height + ' ' + pokemon.type + '<p>');
  document.write('<p>' + pokemon.name + ' ' + 'Height: ' + pokemon.height + ' ' +  pokemon.type + '<p>');
}
pokemonList.forEach(myLoopFunction);



// * this loop calls & prints the objects of the above array into the index.html
// the if condition checks to see if height is larger than 1 if so prints out a statement

// function allows me to print multiple arrays without having to write more code
/*function printArrayDetails(list) {
  for (let i=0; i < list.length; i++) {
    console.log('<p>' + list[i].name + '  Height:  ' + list[i].height)
    document.write('<p>' + list[i].name + '  Height: ' + list[i].height)
    if (list[i].height > 1.0) {
      console.log ('  Wow that is a big Pokemon!' + '</p>')
      document.write('  Wow that is a big Pokemon!' + '</p>')
    };
  };
};
*/
// calls or executes function
//printArrayDetails(pokemonList);
//printArrayDetails(pokemonList2);
