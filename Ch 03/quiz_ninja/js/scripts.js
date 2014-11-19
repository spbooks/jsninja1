var quiz = [
    ["What is Superman's real name?","Clarke Kent"],
    ["What is Wonderwoman's real name?","Dianna Prince"],
    ["What is Batman's real name?","Bruce Wayne"]
    ];
   
var score = 0 // initialize score

for(var i=0,max=quiz.length;i<max;i++){
  
  // get answer from user
  var answer = prompt(quiz[i][0]); // quiz[i][0] is the ith questions

  // check if answer is correct
  if(answer === quiz[i][1]){ // quiz[i][1] is the ith answer
    alert("Correct!");
    // increase score by 1
    score++;
  } else {
    alert("Wrong!");
  }
}

// Tell user the score
alert("Game Over, you scored " + score + " points");
