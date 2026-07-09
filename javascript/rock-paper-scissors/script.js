const score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

updateScore();

function playGame(playerMove) {
    const computerMove = getComputerMove();
    const result = getResult(playerMove, computerMove);
    changeMoveImages(playerMove, computerMove);

    showResult(result);

    localStorage.setItem('score', JSON.stringify(score));
    updateScore();
}

function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;

    localStorage.setItem('score', JSON.stringify(score));
    updateScore();
}

function updateScore() {
    document.querySelector('.score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}.`;
}

function showResult(result) {
    document.querySelector('.result')
    .innerHTML = result;
}

function changeMoveImages(playerMove, computerMove) {
    document.querySelector('.player-image').src = `images/${playerMove}.png`;
    document.querySelector('.computer-image').src = `images/${computerMove}.png`;
}

function getComputerMove() {
    const randomNumber = Math.random();

    if (randomNumber >= 0 && randomNumber < (1 / 3)) {
        return 'rock';
    }
    if (randomNumber >= (1 / 3) && randomNumber < (2 / 3)) {
        return 'paper';
    }
    if (randomNumber >= (2 / 3)) {
        return 'scissors';
    }
}

function getResult(playerMove, computerMove) {
    if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            score.ties++;
            return 'Tie.'
        }
        if (computerMove === 'paper') {
            score.losses++;
            return 'You lose.'
        }
        if (computerMove === 'scissors') {
            score.wins++;
            return 'You win.'
        }
    }

    if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            score.wins++;
            return 'You win.'
        }
        if (computerMove === 'paper') {
            score.ties++;
            return 'Tie.'
        }
        if (computerMove === 'scissors') {
            score.losses++;
            return 'You lose.'
        }
    }

    if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            score.losses++;
            return 'You lose.'
        }
        if (computerMove === 'paper') {
            score.wins++;
            return 'You win.'
        }
        if (computerMove === 'scissors') {
            score.ties++;
            return 'Tie.'
        }
    }
}