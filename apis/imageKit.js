const axios = require('axios');

const imagekitInstance = axios.create({
  baseURL: 'https://upload.imagekit.io/api/v1/',
  headers: {
    Authorization: `Basic ${Buffer.from(process.env.IMAGEKIT_API_KEY + ':').toString('base64')}`,
  },
});

const uploadApi = (data) => {
  return imagekitInstance({
    method: 'post',
    url: 'files/upload',
    data: data,
    headers: {
      ...data.getHeaders(),
    },
  });
};


module.exports = { uploadApi };
