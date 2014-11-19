var quiz = [
  ["What is Superman's real name?","Clarke Kent"],
  ["What is Wonderwoman's real name?","Dianna Prince"],
  ["What is Batman's real name?","Bruce Wayne"]
  ];
  
var score = 0 // initialize score

play(quiz);

//// function definitions ////

function play(quiz){
  // main game loop
  for(var i=0, question, answer, max=quiz.length; i<max; i++) {
    question = quiz[i][0];
    answer = ask(question);
    check(answer);
  }
  // end of main game loop
  gameOver();
  
  // nested functions
  
  function ask(question) {
    return prompt(question); // quiz[i][0] is the ith questions
  }

  function check(answer) {
    if(answer === quiz[i][1]){ // quiz[i][1] is the ith answer
      alert("Correct!");
      // increase score by 1
      score++;
    } else {
      alert("Wrong!");
    }
  }

  function gameOver(){
    // inform the player that the game has finished and tell them how many points they have scored
    alert("Game Over, you scored " + score + " points");
  }
}


