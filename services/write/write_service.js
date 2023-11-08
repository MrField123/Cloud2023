const express = require('express')
const { addAsync } = require('@awaitjs/express')
const app = addAsync(express())
const mariadb = require('mariadb')
const cors = require("cors");

//Database configuration
const pool = mariadb.createPool({
	host: 'mariadb-service',
	database: 'vouchers',
	user: 'root',
	password: 'mysecretpw',
	connectionLimit: 5
})

//Post new voucher to database
async function postToDatabase(data) {
	let connection;
	console.log("CREATING DB STATEMENT");
	let query = 'INSERT INTO `vouchers` (`code`, `type`, `value`, `name`, `valid`) VALUES (?,?,?,?,?);'
	console.log(query);
	console.log("INSERT TO DB");
	try{
		connection = await pool.getConnection()
		console.log("Executing query " + query)
		let dbRes = await connection.query(query, [data.code, data.type, data.value, data.name, 1])
		console.log("DB RESPONSE:" + dbRes);
		return dbRes;
	} finally {
		if (connection)
			connection.end()
	}
}

//Redeem voucher
async function updateDatabase(voucherCode) {
	let data;
	let connection
	console.log("CREATING DB STATEMENT");
	let query = 'UPDATE `vouchers` SET `valid` = 0 WHERE code = ?;'
	console.log(query);
	console.log("UPDATE DB");
	try {
		connection = await pool.getConnection()
		console.log("Executing query " + query)
		let dbRes = await connection.query(query, [voucherCode])
		console.log("DB RESPONSE: " + dbRes);
		return dbRes;
	} finally {
		if (connection)
			connection.end()
	}
}

//Stringify message and send it to the client
function send_response(response, result) {
	response.send(JSON.stringify(result));
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
	let result = {
		message: "Succcess"
	}
	try {
		postToDatabase(data);
	} catch (error) {
		result.message = "Error";
	}
	console.log(result);
	send_response(res, result);
	console.log("END POST REQUEST");
  });

  // Service to redeem a voucher
  app.getAsync('/redeem/:code', async function (req, res) {
	console.log("NEW PUT REQUEST");
	let voucherCode = req.params["code"];
	console.log(voucherCode);
	let result = {
		message: "Succcess"
	}
	try {
		updateDatabase(voucherCode);
	} catch (error) {
		result.message = "Error";
	}
	console.log(result);
	send_response(res, result);
	console.log("END PUT REQUEST");
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
