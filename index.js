const birdsURL = 'http://localhost:3000/birds/'
const ul = document.createElement('ul')
const newBird = document.querySelector("#new-bird")
const editBird = document.querySelector("#edit-bird")
const editSpecies = document.querySelector("#species-id")
const editAge = document.querySelector("#age-id")
const editSize = document.querySelector("#size-id")
const id = document.querySelector("#id")


fetch(birdsURL)
    .then(response => response.json())
    .then(birds => birds.map(showBirds))

    function showBirds(bird) {
            const birdCard = document.createElement("div")
            const species = document.createElement("h2")
            const age = document.createElement("li")
            const size = document.createElement("li")
            const button = document.createElement("button")
            const editButton = document.createElement("button")
            
            species.textContent = bird.species
            age.textContent = "Age:" + " " + bird.age
            size.textContent = "Size:" + " " + bird.size
            button.textContent = "Delete"
            editButton.textContent = "Edit"

            button.addEventListener('click', () =>{
                birdCard.remove()
                fetch(birdsURL + bird.id, {
                    method: "DELETE"
                })
                })
            editButton.addEventListener('click', () =>{
                editSpecies.value = bird.species
                editAge.value = bird.age
                editSize.value = bird.size
                id.value = bird.id
                })

            birdCard.append(species, ul, age, size, button, editButton)
            document.body.append(birdCard)        
    }

newBird.addEventListener('submit', (event)=> {
    event.preventDefault()
    const formData = new FormData(event.target)
    const species = formData.get('species')
    const age = formData.get('age')
    const size = formData.get('size')
    const bird = {species, age, size}
    
   showBirds(bird)

    fetch(birdsURL, {
        method: "POST",
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(bird)
    })
    newBird.reset()
})

editBird.addEventListener('submit', (event)=> {
    event.preventDefault()
    const formData = new FormData(event.target)
    const species = formData.get('species')
    const age = formData.get('age')
    const size = formData.get('size')
    const id = formData.get('id')
    const bird = {species, age, size}
    
   showBirds(bird)

    fetch(birdsURL + id, {
        method: "PATCH",
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(bird)
    })
    editBird.reset()
})





