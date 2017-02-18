var mongoose=require("mongoose");

var eventSchema=mongoose.Schema({
	event:String,
	place:String,
	start_time:String
});

module.exports=mongoose.model('Event',eventSchema);
