let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    
    
    function add(pokemon) {
      pokemonList.push(pokemon);
    }
  
    function getAll() {
      return pokemonList;
    }
    
    function addListItem(pokemon){
      let pokemonUnorderedList = document.querySelector('.pokemon-list');
      let pokemonListItem = document.createElement('li');
      let pokemonButton = document.createElement('button');
        pokemonButton.innerText = pokemon.name;
        pokemonButton.classList.add('button-class');
        pokemonListItem.appendChild(pokemonButton);
        pokemonUnorderedList.appendChild(pokemonListItem);
        pokemonButton.addEventListener('click', function () {
          showDetails(pokemon)
        });
    }; 
    
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
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function (e) {
        console.error(e);
      });
    }
//insert the modal function

        let modalContainer = document.querySelector('#modal-container');
        function showModal(item, loadDetails) {
          modalContainer.innerHTML = '';
          let modal = document.createElement('div');
          modal.classList.add('modal');
      
          let closeButtonElement = document.createElement('button');
          closeButtonElement.classList.add('modal-close');
          closeButtonElement.innerText = 'Close';
          closeButtonElement.addEventListener('click', hideModal);
      
          let titleElement = document.createElement('h1');
          titleElement.innerText = item;
      
          let contentElement = document.createElement('p');
          contentElement.innerText = loadDetails(item);
      
          modal.appendChild(closeButtonElement);
          modal.appendChild(titleElement);
          modal.appendChild(contentElement);
          modalContainer.appendChild(modal);
      
      
          modalContainer.classList.add('is-visible');
        }
      
        function hideModal() {
          modalContainer.classList.remove('is-visible');
        }
      
        window.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();  
          }
        });
        modalContainer.addEventListener('click', (e) => {
          // Since this is also triggered when clicking INSIDE the modal
          // We only want to close if the user clicks directly on the overlay
          let target = e.target;
          if (target === modalContainer) {
            hideModal();
          }
        });
      
        document.querySelector('#show-modal').addEventListener('click', () => {
          showModal('Modal title', 'This is the modal content!');
        });
//modal function end


    function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
        //console.log(pokemon);
        showModal();
      });
    }
    
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails
    };
  })();
  
  //foreach function
  pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
