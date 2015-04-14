"use strict";
module.exports = function(sequelize, DataTypes) {
  var list = sequelize.define("list", {
    twitter_list_id: {type: DataTypes.STRING, unique: true},
    slug: DataTypes.STRING,
    name: DataTypes.STRING,
    uri: DataTypes.STRING,
    mode: DataTypes.STRING,
    description: DataTypes.STRING,
    member_count: DataTypes.INTEGER,
    subscriber_count: DataTypes.INTEGER,
    twitter_user_id: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {underscored: true}, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        list.belongsTo(user);
        list.hasMany(comment);
      }
    }
  });
  return list;
};
