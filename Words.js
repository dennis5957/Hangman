const Letter = require("./letters");
const Colors = require("./colors");
const color = new Colors();
let isLoaded = false;


const Word = function (theWord) {
    this.theWord = theWord;
    this.letters = [];
    this.triesRemaining = 10;
    this.guessedMemory = 0;
    this.isGameOver = false;

    for (let i = 0; i < this.theWord.length; i++) {
        let newLetter = new Letter(this.theWord.substr(i, 1));
        this.letters.push(newLetter);
    }


    this.guess = function (aLetter) {
        let aLetterWasGuessed = false;
        this.letters.forEach(letter => {
            let thisLetterWasGuessed = letter.guess(aLetter);
            if (!aLetterWasGuessed && thisLetterWasGuessed) {
                aLetterWasGuessed = true;
            }
        });
        if (!aLetterWasGuessed) {
            this.triesRemaining -= 1;
            if (this.triesRemaining <= 0) {
                this.isGameOver = true;
            }
        }
        this.getResult();
        return this.isGameOver;
    }


    this.getResult = function () {
        let concatenatedResults = "";
        let totalGuessed = 0;
        this.letters.forEach(letter => {
            let character = letter.getCharacter(this.isGameOver) + " ";
            concatenatedResults += character; // when the game is over ALL letters (the solution) will be revealed
            if (character != "_ ") {
                totalGuessed += 1;
            }
            if (!this.isGameOver) {
                this.checkIfSolved(totalGuessed);
            }
        });
        if (isLoaded) {
            if (this.guessedMemory  != totalGuessed ) {
                console.log(color.FgGreen, "\nCorrect!!!");
                this.guessedMemory = totalGuessed;
            } else {
                console.log(color.FgRed, "\nIncorrect!!!");
            }
        } else {
            this.guessedMemory = totalGuessed;
            isLoaded = true;
        }
        console.log(color.FgWhite, "Tries Remaining: " + this.triesRemaining + "\n")
        console.log(concatenatedResults);
        console.log("\n");
    }


    this.checkIfSolved = function (howManyGuessedCorrectly) {
        if (this.isGameOver = (howManyGuessedCorrectly == theWord.length)) {
            console.log("\n\n!!!!!!!!!!!!!!  CONGRATULATIONS  !!!!!!!!!!!!\n\n");
        }
    }
}

module.exports = Word;