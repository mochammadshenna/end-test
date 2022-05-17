const router = require('express').Router();
const authRouter = require('./auth');
const categoryRouter = require('./category');
const courseRouter = require('./courses');
const historyRouter = require('./history');
const instructorRouter = require('./instructor');
const { authentication } = require('../middlewares/authentication');
const { noInstructor } = require('../middlewares/authorization');
const errorHandler = require('../middlewares/errorHandler');

router.use('/', authRouter);
router.use('/instructor', instructorRouter);
router.use('/categories', categoryRouter);

router.use(authentication);

router.use(noInstructor);

router.use('/courses', courseRouter);
router.use('/histories', historyRouter);

router.use(errorHandler);

module.exports = router;
