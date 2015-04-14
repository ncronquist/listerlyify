"use strict";
module.exports = function(sequelize, DataTypes) {
  var comment = sequelize.define("comment", {
    comment: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    list_id: DataTypes.INTEGER
  }, {underscored: true}, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        comment.belongsTo(user);
        comment.belongsTo(list);
      }
    }
  });
  return comment;
};
