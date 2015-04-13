# API Calls

- List of lists the user subscribes to
- [GET lists/list](https://dev.twitter.com/rest/reference/get/lists/list)
- [GET lists/statuses](https://dev.twitter.com/rest/reference/get/lists/statuses)
- [GET lists/memberships](https://dev.twitter.com/rest/reference/get/lists/memberships)

# User Story
My typical user will be Twitter power users who do a lot of reading on Twitter and want to organize their Twitter lists.

My app is **not** for:
- low investment Twitter users, although they may use my app to get more involved in Twitter
- Power users who do mostly posting/content creation

# Wireframe
- [Drawn]

# ER Diagram

# Random Notes
- process.env - returns environment variables
- foreman run node index.js



// in user model

models.user.hasMany(models.list, {as: 'Followings', through: 'listsusers'})

user.followings = [an array of lists]
user.getFollowings()
user.createFollowings()

// in list model
models.list.belongsToMany(models.user, {as: 'Followers', through:'listusers'})

list.getFollowers()
list.addFollower()

list.followers = [array of users following this item]
