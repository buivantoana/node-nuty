"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Magazile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Magazile.init(
    {
      magazilename: DataTypes.STRING,
      categorymagazile_id: DataTypes.INTEGER,
      magaziledes: DataTypes.TEXT("long"),
      image: DataTypes.BLOB("long"),
      date: DataTypes.STRING,
    },
    {
      sequelize,
      freezeTableName: true,
    }
  );
  return Magazile;
};
