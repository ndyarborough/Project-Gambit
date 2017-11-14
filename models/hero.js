const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HeroSchema = new Schema({
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

const Hero = mongoose.model("Hero", HeroSchema);

module.exports = Hero;