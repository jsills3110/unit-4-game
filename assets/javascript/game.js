var heroes = ["frodobaggins", "samwisegamgee", "gandalf", "aragorn", "legolas"];
var villains = ["nazgul", "saruman", "sauron", "gollum", "shelob"];
var playerTeam = "";

var wins = 0;
var losses = 0;
var enemyChosen = false;

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
    headerHolder.html("<h1>Select your fighter!</h1>");
    buttonHolder.empty();
    if (this.value === "Take the Ring") {
        playerTeam = "villains";
    } else {
        playerTeam = "heroes";
    }
    showPlayableCharacters();
});

// After the player makes a choice about which side they are on, their playable
// characters are displayed.
function showPlayableCharacters() {
    var chosenCharacters = [];
    if (playerTeam === "villains") {
        chosenCharacters = villains;
    } else {
        chosenCharacters = heroes;
    }

    for (var i = 0; i < chosenCharacters.length; i++) {
        var image = $("<img>");
        image.attr("src", "assets/images/" + chosenCharacters[i] + ".png");
        image.attr("alt", chosenCharacters[i]);
        image.attr("onclick", "chooseCharacter(this.src)");
        image.attr("id", chosenCharacters[i]);
        friendsHolder.append(image);
    }
}

// Once a player has chosen a character by clicking on the image, append the image
// to the game board and display their enemies.
function chooseCharacter(theCharacterImage) {
    friendsHolder.empty();
    var charImage = $("<img>");
    charImage.attr("src", theCharacterImage);
    playerCharacterHolder.append(charImage);
    displayEnemies();
}

// Display the enemies that the player has to choose from.
function displayEnemies() {
    var enemyCharacters = [];
    if (playerTeam === "villains") {
        enemyCharacters = heroes;
    } else {
        enemyCharacters = villains;
    }

    for (var i = 0; i < enemyCharacters.length; i++) {
        var image = $("<img>");
        image.attr("src", "assets/images/" + enemyCharacters[i] + ".png");
        image.attr("alt", enemyCharacters[i]);
        image.attr("onclick", "chooseEnemy(this.src)");
        image.attr("id", enemyCharacters[i]);
        enemiesHolder.append(image);
    }
    headerHolder.html("<h1>Choose your enemy!</h1>");
}

// Once a player has chosen an enemy by clicking on the image, append the image
// to the game board.
function chooseEnemy(theEnemyImage) {
    if (!enemyChosen) {
        var enemyImage = $("<img>");
        enemyImage.attr("src", theEnemyImage);
        enemyCharacterHolder.append(enemyImage);
        enemyChosen = true;
    }
}