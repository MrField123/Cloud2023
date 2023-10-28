const dns = require('dns').promises
const os = require('os')
const prometheusBundle = require("express-prom-bundle");
const express = require('express')
const { addAsync } = require('@awaitjs/express')
const app = addAsync(express())
const mariadb = require('mariadb')
const MemcachePlus = require('memcache-plus')
const inefficient = require('inefficient')

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
	let query = 'SELECT code from vouchers WHERE id = ? LIMIT 1'

	try {
		connection = await pool.getConnection()
		console.log("Executing query " + query)
		let res = await connection.query(query, [id])
		let row = res[0]

		if (row) {
			console.log("Query result = ", row)
			return row["code"];
		} else {
			return null;
		}

	} finally {
		if (connection)
			connection.end()
	}
}

//Send HTML response to client
function send_response(response, code) {
	let res; 
	res = {
		"code" : "empty",
		"value" : "0"
	}
	res.code = code;
	response.send(JSON.stringify(res));
}

// Add prometheus metrics middleware
app.use(prometheusBundle({
	includePath: true,
	customLabels: { project_name: 'my-express-app' },
}))

// Redirect / to person with ID l.mlb.com - p.7491
app.get('/', function (request, response) {
	response.(302, { 'Location': 'getvoucher/1' })
	response.end()
})

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

// Add stress test endpoint, cf. https://github.com/bermi/inefficient
app.get('/stress', inefficient)

// Set port to start the app on
app.set('port', (process.env.PORT || 8080))

// Start the application
app.listen(app.get('port'), function () {
	console.log("Node app is running at localhost:" + app.get('port'))
})
 // Ende