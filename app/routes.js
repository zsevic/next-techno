module.exports=function(app,passport){
	app.get('/',function(req, res, next) {
		res.render('index.ejs');
	});

	app.get('/profile',isLoggedIn,function(req,res){
		res.render('profile.ejs',{user:req.user});
	});

	app.get('/events',isLoggedIn,function(req,res){
		var token=req.user.facebook.token;
		var user=req.user;
		var User=require("./models/user");
		var Event=require("./models/event");
		var Page=require("./models/page");
		var lastUpdate=Date.now()-(new Date(user.facebook.lastUpdated));
		if(lastUpdate<3600000){
			User.update({'facebook.id':user.facebook.id},{$set:{
				'facebook.lastUpdated':Date.now()
			}});
			Event.remove({});
			Page.find({},function(err,docs){
				require("../nextTechno")(docs,token,function(err,result){
					if(err)
						throw err;
					result.sort(function(a,b){
						return (new Date(a.start_time))-(new Date(b.start_time));
					});
					res.render('events.ejs',{user:req.user,result:result});
				});
			});
		}else{
			var arr=[];
			var ids=[];
			Event.find({},function(err,docs){
				for(var i=0;i<docs.length;i++){
					if(ids.indexOf(docs[i].id)>-1){
						continue;
					}else{
						ids.push(res[i].id);
						var temp={event:res[i].name,place:res[i].place.name,start_time:res[i].start_time};
						arr.push(temp);
					}
				}
				var result=arr.sort(function(a,b){
						return (new Date(a.start_time))-(new Date(b.start_time));
				});
				res.render('events.ejs',{user:req.user,result:result});
			});
		}
	});

	app.get('/auth/facebook', passport.authenticate('facebook',{scope:"email"}));

	app.get('/auth/facebook/callback', passport.authenticate('facebook', {
		successRedirect: '/profile',
		failureRedirect: '/'
	}));

	app.get('/logout',function(req,res){
		req.logout();
		res.redirect('/');
	});
};

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/");
}
