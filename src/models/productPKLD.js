"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductPKLD extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductPKLD.belongsTo(models.Category, {
        foreignKey: "category_id",
        targetKey: "id",
      });
      ProductPKLD.belongsTo(models.Brand, {
        foreignKey: "brand_id",
        targetKey: "id",
      });
      ProductPKLD.hasMany(models.Star, {
        foreignKey: "product_id",
      });
      ProductPKLD.hasMany(models.Present, {
        foreignKey: "product_id",
      });
    }
  }
  ProductPKLD.init(
    {
      productname: DataTypes.INTEGER,
      brand_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      role_id: DataTypes.INTEGER,
      productdes: DataTypes.TEXT("long"),
      price: DataTypes.FLOAT,
      saleprice: DataTypes.FLOAT,
      type: DataTypes.INTEGER,
      image: DataTypes.BLOB("long"),
      present: DataTypes.INTEGER,
    },
    {
      sequelize,
      freezeTableName: true,
    }
  );
  return ProductPKLD;
};
