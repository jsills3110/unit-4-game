var frodo = {
    name: "Frodo Baggins",
    id: "frodobaggins",
    image: "assets/images/frodobaggins.png",
    health: 100,
    attackPower: 5,
    counterPower: 5
};

var gandalf = {
    name: "Gandalf",
    id: "gandalf",
    image: "assets/images/gandalf.png",
    health: 180,
    attackPower: 8,
    counterPower: 25
}

var aragorn = {
    name: "Aragorn",
    id: "aragorn",
    image: "assets/images/aragorn.png",
    health: 120,
    attackPower: 6,
    counterPower: 15
}

var nazgul = {
    name: "Witch-king of Angmar",
    id: "nazgul",
    image: "assets/images/nazgul.png",
    health: 100,
    attackPower: 5,
    counterPower: 5
}

var saruman = {
    name: "Saruman",
    id: "saruman",
    image: "assets/images/saruman.png",
    health: 120,
    attackPower: 6,
    counterPower: 15
}

var sauron = {
    name: "Lord Sauron",
    id: "sauron",
    image: "assets/images/sauron.png",
    health: 180,
    attackPower: 8,
    counterPower: 25
}

// var heroes = ["frodobaggins", "samwisegamgee", "gandalf", "aragorn", "legolas"];
var heroes = [frodo, aragorn, gandalf];
// var villains = ["nazgul", "saruman", "sauron", "gollum", "shelob"];
var villains = [nazgul, saruman, sauron];
var playerTeam = "";

var wins = 0;
var losses = 0;
var enemyChosen = false;
var playerCharacter;
var currentEnemy = {
    id: ""
}

friendlyCharacters = [];
enemyCharacters = [];

var buttonHolder = $("#button-holder");
var headerHolder = $("header");
var gameBoard = $("#game-board");
var playerCharacterHolder = $("#player-character");
var playerOptionsHolder = $("#player-options");
var enemyCharacterHolder = $("#enemy-character");
var friendsHolder = $("#friends");
var enemiesHolder = $("#enemies");

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

        displayEnemies();
    }
}

function displayOptions() {
    var attackButton = $("<button>");
    attackButton.attr("id", "#attack");
    attackButton.attr("value", "attack");
    attackButton.html("Attack");
    attackButton.attr("onclick", "attackEnemy()");
    playerOptionsHolder.append(attackButton);
}

function attackEnemy() {
    if (!enemyChosen) {
        console.log("There is no enemy to attack yet.");
    } else {
        console.log("Ouch!");
    }
}