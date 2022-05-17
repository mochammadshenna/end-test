'use strict';
const faker = require('faker');
const { encrypt } = require('../helpers/bcrypt');

function generateData(qty) {
  const data = [];
  const roles = ['Admin', 'Instructor'];
  while (qty > 0) {
    data.push({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: encrypt(faker.internet.password()),
      role: roles[Math.floor(Math.random() * 2) + 1],
      phoneNumber: faker.phone.phoneNumber(),
      address: faker.address.streetAddress(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    });
    qty--;
  }
  return data;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', generateData(5), {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
