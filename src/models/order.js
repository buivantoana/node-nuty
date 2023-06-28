"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init(
    {
      product_id: DataTypes.INTEGER,
      custumer_id: DataTypes.INTEGER,
      productname: DataTypes.STRING,
      price: DataTypes.INTEGER,
      quancity: DataTypes.INTEGER,
      image: DataTypes.BLOB("long"),
      status: DataTypes.INTEGER,
      address: DataTypes.STRING,
      deliveryaddress: DataTypes.STRING,
      name: DataTypes.STRING,
      phone: DataTypes.INTEGER,
      description: DataTypes.STRING,
      city: DataTypes.STRING,
    },
    {
      sequelize,
      freezeTableName: true,
    }
  );
  return Order;
};
