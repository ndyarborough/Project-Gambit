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
const PORT = process.env.PORT || 3001;

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

// Express Validator
app.use(expressValidator());

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
    // store: new MongoStore({
    //   mongooseConnection: mongoose.connection,
    // }),
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
app.listen(PORT, () => {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
});
























































// // Dependencies
// var express = require("express");
// var app = express();
// var server = require('http').createServer(app);
// // var io = require('socket.io').listen(server);

// var connections = [];
// var users = [];

// var mongoose = require("mongoose");
// var request = require("request");
// var cheerio = require("cheerio");
// var bodyParser = require("body-parser");
// var cors = require('cors');
// var expressValidator = require('express-validator');
// var session = require('express-session');
// var passport = require('passport');
// var cookieParser = require('cookie-parser');
// var MongoStore = require('connect-mongo')(session);
// var morgan = require('morgan');
// // Routes
// var routes = require("./controllers/router.js");

// var passportSetup = require('./config/passport-route.js');


// // Initialize Express
// var PORT = process.env.PORT || 3001;

// // ===== Socket Plugin =========
// // io.sockets.on('connection', function(socket) {
// //   connections.push(socket);
// //   console.log(`Connected: ${connections.length} sockets connected`)

// //   // Disconnect
// //   socket.on('disconnect', function(data) {
// //     connections.splice(connections.indexOf(socket), 1);
// //     console.log(`Disconnected: ${connections.length} sockets connected`);  
// //   });
// // });



// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
//   if ('OPTIONS' == req.method) {
//     res.send(200);
//   } else {
//       next();
//   }
// });




// //app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

// app.use(morgan('dev'));


// // Use body parser with our app
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
// app.use(bodyParser.text());
// app.use(bodyParser.json({
//   type: "application/vnd.api+json"
// }));

// app.use(cookieParser()); 

// // Deliver files to front end from the public directory
// app.use(express.static("public"));

// app.use(cors());

// // Express Validator
// app.use(expressValidator());

// // Express Session
// app.use(session({
//     secret: 'secret',
//     // store: new MongoStore({
//     //   mongooseConnection: mongoose.connection,
//     //   touchAfter: 24 * 3600
//     // }),
//     saveUninitialized: true,
//     resave: true,
//     // cookie: {
//     //   maxAge: 8640000,
//     //   secure: false
//     // }
// }));

// // Passport init
// app.use(passport.initialize());
// app.use(passport.session());

// // app.use(function(req, res, next){
// //   res.locals.login = req.isAuthenticated();
// //   res.locals.session = req.session;
// //   console.log(req.session);
// //   console.log("===================");
// //   console.log(req.user);
// //   next();
// // });

// app.use("/api", routes);

// // Mongoose Configuration
// mongoose.Promise = Promise;
// mongoose.connect("mongodb://localhost/projectgambitdevelopment");

// var db = mongoose.connection;

// db.on("error", (error) => {
//   console.log("Database Error:", error);
// });

// db.once("open", () => {
//   console.log("Mongoose connection successful.");
// });

// // Listen on port 
// // ===================
// server.listen(PORT, () => {
//     console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
// });