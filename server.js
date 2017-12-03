// Dependencies
const express = require("express");
const app = express();
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");
var bodyParser = require("body-parser");
var cors = require('cors');
var expressValidator = require('express-validator');
var session = require('express-session');
var passport = require('passport');
var cookieSession = require('cookie-session');
var cookieParser = require('cookie-parser');
var MongoStore = require('connect-mongo')(session);
var passportSetup = require('./config/passport-route');
// Socket Dependencies
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
// Routes
const routes = require("./controllers/router");

// Initialize Express
const PORT = process.env.PORT || 3001;

// Socket Plugin
io.on('connection', function (socket) {
  io.emit('this', { will: 'be received by everyone'});

  socket.on('private message', function (from, msg) {
    console.log('I received a private message by ', from, ' saying ', msg);
  });

  socket.on('disconnect', function () {
    io.emit('user disconnected');
  });
});

// Use body parser with our app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: "application/vnd.api+json"
}));

app.use(cookieParser());

// Deliver files to front end from the public directory
app.use(express.static("public"));

app.use(cors());

// Express Validator
app.use(expressValidator());

// Express Session
app.use(session({
    secret: 'secret',
    store: new MongoStore({
    		mongooseConnection: mongoose.connection,
    		touchAfter: 24 * 3600
    	}),
    saveUninitialized: false,
    resave: false
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", routes);

// Mongoose Configuration
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/projectgambitdevelopment");

const db = mongoose.connection;

db.on("error", (error) => {
  console.log("Database Error:", error);
});

db.once("open", () => {
  console.log("Mongoose connection successful.");
});

// Listen on port 
// ===================
app.listen(PORT, () => {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
});