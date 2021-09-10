/* Have wrapped my pokemonList variable in an IFFE this way it can't be accessed from the global state. The IFFE returns and object with two public functions getAll and add these may be accessed globaly */
let pokemonRepository = (function() {
  /* created a variable with an array of objects; each object has 3 different properties in them. Also each object contains a nested array under the types property.*/
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=152';
  let searchInput = document.querySelector('#search-bar');

  /* this function lets me add a single item to the pokemonList array once I call the function */
  function add(pokemon) {
    //conditional checks to see if the item that's being added has the correct data type. If not returns incorrect message
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'detailsUrl' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      alert('Pokemon is not correct');
    }
  }

  // function returns the value of the pokemonList array
  function getAll() {
    return pokemonList;
  }

  // function removes the need of document.write adds Details to the document
  function addListItem(pokemon) {
    // selects the ul element from the index page
    let listPokemon = document.querySelector('.list-group');
    //creates a new element list items
    let pokemonItem = document.createElement('li');
    pokemonItem.classList.add('group-list-item');
    // creates a new element a button
    let button = document.createElement('button');
    // writes text within the button element
    button.innerText = pokemon.name;
    // adds a CSS class to be able to style it.
    button.classList.add('button');
    button.dataset.target = '#pokedexModal';
    button.dataset.toggle = 'modal';
    // attaches the button to the li element to make appear
    pokemonItem.appendChild(button);
    //attaches the li element to the parent element ul
    listPokemon.appendChild(pokemonItem);
    // calls the event listener function
    addEventListener(button, pokemon);
  }

  // function adds an event listener by passing two parameters the variable refereing to the button and the pokemon object.
  function addEventListener(button, pokemon) {
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      showModal(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(poke) {
          let pokemon = {
            name: poke.name,
            detailsUrl: poke.url
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        /* eslint-disable no-console */
        console.error(e);
        /* eslint-enable no-console */
      });
  }

  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.weight = details.weight;
        pokemon.types = details.types;
      })
      .catch(function(e) {
        /* eslint-disable no-console */
        console.error(e);
        /* eslint-enable no-console */
      });
  }

  //Show modal content
  function showModal(pokemon) {
    let modalBody = document.querySelector('.modal-body');
    let modalTitle = document.querySelector('.modal-title');

    modalBody.innerText = '';
    modalTitle.innerText = '';
    // creating element for name in modal content
    let nameElement = document.createElement('h1');
    nameElement.innerText = pokemon.name;
    // creating img in modal content
    let imageElement = document.createElement('img');
    imageElement.src = pokemon.imageUrl;
    // creating element for height in modal content
    let heightElement = document.createElement('p');
    heightElement.innerText = 'Height: ' + pokemon.height;
    let weightElement = document.createElement('p');
    weightElement.innerText = 'Weight: ' + pokemon.weight;
    // creating element for types in modal content
    let typesElement = document.createElement('p');
    typesElement.innerText = pokemon.types.map(pokemon => pokemon.type.name);

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
  }

  // add event listener to my search bar
  searchInput.addEventListener('input', function() {
    let pokeList = document.querySelectorAll('li');
    let value = searchInput.value.toUpperCase();

    pokeList.forEach(function(pokemon) {
      if (pokemon.innerText.toUpperCase().indexOf(value) < 0) {
        pokemon.style.display = 'none';
      }
    });
  });

  // this object and its keys allow me to access the pokemonList details from outside
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal
  };
})();

/* used a forEach function to iterate over each pokemon.*/
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
