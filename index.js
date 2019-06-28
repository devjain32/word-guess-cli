var inquirer = require("inquirer")
var words = ["bears", "beets", "wuphf", "dundies", "tuna", "flonkerton", "scarn", "cornell"];
var indexArr = Math.floor(Math.random() * words.length);
var letterArr;
var numberWrong = 4;
var withoutBlanks;
var withBlanks = [];
var guess;
var word;
var withBlanksWord;

inquirer
    .prompt([
        {
            message: "Do you want to start Hangman: the Office?",
            type: "confirm",
            name: "ready",
            default: true
        }
    ]).then(function (response) {
        if (response.ready) {
            console.log("There will be a randomly chosen word from the Office and you have three tries to guess it. Good luck!")
            startGame();
        }
        else {
            console.log("Oh no!")
        }
    });

    
function next() {
    inquirer
        .prompt([
            {
                message: "Guess a letter!",
                type: "input",
                name: "letter"
            }
        ]).then(function (response) {
            guess = response.letter
            checker();
        })
}


function startGame() {
    letterArr = words[indexArr].split("");
    withoutBlanks = letterArr.join(" ");
    for (var i = 0; i < letterArr.length; i++) {
        withBlanks.push("_");
    }
    console.log(withBlanks.join(" "))
    if (guess) {
        checker();
    }
    else {
        next();
    }
}

function checker() {
    var status = 0;
    for (var i = 0; i < letterArr.length; i++) {
        if (guess === letterArr[i]) {
            status++;
        }
    }
    if (status === 0) {
        numberWrong--;
        if (numberWrong === 1) {
            console.log("Incorrect! You have " + numberWrong + " guess remaining.");
            next();
        }
        else if (numberWrong >= 1) {
            console.log("Incorrect! You have " + numberWrong + " guesses remaining.");
            next();

        }
        else if (numberWrong === 0) {
            console.log("Game over! You have 0 guesses remaining. The word was " + withoutBlanks);
            gameOver();
        }
    }
    else {
        console.log("correct!")
        populate();
    }
}

function populate() {
    for (var j = 0; j < withBlanks.length; j++) {
        if (letterArr[j] === guess) {
            withBlanks[j] = guess;
        }
    }
    console.log(withBlanks.join(" "))
    var statusBlanks = 0;
    var statusLetters = 0;
    for (var k = 0 ; k < withBlanks.length ; k++) {
        if (letterArr[k] === "_") {
            statusBlanks++;
        }
        else if (letterArr[k] !== "_") {
            statusLetters++;
        }
    }
    if (statusBlanks >= 0) {
        next();
    }
    else if (statusBlanks === 0) {
        gameOver();
    }
}

function gameOver() {
    console.log("Thank you for playing!")
}

//when started, randomly generate word from array and show it with blanks
//get letter that user inputs
//check if letter is in word
//if letter is in word, show that letter (all occurrences of it)
//if not, say incorrect and show how many guesses left
//if all letters are there, they won and it generates a new word from the array
//restart with reset numberWrong


//take the random word, put into array, get its length, and generate an array with blanks that's the same length
//(these are two different arrays)
//loop over word array and compare it to user guess
//mark the index that the letter guessed is in and replace the index on the blanks array with that letter
//after replacing, run back over the array again and if there's any index equal to a blank, you guess again
//if there's no blanks, they win!