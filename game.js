var gamepattern = [];
var userClickedPattern = [];
var level = 0;
var highscore = 0;
var started = false;

$(document).on('keypress', function () {
    if (!started) {
        level = 0; // Reset level at the start
        $("#level-title").text("Level " + level);
        $("#high-score").text("High Score: " + highscore);
        nextsequence();
        started = true;
    }
});

var buttonColors = ["red", "blue", "green", "yellow"];

$('.btn').on("click", function () {
    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    playsound(userChosenColor);
    animatePress(userChosenColor);
    checkanswer(userClickedPattern.length - 1);
});

function checkanswer(currentLevel) {
    if (gamepattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log('success');
        if (userClickedPattern.length === gamepattern.length) {
            setTimeout(function () {
                nextsequence();
            }, 1000);
        }
    } else {
        $('body').addClass('game-over');
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        setTimeout(function () {
            $('body').removeClass('game-over');
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startover();
    }
}

function nextsequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    if (level > highscore) {
        highscore = level;  
        $('#high-score').addClass('highh');
        
        // Update the high score text
        $("#high-score").text("High Score: " + highscore);
        
        // Remove the class after a short delay
        setTimeout(function () {
            console.log("Removing highscore class");
            $('#high-score').removeClass('highh');
        }, 500); 

    }
    var randomnumber = Math.floor(Math.random() * 4);
    var randomchooseColor = buttonColors[randomnumber];
    gamepattern.push(randomchooseColor);
    console.log(randomchooseColor);
    $("#" + randomchooseColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomchooseColor);
}

function playsound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $('#' + currentColor).addClass('pressed');
    setTimeout(function () {
        $('#' + currentColor).removeClass('pressed');
    }, 100);
}

function startover() {
    level = 0;
    started = false;
    gamepattern = [];
}

