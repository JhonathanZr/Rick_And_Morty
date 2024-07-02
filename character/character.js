const apiURL = "https://rickandmortyapi.com/api/character/?page=1"
const bottomSearch = document.querySelector(".search")
const barraNav = document.querySelector(".bar")
const bottomNext = document.querySelector(".next")
const bottomPrev = document.querySelector(".previous")

bottomNext.addEventListener("click", function (event) {
    event.preventDefault() 
    const deleteDOM = document.querySelector(".card-container")
    if(document.getElementById("card")){deleteDOM?.remove(container)}
    let okNext = true
    count = count++
    getCharacter(undefined, okNext)
})

bottomPrev.addEventListener("click", function (event) {
    event.preventDefault() 
    const deleteDOM = document.querySelector(".card-container")
    if(document.getElementById("card")){deleteDOM?.remove(container)}
    let okPrev = true
    getCharacter(okPrev)
})

barraNav.addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        event.preventDefault()
        count = 1 
        inputBar()
    }
})

bottomSearch.addEventListener("click", function(event){
        event.preventDefault() 
        inputBar()
})

let page = []
let count= 1;

async function Pages (nextURL, prevURL){
    let next = await nextURL
    let prev = await prevURL
    page[0] = next
    page[1] = prev
    if(page[0] === null){
        bottomNext.classList.add("null")
    }else{
        bottomNext.classList.remove("null")
    }
    if(page[1] === null){bottomPrev.classList.add("null")
    }else{
        bottomPrev.classList.remove("null")
    }
    return page
}

function inputBar (){
    let search = `&name=${barraNav.value}`
    let comprobante = true 
    const deleteDOM = document.querySelector(".card-container")
    if(document.getElementById("card")){deleteDOM?.remove(container)}
    getCharacter(undefined, undefined, search, comprobante)
}

async function getCharacter(okPrev, okNext, search, comprobante){   
    try{
        //Comprobamos parametros para hacer la petición
        let finalURL = apiURL;
        if(okNext === true){  
            okNext = false  
            finalURL = page[0]
            count = count + 1   
        }
        if(okPrev === true){
            okPrev = false
            finalURL = page[1]
            count = count-1
        }else if(page[1] === null){bottomPrev.classList.add("null")}
        if(comprobante === true){
            comprobante = false
            finalURL = `${finalURL}${search}`
        }
        //Hacemos la petición
        let response = await fetch(finalURL);
        let {results, info} = await response.json()
        let nextURL = info.next
        let prevURL = info.prev
        let nPage = info.pages
        if(response.status >= 200 && response.status <= 299){
                const numberPages = document.querySelector(".numberPage")
                const main = document.querySelector(".main-container")
                const cardContainer = document.createElement("div")
                cardContainer.classList.add("card-container")
                cardContainer.id = "container"
                main.appendChild(cardContainer)
                numberPages.textContent = `${count} - ${nPage}`
                for (let i = 0; i < results.length; i++) {
                makeCard(results[i], cardContainer)
                }
        Pages(nextURL, prevURL)
        }else if(response.status < 200 || response.status > 299){
        }
        return cardContainer
    }
    catch(error){
    }
}
getCharacter()

//Function para crear las cartas
function makeCard (character, cardContainer) {
    //Destructuramos los parametros que queremos mostrar
    const {name, status,  image, location, origin} = character;

    //Creamos los elementos para cada parametro 
    const title = document.createElement("h3")
    title.classList.add("name-character")
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
    characterStatus.classList.add("status")
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

    const infoCharacter = document.createElement("span")
    infoCharacter.classList.add("info")
    infoCharacter.appendChild(title)
    infoCharacter.appendChild(containerOrigin)
    infoCharacter.appendChild(containerLocation)
    infoCharacter.appendChild(characterStatus)

    const containerCard = document.createElement("span")
    containerCard.classList.add("card")
    containerCard.appendChild(characterImage)
    containerCard.appendChild(infoCharacter)



    const individualCard = document.createElement("span")
    individualCard.classList.add("individual-card")
    individualCard.id = "card"
    individualCard.appendChild(containerCard)
    cardContainer.appendChild(individualCard)
}