var form = document.forms.search;
var input = form.elements.searchBox;

form.addEventListener("submit", search, false);

function search(event) {
  alert("You Searched for: " + input.value);
  event.preventDefault();
}

input.value = "Search Here";

input.addEventListener('focus', function(){ 
  input.value = "" }, false);
  
input.addEventListener('blur', function(){ 
  if(input.value == "") { 
    input.value = "Search Here"; 
    } }, false);
