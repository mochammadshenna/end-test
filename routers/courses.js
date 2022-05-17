const router = require('express').Router();
const CourseController = require('../controllers/CoursesController');
const { checkCoursesPermission, adminOnly } = require('../middlewares/authorization');
const { imageKit } = require('../middlewares/imagekit');
const { multerSingleImg } = require('../middlewares/multer');

const middleware = [multerSingleImg, imageKit];

router.get('/', CourseController.getCourses);
router.get('/:id', CourseController.getCoursesById);
router.post('/', middleware, CourseController.postCourses);
router.put('/:id', [...middleware, checkCoursesPermission], CourseController.updateCourse);
router.patch('/:id', adminOnly, CourseController.patchCoursesStatus);
router.delete("/:id", CourseController.deleteCourses);

module.exports = router;