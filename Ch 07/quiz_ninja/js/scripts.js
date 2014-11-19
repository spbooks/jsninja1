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

//// dom references ////
var $question = document.getElementById("question");
var $score = document.getElementById("score");
var $feedback = document.getElementById("feedback");
var $start = document.getElementById("start");

/// view functions ///

function update(element,content,klass) {
  var p = element.firstChild || document.createElement("p");
  p.textContent = content;
  element.appendChild(p);
  if(klass) {
    p.className = klass;
  }
}

// Event listeners
$start.addEventListener('click', function() { play(quiz) } , false);
  
//// function definitions ////

function play(quiz){
  var score = 0 // initialize score
  update($score,score);

  // main game loop
  for(var i=0, question, answer, max=quiz.questions.length; i<max; i++) {
    question = quiz.questions[i].question;
    answer = ask(question);
    check(answer);
  }
  // end of main game loop
  gameOver();
  
  // nested functions
  
  function ask(question) {
    update($question,quiz.question + question);
    return prompt("Enter your answer:");
  }

  function check(answer) {
    if(answer === quiz.questions[i].answer){
      update($feedback,"Correct!","correct");
      // increase score by 1
      score++;
      update($score,score)
    } else {
      update($feedback,"Wrong!","wrong");
    }
  }

  function gameOver(){
    // inform the player that the game has finished and tell them how many points they have scored
    update($question,"Game Over, you scored " + score + " points");
  }
}
