const express = require('express');
const app = express();

const port = 3000;

// log middleware
app.use((req,res,next) => {
	console.log(`${req.method} - ${req.url} - ${req.id} ${new Date()}`);
	next();
})

// route handlers
app.get('/',(req,res) => {
	res.send({
		notice: "message need to be displayed here.."
	});
})

app.post('/products',(req,res) => {
	res.send({
		"id": 1,
		"name": "Virat",
		"batting_avg" : 51.02
	})
})

app.put('/products/:id',(req,res) => {
	res.send({
		"name": "sachin"
	})
})

app.delete('/products/id',(req,res) => {
	res.send('The Record Has Been Successfully Deleted')
})

app.listen(port,() => {
	console.log(`Listening to the port at ${port}`)
})