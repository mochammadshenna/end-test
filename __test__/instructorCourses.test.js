const request = require('supertest');
const { Category, User, Courses } = require('../models');
const { encrypt } = require('../helpers/bcrypt');
const app = require('../app');
const { generateCategory, generateUser, generateCourses } = require('../helpers/faker');

beforeAll(async () => {
  await Category.sync({ force: true });
  await User.sync({ force: true });
  await Courses.sync({ force: true });

  const userObject = generateUser(2);
  const CategoryObject = generateCategory(2);
  const coursesObject = generateCourses(20, 2);

  const combinedUserObject = userObject.concat([
    {
      email: 'customer@mail.com',
      password: encrypt('12345'),
      role: 'Instructor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
  await User.bulkCreate(combinedUserObject);
  await Category.bulkCreate(CategoryObject);
  await Courses.bulkCreate(coursesObject);
});

describe('Tests instructor courses', () => {
  // get with no access token
  test('should respond body news object with 200 status code', async () => {
    try {
      const response = await request(app).get('/instructor/courses');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        count: expect.any(Number),
        rows: expect.any(Array),
        currentPage: expect.any(Number),
        totalPage: expect.any(Number),
      });
    } catch (error) {
      expect(error).toMatch('error');
    }
  });
  // get with access token
  test('should respond body news object with 200 status code', async () => {
    try {
      const user = {
        email: 'customer@mail.com',
        password: '12345',
      };
      const res = await request(app).post('/instructor/login').send(user);
      const response = await request(app).get('/instructor/courses').set('access_token', res.body.access_token);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        count: expect.any(Number),
        rows: expect.any(Array),
        currentPage: expect.any(Number),
        totalPage: expect.any(Number),
      });
    } catch (error) {
      expect(error).toMatch('error');
    }
  });
  // get with no access token with 1 query filter
  test('should respond body news object with 200 status code', async () => {
    try {
      const response = await request(app).get('/instructor/courses?titleLike=quis');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        count: expect.any(Number),
        rows: expect.any(Array),
        currentPage: expect.any(Number),
        totalPage: expect.any(Number),
      });
    } catch (error) {
      expect(error).toMatch('error');
    }
  });
  // get with access token with 1 query filter
  test('should respond body courses object with 200 status code', async () => {
    try {
      const user = {
        email: 'customer@mail.com',
        password: '12345',
      };
      const res = await request(app).post('/instructor/login').send(user);
      const response = await request(app).get('/instructor/courses?titleLike=quis').set('access_token', res.body.access_token);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        count: expect.any(Number),
        rows: expect.any(Array),
        currentPage: expect.any(Number),
        totalPage: expect.any(Number),
      });
    } catch (error) {
      expect(error).toMatch('error');
    }
  });
  // get with no access token with 2 query filter
  test('should respond body courses object with 200 status code', async () => {
    try {
      const response = await request(app).get('/instructor/courses?titleLike=quis&publishedBetween=2010-09-20,2021-09-20');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        count: expect.any(Number),
        rows: expect.any(Array),
        currentPage: expect.any(Number),
        totalPage: expect.any(Number),
      });
    } catch (error) {
      expect(error).toMatch('error');
    }
  });
  // get with access token with 2 query filter
  test('should respond body courses object with 200 status code', async () => {
    try {
      const user = {
        email: 'customer@mail.com',
        password: '12345',
      };
      const res = await request(app).post('/instructor/login').send(user);
      const response = await request(app)
        .get('/instructor/courses?titleLike=quis&publishedBetween=2010-09-20,2021-09-20')
        .set('access_token', res.body.access_token);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        count: expect.any(Number),
        rows: expect.any(Array),
        currentPage: expect.any(Number),
        totalPage: expect.any(Number),
      });
    } catch (error) {
      expect(error).toMatch('error');
    }
  });
  // get with no access token with specific pagination
  test('should respond body courses object with 200 status code', async () => {
    try {
      const response = await request(app).get('/instructor/courses?page=3');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        count: expect.any(Number),
        rows: expect.any(Array),
        currentPage: expect.any(Number),
        totalPage: expect.any(Number),
      });
    } catch (error) {
      expect(error).toMatch('error');
    }
  });
  // get with access token with specific pagination
  test('should respond body courses object with 200 status code', async () => {
    try {
      const user = {
        email: 'customer@mail.com',
        password: '12345',
      };
      const res = await request(app).post('/instructor/login').send(user);
      const response = await request(app).get('/instructor/courses?page=3').set('access_token', res.body.access_token);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        count: expect.any(Number),
        rows: expect.any(Array),
        currentPage: expect.any(Number),
        totalPage: expect.any(Number),
      });
    } catch (error) {
      expect(error).toMatch('error');
    }
  });
  // get with no access token with specific param
  test('should respond body courses object with 200 status code', async () => {
    try {
      const response = await request(app).get('/instructor/courses/1');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: expect.any(Number),
        title: expect.any(String),
        content: expect.any(String),
        imgUrl: expect.any(String),
        categoryId: expect.any(Number),
        authorId: expect.any(Number),
        status: expect.any(String),
        updatedAt: expect.any(String),
        Category: expect.any(Object),
        User: expect.any(Object),
      });
    } catch (error) {
      expect(error).toMatch('error');
    }
  });
  // get with access token with specific param
  test('should respond body courses object with 200 status code', async () => {
    try {
      const user = {
        email: 'customer@mail.com',
        password: '12345',
      };
      const res = await request(app).post('/instructor/login').send(user);
      const response = await request(app).get('/instructor/courses/3').set('access_token', res.body.access_token);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: expect.any(Number),
        title: expect.any(String),
        content: expect.any(String),
        imgUrl: expect.any(String),
        categoryId: expect.any(Number),
        authorId: expect.any(Number),
        status: expect.any(String),
        updatedAt: expect.any(String),
        Category: expect.any(Object),
        User: expect.any(Object),
      });
    } catch (error) {
      expect(error).toMatch('error');
    }
  });
  // 404 when "message": "Courses with id 51 not found"
  test('should respond "Courses with id [any] not found" with 404 status code', async () => {
    try {
      const response = await request(app).get('/instructor/courses/99999');
      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        message: 'Courses with id 99999 not found',
      });
    } catch (error) {
      expect(error).toMatch('error');
    }
  });
});
