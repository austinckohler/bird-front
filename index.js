console.log("h1")
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
    .then(showBirds)

    function showBirds(birds) {
        birds.forEach(bird => {
            const birdCard = document.createElement("div")
            const species = document.createElement("h2")
            const age = document.createElement("li")
            const size = document.createElement("li")
            const button = document.createElement("button")
            
            species.textContent = bird.species
            age.textContent = bird.age
            size.textContent = bird.size
            button.textContent = "Delete"
                
            button.addEventListener('click', () =>{
                birdCard.remove()
                fetch(birdsURL + bird.id, {
                    method: "DELETE"
                })
                })

            birdCard.append(species, ul, age, size, button)
            document.body.append(birdCard)        
        });
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
})





