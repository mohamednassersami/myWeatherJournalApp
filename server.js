// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

// Dependencies
const bodyParser = require("body-parser");

// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 3000;
app.listen(port, listening);

function listening() {
  console.log(`running on localhost: http://localhost:${port}`);
}

// POST route
app.post("/weatherData", weatherData);

function weatherData(request, response) {
  projectData.temp = request.body.temp;
  projectData.date = request.body.date;
  projectData.feeling = request.body.feeling;
  console.log(projectData);
}

// GET route
app.get("/all", sendData);

function sendData(request, response) {
  response.send(projectData);
}
