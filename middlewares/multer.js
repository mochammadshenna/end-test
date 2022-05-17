const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });
const multerSingleImg = upload.single('image');

module.exports = { multerSingleImg };
