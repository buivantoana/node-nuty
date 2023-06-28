"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.hasMany(models.Role, {
        foreignKey: "categoryid",
        as: "all",
      });

      Category.hasMany(models.ProductCSD, {
        foreignKey: "category_id",
      });
      Category.hasMany(models.ProductCSCT, {
        foreignKey: "category_id",
      });
      Category.hasMany(models.ProductCSTVDD, {
        foreignKey: "category_id",
      });
      Category.hasMany(models.ProductPKLD, {
        foreignKey: "category_id",
      });
      Category.hasMany(models.ProductNH, {
        foreignKey: "category_id",
      });
      Category.hasMany(models.ProductTD, {
        foreignKey: "category_id",
      });
      Category.hasMany(models.ProductTPCN, {
        foreignKey: "category_id",
      });
    }
  }
  Category.init(
    {
      categoryname: DataTypes.STRING,
      icon: DataTypes.STRING,
    },
    {
      sequelize,
      freezeTableName: true,
    }
  );
  return Category;
};
