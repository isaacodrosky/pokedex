let currentPage = 'https://pokeapi.co/api/v2/pokemon/'

renderAll()

// data.types[0].type.name object to reference to pull type name e.g. "grass" or "bug"

document.getElementById('show-all').addEventListener("click", (e) => {
    document.getElementById('pokemon').innerHTML = ''
    document.getElementById('pokemonSearch').value = ''
    currentPage = 'https://pokeapi.co/api/v2/pokemon/'
    renderAll()
})

// initial render before search - innerHTML of "pokemon" will be populated with general results from the API
function renderAll() {
   fetch(currentPage)
    .then(res => {
        if (!res.ok) {
            throw Error('Could not display results')
        }
        return res.json()
    })
    .then(data => {
        const pokemon = data.results
        pokemon.forEach((item) => {
            fetch(`${item.url}`)
                .then(res=> {
                    if (!res.ok) {
                        throw Error('Could not display results')
                    }
                    return res.json()
                })
                .then(data => {
                    document.getElementById('pokemon').innerHTML += `
                    <div class="pokemon-container">
                        <p class="name">${data.name}</p>
                        <img src="${data.sprites.front_default}" />
                    </div>`

                    document.getElementById('pokemon').style.display = "grid"
                    document.getElementById("show-more").style.display = "inline-block"
                    document.getElementById("show-all").style.display = "none"
                })
        })
    })
    .catch(error => {
        console.error(error)
    })
}

document.getElementById('show-more').addEventListener('click', (e) => {
    showMore()
})

//show next set of 20 pokemon
function showMore() {
    fetch(currentPage)
    .then(res => {
        if (!res.ok) {
            throw Error('Could not display results')
        }
        return res.json()
    })
    .then(data => {
        currentPage = data.next

        fetch(currentPage)
        .then(res => {
            if (!res.ok) {
                throw Error('Could not display results')
            }
            return res.json()
        })
        .then(data => {
            const pokemon = data.results
        pokemon.forEach((item) => {
            fetch(`${item.url}`)
                .then(res=> {
                    if (!res.ok) {
                        throw Error('Could not display results')
                    }
                    return res.json()
                })
                .then(data => {
                    document.getElementById('pokemon').innerHTML += `
                    <div class="pokemon-container">
                        <p class="name">${data.name}</p>
                        <img src="${data.sprites.front_default}" />
                    </div>`
                })
        })

        })
        .catch(error => {
            console.error(error)
        })
        
    })
    .catch(error => {
        console.error(error)
    })
}


//user search for specific pokemon by name
document.getElementById('search-btn').addEventListener("click", (e) => {
    const pokemonName = document.getElementById('pokemonSearch').value.toLowerCase()

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then(res => {
        if (!res.ok) {
            throw Error('API not available')
        }
        return res.json()
    })
    .then(data => {
        const name = data.name
        const sprite = data.sprites.front_default
        document.getElementById("pokemon").innerHTML = `
             <p class="name">${name}</p>
             <img src="${sprite}" />
         `
        document.getElementById("pokemon").style.display = "inline"
        document.getElementById("show-more").style.display = "none"
        document.getElementById("show-all").style.display = "inline-block"
    })
    .catch(error => {
        console.error(error)
    })
})

// -------- TESTING AREA FOR TYPE FILTERING :) --------- //
// possible to do 20ish per page like renderAll?

const typeForm = document.getElementById('type-form')

document.getElementById('apply-filter-btn').addEventListener('click', () => {
    const type = document.getElementById('filter-type').value

    fetch(`https://pokeapi.co/api/v2/type/${type}`)
    .then(res => {
        if (!res.ok) {
            throw Error('API not available')
        }
        return res.json()
    })
    .then(data => {

        data.pokemon.forEach(pokemon => {
            document.getElementById('pokemon').innerHTML = ''
            const typePokemonUrl = pokemon.pokemon.url

            fetch(`${typePokemonUrl}`)
                .then(res=> {
                    if (!res.ok) {
                        throw Error('Could not display results')
                    }
                    return res.json()
                })
                .then(data => {
                    const sprite = data.sprites.front_default
                    const name = data.name
                    
                    document.getElementById("pokemon").innerHTML += `
                    <div class="pokemon-container">
                        <p class="name">${data.name}</p>
                        <img src="${data.sprites.front_default}" />
                    </div>
                     `
                document.getElementById("show-more").style.display = "none"
                document.getElementById("show-all").style.display = "inline-block"
                })
        })
    })
    .catch(error => {
        console.error(error)
    })
})
