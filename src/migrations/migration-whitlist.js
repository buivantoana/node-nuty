'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Whitlist', {
     id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
        },
        product_id: {
        type: Sequelize.INTEGER
      },
      custumer_id: {
        type: Sequelize.INTEGER
        },
      productname: {
        type: Sequelize.STRING
        },
      price: {
        type: Sequelize.INTEGER
        },
      image: {
        type: Sequelize.BLOB("long")
        },
      
      
    
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Whitlist');
  }
};