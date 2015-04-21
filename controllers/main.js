// Requires
var express = require('express');

// Variables
var router = express.Router();

// Home page - GET /
router.get('/', function(req,res) {
  res.render('main/index');
});

// About/Contact page - GET /about-contact
router.get('/about-contact', function(req,res) {
  res.render('main/about');
})


// Export
module.exports = router;
