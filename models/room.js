var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var roomSchema = new Schema({
	inUse: {
		type: Boolean,
		default: false
	},

	occupants: [{
		type: Schema.Types.ObjectId, 
		ref: 'User'
	}],
},
{
	timestamps: true
});

var Room = mongoose.model("Room", roomSchema);

module.exports = Room;