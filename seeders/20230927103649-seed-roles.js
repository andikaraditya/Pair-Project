'use strict';
const fs = require('fs');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    const data = JSON.parse(fs.readFileSync("./data/roles.json", "utf-8"))
      .map((el) => {
        const {name, description} = el
        return {
          name,
          description,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })
    return queryInterface.bulkInsert("Roles", data)
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Roles")
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
