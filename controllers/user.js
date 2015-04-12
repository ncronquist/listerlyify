// Requires
var express = require('express'),
    ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn,
    Twitter = require('twitter');

// Variables
var router = express.Router();

// Main logged in page - GET /
router.get('/', ensureLoggedIn('/'), function(req,res) {
  res.send(req.user);

});

// Export
module.exports = router;
