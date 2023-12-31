'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserCourse.init({
    UserId: DataTypes.INTEGER,
    CourseId: DataTypes.INTEGER,
    courseStatus: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'UserCourse',
    hooks: {
      beforeCreate: (instance) => {
        instance.courseStatus = false
      }
    }
  });
  return UserCourse;
};