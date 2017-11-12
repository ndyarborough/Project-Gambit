var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var HeroSchema = new Schema({
  name: {
    type: String
  },

  eliminations: {
    type: Number
  },

  deaths: {
    type: Number
  },

  wins: {
    type: Number
  },

  damage: {
    type: Number
  },

  objkills: {
    type: Number
  },

  objtime: {
    type: Number
  }
});

var Hero = mongoose.model("Hero", HeroSchema);

module.exports = Hero;