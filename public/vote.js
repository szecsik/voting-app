class Answer{
    constructor(cont,temp,score){
       
        this.cont=cont;
        this.temp=temp;
        this.score=score;
    }

    add(design, score, ans){

        if(typeof design !== "boolean"){
            throw "Design must be a boolean"
        }

        var template = this.temp
        var template2 = template.innerHTML
        Mustache.parse(template2);
        const rendered=Mustache.render(template2,{cont: ans, score:this.score})
        
        this.cont.innerHTML+=rendered;
        
        if(design){

            const delbtn = document.getElementsByClassName("del")


            for(var i=0;i<delbtn.length;i++){
                delbtn[i].addEventListener('click', (e)=>{console.log(e.target.parentElement)})
            }
        }

        

    }

    save(question){
    
    const el= document.getElementsByClassName("elem");
    let voteToSend={
        question:question,
        answers: []

    }

    for(var i = 0; i<el.length; i++){

        voteToSend.answers.push(el[i].innerHTML)
    }



   return new Promise((resolve,reject)=>{

    fetch("https://poll-szecsikr.herokuapp.com/save",{

    method: 'POST',
    body: JSON.stringify(voteToSend),
    headers:{'Content-Type':'application/json'}
       }).then((res)=>res.json()).then(data=>resolve(data))


   }) 
        }


        getVotes(id){


                return new Promise((resolve,reject)=>{

                    fetch('https://poll-szecsikr.herokuapp.com/getvotes'+id).then((resp)=>resp.json()).then((data)=>{resolve(data)})
                })

        }
    }
