const express = require("express");
const http = require('http');
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const knex = require("knex");
const hbs = require("hbs");
const app = express();
const session = require("express-session")
const randomstring = require("randomstring")
const polls = require('./poll.js')
const path = require("path")
const KnexSessionStore = require('connect-session-knex')(session);
const cookieParser = require("cookie-parser");


const db = knex ({
  client: 'pg',
  connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true,
  }
});

const store = new KnexSessionStore({
    knex: db,
    tablename: 'session' // optional. Defaults to 'sessions'
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.set("view-engine", "hbs");
app.use(express.static(__dirname + "/public"));
app.use('/scripts', express.static(__dirname+"/node_modules"));
app.use(session({
	secret:'nottelyou',
	store:store,
	resave: true,
	saveUninitialized: true,
	cookie: {
        
        "maxAge":8*60*60*1000
       
        
      },
    

	
}))



app.get('/',(req,res)=>{



})

app.get('/:id',(req,res)=>{




polls.getVotes(req.params).then((d)=>{
	
	res.sendfile(path.join(__dirname+'/public/vote.html'));
}).catch((err)=>{res.status(404).send("404 page cannot be found")})




})

app.post('/save', (req,res)=>{

	
	polls.add(req.body).then((dat)=>{

		res.json(dat[0].id)})
})

app.get('/getvotes/:id',(req,res)=>{

//console.log(polls.getVotes(req.params))
var result = {
	question:[],
	answers: []
}

polls.getVotes(req.params).then((d)=>{

	result.answers.push(d)
//
}).then(polls.getQuestion(req.params).then((q)=>{

	result.question.push(q[0])
	res.json(result);

		}))



})

app.get('/setup/maintain',(req,res)=>{

	polls.maintain()
})

app.post('/vote/:id', (req,res)=>{
	console.log(req.session.cookie.voted)
		if(!req.session.voted){
	
		req.session.voted=true
		polls.sendVote(req.body.vote,req.params).then((r)=>

		res.json(true))
		} else {

				res.status(400).send({"status":"You Already Voted"})
		}
	

})

app.get('/:id/chart',(req,res)=>{

	res.render('chart.hbs')
})


app.listen(port, () => {
  console.log("running");
});