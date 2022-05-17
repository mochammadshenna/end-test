const { encrypt } = require('../helpers/bcrypt');
const faker = require('faker');

function generateCategory(qty) {
  const data = [];
  const categories = ['General Courses', 'Biologys', 'Economics', 'Computers & IT'];
  qty > 5 ? (qty = 5) : qty;
  while (qty > 0) {
    data.push({
      name: categories[qty],
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    });
    qty--;
  }
  return data;
} z

function generateCourses(qty, foreignQty) {
  const data = [];
  const status = ['Active', 'Inactive', 'Archieve'];
  while (qty > 0) {
    data.push({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
      imgUrl: faker.image.imageUrl(),
      categoryId: faker.datatype.number({
        min: 1,
        max: foreignQty,
      }),
      authorId: faker.datatype.number({
        min: 1,
        max: foreignQty,
      }),
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    });
    qty--;
  }
  return data;
}

function generateUser(qty) {
  const data = [];
  const roles = ['Admin', 'Instructor'];
  while (qty > 0) {
    data.push({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: encrypt(faker.internet.password()),
      role: roles[faker.datatype.number(1, 3)],
      phoneNumber: faker.phone.phoneNumber(),
      address: faker.address.streetAddress(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    });
    qty--;
  }
  return data;
}

module.exports = { generateCategory, generateUser, generateCourses };
