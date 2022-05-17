const request = require('supertest');
const { User } = require('../models');
const app = require('../app');
const faker = require('faker');

beforeAll(async () => {
  await User.sync({ force: true });
  const userObject = {
    email: 'customer@mail.com',
    password: '12345',
    role: 'Instructor',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  await User.create(userObject);
});

describe('Tests instructor login', () => {
  test('should respond body with 201 status code', async () => {
    try {
      const user = {
        email: 'customer@mail.com',
        password: '12345',
      };
      const response = await request(app).post('/instructor/login').send(user);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'Login successful',
        access_token: expect.any(String),
        user_id: expect.any(Number),
        user_role: 'Instructor',
      });
    } catch (error) {
      expect(error).toMatch('error');
    }
  });
  test('Should respond message "Invalid Email or Password" with 401 status code', async () => {
    try {
      const user = {
        email: 'customer@mail.com',
        password: faker.internet.password(5),
      };
      const response = await request(app).post('/instructor/login').send(user);
      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        message: 'Invalid Email or Password',
      });
    } catch (error) {
      expect(error).toMatch('error');
    }
  });
  test('Should respond message "Password are required" with 401 status code', async () => {
    try {
      const user = {
        email: faker.internet.email(),
        password: '12345',
      };
      const response = await request(app).post('/instructor/login').send(user);
      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        message: 'Invalid Email or Password',
      });
    } catch (error) {
      expect(error).toMatch('error');
    }
  });
});
