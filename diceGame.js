"use strict"
//TO DO:
// 0. parameterize initializeDiceArray and diceRoll with sideCount
// 1. prompt for sideCount at gametime to pass to initializeDiceArray and diceRoll
// 2. prompt to set dice.keepStatus
// 3. 

//document.getElementById("pTest").innerHTML = "js Works!";
///////////////////////////////////////////////////////////////////
//declare variables
var diceArray = [];


function initializeDiceArray(arrayOfDice) {
    //for (let i = 0; i < 6; i++) {
    for (let i = 0; i <= (diceCountInput - 1); i++) {
        //let die = { dieName: "d" + (i + 1), sideCount: 6, pipCount: i + 1, keepStatus: false };
        let die = { dieName: "d" + (i + 1), sideCount: sideCountInput, pipCount: i + 1, keepStatus: false };
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
    console.log("You roll the dice.");

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


//clear the console
console.clear();

var diceCountInput = 0;
var sideCountInput = 0;

diceCountInput = Number(prompt("How many dice will you be playing with?"));
sideCountInput = Number(prompt("How many sides shall your dice have?"));

if ((diceCountInput == 5) && (sideCountInput == 6)) {
    if (prompt("Would you like to play a game that is not unlike 'Yahtzee?'") === 'y') {
        alert("call playGame(realDeal)");
    }
    else {
        alert("call playGame(practiceMode)");
    }
}

//initialize dice array
diceArray = initializeDiceArray(diceArray);

//log array values to console
console.log("Welcome to Dice Game!  These are your dice:");

diceReport(diceArray);

//roll the dice
//diceArray = diceRoll(diceArray, 6);
diceArray = diceRoll(diceArray, diceArray.length);
console.log("Here is the new status of your dice:");
diceReport(diceArray);

//set the keepStatus to prevent rolling a dice that is 'kept'
setKeepStatus(diceArray);

//score the kept dice as the sum of the kept dice after three turns.
//log the turn number.
//add more conditions later for: multiples(2x,3x,5x), runs
//log 'game over' and announe the score

if (confirm("") === true) {
    for (let i = 0; i <= 3; i++) {
        //roll
        //keep?
    }
    //score
}

//game over

// playGame(gameMode){
//     }

