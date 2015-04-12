// Quick test example
var express = require('express'),
    passport = require('passport'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    Twitter = require('twitter'),
    TwitterStrategy = require('passport-twitter').Strategy,
    ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn,
    app = express();

app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(session({ secret: 'im neither hero nor traiter im american', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


var TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
var TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET;

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "http://127.0.0.1:3001/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    // NOTE: You'll probably want to associate the Twitter profile with a
    //       user record in your application's DB.
    console.log(profile);
    var user = profile;
    return done(null, user);
  }
));


app.get('/', function(req, res){
    res.send('Hello World');
  });

app.get('/account',
  ensureLoggedIn('/login'),
  function(req, res) {
    res.send('Hello ' + req.user.username + '<br> <a href="https://api.twitter.com/1.1/lists/list.json?user_id=22462866">Get Lists</a>');
  });

app.get('/login',
  function(req, res) {
    res.send('<html><body><a href="/auth/twitter">Sign in with Twitter</a></body></html>');
  });

app.get('/logout',
  function(req, res) {
    req.logout();
    res.redirect('/');
  });

app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', { successReturnToOrRedirect: '/', failureRedirect: '/login' }));

// app.get('/auth/twitter/lists/list', passport.authenticate())


app.get('/auth/twitter/status', function(req,res) {
  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
  });

  var params = {screen_name: 'nodejs'};
  client.get('statuses/user_timeline', params, function(error, tweets, response){
    if (!error) {
      console.log(tweets);
      res.send(tweets);
    } else {
      res.send('there was an error');
    }
  });
})

app.get('/auth/twitter/lists', function(req,res) {
  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
  });

  var params = {user_id: 22462866, screen_name: 'nicholaibee'};
  client.get('lists/list', params, function(error, lists, response){
    if (!error) {
      console.log(lists);
      res.send(lists);
    } else {
      res.send('there was an error');
    }
  });
})


var server = app.listen(3001);
console.log('Express server started on port %s', server.address().port);
