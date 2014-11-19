var form = document.forms.hero;
form.addEventListener("submit", makeHero, false);

function makeHero(event) {

  event.preventDefault(); // prevent the form from being submitted
  
  var hero = {}; // create an empty object
  
  hero.name = form.name.value; // create a name property based on the input field's value
  hero.realName = form.realName.value;
  hero.powers = [];
  for (i=0; i < form.powers.length; i++) {
    if (form.powers[i].checked) {
      hero.powers.push(form.powers[i].value);
    }
  }
  for (i=0 ; i < form.type.length ; i++) {
    if (form.type[i].checked) {
      hero.type = form.type[i].value;
      break;
    }
  }
  hero.city = form.city.value;
  hero.origin = form.origin.value;
  hero.age = form.age.value;
  send(JSON.stringify(hero)); // convert object to JSON string and display in alert dialog
}

function send(hero) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://reqr.es/api/users", true);
  xhr.setRequestHeader("Content-Type", "application/json"); 
  xhr.onreadystatechange = function(){
    if (xhr.readyState === 4 && xhr.status === 201) {
      console.log(xhr.responseText);
    }
  };
  xhr.send(hero);
}


