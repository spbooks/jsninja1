    function doSomething(event) {
        console.log(event.which);
    };

addEventListener("click", doSomething);

var click = document.getElementById("click");

click.addEventListener("mousedown",function(){ console.log("down") });
click.addEventListener("click",function(){ console.log("click") });
click.addEventListener("mouseup",function(){ console.log("up") });

var dblclick = document.getElementById("dblclick");
dblclick.addEventListener("dblclick", highlight);

function highlight(event){
  event.target.classList.toggle("highlight");
  }
  
var mouse = document.getElementById("mouse");
mouse.addEventListener("mouseover", highlight);
mouse.addEventListener("mouseout", highlight);

mouse.addEventListener("mousemove", function() { console.log("You Moved!"); } );

addEventListener("keydown",highlight);

addEventListener("keyup", function stop(event){
  var date = new Date;
  console.log("You stopped pressing the key on " + date);
});

addEventListener("keypress", function (event){
  console.log("You pressed the " + String.fromCharCode(event.charCode) + " character");
});

once = document.getElementById("once");
once.addEventListener("click", remove);

function remove(event) {
  alert("Enjoy this while it lasts!");
  once.style.backgroundColor = "pink";
  once.removeEventListener("click",remove);
}

var broken = document.getElementById("broken");

broken.addEventListener("click",function(event) {
    event.preventDefault();
    alert("Broken Link!");
  });
  
ul = document.getElementById("list");
li = document.querySelector("#list li");



ul.addEventListener("click", function(event){
  console.log("Clicked on ul");
},true);

li.addEventListener("click", function(event){
  console.log("Clicked on li");
},false);






