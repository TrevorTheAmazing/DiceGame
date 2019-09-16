"use strict"
document.getElementById("pTest").innerHTML = "js Works!";

console.log("test log");

///////////////////////////////////////////////////////////////////



function initializeDiceArray(arrayOfDice) {
    for (let i = 0; i < 6; i++) {
        arrayOfDice.push(dice.createDice(String((i + 1)), Number(), String((i + 1))));
    }
    return arrayOfDice;
}

function diceReport(arrayOfDice) {
    for (let i = 0; i < arrayOfDice.length; i++) {
        console.log("d" + (i + 1) + " = " + arrayOfDice[i]);
    }
    return arrayOfDice;
}

// function diceRoll(arrayOfDice, dieCount) {
//     for (let i=0, i<dieCount-1; i++){
//         arrayOfDice[i]=
//     }
//     return arrayOfDice;
// }


////////////////////////////////////////////////////

//declare variables
var diceArray = [];

var dice = {
    diceName: "",
    sideCount: 6,
    pipCount: Number(),
    createDice: function () {
        return "", this.sideCount, this.pipCount;
    }
}




//initialize dice array
diceArray = initializeDiceArray(diceArray);

//log array values to console
diceReport(diceArray);

//roll the dice
//diceRoll(diceArray, 6);