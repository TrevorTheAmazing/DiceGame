"use strict"
//document.getElementById("pTest").innerHTML = "js Works!";

//console.log("test log");

///////////////////////////////////////////////////////////////////

//declare variables
var diceArray = [];

function initializeDiceArray(arrayOfDice) {
    for (let i = 0; i < 6; i++) {
        let die = { dieName: "d" + (i + 1), sideCount: 6, pipCount: i + 1, keepStatus: false };
        arrayOfDice.push(die);
    }
    return arrayOfDice;
}

function diceReport(arrayOfDice) {
    function pipCompare(a, b) {
        if (a.pipCount < b.pipCount) {
            return -1;
        }
        if (a.pipCount > b.pipCount) {
            return 1;
        }
        return 0;
    }

    arrayOfDice = arrayOfDice.sort(function (a, b) { return a.pipCount - b.pipCount });
    for (let i = 0; i < arrayOfDice.length; i++) {
        console.log(arrayOfDice[i].dieName + " shows " + arrayOfDice[i].pipCount);
    }
    return arrayOfDice;
}

function diceRoll(arrayOfDice, countDiceToRoll) {
    console.log("You roll the dice.");

    for (let i = 0; i < arrayOfDice.length; i++) {
        if (arrayOfDice[i].keepStatus === false) {
            arrayOfDice[i].pipCount = Number(Math.floor(Math.random() * 6) + 1);
        }
    }

    return arrayOfDice;
}


//clear the console
console.clear();

//initialize dice array
diceArray = initializeDiceArray(diceArray);

//log array values to console
console.log("Welcome to Dice Game!  These are your dice:");

diceReport(diceArray);

//roll the dice
diceArray = diceRoll(diceArray, 6);
console.log("Here is the new status of your dice:");
diceReport(diceArray);
