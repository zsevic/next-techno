module.exports=function(app,passport){
	app.get('/',function(req, res, next) {
		res.render('index.ejs');
	});

	app.get('/profile',isLoggedIn,function(req,res){
		res.render('profile.ejs',{user:req.user});
	});

	app.get('/events',isLoggedIn,function(req,res){
		var token=req.user.facebook.token;
		var Page=require("./models/page");
		Page.find({},function(err,docs){
			require("../nextTechno")(docs[1],token,function(err,result){
			if(err)
				throw err;
			res.render('events.ejs',{user:req.user,result:result});
			});
		});
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
