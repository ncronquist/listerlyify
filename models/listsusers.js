"use strict";
module.exports = function(sequelize, DataTypes) {
  var listsusers = sequelize.define("listsusers", {
    user_id: DataTypes.INTEGER,
    list_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return listsusers;
};