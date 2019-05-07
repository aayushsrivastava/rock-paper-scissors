"use strict";

const SELECTION  = {
    "ROCK"     : 0,
    "PAPER"    : 1,
    "SCISSORS" : 2
};

function computerPlay() {
    let play = Math.floor(Math.random()*3);
    console.log(play);
    return play;
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

function formatInput(input) {
    input = input.trim();
    input = input.toUpperCase();
    return input;
}

function game() {
    let playerScore = 0;
    let computerScore = 0;
    let roundCount = 1;

    while (playerScore < 5 && computerScore < 5) {
        console.log("Round: " + roundCount++ + " | Scores | Player: " + playerScore + ", Computer: " + computerScore);

        let playerSelection = prompt("What do you chose?");
        if (playerSelection === undefined || playerSelection == null) {
            console.log("exit");
            return;
        }
        playerSelection = formatInput(playerSelection);

        if (playerSelection != 'ROCK' && playerSelection != "PAPER" && playerSelection != "SCISSORS") {
            alert("Wrong input!");
            continue;
        }

        let computerSelection = computerPlay();
        let result = playRound(SELECTION[playerSelection], computerSelection);

        console.log(result);

        if (result === "Draw!") continue;
        else if (result.substring(4, 7) == "Win") playerScore++;
        else computerScore++;
    }

    (playerScore == 5) ? console.log("Player wins the game!") : console.log("Computer wins the game!")
}