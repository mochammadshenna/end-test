const request = require('supertest');
const { User } = require('../models');
const app = require('../app');
const faker = require('faker');

beforeAll(async () => {
  await User.sync({ force: true });
  const userObject = {
    email: 'customer@mail.com',
    password: faker.internet.password(5),
    role: 'Instructor',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  await User.create(userObject);
});

describe('Tests Instructor registrations', () => {
  test('should respond body with 201 status code', async () => {
    try {
      const user = {
        email: faker.internet.email(),
        password: faker.internet.password(5),
      };
      const response = await request(app).post('/instructor/register').send(user);
      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        message: 'Register successful',
        email: user.email,
      });
    } catch (error) {
      expect(error).toMatch('error');
    }
  });
  test('Should respond message "Email are required" with 400 status code', async () => {
    try {
      const user = {
        password: faker.internet.password(5),
      };
      const response = await request(app).post('/instructor/register').send(user);
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: 'Email are required',
      });
    } catch (error) {
      expect(error).toMatch('error');
    }
  });
  test('Should respond message "Password are required" with 400 status code', async () => {
    try {
      const user = {
        email: faker.internet.email(),
      };
      const response = await request(app).post('/instructor/register').send(user);
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: 'Password are required',
      });
    } catch (error) {
      expect(error).toMatch('error');
    }
  });
  test('Should respond message "Email are required" with 400 status code', async () => {
    try {
      const user = {
        email: '',
        password: faker.internet.password(5),
      };
      const response = await request(app).post('/instructor/register').send(user);
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: 'Email are required',
      });
    } catch (error) {
      expect(error).toMatch('error');
    }
  });
  test('Should respond message "Password are required" with 400 status code', async () => {
    try {
      const user = {
        email: faker.internet.email(),
        password: '',
      };
      const response = await request(app).post('/instructor/register').send(user);
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: 'Password are required',
      });
    } catch (error) {
      expect(error).toMatch('error');
    }
  });
  test('Should respond message "email must be unique" with 400 status code', async () => {
    try {
      const user = {
        email: 'customer@mail.com',
        password: faker.internet.password(5),
      };
      const response = await request(app).post('/instructor/register').send(user);
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: 'email must be unique',
      });
    } catch (error) {
      expect(error).toMatch('error');
    }
  });
  test('Should respond message "Please enter a valid email address" with 400 status code', async () => {
    try {
      const user = {
        email: faker.internet.password(5),
        password: faker.internet.password(5),
      };
      const response = await request(app).post('/instructor/register').send(user);
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: 'Please enter a valid email address',
      });
    } catch (error) {
      expect(error).toMatch('error');
    }
  });
});
