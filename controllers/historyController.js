const { History } = require('../models');

class HistoryController {
  static async getHistory(req, res, next) {
    try {
      const result = await History.findAll({
        include: ['Courses', 'User'],
        order: [['createdAt', 'DESC']],
      });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = HistoryController;
