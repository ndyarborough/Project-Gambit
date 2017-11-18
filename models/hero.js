var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var HeroSchema = new Schema({
  name: {
    type: String
  },

  eliminations: {
    type: Number
  },

  hoursPlayed: {
    type: Number
  },

  kdr: {
    type: Number
  },

  accuracy: {
    type: Number
  },

  wins: {
    type: Number
  },

  healing: {
    type: Number
  },

  damage: {
    type: Number
  },

  objKills: {
    type: Number
  },

  objTime: {
    type: Number
  }
});

var Hero = mongoose.model("Hero", HeroSchema);

module.exports = Hero;