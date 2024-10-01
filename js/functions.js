const input = document.querySelector('input')
const output = document.querySelector('output')
const span = document.querySelector('span')
const hirsipuuAscii = document.querySelector('#hirsipuuAscii')

let guessesNum = 0
let wrongGuessesNum = 0

const guessedLetters = []

const words = [
    "programming",
    "javascript",
    "database",
    "markup",
    "framework",
    "variable",
    "stylesheet",
    "library",
    "asynchronous",
    "hypertext"
]

let randomizedWord = ''
let maskedWord = ''

const newGame = () => {
    const random = Math.floor(Math.random() * words.length)//huom, mallikoodissa on virhe koska arrayn indeksi alkaa kohdasta 0, ei 1
    randomizedWord = words[random]
    maskedWord = "*".repeat(randomizedWord.length)
    //console.log(randomizedWord)
    output.textContent = maskedWord
    guessedLetters.length = 0
    guessesNum = 0
    wrongGuessesNum = 0
    span.innerHTML = "0"
}

const win = () => {
    alert(`You have guessed right, the word is ${randomizedWord}. You needed ${guessesNum} guesses!`)
    newGame()
}
const replaceFoundChars = (guess) => {
    for (let i = 0; i < randomizedWord.length; i++) {
        const char = randomizedWord.substring(i, i+1)
        if (char === guess) {
            let newString = maskedWord.split('')
            newString.splice(i, 1, guess)
            newString = newString.join('')
            maskedWord = newString
        }
    }

    output.innerHTML = maskedWord
}

newGame()

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault()
        const guess = input.value
        guessesNum++//tätä kasvatetaan aina
        if (guess.toLowerCase() === randomizedWord.toLowerCase()) {
            win()
        } else if (guess.length === 1) {
            //yksi kirjain
            const previous = maskedWord.toLocaleLowerCase()
            replaceFoundChars(guess)
            const current = maskedWord.toLocaleLowerCase()
            if (maskedWord.toLocaleLowerCase() === randomizedWord.toLocaleLowerCase()) {
                win()
            }
            else {

                if (previous === current) {
                    if (guessedLetters.includes(guess.toLowerCase())) {
                        alert("You already guessed '" + guess.toUpperCase() + "'")
                    }
                    else {
                        alert("There is no letter '" + guess.toUpperCase() + "'")
                        wrongGuessesNum++
                    }
                }
            }

            guessedLetters.push(guess.toLowerCase())
        } else {
            alert("You guessed wrong!")
            wrongGuessesNum++
        }
        input.value = ''

        span.innerHTML = guessesNum.toString()
        piirraOmaHirsipuu()
    }
})

function piirraOmaHirsipuu() {
    if (wrongGuessesNum === 0) {
        hirsipuuAscii.innerHTML = ''
    }
    else if (wrongGuessesNum <= 2) {
        let sisalto = ' <br>'//tätä käytetään defaulttina rivi 0
        if (wrongGuessesNum === 2) sisalto = '_______<br>'//tämä ylikirjoittaa jos wrong guesses on 2
        for (let i = 1; i <= 5; i++) {
            sisalto = sisalto + "|<br>"
        }
        hirsipuuAscii.innerHTML = sisalto
    }
    else if (wrongGuessesNum >= 3) {
        let sisalto = '_______<br>'//rivi 0. tämä tulee kaikissa tästä eteenpäin

        if (wrongGuessesNum === 3) {
            sisalto = sisalto + "|/<br>"//rivi 1
            for (let i = 2; i <= 5; i++) {
                sisalto = sisalto + "|<br>"//rivit 2-5
            }
        }
        else if (wrongGuessesNum === 4) {
            sisalto = sisalto + "|/    |<br>"//rivi 1
            for (let i = 2; i <= 5; i++) {
                sisalto = sisalto + "|<br>"//rivit 2-5
            }
        }
        else if (wrongGuessesNum === 5) {
            sisalto = sisalto + "|/    |<br>"//rivi 1
            sisalto = sisalto + "|     o<br>"//rivi 2
            for (let i = 3; i <= 5; i++) {
                sisalto = sisalto + "|<br>"//rivit 3-5
            }
        }
        else if (wrongGuessesNum === 6) {
            sisalto = sisalto + "|/    |<br>"//rivi 1
            sisalto = sisalto + "|     o<br>"//rivi 2
            sisalto = sisalto + "|     |<br>"//rivi 3
            for (let i = 4; i <= 5; i++) {
                sisalto = sisalto + "|<br>"//rivit 4-5
            }
        }
        else if (wrongGuessesNum === 7) {
            sisalto = sisalto + "|/    |<br>"//rivi 1
            sisalto = sisalto + "|     o<br>"//rivi 2
            sisalto = sisalto + "|    /|<br>"//rivi 3
            for (let i = 4; i <= 5; i++) {
                sisalto = sisalto + "|<br>"//rivit 4-5
            }
        }
        else if (wrongGuessesNum === 8) {
            sisalto = sisalto + "|/    |<br>"//rivi 1
            sisalto = sisalto + "|     o<br>"//rivi 2
            sisalto = sisalto + "|    /|\\<br>"//rivi 3, escaped character
            for (let i = 4; i <= 5; i++) {
                sisalto = sisalto + "|<br>"//rivit 4-5
            }
        }
        else if (wrongGuessesNum === 9) {
            sisalto = sisalto + "|/    |<br>"//rivi 1
            sisalto = sisalto + "|     o<br>"//rivi 2
            sisalto = sisalto + "|    /|\\<br>"//rivi 3
            sisalto = sisalto + "|    /<br>"//rivi 4
            sisalto = sisalto + "|<br>"//rivi 5
        }
        else if (wrongGuessesNum >= 10) {
            //normaalisti jos arvaa liikaa väärin niin häviää mutta tässä ei tule enää lisää
            sisalto = sisalto + "|/    |<br>"//rivi 1
            sisalto = sisalto + "|     o<br>"//rivi 2
            sisalto = sisalto + "|    /|\\<br>"//rivi 3
            sisalto = sisalto + "|    /\\<br>"
            sisalto = sisalto + "|<br>"
        }

        hirsipuuAscii.innerHTML = sisalto
    }
    
}