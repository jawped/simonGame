
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
 
var isWrong = false;
var delayInMilliseconds = 100;

    var started = false;
    var level = 0;


$("body").keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});



$(".btn").click(function () {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length - 1);

    playSound(userChosenColour);
  animatePress(userChosenColour);
});




function nextSequence() { 
      userClickedPattern = [ ];
    level++;
        $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
  
    gamePattern.push(randomChosenColour);
 
     $( "#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);


    playSound(randomChosenColour)
  



}





function playSound(name) {


var audio = new Audio("sounds/" + name + ".mp3");
audio.play();



}

function animatePress(currentColour) {
   
    $("#" + currentColour).addClass("pressed")

    
    setTimeout(function () {
      $("#" + currentColour).removeClass("pressed");
    }, delayInMilliseconds);

}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                
                nextSequence();
            }, 1000);

        }
    } else {
        playSound("wrong")
        $("body").addClass("game-over")

        $("#level-title").text("Game Over , Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        console.log("wrong");
       
        startOver();
    }

}


function startOver() {
    level = 0;
    gamePattern = [];
    started= false

    
}

