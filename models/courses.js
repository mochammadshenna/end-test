'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Courses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Courses.belongsTo(models.User, { foreignKey: 'authorId' });
      Courses.belongsTo(models.Category, { foreignKey: 'categoryId' });
      Courses.hasMany(models.History, { foreignKey: 'courseId' });
    }
  }
  Courses.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Title are required' },
          notEmpty: { msg: 'Title are required' },
        },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: 'Content are required' },
          notEmpty: { msg: 'Content are required' },
        },
      },
      courseUrl: {
        type: DataTypes.STRING,
        validate: {
          isUrl: { msg: 'Course URL must be valid URL' },
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: {
          args: false,
          msg: 'Category are required',
        },
        validate: {
          notFalsy(value) {
            if (!value) {
              throw new Error('Category are required!');
            }
          },
        },
      },
      authorId: DataTypes.INTEGER,
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Active',
      },
    },
    {
      sequelize,
      modelName: 'Courses',
      hooks: {
        afterSave: (course, options) => {
          const { method, updatedBy } = options;
          let description = `${course.constructor.name} with id ${course.id} `;

          if (method == 'PATCH') {
            const attr = course.changed()[0];
            description += `${attr} has been update from ${course.previous(attr)} to ${course.getDataValue(attr)}`;
          } else description += `${method.toLowerCase()}d.`;

          course.createHistory({ name: method, description, updatedBy });
        },
      },
    }
  );
  return Courses;
};
