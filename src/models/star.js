"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Star extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Star.belongsTo(models.ProductCSD, {
        foreignKey: "product_id",
        targetKey: "id",
      });
      Star.belongsTo(models.ProductCSTVDD, {
        foreignKey: "product_id",
        targetKey: "id",
      });
      Star.belongsTo(models.ProductCSCT, {
        foreignKey: "product_id",
        targetKey: "id",
      });
      Star.belongsTo(models.ProductTD, {
        foreignKey: "product_id",
        targetKey: "id",
      });
      Star.belongsTo(models.ProductNH, {
        foreignKey: "product_id",
        targetKey: "id",
      });
      Star.belongsTo(models.ProductPKLD, {
        foreignKey: "product_id",
        targetKey: "id",
      });
      Star.belongsTo(models.ProductTPCN, {
        foreignKey: "product_id",
        targetKey: "id",
      });
    }
  }
  Star.init(
    {
      product_id: DataTypes.INTEGER,
      star: DataTypes.INTEGER,
    },
    {
      sequelize,
      freezeTableName: true,
    }
  );
  return Star;
};
