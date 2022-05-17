const router = require('express').Router();
const authRouter = require('./auth');
const CoursesController = require('../controllers/coursesController');
const { User } = require('../models');
const { verifyToken } = require('../helpers/jwt');

router.use(authRouter);
router.use(async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    const payload = verifyToken(access_token);
    const user = await User.findOne({ where: { email: payload.email } });
    if (user) {
      req.user = {
        id: user.id,
        email: user.email,
        role: user.role,
      };
    };
    next();
  } catch (error) {
    next();
  }
});

router.get('/courses', CoursesController.getCourses);
router.get('/courses/:id', CoursesController.getCoursesById);

module.exports = router;
