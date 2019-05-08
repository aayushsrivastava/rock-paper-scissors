"use strict";

const SELECTION  = {
    "ROCK"     : 0,
    "PAPER"    : 1,
    "SCISSORS" : 2
};

function computerPlay() {
    let play = Math.floor(Math.random()*3);
    switch (play) {
        case 0: 
        return "Rock";
        break;

        case 1:
        return "Paper";
        break;

        case 2:
        return "Scissors";
        break;
    }
}

function playRound(playerSelection, computerSelection) {
    let status;
    let win = "You Win! ";
    let lose = "You Lose! ";
    let pr  = "Paper beats Rock";
    let rs = "Rock beats Scissors";
    let ps = "Scissors beat Paper";

    if (playerSelection == computerSelection) {
        return "Draw!"
    }

    switch(playerSelection) {
        case SELECTION["ROCK"]:
        switch (computerSelection) {
            case SELECTION["PAPER"]: 
            status = lose + pr;
            break;

            case SELECTION["SCISSORS"]:
            status = win + rs;
            break;
        }
        break;

        case SELECTION["PAPER"]:
        switch (computerSelection) {
            case SELECTION["ROCK"]:
            status = win + pr;
            break;

            case SELECTION["SCISSORS"]:
            status = lose + ps;
            break;
        }
        break;

        case SELECTION["SCISSORS"]:
        switch (computerSelection) {
            case SELECTION["ROCK"]:
            status = lose + rs;
            break;

            case SELECTION["PAPER"]:
            status = win + ps;
        }
        break;
    }
    return status;
}

let playerScore = 0;
let computerScore = 0;
let roundCount = 1;
function updateGameResults(result) {
    roundCount++;
    updateRoundNumber();

    if (result === "Draw!") return;
    else if (result.substring(4, 7) == "Win") playerScore++;
    else computerScore++;

    updatePlayerScores();
}

function updateRoundNumber() {
    let domRoundNumber = document.querySelector('#round-number > span');
    domRoundNumber.innerText = roundCount;
}

function updatePlayerScores() {
    let domComputerScore = document.querySelector('#computer-score');
    let domPlayerScore = document.querySelector('#player-score');
    domComputerScore.innerText = computerScore;
    domPlayerScore.innerText = playerScore;
}

function updateRoundResult(playerSelection, computerSelection, result) {
    let playerChoice = document.querySelector('#player-choice');
    let computerChoice = document.querySelector('#computer-choice');
    let roundResult = document.querySelector('#round-result');

    playerChoice.innerText = playerSelection;
    computerChoice.innerText = computerSelection; 
    roundResult.innerText = result;
}

function startRound(e) {
    let playerSelection = e.target.innerText;
    let computerSelection = computerPlay();
    let result = playRound(SELECTION[playerSelection.toUpperCase()], SELECTION[computerSelection.toUpperCase()]);
    
    updateRoundResult(
        'Player chooses ' + playerSelection,
        'Computer chooses ' + computerSelection,
        result
    );
    updateGameResults(result);
}

function disablePlayButtons(option) {
    let playBtns = document.querySelectorAll('.play-button');
    playBtns.forEach((btn) => {
        btn.disabled = option;
    });
}

function stopGame(winnerID) {
    let pageBody = document.querySelector('body');
    if (winnerID === 'player-score') {
        pageBody.style.backgroundColor = '#a5ff91';
    }
    else if (winnerID === 'computer-score') {
        pageBody.style.backgroundColor = '#f9c98e';
    }

    disablePlayButtons(true);
    
    let restartBtn = document.createElement('button');
    restartBtn.innerHTML = 'Play Again';
    pageBody.appendChild(restartBtn);

    restartBtn.addEventListener('click', (e) => {
        restartGame(pageBody);
        pageBody.removeChild(restartBtn);
    });
}

function restartGame(pageBody) {
    playerScore = 0;
    computerScore = 0;
    roundCount = 1;
    updateRoundNumber();
    updatePlayerScores();
    pageBody.style.backgroundColor = 'white';
    updateRoundResult('\xA0', '\xA0', 'Game not started yet');
    disablePlayButtons(false);
}

const buttons = Array.from(document.querySelectorAll('.play-button'));
buttons.forEach((button) => {
    button.addEventListener('click', startRound);
})

const scoreKeepers = document.querySelectorAll('.score');
scoreKeepers.forEach((scoreKeeper) => {
    let observer = new MutationObserver((mutations) => {
        mutations.forEach((m) => {
            if (m.target.textContent == 5) {
                let winner = m.target.parentElement.id;
                stopGame(winner);
            }
        })
    });
    let config = {characterData: true, subtree: true};
    observer.observe(scoreKeeper, config);
});