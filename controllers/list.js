// Requires
var express = require('express'),
    ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn,
    Twitter = require('twitter');

// Variables
var router = express.Router();

// Main logged in page - GET /
router.get('/listeditor', ensureLoggedIn('/'), function(req,res) {
  var listgridinfo = {};
  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: req.user.token,
    access_token_secret: req.user.tokenSecret
  });

  client.get('lists/ownerships', function(error, lists, response) {
    if (!error) {
      listgridinfo.lists = lists;
    } else {
      res.send('there was an error');
    }
  })

});

// List all lists specified user subscribes to including their own
router.get('/lists', ensureLoggedIn('/'), function(req,res) {
  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: req.user.token,
    access_token_secret: req.user.tokenSecret
  });

  var params = {user_id: req.user._json.id, screen_name: req.user._json.screen_name};
  client.get('lists/list', params, function(error, lists, response){
    if (!error) {
      res.send(lists);
    } else {
      res.send('there was an error');
    }
  });
})

// Lists owned by specied user
router.get('/mylists', ensureLoggedIn('/'), function(req,res) {
  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: req.user.token,
    access_token_secret: req.user.tokenSecret
  });

  client.get('lists/ownerships', function(error, lists, response) {
    if (!error) {
      res.send(lists);
    } else {
      res.send('there was an error');
    }
  })
})



// Export
module.exports = router;
