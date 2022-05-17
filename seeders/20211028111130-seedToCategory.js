'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Categories',
      [
        {
          name: 'Business & Finance',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Computers & IT Business',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Economics',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'General News',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Health, Medicine, Pharmacy Industry',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
