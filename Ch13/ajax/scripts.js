var text = document.getElementById("text");
var html = document.getElementById("html");
var api = document.getElementById("api");


text.addEventListener("click", function(){ request("https://s3.amazonaws.com/sitepoint-book-content/jsninja/hello.txt") }, false);
html.addEventListener("click", function(){ request("https://s3.amazonaws.com/sitepoint-book-content/jsninja/hello.htm") }, false);
api.addEventListener("click", function(){ request("http://ip.jsontest.com/") }, false);



function request(url) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if (xhr.readyState === 4 &&  xhr.status === 200 || 201 || 204) {
      document.getElementById("output").innerHTML = xhr.responseText;
    }
  }

  xhr.overrideMimeType("text/html");
  xhr.open("GET", url, true);
  xhr.send();
  document.getElementById("output").innerHTML = "Waiting for response...";
}
