var send = document.getElementById("send");
send.addEventListener("click", update , false);

function update() {

  var script = document.createElement("script");
  script.src = " http://echo.jsontest.com/name/superman/?callback=process";
  document.getElementsByTagName("head")[0].appendChild(script);

}

function process(response) {  
  document.getElementById("output").innerHTML = response.name;
}
