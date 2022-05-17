const { Category } = require('../models');

class CategoryController {
  static async getCategories(req, res, next) {
    try {
      const result = await Category.findAll();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getCategoryById(req, res, next) {
    try {
      const { id } = req.params;

      const category = await Category.findByPk(id);
      if (category) {
        res.status(200).json(category);
      } else {
        throw { name: 'NotFound', id, entityName: 'Category' };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoryController;
