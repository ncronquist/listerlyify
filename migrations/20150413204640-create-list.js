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
        type: DataTypes.STRING,
        unique: true
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
      user_id: {
        type: DataTypes.INTEGER
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("lists").done(done);
  }
};
