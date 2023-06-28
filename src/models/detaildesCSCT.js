"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DetaildesCSCT extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  DetaildesCSCT.init(
    {
      product_id: DataTypes.INTEGER,

      introduce: DataTypes.TEXT("long"),
      ingredient: DataTypes.TEXT("long"),
      uses: DataTypes.TEXT("long"),
      use: DataTypes.TEXT("long"),
      parameter: DataTypes.TEXT("long"),
    },
    {
      sequelize,
      freezeTableName: true,
    }
  );
  return DetaildesCSCT;
};
