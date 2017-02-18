var mongoose=require("mongoose");
var bcrypt=require("bcrypt-nodejs");

var userSchema=mongoose.Schema({
	facebook:{
		id:String,
		token:String,
		email:String,
		name:String,
		lastUpdated:Date
	}
});

module.exports=mongoose.model('User',userSchema);
