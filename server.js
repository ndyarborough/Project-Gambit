// Dependencies
var express = require("express");
var mongoose = require("mongoose");
var request = require("request");
var bodyParser = require("body-parser");

// Initialize Express
var app = express();
var PORT = process.env.PORT || 3000;

// Import Models
var Hero = require('./models/hero.js');
var User = require('./models/user.js');

// Routes
const routes = require("./controllers/router.js");
app.use("/", routes);

mongoose.Promise = Promise;

//Database configuration with mongoose
mongoose.connect("mongodb://localhost/projectgambit");
//mongoose.connect("mongodb://heroku_k839gv0t:hk62n62cdea3vpj3bq3bhl3o57@ds143245.mlab.com:43245/heroku_k839gv0t");
var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Database Error:", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

app.use(express.static("public"));

// Use morgan and body parser with our app
app.use(bodyParser.urlencoded({
  extended: false
}));

// Listen on port 3000
app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
});
