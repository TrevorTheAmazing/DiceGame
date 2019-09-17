"use strict"
//TO DO:
// DONE - 0. parameterize initializeDiceArray and diceRoll with sideCount
// NO - 1. prompt for sideCount at gametime to pass to initializeDiceArray and diceRoll
// *leave sideCount as a property of the dice being rolled; parameterizing that will not add any benefit to rollDice(arrayOfDice).
//
// DONE - 2. prompt to set dice.keepStatus
// 3. 

//document.getElementById("pTest").innerHTML = "js Works!";
///////////////////////////////////////////////////////////////////


//declare variables
var diceArray = [];
var playerScore = 0;
var diceCountInput = 0;
var sideCountInput = 0;
var practiceMode = true;

//function initializeDiceArray(arrayOfDice) {
function initializeDiceArray(arrayOfDice, diceCountIn, sideCountIn) {
    //for (let i = 0; i < 6; i++) {
    //for (let i = 0; i <= (diceCountInput - 1); i++) {
    for (let i = 0; i <= (diceCountIn - 1); i++) {
        //let die = { dieName: "d" + (i + 1), sideCount: 6, pipCount: i + 1, keepStatus: false };
        //let die = { dieName: "d" + (i + 1), sideCount: sideCountInput, pipCount: i + 1, keepStatus: false };
        let die = { dieName: "d" + (i + 1), sideCount: sideCountIn, pipCount: i + 1, keepStatus: false };
        arrayOfDice.push(die);
    }
    return arrayOfDice;
}

function diceReport(arrayOfDice) {
    // function pipCompare(a, b) {
    //     if (a.pipCount < b.pipCount) {
    //         return -1;
    //     }
    //     if (a.pipCount > b.pipCount) {
    //         return 1;
    //     }
    //     return 0;
    // }

    arrayOfDice = arrayOfDice.sort(function (a, b) { return a.pipCount - b.pipCount });
    //arrayOfDice = arrayOfDice.sort(pipCompare(a, b) { return a.pipCount - b.pipCount });
    for (let i = 0; i < arrayOfDice.length; i++) {
        console.log(arrayOfDice[i].dieName + " shows " + arrayOfDice[i].pipCount);
    }
    return arrayOfDice;
}

//function diceRoll(arrayOfDice, countDiceToRoll) {
function diceRoll(arrayOfDice) {
    //console.log("You roll the dice.");
    alert("You roll the dice.");

    for (let i = 0; i < arrayOfDice.length; i++) {
        if (arrayOfDice[i].keepStatus === false) {
            //arrayOfDice[i].pipCount = Number(Math.floor(Math.random() * 6) + 1);
            arrayOfDice[i].pipCount = Number(Math.floor(Math.random() * arrayOfDice[i].sideCount) + 1);
        }
    }
    return arrayOfDice;
}

//set the keepStatus to prevent rolling a dice that is 'kept'
function setKeepStatus(arrayOfDice) {
    for (let i = 0; i < arrayOfDice.length; i++) {
        //console.log(arrayOfDice[i].dieName + " is showing " + arrayOfDice[i].pipCount + " after the roll.");
        alert(arrayOfDice[i].dieName + " is showing " + arrayOfDice[i].pipCount + " after the roll.");
        arrayOfDice[i].keepStatus = (prompt("Would you like to keep? y/n") === 'y');
    }
}

function tallyScore(arrayOfDice) {
    let tempScore = 0;
    for (let i = 0; i <= 3; i++) {
        if (arrayOfDice[i].keepStatus == true) {
            //score
            tempScore += arrayOfDice[i].pipCount;
        }
    }
    return tempScore;
}

function playGame(practiceModeIn) {
    //initialize dice array
    //diceArray = initializeDiceArray(diceArray);
    diceArray = initializeDiceArray(diceArray, diceCountInput, sideCountInput);

    //!//diceReport(diceArray);  
    switch (practiceModeIn) {
        case (practiceModeIn === false):
            playRealDiceGame();
            break;
        case (practiceModeIn === true):
            playPracticeMode();
            break;
        default:
            playPracticeMode();
    }

    //!//game over    
}

function playOneTurn() {
    //roll the dice
    diceArray = diceRoll(diceArray, diceArray.length);

    //report the results
    console.log("Here is the new status of your dice:");
    diceReport(diceArray);

    //option to keep

    //set the keepStatus to prevent rolling a dice that is 'kept'
    setKeepStatus(diceArray);

    // //tally the score of the kept dice
    // if (confirm("would you like to score your hand?") === true) {
    //     playerScore += tallyScore(diceArray);
    //}

}

function playPracticeMode() {

    let tempPlayerScore = 0;
    //welcome message
    console.log("Welcome to Dice Game!  These are your dice:");

    //play one turn
    playOneTurn();

    //tally the score of the kept dice
    if (confirm("would you like to score your hand?") === true) {
        tempPlayerScore += tallyScore(diceArray);

        return tempPlayerScore;

        // //roll the dice
        // diceArray = diceRoll(diceArray, diceArray.length);

        // //report the results
        // console.log("Here is the new status of your dice:");
        // diceReport(diceArray);

        // //option to keep

        // //set the keepStatus to prevent rolling a dice that is 'kept'
        // setKeepStatus(diceArray);

        // //tally the score of the kept dice
        // if (confirm("would you like to score your hand?") === true) {
        //     playerScore += tallyScore(diceArray);
        // }

    }
}

function playRealDiceGame() {
    let tempPlayerScore = 0;
    for (let i = 0; i <= 3; i++) {
        tempPlayerScore += playPracticeMode();
    }
    playerScore += tempPlayerScore;
}


//BEGIN DICE GAME
//clear the console
console.clear();



diceCountInput = Number(prompt("How many dice will you be playing with?"));
sideCountInput = Number(prompt("How many sides shall your dice have?"));

if ((diceCountInput == 5) && (sideCountInput == 6)) {
    if (prompt("Would you like to play a game that is not unlike 'Yahtzee?'") === 'y') {
        //alert("call playGame(realDeal)");
        practiceMode = false;
    }
}

//game over
alert("game over.  your score is: " + playerScore);