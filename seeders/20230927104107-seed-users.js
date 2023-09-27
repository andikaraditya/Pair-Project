'use strict';
const fs = require('fs');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    const data = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"))
      .map((el) => {
        const {email, password, RolesId} = el
        return {
          email,
          password,
          RolesId,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })
    return queryInterface.bulkInsert("Users", data)
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
    return queryInterface.bulkDelete("Users")

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
