//Function para crear las cartas
function makeCard (character) {
    //Destructuramos los parametros que queremos mostrar
    const {name, status,  image, location, origin} = character;
    const cardContainer = document.querySelector(".card-container")

    //Creamos los elementos para cada parametro 
    const title = document.createElement("h3")
    title.textContent = name;

    //Aquí se crea 3 Elementos
    //Container
    const containerOrigin = document.createElement("span")
    //Title del parametro
    const characterOrigin = document.createElement("h5")
    characterOrigin.textContent = `Origen:`;
    //Parametro
    const nameCharacterOrigin = document.createElement("p")
    nameCharacterOrigin.textContent = `${origin.name}`
    containerOrigin.classList.add("info-characterOrigin")
    containerOrigin.appendChild(characterOrigin)
    containerOrigin.appendChild(nameCharacterOrigin)


    const characterStatus = document.createElement("p")
    characterStatus.textContent = status
    if(status === "Alive"){characterStatus.style.color = "green"}
    else{characterStatus.style.color = "grey"}

    const characterImage = document.createElement("img")
    characterImage.classList.add("img-character")
    characterImage.src = image;
    characterImage.width = 200;
    characterImage.height= 200;
    

    //Se hace lo mismo que en la linea 11
    const containerLocation = document.createElement("span")
    const characterLocation = document.createElement("h5")
    characterLocation.textContent = `Localidad:`
    const nameCharacterLocation = document.createElement("p")
    nameCharacterLocation.textContent = `${location.name}`
    containerLocation.appendChild(characterLocation)
    containerLocation.appendChild(nameCharacterLocation)
    containerLocation.classList.add("info-characterLocation")

    const infoCharacter = document.createElement("snap")
    infoCharacter.appendChild(title)
    infoCharacter.appendChild(containerOrigin)
    infoCharacter.appendChild(containerLocation)
    infoCharacter.appendChild(characterStatus)

    const containerCard = document.createElement("snap")
    containerCard.classList.add("card")
    containerCard.appendChild(characterImage)
    containerCard.appendChild(infoCharacter)



    const Card = document.createElement("snap")
    Card.classList.add("individual-card")
    Card.appendChild(containerCard)


    cardContainer.appendChild(Card)
}




const botonPrueba = document.querySelector(".search")
const barraNav = document.querySelector(".bar")
let parmSearch = "/?name="

botonPrueba.addEventListener("click", function(){
    parmSearch = `/?name=${barraNav.value}`
    getCharacter()
    return parmSearch
})

const apiURL = "https://rickandmortyapi.com/api/character"

async function getCharacter(){
    try{
        if(barraNav.value.length > 0){
            const cardContainer = document.querySelector(".card-container")
            const child = document.querySelector(".individual-card")
            cardContainer.removeChild(child)
            let searchCharacter = `${apiURL}${parmSearch}`
            let response = await fetch(searchCharacter)
            let {results} = await response.json()
            for (let i = 0; i < results.length; i++) {
                makeCard(results[i])
            }
        }else {
        searchCharacter = `${apiURL}`
        let response = await fetch(searchCharacter);
        //const character = await response.json() //Vemos todo lo que nos proporciona la API
        let {results} = await response.json() //Utilizamos un Destructuring para acceder directamente
        for (let i = 0; i < results.length; i++) {
            makeCard(results[i])
        }
        }
        
    }
    catch(error){
        console.log(error)
    }
}





getCharacter()

