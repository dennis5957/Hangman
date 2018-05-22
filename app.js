const Word = require("./words");
const prompt = require("prompt");
const colors = require("colors/safe");
const fs = require("fs");

let theWord = null;
let previousGuesses = [];

// Set up some Prompt attributes to make it purdy
prompt.message = colors.rainbow("Constructors Hangman");
prompt.delimiter = colors.grey(" > ");

// Start Prompt
prompt.start();

function newGame() {
    // Pick a 'Word' (Phrase) at random from words-to-guess.txt
    fs.readFile("./words-to-guess.txt", "UTF-8", (err, phrases) => {
        if (err) {
            console.log(err);
            return;
        }
        let wordArr = phrases.split("\r\n");
        let randomNumber = Math.floor(Math.random() * wordArr.length); // get a random number based on amount of phrases available
        theWord = new Word(wordArr[randomNumber]); // Create a new Word Object with selected word
        theWord.getResult();
        promptForLetter();
    });
}

// This function essentially recalls itself, prompting the user for another letter.
// The loop is stopped once the game is over or the user enters 'exit' at the prompt
function promptForLetter() {
    let promptOptions = {
        properties: {
            guessedLetter: {
                pattern: "[a-zA-Z]",
                description: "Guess ONE Letter",
                message: "Do you know what 'A' & 'Letter' mean?",
                required: true
            }
        }
    };
    prompt.get(promptOptions, function (err, res) {
        let userGuess = res.guessedLetter.toUpperCase();
        if(previousGuesses.includes(userGuess)) {
            console.log("You've already tried this letter");
            promptForLetter();
            return;
        } else {
            previousGuesses.push(userGuess);
        }
        if (userGuess == "EXIT") { // if the user types 'exit' then exit the game
            console.log("\nGOOD BYE!\n");
            return;
        } else {
            let isGameOver = theWord.guess(userGuess);
            // WORD.guess function returns true if the game is over
            if (!isGameOver) { 
                promptForLetter(); // If the game is NOT over then prompt the user again
            } else {
                console.log("GAME OVER!"); // Let the player know that the game is over
                previousGuesses = [];
                promptNewGame();
            }
        }
    });
}

function promptNewGame() {
    let promptOptions = {
        properties: {
            YN: {
                pattern: "[yYnN]",
                description: "New Game? Y or N",
                message: "Y means YES, N means NO... it's not that hard",
                required: true
            }
        }
    };
    prompt.get(promptOptions, function (err, res) {
        if (res.YN.toUpperCase() == "Y") {
            newGame();
        } else {
            console.log("\nGOODBYE\n");
        }
    });
}

// Start The Game
newGame();