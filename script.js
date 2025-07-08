WORDS = [
    "quack"
]

const NUMBER_OF_GUESSES = 1;
const WORDS_LENGTH = 5;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)]

function initGuessArea() {
    let board = document.getElementById("guess-cont");

    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        let row = document.createElement("div")
        row.className = "letter-row"

        for (let j = 0; j < 5; j++) {
            let box = document.createElement("div")
            box.className = "letter-box"
            row.appendChild(box)
        }

        board.appendChild(row)
    }
}

function checkGuess() {
    if (nextLetter != WORDS_LENGTH) {
        return
    } else {
        let guess = currentGuess.join("")
        if (guess === rightGuessString) {
            guessCorrect()
            setTimeout(function () {
                alert("Congratulations! You found today's word! Refresh to play again.")
            },100)
        } else {
            guessIncorrect()
        }
    }
}

function guessCorrect() {
    let row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining]
    let boxes = row.children
    for (let i = 0; i < WORDS_LENGTH; i++) {
        boxes[i].classList.add("correct-box");
    } 
    guessesRemaining -= 1
}

function guessIncorrect() {
    alert("Not a word!")
}

function insertLetter(letter) {
    if (nextLetter >= WORDS_LENGTH) {
        return
    } else {
        letter = letter.toLowerCase()
        let row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining]
        let box = row.children[nextLetter]
        box.textContent = letter
        box.classList.add("filled-box")
        currentGuess.push(letter)
        nextLetter += 1
        return
    }
}

function deleteLetter() {
    let row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining]
    let box = row.children[nextLetter-1]
    box.textContent = ""
    box.classList.remove("filled-box")
    currentGuess.pop()
    nextLetter -= 1
    return
}

document.addEventListener("keyup", (e) => {
    if (guessesRemaining === 0) {
        return
    }

    let pressedKey = String(e.key)
    if (pressedKey === "Backspace" && nextLetter !== 0) {
        deleteLetter()
        return
    }

    if (pressedKey === "Enter") {
        checkGuess()
        return
    }

    let found = pressedKey.match(/[a-z]/gi)
    if (!found || found.length > 1) {
        return
    } else {
        insertLetter(pressedKey)
        return
    }
})

initGuessArea()