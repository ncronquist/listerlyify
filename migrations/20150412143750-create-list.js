"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("lists", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      twitter_list_id: {
        type: DataTypes.STRING
      },
      slug: {
        type: DataTypes.STRING
      },
      name: {
        type: DataTypes.STRING
      },
      uri: {
        type: DataTypes.STRING
      },
      mode: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      },
      member_count: {
        type: DataTypes.INTEGER
      },
      subscriber_count: {
        type: DataTypes.INTEGER
      },
      twitter_user_id: {
        type: DataTypes.STRING
      },
      owner_id: {
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("lists").done(done);
  }
};