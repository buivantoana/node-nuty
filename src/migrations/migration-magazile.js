"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Magazile", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      magazilename: {
        type: Sequelize.STRING,
      },
      categorymagazile_id: {
        type: Sequelize.INTEGER,
      },

      magaziledes: {
        type: Sequelize.TEXT("long"),
      },

      image: {
        type: Sequelize.BLOB("long"),
      },
      date: {
        type: Sequelize.STRING,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Magazile");
  },
};
