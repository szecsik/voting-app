
const question = document.getElementById("question")
const questiontext = document.getElementById("question-text")
const questioncont = document.getElementsByClassName("question-cont")
const answercont=document.getElementsByClassName("answer-cont")
const button = document.getElementById("button")
const save = document.getElementById("save")
const answerinput=document.getElementById("answer-in");
const template = document.getElementById("template");
let avalue
const del = document.getElementsByClassName("del");


question.addEventListener("input", ()=>{
    questioncont[0].innerHTML="<h1>"+question.value+"</h1>"
    document.getElementsByClassName("greet")[0].classList.add("hidden")
})
answerinput.addEventListener("input",(e)=>{
    avalue=e.target.value
})






button.addEventListener('click', ()=>{
    const vote = new Answer(answercont[0],template);
    vote.add(true,0,avalue);
    document.getElementsByClassName("greet")[0].classList.add("hidden")
    for(i=0;i<del.length;i++){

del[i].addEventListener('click',(e)=>{
    e.target.parentElement.remove();
})

} 
answerinput.value=""
})

save.addEventListener('click',async function s (){

if(document.getElementsByClassName("elem").length<2 || question.value.length===0){

    return alert("You must add at least 2 options and specify a question")
}
    document.getElementsByClassName("greet")[0].classList.add("hidden")
    const vote = new Answer(avalue, answercont[0],template);
    const sa = await vote.save(question.value);
    const popup = await document.getElementsByClassName("wrapper")[0].classList.remove("hidden");
    document.getElementsByClassName("controller")[0].setAttribute('href','https://poll-szecsikr.herokuapp.com/'+sa);
    
})

