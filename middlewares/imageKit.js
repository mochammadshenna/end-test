const { uploadApi } = require('../apis/imagekit');
const FormData = require('form-data');

const imageKit = async (req, res, next) => {
  try {
    if (req.file) {
      const { originalname, buffer, size, mimetype } = req.file;

      if (size > 255000) throw { name: 'toLargeError' };
      if (mimetype.split('/')[0] !== 'image') throw { name: 'unsuportedError' };

      const form = new FormData();
      form.append('file', Buffer.from(buffer).toString('base64'));
      form.append('fileName', originalname);

      const response = await uploadApi(form);
      if (response) req.body.imgUrl = response.data.url;
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { imageKit };
