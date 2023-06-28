"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Commentchild extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Commentchild.belongsTo(models.Comment, {
        foreignKey: "comment_id",
        targetKey: "id",
        as: "commentall",
      });
    }
  }
  Commentchild.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      custumer_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      comment_id: DataTypes.INTEGER,
      now: DataTypes.STRING,
    },
    {
      sequelize,
      freezeTableName: true,
    }
  );
  return Commentchild;
};
