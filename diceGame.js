"use strict"
//document.getElementById("pTest").innerHTML = "js Works!";
///////////////////////////////////////////////////////////////////

function playGame(practiceModeIn) {
    //helper function
    function initializeDiceArray(arrayOfDice, diceCountIn, sideCountIn) {
        for (let i = 0; i <= (diceCountIn - 1); i++) {
            let die = { dieName: "d" + (i + 1), sideCount: sideCountIn, pipCount: i + 1, keepStatus: false };
            arrayOfDice.push(die);
        }
        return arrayOfDice;
    }

    //begin playGame(practiceModeIn)
    //initialize dice array
    diceArray = initializeDiceArray(diceArray, diceCountInput, sideCountInput);

    let numberOfRounds = 1;
    if (practiceModeIn === false) {
        numberOfRounds = 10;
    }

    playerScore = playDiceGame(diceArray, numberOfRounds);

    return playerScore;
}//END playGame(practiceModeIn)

function playDiceGame(arrayOfDice, numberOfRounds) {
    function clearKeepStatus(arrayOfDice) {
        for (let i = 0; i < arrayOfDice.length; i++) {
            arrayOfDice[i].keepStatus = false;
        }
        return arrayOfDice;
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
    }// END tallyScore(arrayOfDice)

    //BEGIN playDiceGame(aOD, nOT)

    for (let t = 1; t <= numberOfRounds; t++) {
        let turnIsOver = false;
        alert("Round " + t);
        if ((t === 10) || (numberOfRounds === 1)) {
            alert("this is the final turn!");
            turnIsOver = true;
        }
        //clear keepStatus
        arrayOfDice = clearKeepStatus(arrayOfDice);

        for (let i = 1; i <= 3; i++) {
            arrayOfDice = playOneTurn(arrayOfDice);
            //option to score
            if (confirm("would you like to score your hand?") == true) {
                turnIsOver = true;
                break;
            }
        }


        let turnScore = 0;
        turnScore += tallyScore(arrayOfDice);

        alert("the turn is over.  your score for this turn is " + turnScore);
        playerScore += turnScore;
        alert("your current score is " + playerScore);
    }

    return playerScore;
}// END playDiceGame(aOD, nOT)




function playOneTurn(arrayOfDice) {
    function diceRoll(arrayOfDice) {
        alert("You roll the dice.");

        for (let i = 0; i < arrayOfDice.length; i++) {
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
                alert(arrayOfDice[i].dieName + " is showing " + arrayOfDice[i].pipCount + " after the roll.");
                arrayOfDice[i].keepStatus = (prompt("Would you like to keep? y/n") === 'y');
            }

        }
        return arrayOfDice;
    }


    //BEGIN playOneTurn(diceArray)//
    //roll the dice
    arrayOfDice = diceRoll(arrayOfDice, diceArray.length);

    //report the results
    console.log("Here is the new status of your dice:");
    //diceReport(diceArray);
    arrayOfDice = diceReport(arrayOfDice);

    //option to keep
    arrayOfDice = setKeepStatus(arrayOfDice);

    return arrayOfDice;
}// END playOneTurn(arrayOfDice);

function gameOver(playerScoreIn) {
    alert("game over.  your score is: " + playerScoreIn);
}



//BEGIN DICE GAME////
//clear the console//
console.clear();

//declare variables
var diceArray = [];
var playerScore = 0;
var diceCountInput = 0;
var sideCountInput = 0;
var practiceMode = true;

//prompt for game info
diceCountInput = Number(prompt("How many dice will you be playing with?"));
sideCountInput = Number(prompt("How many sides shall your dice have?"));

if ((diceCountInput == 5) && (sideCountInput == 6)) {
    if (prompt("Would you like to play a game that is not unlike 'Yahtzee?'") === 'y') {
        practiceMode = false;
    }
}

playerScore = playGame(practiceMode);

//game over
gameOver(playerScore);