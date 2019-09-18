"use strict"
//document.getElementById("pTest").innerHTML = "js Works!";
///////////////////////////////////////////////////////////////////

//BEGIN DICE GAME////
//clear the console//
console.clear();

//declare variables
var diceArray = [];
var playerScore = 0;
var numberOfRounds = 3;
var diceCountInput = 5;
var sideCountInput = 6;
var globalBonusCondition = false;

playerScore = playGame();
gameOver(playerScore);

//END SCRIPT
function playGame() {
    //begin playGame(practiceModeIn)
    //initialize dice array
    console.log("welcome to dice game!");
    alert("welcome to dice game!");
    diceArray = initializeDiceArray(diceArray, diceCountInput, sideCountInput);
    playerScore = playDiceGame(diceArray, numberOfRounds);
    return playerScore;
}//END playGame(practiceModeIn)

function initializeDiceArray(arrayOfDice, diceCountIn, sideCountIn) {
    for (let i = 0; i <= (diceCountIn - 1); i++) {
        if (globalBonusCondition) {
            let tempIter = Number(i + 7);
            let die = { dieName: "b" + (i + 1), sideCount: tempIter, pipCount: (tempIter + 1), keepStatus: false };
            arrayOfDice.push(die);
        }
        else {
            let die = { dieName: "d" + (i + 1), sideCount: sideCountIn, pipCount: (i + 1), keepStatus: false };
            arrayOfDice.push(die);
        }
    }
    return arrayOfDice;
}

function playDiceGame(arrayOfDice, numberOfRounds) {
    for (let t = 1; t <= numberOfRounds; t++) {
        //let turnIsOver = false;
        console.log("Round " + t);
        alert("Round " + t);
        //if ((t === 10) || (numberOfRounds === 1)) {
        if (numberOfRounds === 1) {
            if (!globalBonusCondition) {
                //turnIsOver = true;
                console.log("this is the final turn!");
                alert("this is the final turn!");
            }
        }
        //clear keepStatus at the beginning of a turn
        arrayOfDice = clearKeepStatus(arrayOfDice);

        let turnScore = 0;

        //for (let i = 1; i <= 3; i++) {
        arrayOfDice = playOneTurn(arrayOfDice);

        //check for yahtzee
        if (yahtzee(arrayOfDice) === true) {
            console.log("yay B0NUS C0NDITI0N!");
            alert("yay B0NUS C0NDITI0N!");
            let bonusScore = 0;
            bonusScore = doBonusRound();
            turnScore += bonusScore;
        }

        turnScore += tallyScore(arrayOfDice);
        console.log("the turn is over.  your score for this turn is " + turnScore);
        alert("the turn is over.  your score for this turn is " + turnScore);

        playerScore += turnScore;
        console.log("your current score is " + playerScore);
        alert("your current score is " + playerScore);
    }

    return playerScore;
}// END playDiceGame(aOD, nOT)

function clearKeepStatus(arrayOfDice) {
    for (let i = 0; i < arrayOfDice.length; i++) {
        arrayOfDice[i].keepStatus = false;
    }
    return arrayOfDice;
}

function playOneTurn(arrayOfDice) {
    //BEGIN playOneTurn(diceArray)//
    //loop 3 times prior to ending the turn
    for (let i = 1; i < 4; i++) {
        //roll the dice
        console.log("roll " + i);
        alert("roll " + i);
        arrayOfDice = diceRoll(arrayOfDice, diceArray.length);

        //report the results
        console.log("Here is the new status of your dice:");
        //diceReport(diceArray);
        arrayOfDice = diceReport(arrayOfDice);

        //option to keep
        arrayOfDice = setKeepStatus(arrayOfDice);

        console.log("end of roll " + i);
        alert("end of roll " + i);
    }

    return arrayOfDice;
}// END playOneTurn(arrayOfDice);

function diceRoll(arrayOfDice) {
    //alert("You roll the dice.");

    for (let i = 0; i < arrayOfDice.length; i++) {
        //don't reroll kept dice
        if (arrayOfDice[i].keepStatus === false) {
            arrayOfDice[i].pipCount = Number(Math.floor(Math.random() * arrayOfDice[i].sideCount) + 1);
        }
    }
    return arrayOfDice;
}

function diceReport(arrayOfDice) {
    arrayOfDice = arrayOfDice.sort(function (a, b) { return a.pipCount - b.pipCount });
    for (let i = 0; i < arrayOfDice.length; i++) {
        console.log(arrayOfDice[i].dieName + " shows " + arrayOfDice[i].pipCount);
    }
    return arrayOfDice;
}

function setKeepStatus(arrayOfDice) {
    //set the keepStatus to prevent rolling a dice that is 'kept'
    for (let i = 0; i < arrayOfDice.length; i++) {
        if (arrayOfDice[i].keepStatus !== true) {
            if (globalBonusCondition) {
                alert(arrayOfDice[i].dieName + " is showing " + arrayOfDice[i].pipCount + " after the roll.  it has " + arrayOfDice[i].sideCount + " sides.");
            }
            else {
                alert(arrayOfDice[i].dieName + " is showing " + arrayOfDice[i].pipCount + " after the roll.");
            }

            arrayOfDice[i].keepStatus = (prompt("Would you like to keep? y/n") === 'y');
        }

    }
    return arrayOfDice;
}

function tallyScore(arrayOfDice) {
    let tempScore = 0;
    for (let i = 0; i < arrayOfDice.length; i++) {
        if (arrayOfDice[i].keepStatus == true) {
            //score
            tempScore += arrayOfDice[i].pipCount;
        }
    }
    return tempScore;
}// END tallyScore(arrayOfDice)

function yahtzee(arrayOfDice) {
    let tempNum = arrayOfDice[0].pipCount;
    for (let i = 0; i < arrayOfDice.length; i++) {
        if ((arrayOfDice[i].pipCount === tempNum) && (i === arrayOfDice.length)) {
            globalBonusCondition = true;
        }
    }
    return globalBonusCondition;
}

function doBonusRound() {
    let bonusScore = 0;
    let arrayOfDiceBonus = [];
    //initialize a new diceArray called arrayOfDiceBonus
    arrayOfDiceBonus = initializeDiceArray(arrayOfDiceBonus, 5, sideCountInput + 1);

    for (let i = 0; i < arrayOfDiceBonus.length; i++) {
        console.log("bonus roll " + i);
        alert("bonus roll " + i);
        arrayOfDiceBonus = diceRoll(arrayOfDiceBonus);
        console.log("Here is the new status of your dice:");
        //diceReport(diceArray);
        arrayOfDiceBonus = diceReport(arrayOfDiceBonus);
        arrayOfDiceBonus = setKeepStatus(arrayOfDiceBonus);
    }

    //score the bonus array
    for (let i = 0; i < arrayOfDiceBonus.length; i++) {
        bonusScore += arrayOfDiceBonus[i].pipCount;
        if (i == (arrayOfDiceBonus.length - 1)) {
            //subtract the value of the last 
            bonusScore -= (2 * arrayOfDiceBonus[i].pipCount);
        }
    }
    console.log("you scored " + bonusScore + " in the bonus round.");
    alert("you scored " + bonusScore + " in the bonus round.");
    console.log("the bonus round is over.");
    alert("the bonus round is over.");

    globalBonusCondition = false;
    return bonusScore;
}


function gameOver(playerScoreIn) {
    console.log("game over.  your final score is: " + playerScoreIn);
    alert("game over.  your final score is: " + playerScoreIn);
}

//game over


































