module.exports=function(pages,token,done){	
	var arr=[];
	var ids=[];
	var today=Date.now();
	var mongoose=require("mongoose");
	var Event=require("./app/models/event");
	var async=require("async");
	var request=require("request");
	Event.remove();
	var giveMeData=function(page,cb){
		var access="https://graph.facebook.com/v2.8/"+page.id+"/events?access_token="+token;
		request(access,function(error,response,body){
			if(!error && response.statusCode===200){
				var res=JSON.parse(body).data;
				for(var i=0;i<res.length;i++){
					var datetime=new Date(Date.parse(res[i].start_time));
					if(today>datetime){
						break;
					}else if(ids.indexOf(res[i].id)>-1){
						continue;
					}else{
						ids.push(res[i].id);
						var temp={event:res[i].name,place:res[i].place.name,start_time:res[i].start_time};
						arr.push(temp);
						var newEvent=new Event(temp);
						newEvent.save();
					}
				}
				return cb(null);
			}else{
				cb(error);
			}
		});
	}
	async.each(pages,giveMeData,function(err){
		if(err) 
			done(err);
		done(null,arr);
		console.log("everything went okay!");
	});
};
