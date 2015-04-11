// Requires
var express = require('express');

// Variables
var router = express.Router();

// Home page - GET /
router.get('/', function(req,res) {
  // Get potential alert messages
  var alerts = req.flash();

  res.render('main/index', {alerts:alerts});
});


// Export
module.exports = router;
