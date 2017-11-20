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
    type: String
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
  },

  // This only saves one note's ObjectId, ref refers to the Note model
  User: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

var Hero = mongoose.model("Hero", HeroSchema);

module.exports = Hero;