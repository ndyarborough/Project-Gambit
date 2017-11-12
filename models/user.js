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

  gamertag: {
    type: String,
    required: true
  },
  // This only saves one note's ObjectId, ref refers to the Note model
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

var User = mongoose.model("User", UserSchema);

module.exports = User;
