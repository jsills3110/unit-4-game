var heroes = ["frodobaggins", "samwisegamgee", "gandalf", "aragorn", "legolas"];
var villains = ["nazgul", "saruman", "sauron", "gollum", "shelob"];
var playerTeam = "";

var wins = 0;
var losses = 0;

var buttonHolder = $("#button-holder");
var headerHolder = $("header");
var yourCharacterHolder = $("#choose-your-character");
var enemiesHolder = $("#enemies");
var instructions = $("<h1>");

$(".start-button").on("click", function () {
    instructionHeader();
    buttonHolder.empty();
    if (this.value === "Take the Ring") {
        playerTeam = "villains";
    } else {
        playerTeam = "heroes";
    }
    showPlayableCharacters();
});

function instructionHeader() {
    headerHolder.empty();
    instructions.html("Select your fighter!");
    headerHolder.prepend(instructions);
}

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
        yourCharacterHolder.append(image);
    }
}

function chooseCharacter(theCharacterImage) {
    yourCharacterHolder.empty();
    var charImage = $("<img>");
    charImage.attr("src", theCharacterImage);
    yourCharacterHolder.append(charImage);
    displayEnemies();
}

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
    instructions.html("Choose your enemy!");
    headerHolder.html(instructions);
}

function chooseEnemy(image) {
    console.log(image);
}