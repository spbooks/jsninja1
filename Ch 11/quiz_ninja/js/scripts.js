(function() {
"use strict";
  var quiz = {
  "name":"Super Hero Name Quiz",
  "description":"How many super heroes can you name?",
  "question":"What is the real name of ",
  "questions": [
  { "question": "Superman", "answer": "Clarke Kent", "asked": false },
  { "question": "Batman", "answer": "Bruce Wayne", "asked": false },
  { "question": "Wonder Woman", "answer": "Dianna Prince", "asked": false }
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
  
  function random(a,b,callback) {
    if(b===undefined) {
      // if only one argument is supplied, assume the lower limit is 1
        b = a, a = 1;
      } 
    var result = Math.floor((b-a+1) * Math.random()) + a;
    if(typeof callback === "function") {
      result = callback(result);
    }
    return result;
  }

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
    $form.addEventListener('click', function(event) { 
      event.preventDefault();
      check(event.target.value);
      }, false);
    var question; // current question
    chooseQuestion();

    // nested functions
    
    function chooseQuestion() {
      console.log("chooseQuestion() invoked");
      var questions = quiz.questions.filter(function(question){
        return question.asked === false;
      });
      // set the current question
      question = questions[random(questions.length) - 1];
      ask(question);
    }
    
    function ask(question) {
      console.log("ask() invoked");
      // set the question.asked property to true so it's not asked again
      question.asked = true;
      update($question,quiz.question + question.question + "?");
      // clear the previous options
      $form.innerHTML = "";
      // create an array to put the different options in and a button variable
      var options = [], button;
      var option1 = chooseOption();
      options.push(option1.answer);
      var option2 = chooseOption();
      options.push(option2.answer);
      // add the actual answer at a random place in the options array
      options.splice(random(0,2),0,question.answer);
      // loop through each option and display it as a button
      options.forEach(function(name) {
        button = document.createElement("button");
        button.value = name;
        button.textContent = name;
        $form.appendChild(button);
      });
      
      // choose an option from all the possible answers but without choosing the answer or the same option twice
      function chooseOption() {
        var option = quiz.questions[random(quiz.questions.length) - 1];
        // check to see if the option chosen is the current question or already one of the options, if it is then recursively call this function until it isn't
        if(option === question || options.indexOf(option.answer) !== -1) {
          return chooseOption();
        }
        return option;
      }
    }

    function check(answer) {
      console.log("check() invoked");
      if(answer === question.answer){
        update($feedback,"Correct!","correct");
        // increase score by 1
        score++;
        update($score,score)
      } else {
        update($feedback,"Wrong!","wrong");
      }
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
