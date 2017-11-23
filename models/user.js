var mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  platform: {
    type: String,
    required: true
  },

  region: {
    type: String,
    required: true
  },
  
  gamerTag: {
    type: String,
    required: true,
    unique: true
  },

  gamesPlayed: {
    type: Number
  },

  accuracy: {
    type: Number
  },

  healing: {
    type: Number
  },

  damage: {
    type: Number
  },

  wins: {
    type: Number
  },

  eliminations: {
    type: Number
  },

  deaths: {
    type: Number
  },

  kdr: {
    type: Number
  }
});

// hash the password
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

var User = mongoose.model("User", userSchema);



module.exports = User;