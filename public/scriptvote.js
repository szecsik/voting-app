const pathname = window.location.pathname;
const questioncont = document.getElementsByClassName("question-cont")
const answercont=document.getElementsByClassName("answer-cont")
const template = document.getElementById("template-vote");
const score = document.getElementsByClassName("elem");
const result = document.getElementById("results");
var clickedval=false;
var usersVote="";
const send = document.getElementById("send");
const chart = 'https://poll-szecsikr.herokuapp.com'+pathname.replace(/\/$/gmi,"")+'/chart'
document.getElementsByClassName("controller2")[0].setAttribute('href',chart)

const showWrapper=()=>{

if(usersVote.length>1){

	fetch('https://poll-szecsikr.herokuapp.com/vote'+pathname,{
	method: 'POST',
    body: JSON.stringify({vote:usersVote}),
    headers:{'Content-Type':'application/json'},
	credentials: 'same-origin'
}).then((resp)=>{

	if(!resp.ok){

		throw alert("You already voted")

	}

	resp.json()}).then((data)=>{





document.getElementsByClassName("wrapper")[0].classList.remove("hidden");

})

} else{

	alert('Please vote, before you submit!')
}





}


const addEvents=()=>{

for (var i=0; i<score.length;i++){


	if(score[i].parentElement.classList.contains("unclickable")){

		score[i].parentElement.classList.remove("unclickable");
		score[i].parentElement.classList.add("vote")

	}


	score[i].addEventListener('click',clicked)
}


document.getElementsByClassName("controller2")[1].addEventListener('click',()=>{

	document.getElementsByClassName("wrapper")[0].classList.add("hidden");

})


}


const clicked = (e)=>{

var voteTo = e.target;

if(!clickedval){

for (var i=0; i<score.length;i++){

if(score[i]!==voteTo){

score[i].removeEventListener('click',clicked)
score[i].parentElement.classList.remove("vote");
score[i].parentElement.classList.add("unclickable")
usersVote = e.target.innerHTML;
clickedval = true;


}

}

} else {

	addEvents()
	clickedval=false;
	usersVote=""
}

}

results.setAttribute('href',chart);
const vote = new Answer(answercont[0],template)




vote.getVotes(pathname).then((data)=>{
document.getElementsByClassName("loading")[0].classList.add("hidden");
questioncont[0].innerHTML="<h2>"+data.question[0].question+"</h2>"

data.answers[0].forEach((v)=>{
var svote = v.vote//.toString();
var score = v.score
vote.add(false,score,svote)

})

send.addEventListener('click',showWrapper)



addEvents();


}

)
