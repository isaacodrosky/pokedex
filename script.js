renderAll()

document.getElementById('show-all').addEventListener("click", (e) => {
    document.getElementById('pokemon').innerHTML = ''
    document.getElementById('pokemonSearch').value = ''
    renderAll()
})

//user search for specific pokemon by name
document.getElementById('submit').addEventListener("click", (e) => {
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
    })
    .catch(error => {
        console.error(error)
    })
})

// initial render before search - innerHTML of "pokemon" will be populated with general results from the API - first 20 bc they display 20 at a time
function renderAll() {
   fetch(`https://pokeapi.co/api/v2/pokemon/`)
    .then(res => {
        if (!res.ok) {
            throw Error('Could not display results')
        }
        return res.json()
    })
    .then(data => {
        const results = data.results
        results.forEach((item) => {
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
                })
        })
        document.body.innerHTML += `<button id="show-more">Show More</button>`
    })
    .catch(error => {
        console.error(error)
    })
 
}
