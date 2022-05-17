const bcrypt = require('bcrypt');

function encrypt(value) {
  return bcrypt.hashSync(value, bcrypt.genSaltSync(5));
}

function compare(password, encryptedPassword) {
  return bcrypt.compareSync(password, encryptedPassword);
}

module.exports = { encrypt, compare };
