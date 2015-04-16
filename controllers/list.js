// Requires
var express = require('express'),
    ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn,
    Twitter = require('twitter'),
    async = require('async'),
    db = require('../models');

// Variables
var router = express.Router();

// #############################################################################
// Main logged in page - GET /
// #############################################################################
router.get('/listeditor', ensureLoggedIn('/'), function(req,res) {
  var listgridinfo = {};
  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: req.user.token,
    access_token_secret: req.user.tokenSecret
  });

  var ownership_params = {count: 1000};
  client.get('lists/ownerships', ownership_params, function(error, lists, response) {
    if (!error) {
      listgridinfo.lists = lists;

      var listArray = [];
      lists.lists.forEach(function(list, idx, array) {
        listArray.push(list.id);
      })

      listgridinfo.listArray = listArray;

      // This listmembers function makes an api call to Twitter to get the
      // members of the list_id passed in
      var listmembers = function (list_id, doneCallback) {

        var members_params = {list_id: list_id, count: 5000, include_entities: false};
        client.get('lists/members', members_params, function(error, members, response) {
          if (!error) {
            return doneCallback(null, {list_id: list_id, members: members});
          } else {
            res.send('There was an error trying to get list members');
          }
        })
      };

      // Run through each list id in the list array and call the listmembers
      // function to get the members of that list
      async.map(listArray, listmembers, function (err, results) {
        listgridinfo.listmembers = results;

        var friends_params = {count: 200, skip_status: true, include_user_entities: false};
        client.get('friends/list', friends_params, function(error, friends, response) {
          if(!error) {
            listgridinfo.friends = friends;
            // res.send(listgridinfo);
            res.render('list/listeditor', listgridinfo);
          } else {
            res.send('there was an error');
          }
        })
      });
    } else {
      res.send('there was an error');
    }
  })

});

// #############################################################################
// List all lists specified user subscribes to including their own
// #############################################################################
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

// #############################################################################
// Lists owned by specified user
// #############################################################################
router.get('/mylists', ensureLoggedIn('/'), function(req,res) {
  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: req.user.token,
    access_token_secret: req.user.tokenSecret
  });

  client.get('lists/ownerships', function(error, lists, response) {
    if (!error) {
      // res.send(lists);
      res.render('list/mylists', lists);
    } else {
      res.send(error);
    }
  })
})

// #############################################################################
// Show list page
// #############################################################################
router.get('/show/:list_id', ensureLoggedIn('/'), function(req,res) {
  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: req.user.token,
    access_token_secret: req.user.tokenSecret
  });

  var showObj = {};
  var show_params = {list_id: req.params.list_id};
  client.get('lists/show', show_params, function(error, list, response) {
    if (!error) {
      showObj.list = list;

      // Now get all the members of this list
      var members_params = {list_id: list.id, count: 5000, include_entities: false};
      client.get('lists/members', members_params, function(error, members, response) {
        if (!error) {
          showObj.members = members;

          // res.send(showObj);
          // Check to see if this list has been shared
          db.list.find({where: {twitter_list_id: showObj.list.id_str}}).then(function(list) {

            if(!list) {
              showObj.shared = false;
            } else {
              showObj.shared = true;
            }

            console.log("List shared:", showObj.shared);

            // res.send(showObj);
            res.render('list/show', showObj);

          })

        } else {
          res.send(error);
        }
      })
    } else {
      res.send(error);
    }
  })
})

// #############################################################################
// Add a new member to a list
// #############################################################################
router.post('/member/add', function(req,res) {
  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: req.user.token,
    access_token_secret: req.user.tokenSecret
  });

  console.log("Req.body for posting new member to list: \n", req.body);
  var create_params = req.body;
  client.post('lists/members/create', create_params, function(error, list, response) {
    if (!error) {
      res.send(list);
    } else {
      res.send(error);
    }
  })
})

// #############################################################################
// Remove a member from a list
// #############################################################################
router.post('/member/remove', function(req,res) {
  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: req.user.token,
    access_token_secret: req.user.tokenSecret
  });

  console.log("Req.body for removing member from list: \n", req.body);
  var remove_params = req.body;
  client.post('lists/members/destroy', remove_params, function(error, list, response) {
    if (!error) {
      res.send(list);
    } else {
      res.send(error);
    }
  })
})

// #############################################################################
// Create a list
// #############################################################################
router.post('/create', function(req,res) {
  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: req.user.token,
    access_token_secret: req.user.tokenSecret
  });

  console.log("Req.body for creating a new list: \n", req.body);
  var list_params = req.body;
  client.post('lists/create', list_params, function(error, list, response) {
    if (!error) {
      res.redirect('/list/listeditor');
    } else {
      res.send(error);
    }
  })
})

// #############################################################################
// Delete list
// #############################################################################
router.post('/destroy', function(req,res) {
  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: req.user.token,
    access_token_secret: req.user.tokenSecret
  });

  console.log("Req.body for deleting a list: \n", req.body);
  var destroy_params = req.body;
  client.post('lists/destroy', destroy_params, function(error, list, response) {
    if (!error) {
      req.flash('info', 'Your list has been deleted from Twitter');
      res.redirect('/list/mylists');
    } else {
      res.send(error);
    }
  })
})


// #############################################################################
// Share list on Listerlyify
// #############################################################################
router.post('/share', function(req,res) {

  // res.send(req.body);
  // console.log(req.body);
  db.user.find({where: {twitter_user_id: req.body.twitter_user_id}}).then(function(user) {
    // user.addList()
    req.body.user_id = user.id;
    db.list.findOrCreate({
      where: {twitter_list_id: req.body.twitter_list_id},
      defaults: req.body
    }).spread(function(list, created) {
      res.send(list);
    })
  })
})

// #############################################################################
// Un-share a list from Listerlyify
// #############################################################################
router.delete('/share', function(req,res) {
  db.list.destroy({where: {twitter_list_id: req.body.twitter_list_id}}).then(function() {
    res.send({deleted:true});
  })
})


// Export
module.exports = router;
