const express = require('express');					// requiring locally running express server
const app = express();								// using function returned by express
const { cricketers } = require('./cricketers');		// requiring js data from other file via module exports
const bodyParser = require('body-parser');			// requiring bodyParser to do POST & PUT

const port = 3000;									// using port 3000 to run the localhost server

// bodyParser - package middleware
app.use(bodyParser.json())

// logging - custom middleware
app.use((req,res,next) => {
	console.log(`${req.method} - ${req.url} - ${req.id} - ${new Date()}`);
	next();
})

// route handlers
// checking response --> TRUE
app.get('/',(req,res) => {
	res.send({
		notice: "you're ready to make requests"
	});
})

// to get all the records from the db
app.get('/cricketers',(req,res) => {
	res.send({
		cricketers,
		notice: "successfully obtained the records"
	});
})

// to get a single record from the db
app.get('/cricketers/:id',(req,res) => {
	let cricketer = cricketers.find((cricketer) => {
		return cricketer.id == req.params.id;
	})
	if(cricketer) {
		res.send({
			cricketer,
			notice: "successfully obtained the records"
		});
	} else {
		res.send({
			notice: `unable to retrieve the id ${req.params.id}`
		});
	}
})

// to insert a single record into the db
app.post('/cricketers',(req,res) => {
	let cricketer = req.body;
	cricketers.push(cricketer);
	res.send({
		cricketer,
		notice: "successfully inserted the record"
	});
})

// to update property(s) of a record in the db
app.put('/cricketers/:id',(req,res) => {
	let cricketer = cricketers.find((cricketer) => {
		return cricketer.id == req.params.id
	})
	if(cricketer) {
		cricketer.name = req.body.name;
		res.send({
			cricketer,
			notice: "successfully updated the record"
		});	
	} else {
		res.send({
			notice: `unable to update the id ${req.params.id}`
		});
	}
})

// to delete a record from the db
app.delete('/cricketers/:id',(req,res) => {
	let index = cricketers.findIndex((cricketer) => {
		return cricketer.id == req.params.id;
	})
	if(index > 0) {
		cricketers.splice(index,1);
		res.send({
			notice: "successfully deleted the record"
		});	
	} else {
		res.send({
			notice: `unable to delete the id ${req.params.id}`
		});
	}
})

// localhost server listening to 3000
app.listen(port,() => {
	console.log(`Listening to the port at ${port}`)
})