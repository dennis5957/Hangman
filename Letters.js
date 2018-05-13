let Letter = function(theLetter) {
    this.placeHolder = "_";
    this.underlyingLetter = theLetter.toUpperCase();
    this.hasBeenGuessed = false;    

    this.getCharacter = function (isGameOver) {
        if(this.underlyingLetter === " " || this.underlyingLetter.match(/[^a-zA-Z]/i) || isGameOver) {
            this.hasBeenGuessed = true;
            return this.underlyingLetter;
        } else {
          return this.hasBeenGuessed ? this.underlyingLetter : this.placeHolder;        }        
    }


    this.guess = function (aLetter) {
        if(this.hasBeenGuessed) {
            return; // if the letter has already been guessed then we're done here
        }
      return this.hasBeenGuessed = (aLetter.toUpperCase() === this.underlyingLetter);
    }
}

module.exports = Letter;