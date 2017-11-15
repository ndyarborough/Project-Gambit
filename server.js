// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;


// Use body parser with our app
app.use(bodyParser.urlencoded({ extended: false }));
// Deliver files to front end from the public directory
app.use(express.static("public"));


// Routes
const routes = require("./controllers/router.js");
app.use("/", routes);


// Mongoose Configuration
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/projectgambit");

const db = mongoose.connection;
db.on("error", (error) => {
  console.log("Database Error:", error);
});

db.once("open", () => {
  console.log("Mongoose connection successful.");
});


// Listen on port 3000
// ===================
app.listen(PORT, () => {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
});
