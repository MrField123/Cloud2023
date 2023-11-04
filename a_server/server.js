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

//Get data from database
async function getFromDatabase(id) {
	let connection
	let query = 'SELECT * from vouchers WHERE code = ? LIMIT 1'

	try {
		connection = await pool.getConnection()
		console.log("Executing query " + query)
		let res = await connection.query(query, [id])
		let row = res[0]

		if (row) {
			console.log("Query result = ", row)
			return row;
		} else {
			return null;
		}

	} finally {
		if (connection)
			connection.end()
	}
}

//Get data from database
async function postToDatabase(query) {
	let connection
	console.log("INSERT TO DB");
	try {
		connection = await pool.getConnection()
		console.log("Executing query " + query)
		let res = await connection.query(query)
		return res;
	} catch{
		return null;
	} finally {
		if (connection)
			connection.end()
	}
}

//Send HTML response to client
function send_response(response, dbResult) {

	response.send(JSON.stringify(dbResult));
}

//CORS
app.use(cors({
    origin: 'http://localhost:8080',
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type,Authorization',
    optionsSuccessStatus: 200
}))

// Add prometheus metrics middleware
app.use(prometheusBundle({
	includePath: true,
	customLabels: { project_name: 'my-express-app' },
}))

// Redirect / to person with ID l.mlb.com - p.7491
app.get('/', function (request, response) {
	response.writeHead(302, { 'Location': 'getvoucher/1' })
	response.end()
})

app.post('/postvoucher', (req, res) => {
	app.use(express.json())
	let v = res.json(req.body);
	console.log(v);
	console.log("CREATING DB STATEMENT");
	let query = 'INSERT INTO `vouchers` (`type`,`code`,`value`,`name`,`valid`) VALUES (' + v.type +' ,' + v.code +' ,' + v.value +' ,' + v.name +' ,' + v.valid+');'
	console.log(query);
	postToDatabase(query);
	send_response(res, "RESPONSE");
  });

// Get data about a single person
app.getAsync('/getvoucher/:id', async function (request, response) {
	let voucherid = request.params["id"]
		let data = await getFromDatabase(voucherid)
		if (data) {
			console.log(`Got data=${data}`)
			send_response(response, data)
		} else {
			send_response(response, "No data found")
		}
	//}
})



// Set port to start the app on
app.set('port', (process.env.PORT || 8080))

// Start the application
app.listen(app.get('port'), function () {
	console.log("Node app is running at localhost:" + app.get('port'))
})
 // Ende