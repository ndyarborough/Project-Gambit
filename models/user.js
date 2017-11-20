var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
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

var User = mongoose.model("User", UserSchema);

module.exports = User;