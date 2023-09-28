'use strict';
const {
  Model
} = require('sequelize');
const AllHelper = require('../helpers');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsToMany(models.User, {through: models.UserCourse})
    }

    get rupiah() {
      return AllHelper.toRupiah(this.price)
    }
  }
  Course.init({
    name: DataTypes.STRING,
    lecturer: DataTypes.STRING,
    price: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};