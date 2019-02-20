const knex = require("knex");
const randomstring = require("randomstring")



const db = knex ({
  client: 'pg',
  connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true,
  }
});;


const maintain = ()=>{

	
		db.select("id").from("polls").then((d)=>{d.forEach((poll)=>{
			db.schema.dropTable(poll.id).then((res)=>{return res})
		})}).then(db('polls').del()).then((resp)=>{return resp})
	
}



const add = (content)=>{
var id;
return new Promise((resolve,reject)=>{

db.insert({id:randomstring.generate(5)}).into("polls").returning("*").then((res)=>{
			id=res[0].id;

			db.schema.createTable(res[0].id, (table)=>{
				table.string('vote');
				table.bigInteger('score').defaultTo(0)
			}).then((resp)=>{content.answers.forEach((ans)=>{
				

				db.insert({vote: ans}).into(res[0].id).returning("*").then(Promise.resolve("added"))
			})}).then(db.insert({id: id, question:content.question}).into("questions").returning("*").then((que)=>{resolve (que)}))


	})

})

.catch((err)=>{

Promise.reject(err)
		
	})



}

const getVotes = (table)=>{

return new Promise((resolve,reject)=>{



	db.select("*").from(table).then((data)=>{


	

		resolve(data)}).catch((err)=>{
	reject("error");
})
})

}

const getQuestion =(id)=> {

	return new Promise((resolve,reject)=>{

		db.select("question").from("questions").where(id,id).then((q)=>{resolve(q)})
	})
}

const sendVote = (vote, table)=>{

return new Promise((resolve,reject)=>{

db(table).where('vote',vote).increment('score', 1).returning("*").then((r)=>{resolve(r)})

}

	

	)

}

const didVote = (id)=>{

	return new Promise ((resolve,reject)=>{

		db.select("*").from("session").where("sid",id).then((q)=>{
		
			resolve(q[0].voted)})
	})
}

const statusUpdate = (id)=>{

	return new Promise((resolve,reject)=>{

		db('session').where('sid',id).update('voted',true).returning('*').then((r)=>{resolve(r)})
	})
}


module.exports={
	add,
	maintain,
	getVotes,
	getQuestion,
	sendVote,
	didVote,
	statusUpdate
}