const router = require('express').Router();
const CategoryController = require('../controllers/categoryController');

router.get('/', CategoryController.getCategories);
router.get('/:id', CategoryController.getCategoryById);

module.exports = router;
