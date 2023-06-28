"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.hasMany(models.Commentchild, {
        foreignKey: "comment_id",
        as: "commentall",
      });
    }
  }
  Comment.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      custumer_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      raiting: DataTypes.INTEGER,

      now: DataTypes.STRING,
    },
    {
      sequelize,
      freezeTableName: true,
    }
  );
  return Comment;
};
