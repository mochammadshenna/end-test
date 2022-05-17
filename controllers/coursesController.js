const { Courses, Category, User} = require('../models');
const { iLike, between } = require('sequelize').Op;

class CoursesController {
  static async getCourses(req, res, next) {
    try {
      const { limit, page, titleLike, categories, contentLike, publishedBetween } = req.query;
      const defaultLimit = limit || 9;
      const conditions = {};
      const currentUser = req.user ? req.user.id : 0;

      categories ? (conditions.categoryId = categories.split(',')) : '';
      titleLike ? (conditions.title = { [iLike]: `%${titleLike}%` }) : '';
      contentLike ? (conditions.content = { [iLike]: `%${contentLike}%` }) : '';
      publishedBetween ? (conditions.createdAt = { [between]: publishedBetween.split(',') }) : '';
      req.baseUrl.includes('customer') ? (conditions.status = 'Active') : '';

      const result = await News.findAndCountAll({
        limit: defaultLimit,
        offset: page > 0 ? defaultLimit * (page - 1) : null,
        where: conditions,
        attributes: {
          exclude: ['createdAt'],
        },
        order: [['updatedAt', 'DESC']],
        include: [
          {
            model: Category,
            required: false,
            attributes: ['name'],
          },
          {
            model: User,
            required: false,
            attributes: ['email'],
          },
          {
            model: Bookmark,
            foreignKey: 'courseId',
            required: false,
            where: {
              userId: currentUser,
            },
          },
        ],
      });

      result.currentPage = !page || page < 1 ? 1 : +page;
      result.totalPage = Math.ceil(result.count / +defaultLimit);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getCoursesById(req, res, next) {
    try {
      const { id } = req.params;
      const status = req.baseUrl.includes('customer') ? 'Active' : '';
      const courses = await Courses.findOne({
        where: { id: +id, status },
        attributes: {
          exclude: ['createdAt'],
        },
        include: [
          {
            model: Category,
            required: false,
            attributes: ['name'],
          },
          {
            model: User,
            required: false,
            attributes: ['email'],
          },
        ],
      });
      if (courses) {
        res.status(200).json(courses);
      } else {
        throw { name: 'NotFound', id, entityName: 'News' };
      }
    } catch (error) {
      next(error);
    }
  }

  static async postCourses(req, res, next) {
    try {
      const { title, content, imgUrl, categoryId } = req.body;

      const result = await News.create(
        {
          title,
          content,
          imgUrl,
          authorId: req.user.id,
          categoryId,
        },
        { method: req.method, updatedBy: req.user.id }
      );

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async patchCoursesStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const result = await Courses.findByPk(id, { include: Category });
      result.update({ status }, { method: req.method, updatedBy: req.user.id });

      if (result) res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async updateCourses(req, res, next) {
    try {
      const { id } = req.params;
      const { title, content, imgUrl, categoryId } = req.body;

      const result = await Courses.findByPk(id, { include: Category });
      result.update({ title, content, imgUrl, categoryId: +categoryId }, { method: req.method, updatedBy: req.user.id });

      if (result) res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async deleteCourses(req, res, next) {
    try {
      const { id } = req.params;

      const result = await Courses.destroy({ where: { id } });
      if (result) {
        res.status(200).json({
          message: `Courses with id ${id} has been deleted`,
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CoursesController;
