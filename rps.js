let computerName = "The Computer"
let playerName = "The Player"

const options = ["rock", "paper", "scissors"]

function computerPlay(arr) {
    let play = arr[Math.floor(Math.random()*arr.length)];
    return play;
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
    } else {
        winnerName = playerName; // player wins
        loserName = computerName;        
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
        case (playerSelection === "rock"):
            if (computerSelection === "paper") {
                finMsg = prepareResults(computerName, computerSelection, playerSelection); // computer win
            } else {
                finMsg = prepareResults(playerName, playerSelection, computerSelection); // player win
            }
            break;
        case (playerselection === "paper"):
            if (computerSelection === "scissors") {
                finMsg = prepareResults(computerName, computerSelection, playerSelection);
            } else {
                finMsg = prepareResults(playerName, playerSelection, computerSelection);
            }
            break;
        default: //playerSelection is 'scissors'
            if (computerSelection === "rock") {
                finMsg = prepareResults(computerName, computerSelection, playerSelection);
            } else {
                finMsg = prepareResults(playerName, playerSelection, computerSelection);
            }
            break;
    }

    return finMsg
}

const playerSelection = "rock";
//const computerSelection = computerPlay(options);
const computerSelection = computerPlay(options);
console.log(playRound(playerSelection, computerSelection));