var button = document.getElementById("button");

var rainbow = ["red","orange","yellow","green","blue","indigo","violet"];

function change() {      
  document.body.style.background = rainbow[Math.floor(7*Math.random())];
}
button.addEventListener("click", change);
