var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: {
    type: String,
    required: true
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
    required: true
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
  },
  // This only saves one note's ObjectId, ref refers to the Note model
  hero: {
    type: Schema.Types.ObjectId,
    ref: "Hero"
  },

  // This is for the rooms that a player joins
  room: {
    type: Schema.Types.ObjectId,
    ref: "Room"
  }
});

var User = mongoose.model("User", UserSchema);

module.exports = User;
