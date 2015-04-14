// Requires
var express = require('express'),
    passport = require('passport');


// Variables
var router = express.Router();

// Redirect the user to Twitter for authentication.  When complete, Twitter
// will redirect the user back to the application at
// /auth/twitter/callback which is the callbackURL specified when configuring
// the TwitterStrategy
router.get('/twitter', passport.authenticate('twitter'));


// Twitter will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/callback/twitter', passport.authenticate('twitter', {
    successReturnToOrRedirect: '/list/listeditor',
    failureRedirect: '/auth/failure'
  })
);



// Export
module.exports = router;
