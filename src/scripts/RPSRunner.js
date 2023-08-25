/**************************** GLOBALS ******************************/
const GAME_CHOICES = ["Rock", "Paper", "Scissors"];
const GAME_RESULTS = ["W", "L", "T"];

/**************************** BROWSER LOGIC ******************************/

const roundNumberInput = document.getElementById("round-count");
const startGameBtn = document.getElementById("start-game-btn");
const newGameBtn = document.getElementById("new-game-btn");
const startScreen = document.getElementById("start-screen");
const midGameScreen = document.getElementById("mid-game-screen");
const endGameScreen = document.getElementById("end-game-screen");
const rockBtn = document.getElementById("rock-btn");
const paperBtn = document.getElementById("paper-btn");
const scissorsBtn = document.getElementById("scissors-btn");
const roundNumber = document.getElementById("round-number");
const roundResults = document.getElementById("round-results-string");
const gameResults = document.getElementById("game-results-string");
const playerScore = document.getElementById("player-score");
const computerScore = document.getElementById("computer-score");

startGameBtn.addEventListener("click", (e) => {
    startScreen.classList.add('invisible');
    midGameScreen.classList.remove('invisible');
    play(roundNumberInput.value);
});
newGameBtn.addEventListener("click", (e) => {
    startScreen.classList.remove('invisible');
    endGameScreen.classList.add('invisible');
    roundResults.innerText = "Please select your choice!"
    playerScore.innerText = "0";
    computerScore.innerText = "0";
});


/**************************** GAME LOGIC ******************************/

let awaitUserSelection;

const userChoice = () => {
    return new Promise(resolve => awaitUserSelection = resolve);
}

function btnResolver(e) {
    if (awaitUserSelection) awaitUserSelection(getPlayerChoiceFromID(e.target.id));
  }
  
async function play(userInput) {
    rockBtn.addEventListener('click', btnResolver);
    paperBtn.addEventListener('click', btnResolver);
    scissorsBtn.addEventListener('click', btnResolver);
    //let userInput = prompt("Please enter the number of rounds you'd like to play");
    let numRounds = parseInt(userInput, 10);
    if (typeof numRounds === "number") {
        //Lets set variables for keeping score
        let score = { Player: 0, Computer: 0 };

        //We have a number of rounds, lets loop that amount of times.
        for (let i = 0; i < numRounds; i++) {
            roundNumber.innerText = `Round: ${i + 1}`;
            //Play a round waiting for user to click a button
            let selection = await userChoice();
            let result = playRound(selection);
            //Log the result of the round
            roundResults.innerText = result.message
            //Increment out score and show the user the standings
            if (result.val === GAME_RESULTS[0]) score.Player++;
            else if (result.val === GAME_RESULTS[1]) score.Computer++;
            else if (result.val === null) score.Computer++;
            playerScore.innerText = score.Player.toString();
            computerScore.innerText = score.Computer.toString();
        }
        let finalResult = getEndGameResult(score);
        gameResults.innerText = finalResult;
        midGameScreen.classList.add('invisible');
        endGameScreen.classList.remove('invisible');
    } else {
        console.error("ERROR: User did not input a number, exiting game");
        return;
    }

    rockBtn.removeEventListener('click', btnResolver);
    paperBtn.removeEventListener('click', btnResolver);
    scissorsBtn.removeEventListener('click', btnResolver);
  }

/**
 * Ask user the amount of games they want to play and run the rounds accordingly
 * Print out the results of each round and once finished with the entire game
 * show the user the results
 * @returns {String} Output to console the result of the game.
 */
function _oldPlay(userInput) {
    //let userInput = prompt("Please enter the number of rounds you'd like to play");
    let numRounds = parseInt(userInput, 10);
    if (typeof numRounds === "number") {
        //Lets set variables for keeping score
        let score = { Player: 0, Computer: 0 };

        //We have a number of rounds, lets loop that amount of times.
        for (let i = 0; i < numRounds; i++) {
            //Play a round
            let result = playRound();
            //Log the result of the round
            console.log(result.message);
            //Increment out score and show the user the standings
            if (result.val === GAME_RESULTS[0]) score.Player++;
            else if (result.val === GAME_RESULTS[1]) score.Computer++;
            else if (result.val === null) score.Computer++;
            console.table(score);
        }
        console.log(getEndGameResult(score));
    } else {
        console.error("ERROR: User did not input a number, exiting game");
        return;
    }
}

/**
 * Determine winner of game and return the corresponding message
 * @param {Object} score - Score object used to determine winner
 * @returns {String} Message to display to user with results of the game
 */
function getEndGameResult(score) {
    if (score.Player > score.Computer)
        return `Congratulations! You won the game. Final results are You: ${score.Player} point(s). Computer: ${score.Computer} point(s).`;
    else if (score.Player < score.Computer)
        return `Yikes...lost to a computer. Final score, You: ${score.Player} point(s). Computer: ${score.Computer} point(s).`;
    else
        return `Welp, looks like you tied with the computer! You both scored ${score.Player} point(s). Rematch?`;
}

/**
 * Run a round of RPS. Determine winner based on user input and randomly selected computer choice
 * @returns {String} - Message detailing winner of game
 */
function playRound(playerChoice) {
    //Get Player Choice
    if (playerChoice) {
        //Format Player choice
        playerChoice = formatPlayerChoice(playerChoice);
        //Compare and determine winner
        return getRoundWinner(playerChoice, computerPlay());
    } else {
        console.error("ERROR: Player did not input value. Exiting");
        return;
    }
}

/**
 * Util function to run through each scenario and determine a winner
 * @param {String} player
 * @param {String} computer
 * @returns {String} Return string with results of the game based on inputs
 */
function getRoundWinner(player, computer) {
    switch (computer) {
        //Rock
        case GAME_CHOICES[0]:
            if (player === computer)
                return getEndRoundValues(GAME_RESULTS[2], player, computer);
            else if (player === GAME_CHOICES[1])
                return getEndRoundValues(GAME_RESULTS[0], player, computer);
            else if (player === GAME_CHOICES[2])
                return getEndRoundValues(GAME_RESULTS[1], player, computer);
            else return getEndRoundValues(null, player, computer);
        //Paper
        case GAME_CHOICES[1]:
            if (player === computer)
                return getEndRoundValues(GAME_RESULTS[2], player, computer);
            else if (player === GAME_CHOICES[2])
                return getEndRoundValues(GAME_RESULTS[0], player, computer);
            else if (player === GAME_CHOICES[0])
                return getEndRoundValues(GAME_RESULTS[1], player, computer);
            else return getEndRoundValues(null, player, computer);
        //Scissors
        case GAME_CHOICES[2]:
            if (player === computer)
                return getEndRoundValues(GAME_RESULTS[2], player, computer);
            else if (player === GAME_CHOICES[0])
                return getEndRoundValues(GAME_RESULTS[0], player, computer);
            else if (player === GAME_CHOICES[1])
                return getEndRoundValues(GAME_RESULTS[1], player, computer);
            else return getEndRoundValues(null, player, computer);
    }
}

/**
 * Util function to get a formatted string depicting the results of the game
 * @param {String} result - String specifying whether it was a win loss or tie. Choices: W, L, T, or null
 * @param {String} playerVal - String of player's selection
 * @param {String} computerVal - String of Computers selection
 * @returns {String} String with results of game.
 */
function getEndRoundValues(result, playerVal, computerVal) {
    switch (result) {
        case GAME_RESULTS[0]:
            return {
                val: GAME_RESULTS[0],
                message: `Congratulations! You won! Your choice of ${playerVal} wrecked the computer's selection of ${computerVal}`,
            };
        case GAME_RESULTS[1]:
            return {
                val: GAME_RESULTS[1],
                message: `You got destroyed by the computer. You chose ${playerVal} and were read like a book because the computer chose ${computerVal}`,
            };
        case GAME_RESULTS[2]:
            return {
                val: GAME_RESULTS[2],
                message: `You are a worthy adversary. Both you and the computer selected ${computerVal} resulting in a tie`,
            };
        default:
            return {
                val: "?",
                message: `Apparently you are too dumb to type in a simple word properly. So by default you lose. What even is ${playerVal}?`,
            };
    }
}

/**************************** UTILITIES ******************************/
/**
 * Reformat the users input to match our expected incoming value i.e. 'Rock', 'Paper', or 'Scissors'
 * @param {String} playerChoice Players choice as initially input before reformat.
 * @returns {String} Reformatted player choice string
 */
function formatPlayerChoice(playerChoice) {
    playerChoice = playerChoice.toLowerCase();
    return playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1);
}

function getPlayerChoiceFromID(id) {
    switch(id) {
        case 'rock-btn':
            return 'Rock';
        case 'paper-btn':
            return 'Paper';
        case 'scissors-btn':
        default:
            return "Scissors";
    }
}

/**
 * Util function to get a random selection for computer
 * @returns {String} Randomly selected value from GAME_CHOICES array
 */
function computerPlay() {
    return GAME_CHOICES[getRandomNum(3)];
}

/**
 * Util function to get a random number given a max range
 * @param {Integer} max - maximum range of our random number generation
 * @returns {Integer} Random number selected fromt he range given
 */
function getRandomNum(max) {
    return Math.floor(Math.random() * max);
}
