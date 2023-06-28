'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Custumer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     
    }
  };
  Custumer.init({
    name: DataTypes.STRING,
   address: DataTypes.STRING,
      phone: DataTypes.INTEGER,
      email: DataTypes.STRING,
       password: DataTypes.STRING,
  }, {
    sequelize,
    freezeTableName:true
  });
  return Custumer;
};