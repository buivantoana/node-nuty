"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Role.belongsTo(models.Category, {
        foreignKey: "categoryid",
        targetKey: "id",
        as: "all",
      });
    }
  }
  Role.init(
    {
      categoryid: DataTypes.INTEGER,
      Rolename: DataTypes.STRING,
    },
    {
      sequelize,
      freezeTableName: true,
    }
  );
  return Role;
};
