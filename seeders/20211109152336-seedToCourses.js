'use strict';
const faker = require('faker');

function generateData(qty) {
  const data = [];
  while (qty > 0) {
    data.push({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
      imgUrl: faker.image.imageUrl(),
      categoryId: Math.floor(Math.random() * 4) + 1,
      authorId: Math.floor(Math.random() * 4) + 1,
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    });
    qty--;
  }
  return data;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Courses', generateData(50), {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Courses', null, {});
  },
};
