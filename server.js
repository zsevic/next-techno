var path=require("path");
var express = require('express');
var app=express();
var mongoose=require("mongoose");
var passport=require("passport");
var flash=require("connect-flash");
var request=require("request");

var morgan=require("morgan");
var bodyParser=require("body-parser");
var cookieParser=require("cookie-parser");
var session=require("express-session");

var configDB=require("./config/database");
mongoose.connect(configDB.url);
mongoose.Promise=require("bluebird");

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.set("port",process.env.PORT || 8080);
app.use(express.static(path.join(__dirname,"public")));
app.set('view engine', 'ejs');

require("./config/passport")(passport);

app.use(session({
	secret:"spontaneouscat",
	resave:false,
	saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require("./app/routes")(app,passport);

app.listen(app.get('port'), function() {
  console.log('The magic happens on port ' + app.get('port'));
});
