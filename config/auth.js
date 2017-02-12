module.exports={
	'facebookAuth' : {
        'clientID'      : process.env.FACEBOOK_ID,
        'clientSecret'  : process.env.FACEBOOK_SECRET,
        'callbackURL'   : 'http://nextechno.herokuapp.com/auth/facebook/callback'
    }
};
