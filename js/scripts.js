//wrapped  my array in an IIFE to avoid accessing the global state.
let pokemonRepository = (function () {
  //create a modal
  let pokedexPokemonList = document.querySelector('.pokemon-list');
  let modalContainer = document.querySelector('#modal-container');
  let modal = document.querySelector('.modal');

  let modalClose = document.createElement('button');
    modalClose.classList.add('modal-close');
  let pokeName = document.createElement('h1');
    pokeName.classList.add('Pokename');
  let pokeHeight = document.createElement('p');
    pokeHeight.classList.add('Pokeheight');

  let imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');
  let pokeImage = document.createElement('img');
    pokeImage.classList.add('Pokeimage');



  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=20';


  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon
    ) {
    pokemonList.push(pokemon);
    } else {
    console.log('pokemon is not correct');
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener('click', function(event) {
      showDetails(pokemon);
    });
  }

  function showModal() {
    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  modalClose.addEventListener('click', hideModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });


  function showDetails(item) {
    loadDetails(item).then(function () {
      pokeName.innerHTML = item.name.toUpperCase();
      pokeHeight.innerHTML = 'Height: ' + item.height;
      pokeImage.src = item.imageUrl;
      modalClose.innerHTML = 'Close';
      showModal();
  });

    modal.appendChild(modalClose);
    modal.appendChild(pokeName);
    modal.appendChild(pokeHeight);
    modal.appendChild(imageContainer);
    imageContainer.appendChild(pokeImage);
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }


  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }



  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
    hideModal: hideModal
  };
})();



pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
