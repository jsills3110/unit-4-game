// Each of the following objects represents a character that the player can 
// play as or fight against.
var frodo = {
    name: "Frodo Baggins",
    id: "frodobaggins",
    image: "assets/images/frodobaggins.png",
    health: 120,
    currentPower: 6,
    attackPower: 6,
    counterPower: 8
};

var gandalf = {
    name: "Gandalf",
    id: "gandalf",
    image: "assets/images/gandalf.png",
    health: 180,
    currentPower: 7,
    attackPower: 7,
    counterPower: 25
}

var aragorn = {
    name: "Aragorn",
    id: "aragorn",
    image: "assets/images/aragorn.png",
    health: 150,
    currentPower: 7,
    attackPower: 7,
    counterPower: 20
}

var nazgul = {
    name: "Witch-king of Angmar",
    id: "nazgul",
    image: "assets/images/nazgul.png",
    health: 120,
    currentPower: 6,
    attackPower: 6,
    counterPower: 8
}

var saruman = {
    name: "Saruman",
    id: "saruman",
    image: "assets/images/saruman.png",
    health: 150,
    currentPower: 7,
    attackPower: 7,
    counterPower: 20
}

var sauron = {
    name: "Lord Sauron",
    id: "sauron",
    image: "assets/images/sauron.png",
    health: 180,
    currentPower: 7,
    attackPower: 7,
    counterPower: 25
}

// The two groupings of playable characters are heroes and villains.
var heroes = [frodo, aragorn, gandalf];
var villains = [nazgul, saruman, sauron];

// Store the backgrounds in an array so we can randomly pick one with each 
// new enemy fight.
var backgrounds = ["hobbiton.jpeg", "minesofmoria.jpg", "ministirith.jpg", "mistymountains.jpg", "mordor.jpg", "rohan.jpg", "theblackgate.jpg", "theshire.jpg"];

// Initialize other useful global variables.
var playerTeam = "";
var wins = 0;
var losses = 0;
var enemyChosen = false;
var playerCharacter;
var currentEnemy = {
    id: ""
}

var friendlyCharacters = [];
var enemyCharacters = [];

var buttonHolder = $("#button-holder");
var headerHolder = $("header");
var gameBoard = $("#game-board");
var playerCharacterHolder = $("#player-character");
var playerOptionsHolder = $("#player-options");
var enemyCharacterHolder = $("#enemy-character");
var friendsHolder = $("#friends");
var enemiesHolder = $("#enemies");
var messageLog = $("<div>");
var attackButton = $("<button>");
var bodyHolder = $("body");

// At the start of the game, players can pick either the heroes or the villains.
// When they make a choice, the next screen displays their playable characters.
$(".start-button").on("click", function () {
    if (this.value === "Take the Ring") {
        playerTeam = "villains";
        friendlyCharacters = villains;
        enemyCharacters = heroes;
    } else if (this.value === "Destroy the Ring") {
        playerTeam = "heroes";
        friendlyCharacters = heroes;
        enemyCharacters = villains;
    }
    headerHolder.html("<h1>Select your fighter!</h1>");
    buttonHolder.empty();
    showPlayableCharacters();
});

// After the player makes a choice about which side they are on, their playable
// characters are displayed.
function showPlayableCharacters() {
    for (var i = 0; i < friendlyCharacters.length; i++) {
        var image = $("<img>");
        image.attr("src", friendlyCharacters[i].image);
        image.attr("alt", friendlyCharacters[i].name);
        image.attr("onclick", "chooseCharacter(this.id)");
        image.attr("id", friendlyCharacters[i].id);
        friendsHolder.append(image);
    }
}

// Once a player has chosen a character by clicking on the image, append the image
// to the game board and display their enemies.
function chooseCharacter(theCharacter) {
    // Grab the chosen character and set it to playerCharacter variable.
    for (var i = 0; i < friendlyCharacters.length; i++) {
        if (theCharacter === friendlyCharacters[i].id) {
            playerCharacter = friendlyCharacters[i];
        }
    }

    // Display the character, the enemies, and the player options.
    friendsHolder.empty();
    var charImage = $("<img>");
    charImage.attr("src", "assets/images/" + theCharacter + ".png");
    playerCharacterHolder.append(charImage);
    displayEnemies();
    displayOptions();
    headerHolder.html("<h1>Choose your enemy!</h1>");
}

// Display the enemies that the player has to choose from.
function displayEnemies() {
    enemiesHolder.empty();

    for (var i = 0; i < enemyCharacters.length; i++) {
        if (enemyCharacters[i].id !== currentEnemy.id) {
            var image = $("<img>");
            image.attr("src", enemyCharacters[i].image);
            image.attr("alt", enemyCharacters[i].name);
            image.attr("onclick", "chooseEnemy(this.id)");
            image.attr("id", enemyCharacters[i].id);
            enemiesHolder.append(image);
        }
    }
}

// Once a player has chosen an enemy by clicking on the image, append the image
// to the game board.
function chooseEnemy(theEnemy) {
    if (!enemyChosen) {
        var enemyImage = $("<img>");
        enemyImage.attr("src", "assets/images/" + theEnemy + ".png");
        enemyCharacterHolder.append(enemyImage);
        enemyChosen = true;

        // Grab the chosen enemy and set it to currentEnemy variable.
        for (var i = 0; i < enemyCharacters.length; i++) {
            if (theEnemy === enemyCharacters[i].id) {
                currentEnemy = enemyCharacters[i];
            }
        }

        // Select a new background image.
        var newBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)]
        $("body").css({"background": "url('assets/images/" + newBackground + "') no-repeat center center fixed", "background-size": "cover"});
 
        displayEnemies();
        headerHolder.html("<h1>You are fighting " + currentEnemy.name + "!</h1>");
    }
}

// Display the Attack button, Message Log box, and reset button.
function displayOptions() {
    attackButton.attr("id", "#attack");
    attackButton.attr("value", "attack");
    attackButton.html("Attack");
    attackButton.attr("onclick", "attackEnemy()");
    attackButton.attr("style", "margin: 0");
    playerOptionsHolder.append(attackButton);

    messageLog.attr("id", "#message-log");
    messageLog.attr("style", "background-color: wheat; width: 20em; height: 8em; margin: 1em 0; overflow: auto; text-align: center");
    playerOptionsHolder.append(messageLog);

    var resetButton = $("<button>");
    resetButton.attr("value", "Reset game by refresh");
    resetButton.attr("style", "margin: 0");
    resetButton.html("Reset Game");
    resetButton.on("click", function() {
        document.location.reload(true);
    });
    playerOptionsHolder.append(resetButton);
}

// When the attack button is clicked, attack the enemy.
function attackEnemy() {
    // First check that an enemy is actually selected.
    if (!enemyChosen) {
        messageLog.prepend("<p>There is no enemy to attack yet.</p>");
    } else {
        currentEnemy.health -= playerCharacter.currentPower; // Reduce the enemy health.
        if (currentEnemy.health <= 0) { // If the enemy has died...
            // Remove the enemy from the enemyCharacters array.
            enemyCharacters.splice(enemyCharacters.indexOf(currentEnemy), 1);
            enemyChosen = false;
            headerHolder.html("<h1>You killed " + currentEnemy.name + "!</h1>");
            enemyCharacterHolder.empty();
            displayEnemies();
            
            // If there are no more enemies to fight...
            if (enemyCharacters === undefined || enemyCharacters.length <= 0) {
                headerHolder.html("<h1>You won the game! Click Reset Game to play again.</h1>");
                attackButton.attr("disabled", true);
                attackButton.attr("style", "background-color: grey; margin: 0;");
            }
        } else { // If the enemy has not died yet...
            playerCharacter.health -= currentEnemy.counterPower; // Reduce the player health.
            if (playerCharacter.health <= 0) { // If the player has died...
                headerHolder.html("<h1>You lost the game! Click Reset Game to try again.</h1>");
                playerCharacterHolder.empty();
                attackButton.attr("disabled", true);
                attackButton.attr("style", "background-color: grey; margin: 0;");
            }
        }
        // Add details to the message log.
        messageLog.prepend("<p>You attacked " + currentEnemy.name + " for " + playerCharacter.currentPower + " damage!</p>" +
        "<p>" + currentEnemy.name + " attacked you for " + currentEnemy.counterPower + " damage!</p>" +
        "<p>" + currentEnemy.name + "'s health is at " + currentEnemy.health + ".</p>" +
        "<p>Your health is at " + playerCharacter.health + ".</p><br>");
        
        playerCharacter.currentPower += playerCharacter.attackPower; // Add to the player's attack power.
    }
}