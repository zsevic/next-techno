var mongoose=require("mongoose");

var pageSchema=mongoose.Schema({
	id:String,
	name:String
});

module.exports=mongoose.model('Page',pageSchema);
