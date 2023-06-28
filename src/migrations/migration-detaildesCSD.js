"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("DetaildesCSD", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      product_id: {
        type: Sequelize.INTEGER,
      },

      introduce: {
        type: Sequelize.TEXT("long"),
      },
      ingredient: {
        type: Sequelize.TEXT("long"),
      },
      uses: {
        type: Sequelize.TEXT("long"),
      },
      use: {
        type: Sequelize.TEXT("long"),
      },
      parameter: {
        type: Sequelize.TEXT("long"),
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
    await queryInterface.dropTable("DetaildesCSD");
  },
};
