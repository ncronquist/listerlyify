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
        models.comment.belongsTo(models.user);
        models.comment.belongsTo(models.list);
      }
    }
  });
  return comment;
};
