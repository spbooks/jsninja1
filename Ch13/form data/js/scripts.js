var form = document.forms.hero;
form.addEventListener("submit", submitHero, false);

function submitHero(event) {
    event.preventDefault();
    var form = event.target;
    var data = new FormData(form);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", form.action, true);
    xhr.setRequestHeader("Content-Type", "application/json"); 
    xhr.onreadystatechange = function(){
      if (xhr.readyState === 4 && xhr.status === 201) {
        console.log(xhr.responseText);
      }
    };
    xhr.send(data);
}
