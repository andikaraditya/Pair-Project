'use strict';
const fs = require('fs');
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

    fullName() {
      return this.firstName + " " + this.lastName
    }

    get birthDate() {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      return this.dateOfBirth.toLocaleDateString("id-ID", options)
    }

    formattedDate() {
      return this.dateOfBirth.toISOString().split("T")[0]
    }
  }
  UserProfile.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "First name cannot be empty"
        },
        notEmpty: {
          msg: "First name cannot be empty"
        },
        len: {
          args: [5, 20],
          msg: "First name must between 5 and 20 characters"
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Last name cannot be empty"
        },
        notEmpty: {
          msg: "Last name cannot be empty"
        },
        len: {
          args: [5, 20],
          msg: "Last name must between 5 and 20 characters"
        }
      }
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Date of birth cannot be empty"
        },
        notEmpty: {
          msg: "Date of birth cannot be empty"
        }
      }
    },
    profilePicUrl: DataTypes.STRING,
    education: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};