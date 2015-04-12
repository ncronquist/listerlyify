"use strict";
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    twitter_user_id: DataTypes.STRING,
    screen_name: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.user.hasMany(models.list);
      }
    }
  });
  return user;
};
