const { Courses } = require('../models');

const checkCoursesPermission = async (req, res, next) => {
  try {
    const { id, role } = req.user;

    const courseId = req.params.id;
    const courses = await Courses.findByPk(+courseId);
    if (!courses) throw { name: 'NotFound', id: courseId, entityName: 'Courses' };

    if (role === 'Admin') next();
    else if (role !== 'Admin' && id === news.authorId) next();
    else throw { name: 'Forbidden' };
  } catch (error) {
    next(error);
  }
};

const adminOnly = async (req, res, next) => {
  try {
    const { id, role } = req.user;

    const courseId = req.params.id;
    const courses = await Courses.findByPk(+courseId);
    if (!courses) throw { name: 'NotFound', id: courseId, entityName: 'Courses' };

    if (role === 'Admin') next();
    else throw { name: 'Forbidden' };
  } catch (error) {
    next(error);
  }
};

const instructorOnly = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role === 'Instructor') next();
    else throw { name: 'Forbidden' };
  } catch (error) {
    next(error);
  }
};

const noInstructor = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role !== 'Instructor') next();
    else throw { name: 'Forbidden' };
  } catch (error) {
    next(error);
  }
};

module.exports = { checkCoursesPermission, adminOnly, instructorOnly, noInstructor };
