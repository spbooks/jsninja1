function test() {
  return 1
  
}

(function() {
"use strict";

  function hi() {
    return "hi";
  }
  var quiz = {
  "name":"Super Hero Name Quiz",
  "description":"How many super heroes can you name?",
  "question":"What is the real name of ",
  "questions": [
  { "question": "Superman", "answer": "Clarke Kent" },
  { "question": "Batman", "answer": "Bruce Wayne" },
  { "question": "Wonder Woman", "answer": "Dianna Prince" }
  ]
  }

  //// views ////
  var $question = document.getElementById("question");
  var $score = document.getElementById("score");
  var $feedback = document.getElementById("feedback");
  var $start = document.getElementById("start");
  var $form = document.getElementById("answer");
  var $timer = document.getElementById("timer");

  /// view functions ///

  function update(element,content,klass) {
    var p = element.firstChild || document.createElement("p");
    p.textContent = content;
    element.appendChild(p);
    if(klass) {
      p.className = klass;
    }
  }

  function hide(element) {
    element.style.display = "none";
  }

  function show(element) {
    element.style.display = "block";
  }

  // Event listeners
  $start.addEventListener('click', function() { play(quiz) } , false);

  // hide the form at the start of the game
  hide($form);
    
  //// function definitions ////

  function play(quiz){
    var score = 0; // initialize score
    update($score,score);
    // initialize time and set up an interval that counts down every second
    var time = 20;
    update($timer,time);
    var interval = window.setInterval( countDown , 1000 );
    // hide button and show form
    hide($start);
    show($form);
    // add event listener to form for when it's submitted
    $form.addEventListener('submit', function(event) { 
      event.preventDefault();
      check($form[0].value);
      }, false);
    var i = 0;
    chooseQuestion();

    // nested functions
    
    function chooseQuestion() {
      console.log("chooseQuestion() invoked");
      var question = quiz.questions[i].question;
      ask(question);
    }
    
    function ask(question) {
      console.log("ask() invoked");
      update($question,quiz.question + question);
      $form[0].value = "";
      $form[0].focus();
    }

    function check(answer) {
      console.log("check() invoked");
      if(answer === quiz.questions[i].answer){
        update($feedback,"Correct!","correct");
        // increase score by 1
        score++;
        update($score,score)
      } else {
        update($feedback,"Wrong!","wrong");
      }
      i++;
      chooseQuestion();
    }
    
    // this is called every second and decreases the time
    function countDown() {
      // decrease time by 1
      time--;
      // update the time displayed
      update($timer,time);
      // the game is over if the timer has reached 0
      if(time <= 0) {
        gameOver();
      }
    }

    function gameOver(){
      console.log("gameOver() invoked");
      // inform the player that the game has finished and tell them how many points they have scored
      update($question,"Game Over, you scored " + score + " points");
      // stop the countdown interval
      window.clearInterval(interval);
      hide($form);
      show($start);
    }
  }
}())
