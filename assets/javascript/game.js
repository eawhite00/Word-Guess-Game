
//=========================Variables=========================
const wordChoices = ["tabby", "persian", "calico", "meow"];
const maxGuesses = 6;

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

function newGuess(guess){
    guessedLetters.push(guess);
    guessedLettersText.textContent = guessedLetters;
    numGuesses--;
    numGuessesText.textContent = numGuesses;
}

function evaluateGuess(guess){
    for (i = 0; i < theWord.length; i++){
        if (guess === theWord[i]){
            displayWord[i] = guess;
        }
    }
    currentWordText.textContent = displayWord.join("");
}

function checkForWin(){
    for (i = 0; i < displayWord.length; i++){
        if (displayWord[i] === "_ "){
            return false;
        }
    }
    return true;
}

function win(){
    numWins++;
    numWinsText.textContent = numWins;
    gameStatusText.textContent = "You won! Congratulations!";
    resetGame = true;
}

function lose(){
    numLosses++;
    numLossesText.textContent = numLosses;
    gameStatusText.textContent = "Sorry you lost! The word was " + theWord.join("");
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

        //setting all guesses to lower case to avoid conflicts
        var userGuess = event.key.toLocaleLowerCase();

        if (checkIfGuessed(userGuess) === false){
            newGuess(userGuess);
            evaluateGuess(userGuess);

            if(checkForWin()){
                win();
            }
            if (numGuesses === 0){
                lose();
            }

            
        }

    }

   
}
