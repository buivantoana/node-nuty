'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Whitlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     
     
    }
  };
    Whitlist.init({
    product_id:DataTypes.INTEGER,
     custumer_id: DataTypes.INTEGER,
        productname: DataTypes.STRING,
        price: DataTypes.INTEGER,
       image: DataTypes.BLOB("long"),
  }, {
    sequelize,
    freezeTableName:true
  });
  return Whitlist;
};