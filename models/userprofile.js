'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProfile.belongsTo(models.User)
    }

    get fullName() {
      return this.firstName + " " + this.lastName
    }

    get birthDate() {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      return this.dateOfBirth.toLocaleDateString("id-ID", options)
    }

    get formattedDate() {
      return this.dateOfBirth.toISOString().split("T")[0]
    }
  }
  UserProfile.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    profilePicUrl: DataTypes.STRING,
    education: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};