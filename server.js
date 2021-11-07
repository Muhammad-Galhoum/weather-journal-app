// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());


// Initialize the main project folder
app.use(express.static("website"));


// Setup empty JS object to act as endpoint for all routes
projectData = {};


// Setup Server

const port = 6600;
app.listen(port, () => console.log(`server running on http://localhost:${port}`));

//Get data
app.get("/all", (req, res) => {
  res.status(200).send(projectData);
});

//Post data
app.post("/postData", (req, res) => {
  projectData = {
    temp: req.body.temp,
    date: req.body.date,
    content: req.body.content,
  };
  res.status(200).send(projectData);
});
