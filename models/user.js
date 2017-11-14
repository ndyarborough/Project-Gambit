const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({

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

const User = mongoose.model("User", UserSchema);

module.exports = User;
