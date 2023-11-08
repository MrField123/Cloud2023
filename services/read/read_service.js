const express = require('express')
const { addAsync } = require('@awaitjs/express')
const app = addAsync(express())
const mariadb = require('mariadb')
const cors = require("cors");
const inefficient = require('inefficient');

//Database configuration
const pool = mariadb.createPool({
	host: 'my-app-mariadb-service',
	database: 'vouchers',
	user: 'root',
	password: 'mysecretpw',
	connectionLimit: 5
})

//Fetch data from database
async function fetchFromDB(id) {
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

//Stringify the DB response and send it to the client
function send_response(response, dbResult) {
	response.send(JSON.stringify(dbResult));
}

//Get metadata for QR-Code
app.getAsync('/getvoucher/:id', async function (request, response) {
	let voucherid = request.params["id"]
		let data = await fetchFromDB(voucherid);
		if (data) {
			console.log(`Got data=${data}`)
			
		} else {
			data = {
				error: "No data found"
			}
		}
		send_response(response, data)
})


//CORS
app.use(cors({
    origin: 'http://localhost:8080',
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type,Authorization',
    optionsSuccessStatus: 200
}))

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
app.set('port', (process.env.PORT || 8080))

// Start the application
app.listen(app.get('port'), function () {
	console.log("Node app is running at localhost:" + app.get('port'))
})
