// Dependencies
var express = require("express");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");
var bodyParser = require("body-parser");

// Initialize Express
var app = express();
var PORT = process.env.PORT || 3000;


var Hero = require('./models/hero.js');
var User = require('./models/user.js');

mongoose.Promise = Promise;

// Initialize Express
var app = express();
var PORT = process.env.PORT || 3000;

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
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/', function(req, res) {
	res.send("hello")
});

app.get('/scrape', function(req, res) {
	request('https://www.overbuff.com/players/xbl/Its%20that%20Easey', function(err, response, html) {
		var $ = cheerio.load(html);

		var mongoResults = {};

		$('div.player-hero').each(function(i, element) {
			mongoResults.name = $(this).children('div.grouping').children('div.group').children('div.name').children('a').text();
			mongoResults.wins = $(this).children('div.grouping').children('div.special').children('div:nth-child(3)').children('div.value').children('span').text();
			mongoResults.eliminations = $(this).children('div:nth-child(3)').children('div.normal').children('div:nth-child(1)').children('div.value').text();
			mongoResults.deaths = $(this).children('div:nth-child(3)').children('div.normal').children('div:nth-child(5)').children('div.value').text();
			mongoResults.damage = $(this).children('div:nth-child(3)').children('div.normal').children('div:nth-child(4)').children('div.value').text();
			mongoResults.objkill = $(this).children('div:nth-child(3)').children('div.normal').children('div:nth-child(2)').children('div.value').text();
			mongoResults.objtime = $(this).children('div:nth-child(3)').children('div.normal').children('div:nth-child(3)').children('div.value').text();


			// var entry = new Article(mongoResults);
			
			// entry.save(function(err, doc) {
			// 	if (err) {
			// 		console.log(err);
			// 	}else {
			// 	}
			// });
		});
	});
	console.log('scraped');
});	

// Listen on port 3000
app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
});
