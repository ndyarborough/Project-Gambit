const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Hero Stats
//     {
//         "character": ,
//         "eliminations": ,
//         "deaths": , 
//         "accuracy": ,
//         "healing": ,
//         "playTime": ,
//         "K/DRatio": ,
//         "wins": ,
//         "damage": ,
//         "objKills": ,
//         "objTime": ,
//     }

// Overall Stats
//     {
//         "wins": ,
//         "gamesPlayed": ,
//         "eliminations": ,
//         "deaths": ,
//         "K/DRatio": ,
//         "damage": ,
//         "healing": ,
//     }

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