document.getElementById('buscarButton').addEventListener('click', function() {
    const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
    const errorMessage = document.getElementById('errorMessage');
    const inputField = document.getElementById('pokemonName');
    if (pokemonName) {
        errorMessage.style.display = 'none'; 
        fetchPokemonData(pokemonName);
    } else {
        errorMessage.textContent = 'Por favor, digite o nome do Pokémon.';
        errorMessage.style.display = 'block'; 
        inputField.focus(); 
    }
});

document.getElementById('limparButton').addEventListener('click', function() {
    const inputField = document.getElementById('pokemonName');
    const errorMessage = document.getElementById('errorMessage');
    const pokemonInfoDiv = document.querySelector('.pokemon-info');

    inputField.value = ''; 
    errorMessage.style.display = 'none'; 
    pokemonInfoDiv.innerHTML = '';
    inputField.focus(); 
});
function fetchPokemonData(pokemonName) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon não encontrado!');
            }
            return response.json();
        })
        .then(data => displayPokemonData(data))
        .catch(error => {
            const errorMessage = document.getElementById('errorMessage');
            errorMessage.textContent = error.message;
            errorMessage.style.display = 'block';
        });
}

function displayPokemonData(data) {
    const pokemonInfoDiv = document.querySelector('.pokemon-info');
    pokemonInfoDiv.innerHTML = `
        <p>Nome: ${data.name}</p>
        <p>ID: ${data.id}</p>
        <p>Altura: ${data.height / 10} m</p>
        <p>Peso: ${data.weight / 10} kg</p>
        <p>Tipos: ${data.types.map(type => type.type.name).join(', ')}</p>
        <img src="${data.sprites.front_default}" alt="${data.name}">`;
}
