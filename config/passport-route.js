const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const Hero = require('../models/hero.js');
const User = require('../models/user.js'); 
// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: "email"
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
      console.log(dbUser);
      // If none of the above, return the user
      return done(null, dbUser);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOneById(id, function(err, user) {
    done(err, user);
  })
});

// Exporting our configured passport
module.exports = passport;