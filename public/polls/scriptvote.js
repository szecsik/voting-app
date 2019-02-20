const pathname = window.location.pathname;
//const id = pathname.slice(7,pathname.length);

const question = document.getElementById("question")
const questiontext = document.getElementById("question-text")
const questioncont = document.getElementsByClassName("question-cont")
const answercont=document.getElementsByClassName("answer-cont")
const button = document.getElementById("button")
const save = document.getElementById("save")
const answerinput=document.getElementById("answer-in");
const template = document.getElementById("template-vote");
let avalue 
question.addEventListener("input", ()=>{
    questioncont[0].innerHTML="<h1>"+question.value+"</h1>"
})
answerinput.addEventListener("input",(e)=>{
    avalue=e.target.value
})



button.addEventListener('click', ()=>{
    const vote = new Answer(avalue, answercont[0],template);
    vote.add(true);
})

save.addEventListener('click',()=>{
    const vote = new Answer(avalue, answercont[0],template);
    vote.save(question.value)
})

fetch('http://localhost:3000/getvotes'+pathname).then((resp)=>resp.json()).then((data)=>data.forEach((v)=>{
var svote = v.vote//.toString();

const vote = new Answer("svote", answercont[0],template)

vote.add(false)

}));