var heroes = ["frodobaggins", "samwisegamgee", "gandalf", "aragorn", "legolas", "gimli"];
var villains = ["nazgul", "saruman", "sauron", "gollum", "shelob"];
var playerTeam = "";

var wins = 0;
var losses = 0;

$(".start-button").on("click", function() {
    chooseCharacterHeader();
    $("#button-holder").empty();
    if (this.value === "Take the Ring") {
        playerTeam = "villains";
    } else {
        playerTeam = "heroes";
    }
    showPlayableCharacters();
});

function chooseCharacterHeader() {
    $("header").empty();
    var instructions = $("<h1>");
    instructions.html("Select your fighter!");
    $("header").append(instructions);
    
}

function showPlayableCharacters() {
    if (playerTeam === "villains") {
        for (var i = 0; i < villains.length; i++) {
            var image = $("<img>");
            image.attr("src", "assets/images/" + villains[i] + ".png");
            $("#choose-your-character").append(image);
        }
    } else {
        for (var i = 0; i < heroes.length; i++) {
            var image = $("<img>");
            image.attr("src", "assets/images/" + heroes[i] + ".png");
            $("#choose-your-character").append(image);
        }
    }
}