(function() {
  "use strict";

  // returns a game object with initial settings
  var game = (function init() {
    // references to elements on the page
    var startButton = document.getElementById("button"),
        output = document.getElementById("output"),
        form = document.getElementById("options");
    // add event listener that starts the game
    startButton.addEventListener('click', getQuiz, false);
    // return the elements and some configuration properties
    return {
      startButton: startButton,
      output: output,
      form: form,
      time: 20,
      score: 0
    };
  }()); // end of initialization module

  // gets the question JSON file using Ajax
  function getQuiz() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
      if (xhr.readyState === 4 && xhr.status == 200) {
        var quiz = JSON.parse(xhr.responseText);
        play(quiz);
      }
    };
    xhr.open("GET", "https://s3.amazonaws.com/sitepoint-book-content/jsninja/quiz.json", true);
    xhr.overrideMimeType("application/json");
    xhr.send();
    document.getElementById("output").innerHTML = "Waiting for questions...";
  }
    

  function play(quiz){
    
    var random = utilities.random, message = utilities.message, clear = utilities.clear
    // initalize the question variable that will hold the current question object
    var question;
    // Set the start time based on the congiguration object
    var time = game.time;
    // remove the start button from view
    game.startButton.style.display = "none";
    // Add event listener for the answer buttons to be clicked on
    game.form.addEventListener('click', checkAnswer, false);
    game.score = 0;
    // Display the score, hi-score and time
    updateScore();
    updateHiScore(game.score);
    updateTimer(time);
    // clear any output from earlier games
    clear(game.output);
    // start the game loop by choosing the first question
    chooseQuestion();

    // set up an interval that counts down every second
    var interval = window.setInterval( countDown , 1000 );
    
    
  ///// Game functions //////////////////////

    // choose a question at random from a list of filtered questions, so only questions that haven't already been asked are chosen
    function chooseQuestion() {
      console.log("chooseQuestion() called");
      var questions = quiz.questions.filter(function(question){
        return question.asked === false;
      });
      // set the current question
      question = questions[random(questions.length) - 1];
      askQuestion();
    }
    
    // Ask the question and show 3 different options to choose from
    function askQuestion(){
      console.log("askQuestion() called");
      // set the question.asked property to true so it's not asked again
      question.asked = true;
      // clear the previous options
      clear(game.form);
      // Display the questin
      message(quiz.question + question.question + "?");
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
        game.form.appendChild(button);
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
    
    // Check the answer is correct, this function is called when any of the buttons are clicked on
    function checkAnswer(event){
        console.log("checkAnswer() called");
        // clear the feedback for the previous question
        clear(game.output);
        // Grab the answer that was selected
        var answer = event.target.value;
        // check if the answer matches the answer property of the current question
        if(answer === question.answer) {
          message("Correct!","correct");
          // increase score by 1
          game.score++;
        } else {
          message("Wrong!","wrong");
        }
        // update the score
        updateScore();
        // choose the next question to ask
        chooseQuestion();
      }
    
    // This is called when the timer reaches zero
    function gameOver(){
      console.log("gameOver() called");
      // clear the display
      clear(game.form);
      clear(game.output);
      // remove the event listener from the option buttons
      game.form.removeEventListener('click', checkAnswer, false);
      // stop the countdown interval
      window.clearInterval(interval);
      // display the score
      message("Game Over, you scored " + game.score + " points");
      // check if player has a new high score
      updateHiScore(game.score);
      // display the start button so player can play again
      clickToPlay("again");
    }
    
    // this is called every second and decreases the time
    function countDown() {
      // decrease time by 1
      time--;
      // update the time displayed
      updateTimer(time);
      // the game is over if the timer has reached 0
      if(time <= 0) {
        gameOver();
      }
      
    }
    
    // updates the score element
    function updateScore(){
      document.getElementById("score").textContent = "Score: " + game.score;
    }
    
    // updates the hiScore element
    function updateHiScore(score) {
      if(window.localStorage) {
        // the value held in localStorage is initally null so make it 0
        var hiScore = localStorage.getItem("hiScore") || 0;
        // check if the hi-score has been beaten and display a message if it has
        if(score > hiScore || hiScore === 0) {
          localStorage.setItem("hiScore", score);
          message("You got a new High Score!");
        }
        document.getElementById("hiScore").textContent = "Hi Score: " + localStorage.getItem("hiScore");
      }
    }
    
    // updates the timer element
    function updateTimer(time) {
      document.getElementById("timer").textContent = time;
    }
    
    // displays the start button
    function clickToPlay(again){
      if (again) {
        game.startButton.firstChild.nodeValue = "Click To Play Again";
      }
        game.startButton.style.display = "block";
    }

  } // end of main game function

  //// Utility function module ////

  var utilities = (function(){
    // random function, returns a random integer between a and b
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
    
    // displays a message inside a paragraph element in the output div
    function message(text,type){
      var para = document.createElement("p");
      var txt = document.createTextNode(text);
      para.appendChild(txt);
      if(type) {
        para.className = type;
      }
      game.output.appendChild(para);
    }
    
    // clears the HTML inside an element provided as an argument
    function clear(element) {
      element.innerHTML = "";
      return element;
    }
    
    // return functions as methods of the utilities object
    return {
      random: random,
      message: message,
      clear: clear
    };
  }()); // end of utilities module

}());
