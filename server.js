// Dependencies
const express = require("express");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

const connections = [];
const users = [];

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

// Routes
const routes = require("./controllers/router");

// Initialize Express
const PORT = process.env.PORT || 3001;

// ===== Socket Plugin =========
io.sockets.on('connection', function(socket) {
  connections.push(socket);
  console.log(`Connected: ${connections.length} sockets connected`)

  // Disconnect
  socket.on('disconnect', function(data) {
    connections.splice(connections.indexOf(socket), 1);
    console.log(`Disconnected: ${connections.length} sockets connected`);  
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
server.listen(PORT, () => {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
});