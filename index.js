const birdURL = "http://localhost:3000/birds/"
const addBird = document.querySelector("#new-bird")
const editBird = document.querySelector("#edit-bird")
const speciesID = document.querySelector("#species-id")
const ageID = document.querySelector("#age-id")
const sizeID = document.querySelector("#size-id")
const id = document.querySelector("#id")
const ul = document.createElement('ul')

fetch(birdURL)
    .then(response => response.json())
    .then(birds => birds.map(showBirds))

    function showBirds(bird) {
        const birdCard = document.createElement('div')
        const species = document.createElement("h3")
        const age = document.createElement("li")
        const size = document.createElement("li")
        const button = document.createElement('button')
        const editButton = document.createElement('button')
    
        species.textContent = bird.species
        age.textContent = bird.age
        size.textContent = bird.size
        button.textContent = "Delete"
        editButton.textContent = "Edit"

        button.addEventListener("click", () => {
            birdCard.remove()
            fetch(birdURL + bird.id, {
                method: "DELETE"
            })
        })

        editButton.addEventListener("click", () => {
            speciesID.value = bird.species
            ageID.value = bird.age
            sizeID.value = bird.size
            id.value = bird.id
        })
        
        birdCard.append(species, ul, age, size, button, editButton)
        document.body.append(birdCard)
    }
    
    
    addBird.addEventListener('submit', (event) => {
        event.preventDefault()

        const formData = new FormData(event.target)
        const species = formData.get('species')
        const age = formData.get('age')
        const size = formData.get('size')
        const bird = {species, age, size}

        showBirds(bird)

        fetch(birdURL, {
            method: "POST",
            header: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(bird)
        })
        addBird.reset()
    })
    
    editBird.addEventListener('submit', (event) => {
        event.preventDefault()

        const formData = new FormData(event.target)
        const species = formData.get('species')
        const age = formData.get('age')
        const size = formData.get('size')
        const id = formData.get('id')
        const bird = {species, age, size}

        showBirds(bird)
        
        fetch(birdURL + id, {
            method: "PATCH",
            header: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(bird)
        })
        editBird.reset()
    })
