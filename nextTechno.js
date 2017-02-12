module.exports=function(pages,token,done){
	var request=require("request");
	var access="https://graph.facebook.com/v2.8/"+pages.id+"/events?access_token="+token;
	var arr=[];
	var today=Date.now();
	var giveMeData=function(access){
		request(access,function(error,response,body){
			if(!error && response.statusCode===200){
				var res=JSON.parse(body).data;
				for(var i=0;i<res.length;i++){
					var datetime=new Date(Date.parse(res[i].start_time));
					if(today>datetime) break;
					else arr.push(res[i]);
				}
				return done(null,arr);
			}else{
				done(error);
			}
		});
	};
	giveMeData(access);
};
