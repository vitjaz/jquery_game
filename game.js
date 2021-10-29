const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let started = false;

// Перехватываем нажатие с клавиатуры для начала игры
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Пользовательский ввод последовательности
$(".btn").on("click", function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

// Проверка
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over");

    setTimeout(function () {
      $("body").removeClass("game-over");
      $("#level-title").text("Press A Key to Start");
    }, 200);

    startOver();
  }
}

// Генерация случайной последовательности
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColors[randomNumber];
  console.log(randomChosenColour);
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

// Звук
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Анимация кликнутых юзером клавиш
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
