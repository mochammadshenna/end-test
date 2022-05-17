const router = require('express').Router();
const HistoryController = require('../controllers/historyController');

router.get('/', HistoryController.getHistory);

module.exports = router;
