// Requires
var express = require('express'),
    session = require('express-session'),
    passport = require('passport'),
    TwitterStrategy = require('passport-twitter').Strategy,
    cookieParser = require('cookie-parser'),
    ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn,
    Twitter = require('twitter');

// Variables
var app = express();
var TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
var TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET;

// Set
app.set('view engine','ejs');

// Use
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({
  secret: 'im neither hero nor traiter im american',
  resave: false,
  saveUninitialized: true
})

// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(obj, done) {
//   done(null, obj);
// });

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    // Create user here
    // User.findOrCreate(..., function(err, user) {
    //   if (err) { return done(err); }
    //   done(null, user);
    // });
    var user = profile;
    return done(null, user);
  }
));

app.listen(3000, function() {
  console.log('Express server started on port %s', server.address().port);
})
