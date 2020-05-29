var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var randomChosenColor;
var level = 0;
// var started = 'flase';
var lastAnswer = 0;

function nextSequence() {
    level += 1;
    $("#level-title, #level-title-m").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $('#' + randomChosenColor).fadeOut().fadeIn('slow');
    playSound(randomChosenColor);

}



// Detect which button got clicked and store its id in userChosenColor
$(".btn").on("click", function() {

    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(lastAnswer);



});

function playSound(name) {
    var audio = new Audio(name + '.mp3');
    audio.play();
}

function animatePress(currentColor) {
    $('.' + currentColor).addClass("pressed");
    setTimeout(function() {
        $('.' + currentColor).removeClass("pressed");

    }, 100);
}

//Starting game
if ($(window).width() < 800) {
    $(".mbtn").on("click", function() {
        $(this).hide();
        nextSequence();
        $(".mbtn").off("click");
    });
} else {
    $(document).on("keypress", function() {

        nextSequence();
        $(document).off("keypress");
    });

}


// Check Answer
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {

        if (lastAnswer == (level - 1)) {
            setTimeout(nextSequence(), 1000);
            lastAnswer = 0;
            userClickedPattern = [];
        } else {
            lastAnswer += 1;
            return;
        }
    } else {

        $("#level-title,  #level-title-m").text("Wrong Aswer !!!"); // lost statement
        alert("Congratulations, You Have Reched " + level + " level");
        setTimeout(function() {
            $("#level-title").text("Press A key to start again");
        }, 3000);
        $(".mbtn").show(); //Restart
        $(".mbtn").text("restart");


        $(".mbtn").on("click", function() {

            $(this).hide();
            nextSequence();

            $(".mbtn").off("click");

        });
        restart();
    }
}

function restart() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    lastAnswer = 0
    return;
}