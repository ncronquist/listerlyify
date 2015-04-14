"use strict";
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    twitter_user_id: {type: DataTypes.STRING, unique: true},
    screen_name: DataTypes.STRING,
    name: DataTypes.STRING
  }, {underscored: true}, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        user.hasMany(list);
        user.hasMany(comment);
      }
    }
  });
  return user;
};
