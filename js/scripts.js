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
]

for (let i=0; i < pokemonList.lenght; i++) {
  document.write(pokemonList[i].name + 'Height: ' + pokemonList[i].height)
  console.log(pokemonList[i].name + 'Height: ' + pokemonList[i].height)
  if ([pokemonList[i].height] > 1.0) {
    document.write('Wow this Pokemon is big!')
  }
  document.write('<br>');
}
