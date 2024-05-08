const listaPokemon = document.querySelector("#listaPokemon");
const VerPokemon = document.querySelector("#VerPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
const inputBuscar = document.querySelector("#search-input");
const MAXIMOS_POKEMONES = 151;
inputBuscar.value = "";
listaPokemon.innerHTML = "";
let URL = "https://pokeapi.co/api/v2/pokemon/";


botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;
    listaPokemon.innerHTML = "";
    for (let i = 1; i <= MAXIMOS_POKEMONES; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(poke => {
                    const tipos = poke.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        VerPokemon.innerHTML = "";
                        mostrarPokemon(poke);
                    }
                
            })
    }
}))

function verTodosApi(){
    VerPokemon.innerHTML = "";
    inputBuscar.value = "";
    listaPokemon.innerHTML = "";
    for (let i = 1; i <= MAXIMOS_POKEMONES; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(poke => mostrarPokemon(poke))
    }
}

function mostrarPokemon(poke) {
    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');
    let pokeId = poke.id.toString();
    const div = document.createElement("div");
    div.classList.add("col-3");
    div.innerHTML = `
    <div class="card card-top">
        <div class="card-img-top">
        <button class="btn btn-header" onclick="verPokemon(${poke.id})">
            <img class="card-img-cuadro" src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </button>    
        </div>
        <div class="card-body">
        <h5 class="card-title">#${poke.id}</h5>
        <h4 class="card-title">${poke.name}</h4>
        </div>
        </div>
    `;
    listaPokemon.append(div);
}


function buscarPokemon() {
    listaPokemon.innerHTML = "";
    const no_exite = document.querySelector("#no_exite");
    no_exite.innerHTML = "";
    const id_poke = inputBuscar.value;
    if (id_poke < 1 || id_poke > MAXIMOS_POKEMONES) {
        listaPokemon.innerHTML = "";
        no_exite.innerHTML = "El id Ingresado no se encuentra en esta lista";
    } else {
        listaPokemon.innerHTML = "";
        let URL = "https://pokeapi.co/api/v2/pokemon/";
        for (let i = 1; i <= 1; i++) {
            fetch(URL + id_poke)
                .then((response) => response.json())
                .then(poke => mostrarPokemon(poke))

        }
    }
}


function verPokemon(id_poke) {
    listaPokemon.innerHTML = "";
    inputBuscar.value = "";
    let URL = "https://pokeapi.co/api/v2/pokemon/";
    for (let i = 1; i <= 1; i++) {
        fetch(URL + id_poke)
            .then((response) => response.json())
            .then(poke => VerPokemonGeneral(poke))
    }
}

function VerPokemonGeneral(poke) {
    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');
    VerPokemon.innerHTML = `
    <div class="col-md-4">
    <div class="card">
    <div class="card-body">
        <h4 class="card-title"><b>${poke.name}</b></h4>
        <h6 class="card-subtitle text-muted">Id: <b>${poke.id}</b></h6>
    </div>
    <img class="img-fluid" src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
    <div class="card-body">
    <h6 class="card-title">Tipo</h6>
      <b>${tipos}</b>
    </div>
</div>
</div>
<div class="col-md-4">
<div class="card">
    <div class="card-body">
        <h4 class="card-title">Caracteristicas</h4>
    </div>
    <ul class="list-group list-group-flush">
    <li class="list-group-item">Altura: <b>${poke.height} m </b></li>
    <li class="list-group-item">Peso: <b>${poke.weight} kg </b></li>
        <li class="list-group-item">Experiencia : <b>${poke.base_experience} Exp</b></li>
        <li class="list-group-item">HP :  <b>${poke.stats[0].base_stat} hp</b></li>
        <li class="list-group-item">Ataque :  <b>${poke.stats[1].base_stat} K</b></li>
        <li class="list-group-item">Defensa :  <b>${poke.stats[2].base_stat} K</b></li>
        <li class="list-group-item">Especial :  <b>${poke.stats[3].base_stat} K</b></li>
    </ul>
</div> 
</div>
    `;
}
verTodosApi();
