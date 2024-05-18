// let grillaPokemones = document.querySelector('#grilla-personajes')

// let url_api = 'https://pokeapi.co/api/v2/pokemon'
// let dataAPI = fetch(url_api)
// let next_url = ''
// let prev_url = ''

// dataAPI.then(respuestaPromesa => respuestaPromesa.json())
//     .then(infoPokemon => {
//         infoPokemon.results.forEach(enlacePokemon => {
//             let urlInfoPokemon = enlacePokemon.url
//             let dataPokemon = fetch(urlInfoPokemon)
//             dataPokemon.then(respuestaPromesa => respuestaPromesa.json())
//             .then(detailPokemon => {
                // let idPokemon = detailPokemon.id
                // let imagenPokemon = detailPokemon.sprites.front_default
                // let tipoPokemon = ""



//                 grillaPokemones.innerHTML += `
                //     <div class="col">
                //         <div class="card">
                //             <div id="imgPokemon_${detailPokemon.id}">
                //             <img src="${imagenPokemon}" class="card-img-top" alt="...">
                //             </div>


                //             <div class="card-body">
                //                 <h5 class="card-title">${detailPokemon.name}</h5>
                //                 <p class="card-text">Tipo: ${tipoPokemon}</p>
                //                 <p class="card-text">ID: ${idPokemon}</p>
                //             </div>
                //         </div>
                //     </div>
                // `
//             })
//         })
//     })

let btnP = document.querySelector('#btnPrev');
let btnN = document.querySelector('#btnNext');
let searchBtn = document.querySelector('#button-addon2');
let searchInput = document.querySelector('#pokemon-search');

btnP.setAttribute('data-url-pokemones', null);
btnN.setAttribute('data-url-pokemones', "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20");

btnN.addEventListener('click', function(e) {
    let url = e.target.getAttribute('data-url-pokemones');
    if (url !== 'null') {
        obtenerPokemones(url);
    }
});

btnP.addEventListener('click', function(e) {
    let url = e.target.getAttribute('data-url-pokemones');
    if (url !== 'null') {
        obtenerPokemones(url);
    }
});

searchBtn.addEventListener('click', function() {
    let pokemonName = searchInput.value.trim().toLowerCase();
    if (pokemonName) {
        buscarPokemon(pokemonName);
    }
});

let divGrillaPagina = document.querySelector('#grilla-personajes');

async function obtenerPokemones(url_api = 'https://pokeapi.co/api/v2/pokemon') {
    let dataAPI = await fetch(url_api);
    let infoPokemon = await dataAPI.json();
    let arrPokemones = infoPokemon.results;

    divGrillaPagina.innerHTML = ''; 

    for (const pokemon of arrPokemones) {
        let info = await fetch(pokemon.url);
        let pokemonInformacion = await info.json();

        mostrarPokemon(pokemonInformacion);
    }

    // Actualizar las URL de los botones
    btnP.setAttribute('data-url-pokemones', infoPokemon.previous);
    btnN.setAttribute('data-url-pokemones', infoPokemon.next);
}

async function buscarPokemon(nombre) {
    try {
        let dataAPI = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
        if (!dataAPI.ok) throw new Error('Pokemon no encontrado');
        let pokemonInformacion = await dataAPI.json();
        divGrillaPagina.innerHTML = ''; 
        mostrarPokemon(pokemonInformacion);
    } catch (error) {
        alert(error.message);
    }
}

function mostrarPokemon(pokemonInformacion) {
    let idPokemon = pokemonInformacion.id;
    let imagenPokemon = pokemonInformacion.sprites.other.dream_world.front_default;

    let barrasEstadisticas = '';
    pokemonInformacion.stats.forEach(dataStats => {
        if (dataStats.stat.name === 'hp') {
            barrasEstadisticas += `<div class="text-title"> vida: <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="${dataStats.base_stat}" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar bg-warning" style="width: ${dataStats.base_stat}%"><i class="val"> ${dataStats.base_stat}</i></div></div>`;
        } else if (dataStats.stat.name === 'attack') {
            barrasEstadisticas += `<div> ataque: <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="${dataStats.base_stat}" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar bg-danger" style="width: ${dataStats.base_stat}%"><i class="val"> ${dataStats.base_stat}</i></div></div>`;
        } else if (dataStats.stat.name === 'defense') {
            barrasEstadisticas += `<div> defensa: <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="${dataStats.base_stat}" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar bg-primary" style="width: ${dataStats.base_stat}%"><i class="val"> ${dataStats.base_stat}</i></div></div>`;
        }
    });

    divGrillaPagina.innerHTML += `
    <div class="col">
        <div class="card">
            <div id="imgPokemon_${pokemonInformacion.id}">
                <img src="${imagenPokemon}" class="card-img-top" alt="...">
            </div>

            <div class="d-flex align-items-center justify-content-center card-body">
                <h5 class="card-title">${pokemonInformacion.name}</h5>
                <p class="card-text">ID: ${pokemonInformacion.id}</p>
            </div>

            <div class=" px-5 pb-4">
                ${barrasEstadisticas}
            </div>
        </div>
    </div>`;
}

obtenerPokemones();

