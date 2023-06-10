// Setup empty JS object to act as endpoint for all routes
let projectData = {};
// Express to run server and routes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
// Start up an instance of app
const app = express(); // instance of express app


/* Dependencies */

/* Middleware*/

// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse json format to string format

// Cors for cross origin allowance

app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));
console.log(__dirname);

// Port setup
const port = 5000;
// Spin up the server

const listening = () => {
	console.log('Server listening on port ' + port);
};
const server = app.listen(port, listening);
// Callback to debug

// Initiate GET route
const fileSend = (req, res) => {
	res.sendFile(path.resolve('dist/index.html'));
	// res.sendFile('dist/index.html');
};
app.get('/', fileSend);

// Initialize all route with a callback function

// Callback function to complete GET '/all'
const getFunc = (req, res) => {
	res.send(projectData);
};
app.get('/all', getFunc);

// Post Route
const postRoute = (req, res) => {
	console.log(req.body);
	projectData = {
		image: req.body.image,
		city: req.body.city,
		country: req.body.country,
		date: req.body.date,
		temperature: req.body.temperature,
		forecast: req.body.forecast,
	};
	res.send(projectData);
	console.log(`Received response: ${res.status}`);
};
app.post('/api', postRoute);


// Export the Express instance
module.exports = app;