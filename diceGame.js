"use strict"
//document.getElementById("pTest").innerHTML = "js Works!";
///////////////////////////////////////////////////////////////////

//declare variables
var diceArray = [];
var playerScore = 0;
var diceCountInput = 0;
var sideCountInput = 0;
var practiceMode = true;

function playGame(practiceModeIn) {
    function initializeDiceArray(arrayOfDice, diceCountIn, sideCountIn) {
        for (let i = 0; i <= (diceCountIn - 1); i++) {
            let die = { dieName: "d" + (i + 1), sideCount: sideCountIn, pipCount: i + 1, keepStatus: false };
            arrayOfDice.push(die);
        }
        return arrayOfDice;
    }

    //initialize dice array
    diceArray = initializeDiceArray(diceArray, diceCountInput, sideCountInput);

    if (practiceModeIn === false) {
        playerScore = playRealDiceGame();
    }
    else {
        playerScore = playPracticeMode();
    }

    //!//game over    
}

function playRealDiceGame() {
    let tempPlayerScore = 0;
    for (let i = 0; i <= 3; i++) {
        tempPlayerScore += playPracticeMode();
    }
    //!//scoreHand();
    playerScore += tempPlayerScore;
}
function playPracticeMode() {

    let tempPlayerScore = 0;
    //welcome message
    console.log("These are your dice:");

    //play one turn
    playOneTurn();

    //tally the score of the kept dice
    if (confirm("would you like to score your hand?") === true) {
        tempPlayerScore += tallyScore(diceArray);
    }
    return tempPlayerScore;
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



function playOneTurn() {
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
        //set the keepStatus
        for (let i = 0; i < arrayOfDice.length; i++) {
            alert(arrayOfDice[i].dieName + " is showing " + arrayOfDice[i].pipCount + " after the roll.");
            arrayOfDice[i].keepStatus = (prompt("Would you like to keep? y/n") === 'y');
        }
        return arrayOfDice;
    }

    //BEGIN playOneTurn()//
    //roll the dice
    diceArray = diceRoll(diceArray, diceArray.length);

    //report the results
    console.log("Here is the new status of your dice:");
    //diceReport(diceArray);
    diceArray = diceReport(diceArray);

    //option to keep

    //set the keepStatus to prevent rolling a dice that is 'kept'
    setKeepStatus(diceArray);
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

playGame(practiceMode);

//game over
alert("game over.  your score is: " + playerScore);