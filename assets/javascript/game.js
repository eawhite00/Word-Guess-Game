//=========================Variables=========================

//For testing I only included four different words
const wordChoices = ["tabby", "persian", "calico", "meow"];
const maxGuesses = 10; //set as a const here to easily modify / test
const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

var gameStarted = false;
var resetGame = true;
var theWord = [];
var displayWord = [];
var guessedLetters = [];
var numGuesses;
var numWins = 0;
var numLosses = 0;

var currentWordText = document.getElementById("currentWord");
var numGuessesText = document.getElementById("guessesRemaining");
var guessedLettersText = document.getElementById("lettersGuessed");
var numWinsText = document.getElementById("numWins");
var numLossesText = document.getElementById("numLosses");
var gameStatusText = document.getElementById("gameStatus");



//=========================Functions=========================

//This sets up a fresh word, resets the guesses, and displays everything
function setupGame(){
    chooseWord();
    currentWordText.textContent = displayWord.join("");
    gameStatusText.textContent = "Press any letter to guess it!";
    numGuesses = maxGuesses;
    numGuessesText.textContent = numGuesses;
    resetGame = false;
}

//This is a function that picks a word out of the word choice array
function chooseWord(){
    var chosenWord = wordChoices[Math.floor(Math.random() * wordChoices.length)]
    theWord.length = 0;
    for (i = 0; i < chosenWord.length; i++){
        theWord.push(chosenWord.charAt(i));
    }  

    //Once we've pushed the word into its array, we'll set up our display array
    setupDisplay();
}


//Here's a function to set up the displayed version of the word, initialzed as 
//underscores.
function setupDisplay(){
    displayWord.length = 0;
    for (i = 0; i < theWord.length; i++){
        displayWord.push("_ ");
    }

    //setting length to zero rests if this isn't the first round
    guessedLetters.length = 0;
    guessedLettersText.textContent = guessedLetters;
}

//Here we check to see if the letter inputted has been guessed already
function checkIfGuessed(guess){
    var guessedYet = false;

    for (i=0; i < guessedLetters.length; i++){
        if (guess === guessedLetters[i]){
            guessedYet = true;
        }
    }

    return guessedYet;
}

//This functions checks to see if the input was a letter
function checkLetter(guess){
    for (i = 0; i < alphabet.length; i++){
        if (guess === alphabet[i]){
            return true;
        }
    }
    return false;
}

//This handles a letter this first time it's guessed
function newGuess(guess){
    guessedLetters.push(guess);
    guessedLettersText.textContent = guessedLetters;
    numGuesses--;
    numGuessesText.textContent = numGuesses;
}

//This checks to see if the guessed letter is in the target word
function evaluateGuess(guess){
    for (i = 0; i < theWord.length; i++){
        if (guess === theWord[i]){
            displayWord[i] = guess;
        }
    }
    currentWordText.textContent = displayWord.join("");
}

//This checks to see if the player has won
function checkForWin(){
    for (i = 0; i < displayWord.length; i++){
        if (displayWord[i] === "_ "){
            return false;
        }
    }
    return true;
}

//this handles the behavior of a win
function win(){
    numWins++;
    numWinsText.textContent = numWins;
    gameStatusText.textContent = "You won! Congratulations! Hit a key to play again.";
    resetGame = true;
}

//this handles the behavior of a loss
function lose(){
    numLosses++;
    numLossesText.textContent = numLosses;
    gameStatusText.textContent = "Sorry, you lost! The word was " + theWord.join("") +". Hit a key to play again!";
    resetGame = true;
}


//=========================Running the game=========================
document.onkeyup = function(event){ 

    document.getElementById("getStarted").style.display = "none";
    document.getElementById("gameContent").style.display = "block"; 

    if (resetGame === true){
        setupGame();
    }
    else {

        //Here we set all guesses to lower case to avoid conflicts
        var userGuess = event.key.toLocaleLowerCase();

        if (checkIfGuessed(userGuess) === false && checkLetter(userGuess) === true){
            newGuess(userGuess);
            evaluateGuess(userGuess);

            if(checkForWin()){
                win();
            }
            else if (numGuesses === 0){
                lose();
            }

            
        }

    }

   
}
