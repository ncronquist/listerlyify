# Listerlyify
### Making Twitter Lists Awesome

## Description
Listerlyify is a Twitter app that makes creating and manging your Twitter lists easier. Twitter lists are a great way to organize the people and companies you follow into logical groups, but the Twitter website makes them a pain to use. The goal of Listerlyify is to make it as quick and simple as possible. There is a working alpha version of this website at https://listerlyify.herokuapp.com

![enter image description here](https://raw.githubusercontent.com/ncronquist/listerlyify/master/public/img/listgrideditor-xclose.png)

## Technologies Used
Listerlyify is built on Node.js and Express. The full list of npm dependency packages associated with this project:

- async - manage asynchronous javascript calls
- body-parser - middleware for body parsing
- connect-ensure-login - middleware to ensure a user is logged in; integrates with passport
- connect-flash - middleware for storing message in flash
- cookie-parser - used by passport to parse cookies
- ejs - embedded javascript templates
- express - web framework and router
- express-session - express extension for managing sessions
- passport - authentication middleware
- passport-twitter - twitter strategy for passport authentication
- pg - postgresql client
- pg-hstore - a postgresql module for serializing and deserializing json data
- sequelize - node.js object relational mapper
- sequelize-cli - the command line interface for sequelize - required locally to the project for deployment to Heroku
- Bootstrap - CSS library
- Data Tables - jQuery plugin for easy filtering and pagination of tables
- Epic Editor - Markdown editor implemented in javascript

## Approach

### Main Goal
The main goal of this project is to make editing your lists as easy as possible. On Twitter, it takes at least 4 clicks to add someone to a list. If you create a new list and want to add 10 people to that list, you have 40 clicks ahead of you. This project aims to cut that at least in half if not better.

### Secondary Goals
Some people spend a great deal of time curating their lists to match certain interest. Tech lists, music lists, political lists, sports lists, etc... These lists make Twitter better by allowing you to get to the content you want faster. Not everyone is interested in spending a lot of time to set up their lists though; so help them out by sharing your best lists on Listerlyify. The lists shared on Listerlyify are available for anyone to check out and decide if they want to subscribe. You can also comment on lists  to discuss who to FF (Follow Friday) and who to unfollow.

## Issues
This web app is currently in alpha testing and definitely has some bugs. Known issues:
- Most errors are uncaught and simply sent to the user
- List grid editor currently only returns the first 200 of your friends
- jQuery Data Tables plugin gets a little slow when displaying more than 25 results in list grid editor
- List comments are orphaned when a list is un-shared
- List grid editor is too large for people working on screens with display resolutions less than 1080p
