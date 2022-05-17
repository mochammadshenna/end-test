const jwt = require('jsonwebtoken');

function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SIGNATURE);
}

function verifyToken(access_token) {
  return jwt.verify(access_token, process.env.JWT_SIGNATURE);
}

module.exports = { generateToken, verifyToken };
