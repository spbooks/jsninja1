var square = document.getElementById("square");
var angle = 0;

setInterval(function() {
  angle = (angle + 5)%360
  square.style.transform = "rotate(" + angle + "deg)"
}, 1000/6);
