const dns = require('dns').promises
const os = require('os')
const prometheusBundle = require("express-prom-bundle");
const express = require('express')
const { addAsync } = require('@awaitjs/express')
const app = addAsync(express())
const mariadb = require('mariadb')
const MemcachePlus = require('memcache-plus')
const inefficient = require('inefficient');
const { parse } = require('path');
const cors = require("cors");

//Database configuration
const pool = mariadb.createPool({
	host: 'my-app-mariadb-service',
	database: 'vouchers',
	user: 'root',
	password: 'mysecretpw',
	connectionLimit: 5
})

//Post new voucher to database
async function postToDatabase(data) {
	let connection
	console.log("CREATING DB STATEMENT");
	let query = 'INSERT INTO `vouchers` (`code`, `type`, `value`, `name`, `valid`) VALUES (?,?,?,?,?);'
	console.log(query);
	console.log("INSERT TO DB");
	try {
		connection = await pool.getConnection()
		console.log("Executing query " + query)
		let res = await connection.query(query, [data.code, data.type, data.value, data.name, 1])
		return "SUCCESS";
	} catch{
		return "ERROR";
	} finally {
		if (connection)
			connection.end()
	}
}

//Send HTML response to client
function send_response(response, data) {
	response.send(JSON.stringify(data));
}

//CORS
app.use(cors({
    origin: 'http://localhost:8080',
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type,Authorization',
    optionsSuccessStatus: 200
}))
app.use(express.json());

// Service to receive a new voucher and insert it into database
app.post('/postvoucher', (req, res) => {
	console.log("NEW POST REQUEST");
	let data = req.body;
	console.log(data);
	let dbRes = postToDatabase(data);
	send_response(res, dbRes);
  });



// Middleware to handle undefined routes
app.use(function (req, res) {
    res.status(404).send(`Route '${req.originalUrl}' not found`);
});

// Error handling middleware (optional but recommended)
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Internal server error');
});


// Set port to start the app on
app.set('port', (process.env.PORT || 1234))

// Start the application
app.listen(app.get('port'), function () {
	console.log("Node app is running at localhost:" + app.get('port'))
})
