// Dependencies
var express = require("express");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");
var bodyParser = require("body-parser");
var cors = require('cors');
var expressValidator = require('express-validator');
var session = require('express-session');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var MongoStore = require('connect-mongo')(session);
var passportSetup = require('./config/passport-route');

// Routes
const routes = require("./controllers/router");

// Initialize Express
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const PORT = process.env.PORT || 3001;


app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

// Express Validator
app.use(expressValidator());

// ===== Socket Plugin =========
io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('SEND_MESSAGE', function(data){
        io.emit('RECEIVE_MESSAGE', data);
    })
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

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: false,
    resave: false,
    cookie:{ path: '/', httpOnly: true, secure: false, maxAge: null}
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