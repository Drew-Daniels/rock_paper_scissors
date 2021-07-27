const computerName = "The Computer"
const playerName = "The Player"

let computerScore = 0;
let playerScore = 0;

const ROCK = "rock"
const PAPER = 'paper'
const SCISSORS = 'scissors'
const options = [ROCK, PAPER, SCISSORS]


function computerPlay(arr=options) {
    let play = arr[Math.floor(Math.random()*arr.length)];
    return play;
}

function validateEntry(entry, arr=options) {
    if (!(arr.includes(entry))) {   // if not in list, make educated guess
        let firstLetter = entry[0];
        firstLetter = firstLetter.toLowerCase();
        console.log(firstLetter);
        if (firstLetter == "r") {
            return ROCK;
        } else if (firstLetter == "p") {
            return PAPER;
        } else if (firstLetter == "s") {
            return SCISSORS;
        } else {
            return ROCK;
        }
    }
}

function getInput(msg = "Rock, Paper, Scissors?") {
    result = prompt(msg)
    return result;
}

function prepareResults(winner, winnerPlay, loserPlay) {
    let nonTieMsg;

    let winnerName;
    let winnerChoice;

    let loserName;
    let loserChoice;

    // Declare winners
    if (winner === computerName) {
        winnerName = computerName; // computer wins
        loserName = playerName;
        computerScore = ++computerScore;

    } else {
        winnerName = playerName; // player wins
        loserName = computerName;
        playerScore = ++playerScore;
        
    }

    // Keep plays
    winnerChoice = winnerPlay;
    loserChoice = loserPlay;

    // Return formatted msg
    nonTieMsg = `${winnerName} played ${winnerChoice} against ${loserName}'s ${loserChoice} and won`
    return nonTieMsg;
}

function playRound(playerSelection, computerSelection) {
    let tieChoice;
    let tieMsg;

    playerSelection = playerSelection.toLowerCase();
    let finMsg; // Determined after game played

    switch (true) {
        case (playerSelection === computerSelection):
            tieChoice = playerSelection;
            tieMsg = `Tie! Both players played ${tieChoice}`;
            return tieMsg;
        //first attempts are computer-wins
        case (playerSelection === ROCK):
            if (computerSelection === PAPER) {
                finMsg = prepareResults(computerName, computerSelection, playerSelection); // computer win
            } else {
                finMsg = prepareResults(playerName, playerSelection, computerSelection); // player win
            }
            break;
        case (playerSelection === PAPER):
            if (computerSelection === SCISSORS) {
                finMsg = prepareResults(computerName, computerSelection, playerSelection);
            } else {
                finMsg = prepareResults(playerName, playerSelection, computerSelection);
            }
            break;
        default: //playerSelection is 'scissors'
            if (computerSelection === ROCK) {
                finMsg = prepareResults(computerName, computerSelection, playerSelection);
            } else {
                finMsg = prepareResults(playerName, playerSelection, computerSelection);
            }
            break;
    }

    return finMsg
}

function playGame() {
    let winner;
    let loser;

    let winScore;
    let losScore;

    console.log("Round 1: " + playRound(validateEntry(getInput()), computerPlay()));
    console.log("Round 2: " + playRound(validateEntry(getInput()), computerPlay()));
    console.log("Round 3: " + playRound(validateEntry(getInput()), computerPlay()));
    console.log("Round 4: " + playRound(validateEntry(getInput()), computerPlay()));
    console.log("Round 5: " + playRound(validateEntry(getInput()), computerPlay()));

    if (computerScore === playerScore) {
        return (`Tie: ${computerName} scored ${computerScore} and ${playerName} scored ${playerScore}`)
    } else if (computerScore > playerScore) {
        winner = computerName;
        loser = playerName;
        winScore = computerScore;
        losScore = playerScore;
    } else {
        winner = playerName;
        loser = computerName;
        winScore = playerScore;
        losScore = computerScore;
    }

    return (`${winner} won with a score of ${winScore}, vs. ${loser} with a score of ${losScore} `)
}

//console.log(playGame());

// GET REFERENCES TO ELEMENTS
const btnNodeList = document.querySelectorAll('button');
const playerScoreBox = document.getElementById('player-score-counter');
const computerScoreBox = document.getElementById('computer-score-counter');
const historyLog = document.getElementById('historyLog')

// LISTEN FOR BUTTON CLICKS
const btnArray = [...btnNodeList];
let roundCounter = 1;
let move;
btnArray.forEach(btn => btn.addEventListener('click', function() {
    let myID = this.id
    if (myID === ROCK) {
        move = logRound(ROCK);
        displayMove(move);
    } else if (myID === PAPER) {
        move = logRound(PAPER);
        displayMove(move);
    } else {
        move = logRound(SCISSORS);
        displayMove(move);
    }
}));


function logRound(playerMove) {
    let resultText = `Round ${roundCounter}: `+ playRound(playerMove, computerPlay());
    roundCounter++;
    updateScores()
    return resultText;
}

// UPDATE THE WINDOW - Get the score and send back to HTML
function updateScores() {
    playerScoreBox.textContent = String(playerScore);
    computerScoreBox.textContent = String(computerScore);
}

function displayMove(moveStr) {
    const lastMove = document.createElement('div')
    lastMove.innerText = moveStr;
    historyLog.appendChild(lastMove);
}



