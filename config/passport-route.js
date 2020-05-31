var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongoose = require('mongoose');

var User = require('../models/user.js'); 
// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: "email",
    session: true
  },
  function(email, password, done) {
    // When a user tries to sign in this code runs
    User.findOne({
      'email': email
    }).then(function(dbUser) {
      // If there's no user with the given email
      if (!dbUser) {
        console.log('no user');
        return done(null, false, {
          message: "Incorrect email."
        });
      }
      // If there is a user with the given email, but the password the user gives us is incorrect
      else if (!dbUser.validPassword(password)) {
        console.log('not password');
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      // If none of the above, return the user
      return done(null, dbUser);
    });
  }
));

passport.serializeUser(function(dbUser, done) {
  console.log('cereal');
  done(null, dbUser);
});

passport.deserializeUser(function(dbUser, done) {
  console.log('decereal');
  done(null, dbUser);
});

//  passport.deserializeUser(function(user, done) {
//    console.log('DESERIALIZE' , user);
//    done(null, user);
// });

// Exporting our configured passport
module.exports = passport;