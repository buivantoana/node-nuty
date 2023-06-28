"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Present extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Present.belongsTo(models.ProductCSD, {
        foreignKey: "product_id",
        targetKey: "id",
      });
      Present.belongsTo(models.ProductCSTVDD, {
        foreignKey: "product_id",
        targetKey: "id",
      });
      Present.belongsTo(models.ProductCSCT, {
        foreignKey: "product_id",
        targetKey: "id",
      });
      Present.belongsTo(models.ProductTD, {
        foreignKey: "product_id",
        targetKey: "id",
      });
      Present.belongsTo(models.ProductNH, {
        foreignKey: "product_id",
        targetKey: "id",
      });
      Present.belongsTo(models.ProductPKLD, {
        foreignKey: "product_id",
        targetKey: "id",
      });
      Present.belongsTo(models.ProductTPCN, {
        foreignKey: "product_id",
        targetKey: "id",
      });
    }
  }
  Present.init(
    {
      product_id: DataTypes.INTEGER,
      presentname: DataTypes.STRING,
      image: DataTypes.BLOB("long"),
    },
    {
      sequelize,
      freezeTableName: true,
    }
  );
  return Present;
};
