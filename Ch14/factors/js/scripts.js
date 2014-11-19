var button = document.getElementById("rainbow");

var rainbow = ["red","orange","yellow","green","blue","indigo","violet"];

function change() {      
  document.body.style.background = rainbow[Math.floor(7*Math.random())];
}
button.addEventListener("click", change);

var form = document.forms[0];
form.addEventListener("submit", factorize, false);

function factorize(event) {

  event.preventDefault(); // prevent the form from being submitted
  
  var number = form.number.value;
  
  if(Worker) {
    worker = new Worker("file:///home/daz/Dropbox/JSNINJA1/5 Code/Ch14/factors/js/factors.js");
    
    worker.addEventListener('message', function(event) {
      document.getElementById("output").textValue = event.data;
    }, false);
    
    worker.postMessage(number);

  }
  
}
  
  

