var time = 20;
var quiz = {
  name: "Super Hero Name Quiz",
  description: "How many super heroes can you name?",
  questions: ["Superman","Batman","Wonder Woman", "Spiderman", "Green Lantern", "Green Arrow", "The Flash", "The Hulk", "Iron Man"],
  answers: ["clarke kent","bruce wayne","dianna prince","peter parker", "hal jordan", "oliver queen", "barry allen", "bruce banner", "tony stark"],
}

var startButton = document.getElementById("button");
startButton.addEventListener('click', getQuiz, false);

function getQuiz() {
  //alert("get");
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if (xhr.readyState === 4) {
      quiz = JSON.parse(xhr.responseText);
      play(quiz);
    }
  }
  xhr.open("GET", "quiz.json", true);
  xhr.overrideMimeType("application/json");
  xhr.send();
  document.getElementById("output").innerHTML = "Waiting for questions...";
}
  
// Function definitions

function play(quiz){
  window.setTimeout(function(){ gameOver() }, time*1000);
  
  button.style.display = "none";

  var output = document.getElementById("output");
  var form = document.createElement("form");
  //form.innerHTML = "<input type='text' name='answer'><button>Submit Answer</button>";
  document.body.appendChild(form);
  form.addEventListener('click', check, false);


  //var i = 0;
  output.innerHTML = "";
  var score = 0; // initialize player's score
  updateScore();
  updateHiScore(score)
    
    

  // ask first question
  var question = chooseQuestion();
  
  function chooseQuestion() {

    questions = quiz.questions.filter(function(question){
      return question.asked === false;
    })
    x = random(0,questions.length - 1);
    return questions[x];
  }
  
  
  ask(question);
  
  

  
  function ask(data){
    
    data.asked = true;
    form.innerHTML = "";
    var question = quiz.question + data["question"] + "?";
    message(question);
    var answer = data.answer;
    var options = [];
    var option1 = chooseOption();
    options.push(option1["answer"]);
    var option2 = chooseOption();
    options.push(option2["answer"]);
    options.splice(random(0,2),0,answer);
    options.forEach(function(name) {
      var button = document.createElement("button");
      button.value = name;
      button.textContent = name;
      form.appendChild(button);
    });
    
    function chooseOption() {
      var option = quiz.questions[random(0,quiz.questions.length - 1)];
      // trying to stop repeated answers here, but not working ... yet!
      //alert(options);
      if(option === data || options.indexOf(option["answer"]) !== -1) {
        //alert("try again!")
        return chooseOption();
      }
      return option;
    }
    
  }

  function check(event){
      output.innerHTML = "";
      answer = event.target.value;
      if(answer === questions[x]["answer"]) {
        message("Correct!","correct");
        score++;
      } else {
        message("Wrong!","wrong");
      }
      //quiz.answers.splice(q,1);
      updateScore();
      //i++;
      var question = chooseQuestion();
      ask(question);  
    }
  
  
  
  function gameOver(){
    document.body.removeChild(form);
    output.innerHTML = "";
    message("Game Over, you scored " + score + " points");
    updateHiScore(score);
    clickToPlay("again");
  }
  
  function updateScore(){
    document.getElementById("score").textContent = "Score: " + score;
  }

}

function clickToPlay(again){
  if (again) {
    button.firstChild.nodeValue = "Click To Play Again";
  }
    button.style.display = "block";
}

function message(text,type){
  para = document.createElement("p");
  txt = document.createTextNode(text);
  para.appendChild(txt);
  if(type) {
    para.className = type;
  }
  output.appendChild(para);
}

function random(a,b,callback) {
  if(b===undefined) b = a, a = 1; // if only one argument is supplied, assume the lower limit is 1
  result = Math.floor((b-a+1) * Math.random()) + a
  if(typeof callback === "function") {
    result = callback(result);
  }
  return result;
}

function updateHiScore(score) {
  if(window.localStorage) {
    var hiScore = localStorage.getItem("hiScore") || 0;
    if(score > hiScore || hiScore === 0) {
      localStorage.setItem("hiScore", score);
      message("You got a new High Score!");
    }
    document.getElementById("hiScore").innerHTML = "Hi Score: " + localStorage.getItem("hiScore");
  }
}

