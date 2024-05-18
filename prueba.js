const URL = ("https://rickandmortyapi.com/api/character")

async function getCharacter () {
    try{
        const response = await fetch(URL)
        const {results} = await response.json()
    
        results.forEach(element=>{

        console.log(element.name)
        console.log(element.origin.name)
    })
}
    catch(error){
        console.log(error)
}
}

getCharacter()