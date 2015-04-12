"use strict";
module.exports = function(sequelize, DataTypes) {
  var list = sequelize.define("list", {
    twitter_list_id: DataTypes.STRING,
    slug: DataTypes.STRING,
    name: DataTypes.STRING,
    uri: DataTypes.STRING,
    mode: DataTypes.STRING,
    description: DataTypes.STRING,
    member_count: DataTypes.INTEGER,
    subscriber_count: DataTypes.INTEGER,
    twitter_user_id: DataTypes.STRING,
    owner_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.list.hasMany(models.user);
        models.list.belongsTo(models.user);
      }
    }
  });
  return list;
};
