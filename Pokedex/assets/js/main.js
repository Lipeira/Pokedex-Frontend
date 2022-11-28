const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 15
let offset = 0
const maxRecords = 151




/*O JSON irá trazer varias informações organizada sobre os pokemons*/

function loadPokemonItens(offset, limit) {

    pokeApi.getPokemons(offset,limit).then((pokemons = []) => { /* vai pro segundo then o retorno do primeiro*/
        const newHtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemon.photo}" 
                        alt="${pokemon.name}">
                    </div>          
                </li>
        `).join('')
        pokemonList.innerHTML += newHtml
        })
}

loadPokemonItens(offset,limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit


    const qtdRecordNexPage = offset + limit

    if (qtdRecordNexPage >= maxRecords){
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else{
        loadPokemonItens(offset,limit)
    }
})