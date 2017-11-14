// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const request = require("request");
const bodyParser = require("body-parser");

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;

// Import Models
const Hero = require('./models/hero.js');
const User = require('./models/user.js');

// Routes
const routes = require("./controllers/router.js");
app.use("/", routes);

mongoose.Promise = Promise;

//Database configuration with mongoose
mongoose.connect("mongodb://localhost/projectgambit");
//mongoose.connect("mongodb://heroku_k839gv0t:hk62n62cdea3vpj3bq3bhl3o57@ds143245.mlab.com:43245/heroku_k839gv0t");
const db = mongoose.connection;

db.on("error", (error) => {
  console.log("Database Error:", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", () => {
  console.log("Mongoose connection successful.");
});

app.use(express.static("public"));

// Use morgan and body parser with our app
app.use(bodyParser.urlencoded({
  extended: false
}));

// Listen on port 3000
app.listen(PORT, () => {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
});
