'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn("UserProfiles", "UserId", {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: "Users", 
        },
        key: "id"
      }
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn("UserProfiles", "UserId")
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
