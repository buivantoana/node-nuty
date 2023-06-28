'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Compare extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Compare.init({
    custumer_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
      productname: DataTypes.STRING,
     price:DataTypes.INTEGER,
      image: DataTypes.BLOB("long"),
  }, {
    sequelize,
    modelName: 'Compare',
  });
  return Compare;
};