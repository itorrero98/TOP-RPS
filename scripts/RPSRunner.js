/**************************** GLOBALS ******************************/
const GAME_CHOICES = ["Rock", "Paper", "Scissors"];

/**************************** GAME LOGIC ******************************/
/**
 * Ask user the amount of games they want to play and run the rounds accordingly
 * Print out the results of each round and once finished with the entire game
 * show the user the results
 * @returns {String} Output to console the result of the game.
 */
function play() {
    let userInput = prompt(
        "Please enter the number of rounds you'd like to play"
    );
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
            if (result.val === "W") score.Player++;
            else if (result.val === "L") score.Computer++;
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
function playRound() {
    //Get Player Choice
    let playerChoice = prompt("Rock, Paper, or Scissors?", "Paper");
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
        case GAME_CHOICES[0]:
            if (player === computer)
                return getEndRoundValues("T", player, computer);
            else if (player === GAME_CHOICES[1])
                return getEndRoundValues("W", player, computer);
            else if (player === GAME_CHOICES[2])
                return getEndRoundValues("L", player, computer);
            else return getEndRoundValues(null, player, computer);
        case GAME_CHOICES[1]:
            if (player === computer)
                return getEndRoundValues("T", player, computer);
            else if (player === GAME_CHOICES[2])
                return getEndRoundValues("W", player, computer);
            else if (player === GAME_CHOICES[0])
                return getEndRoundValues("L", player, computer);
            else return getEndRoundValues(null, player, computer);
        case GAME_CHOICES[2]:
            if (player === computer)
                return getEndRoundValues("T", player, computer);
            else if (player === GAME_CHOICES[0])
                return getEndRoundValues("W", player, computer);
            else if (player === GAME_CHOICES[1])
                return getEndRoundValues("L", player, computer);
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
        case "W":
            return {
                val: "W",
                message: `Congratulations! You won! Your choice of ${playerVal} wrecked the computer's selection of ${computerVal}`,
            };
        case "L":
            return {
                val: "L",
                message: `You got destroyed by the computer. You chose ${playerVal} and were read like a book because the computer chose ${computerVal}`,
            };
        case "T":
            return {
                val: "T",
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
