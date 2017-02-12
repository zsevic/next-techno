var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var User=require("../app/models/user");

var configAuth=require("./auth");

module.exports=function(passport){

passport.use(new FacebookStrategy({
  clientID: configAuth.facebookAuth.clientID,
  clientSecret: configAuth.facebookAuth.clientSecret,
  callbackURL: configAuth.facebookAuth.callbackURL,
  profileFields:["displayName","emails"]
}, function(accessToken, refreshToken, profile, done) {
  process.nextTick(function() {
	 User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                if (err)
                    return done(err);
                if (user) {
					user.facebook.token=accessToken;
                    return done(null, user);
                } else {
                    var newUser            = new User();
                    newUser.facebook.id    = profile.id;
                   	newUser.facebook.token = accessToken;                    
                    newUser.facebook.name  = profile.displayName;
                    newUser.facebook.email = profile.emails[0].value;
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });


}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

};
