let form = document.getElementsByClassName('dictform')[0]
let wordInput = document.getElementsByClassName('wordinput')[0]
let wordInfo = document.getElementsByClassName('text-center')[0]
let searchButton = document.getElementsByClassName('searchButton')[0]


async function getMeaning(word) {
    try {
        let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)

        let data = await response.json()
        console.log(data)
        // create a paragraph element
        // let paragraph = document.createElement('p')
        let paragraph = document.createElement('div')
        paragraph.classList.add('card-header')

        // reset the wordInfo
        wordInfo.innerHTML = ""

        // get the audio data
        let audioSource = data[0].phonetics[0].audio      


        paragraph.innerHTML = `               
        <span class= 'fas fa-volume-up audio-icon'></span>
        <audio class="audio"> <source src=${audioSource} type='audio/mpeg' /> </audio>        
        <b>${data[0].word}</b>                 
            
        `
        wordInfo.appendChild(paragraph)

        document.getElementsByClassName('audio-icon')[0].addEventListener('click',
            event => {
                document.getElementsByClassName('audio')[0].play()
            }
        )
        let cardBody = document.createElement('div')
        cardBody.classList.add('card-body')
        let list = document.createElement('ul')
        // let list = document.querySelector('.card-body')
        list.style.listStyleType = 'none'
        let meanings = data[0].meanings

        for (let meaning of meanings) {
            let listItem = document.createElement('li')

            listItem.innerHTML = `<h6>${meaning.partOfSpeech}</h6>`

            // create a sublist to display the meanings in every category
            let subList = document.createElement('p')
            subList.style.listStyleType = 'disc'
            // get the definintions
            let definitions = meaning.definitions

            for (let definition of definitions) {
                // create a list item
                let subListItem = document.createElement('p')
                // set the content of the subList item
                subListItem.innerHTML =  `<em>${definition.definition}</em>`    
                subList.appendChild(subListItem)
            }

            listItem.appendChild(subList)

            list.appendChild(listItem)

            cardBody.appendChild(list)
        }

        wordInfo.appendChild(cardBody)
    } catch (error) {
        console.error("Error fetching data")
    }
}


function handleSubmit(e) {
    e.preventDefault()

    let word = wordInput.value

    getMeaning(word)
}

form.addEventListener('submit', handleSubmit);
searchButton.addEventListener('click', handleSubmit)