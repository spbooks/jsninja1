function getQuiz(){"use strict"
var e=new XMLHttpRequest
e.onreadystatechange=function(){if(4===e.readyState&&200==e.status){var t=JSON.parse(e.responseText)
new Game(t)}},e.open("GET","https://s3.amazonaws.com/sitepoint-book-content/jsninja/quiz.json",!0),e.overrideMimeType("application/json"),e.send(),view.update(view.question,"Waiting for questions...")}function random(e,t,i){"use strict"
void 0===t&&(t=e,e=1)
var o=Math.floor((t-e+1)*Math.random())+e
return"function"==typeof i&&(o=i(o)),o}function Game(e){"use strict"
this.questions=e.questions,this.phrase=e.question,this.score=0,view.update(view.score,this.score),view.update(view.hiScore,this.hiScore()),this.time=20,view.update(view.timer,this.time),this.interval=window.setInterval(this.countDown.bind(this),1e3),view.hide(view.start),view.show(view.form),view.form.addEventListener("click",function(e){e.preventDefault(),this.check(e.target.value)}.bind(this),!1),this.chooseQuestion()}var view=function(){"use strict"
function e(e,t,i){var o=e.firstChild||document.createElement("p")
o.textContent=t,e.appendChild(o),i&&(o.className=i)}function t(e){e.style.display="none"}function i(e){e.style.display="block"}return{question:document.getElementById("question"),score:document.getElementById("score"),feedback:document.getElementById("feedback"),start:document.getElementById("start"),form:document.getElementById("answer"),timer:document.getElementById("timer"),hiScore:document.getElementById("hiScore"),update:e,hide:t,show:i}}()
Game.prototype.chooseQuestion=function(){var e=this.questions.filter(function(e){return e.asked===!1})
this.question=e[random(e.length)-1],this.ask(this.question)},Game.prototype.ask=function(e){function t(){var o=i.questions[random(i.questions.length)-1]
return o===e||-1!==n.indexOf(o.answer)?t():o}var i=this
e.asked=!0,view.update(view.question,this.phrase+e.question+"?"),view.form.innerHTML=""
var o,n=[],s=t()
n.push(s.answer)
var r=t()
n.push(r.answer),n.splice(random(0,2),0,this.question.answer),n.forEach(function(e){o=document.createElement("button"),o.value=e,o.textContent=e,view.form.appendChild(o)})},Game.prototype.check=function(e){e===this.question.answer?(view.update(view.feedback,"Correct!","correct"),this.score++,view.update(view.score,this.score)):view.update(view.feedback,"Wrong!","wrong"),this.chooseQuestion()},Game.prototype.countDown=function(){this.time--,view.update(view.timer,this.time),this.time<=0&&this.gameOver()},Game.prototype.gameOver=function(){view.update(view.question,"Game Over, you scored "+this.score+" points"),window.clearInterval(this.interval),view.hide(view.form),view.show(view.start)},Game.prototype.hiScore=function(){if(window.localStorage){var e=localStorage.getItem("hiScore")||0
return(this.score>e||0===e)&&localStorage.setItem("hiScore",this.score),localStorage.getItem("hiScore")}},view.start.addEventListener("click",getQuiz,!1),view.hide(view.form)
