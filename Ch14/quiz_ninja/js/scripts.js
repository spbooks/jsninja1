(function() {
"use strict";

  // gets the question JSON file using Ajax
  function getQuiz() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
      if (xhr.readyState === 4 && xhr.status == 200) {
        var quiz = JSON.parse(xhr.responseText);
        new Game(quiz);
      }
    };
    xhr.open("GET", "https://s3.amazonaws.com/sitepoint-book-content/jsninja/quiz.json", true);
    xhr.overrideMimeType("application/json");
    xhr.send();
    update($question, "Waiting for questions...");
  }

  //// views ////
  var $question = document.getElementById("question");
  var $score = document.getElementById("score");
  var $feedback = document.getElementById("feedback");
  var $start = document.getElementById("start");
  var $form = document.getElementById("answer");
  var $timer = document.getElementById("timer");
  var $hiScore = document.getElementById("hiScore");

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
  $start.addEventListener('click', getQuiz , false);

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

  function Game(quiz){
    this.questions = quiz.questions;
    this.phrase = quiz.question;
    this.score = 0; // initialize score
    update($score,this.score);
    update($hiScore,this.hiScore());
    // initialize time and set up an interval that counts down every second
    this.time = 20;
    update($timer,this.time);
    this.interval = window.setInterval( this.countDown.bind(this) , 1000 );
    // hide button and show form
    hide($start);
    show($form);
    // add event listener to form for when it's submitted
    $form.addEventListener('click', function(event) { 
      event.preventDefault();
      this.check(event.target.value);
      }.bind(this), false);
    this.chooseQuestion();
  }
  
  // Method definitions
  Game.prototype.chooseQuestion = function() {
      console.log("chooseQuestion() called");
      var questions = this.questions.filter(function(question){
        return question.asked === false;
      });
      // set the current question
      this.question = questions[random(questions.length) - 1];
      this.ask(this.question);
    }
    
  Game.prototype.ask = function(question) {
    console.log("ask() called");
    var quiz = this;
    // set the question.asked property to true so it's not asked again
    question.asked = true;
    update($question,this.phrase + question.question + "?");
    // clear the previous options
    $form.innerHTML = "";
    // create an array to put the different options in and a button variable
    var options = [], button;
    var option1 = chooseOption();
    options.push(option1.answer);
    var option2 = chooseOption();
    options.push(option2.answer);
    // add the actual answer at a random place in the options array
    options.splice(random(0,2),0,this.question.answer);
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
  
  Game.prototype.check = function(answer) {
    console.log("check() called");
    if(answer === this.question.answer){
      update($feedback,"Correct!","correct");
      // increase score by 1
      this.score++;
      update($score,this.score)
    } else {
      update($feedback,"Wrong!","wrong");
    }
    this.chooseQuestion();
  }
  
  Game.prototype.countDown = function() {
  // this is called every second and decreases the time
    // decrease time by 1
    this.time--;
    // update the time displayed
    update($timer,this.time);
    // the game is over if the timer has reached 0
    if(this.time <= 0) {
      this.gameOver();
    }
  }

  Game.prototype.gameOver = function() {
    console.log("gameOver() invoked");
    // inform the player that the game has finished and tell them how many points they have scored
    update($question,"Game Over, you scored " + this.score + " points");
    // stop the countdown interval
    window.clearInterval(this.interval);
    hide($form);
    show($start);
  }
    
  Game.prototype.hiScore = function() {
    if(window.localStorage) {
      // the value held in localStorage is initally null so make it 0
      var hi = localStorage.getItem("hiScore") || 0;
      // check if the hi-score has been beaten and display a message if it has
      if(this.score > hi || hi === 0) {
        localStorage.setItem("hiScore", this.score);
      }
      return localStorage.getItem("hiScore");
    }
  }
}())
