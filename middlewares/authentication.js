const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models');

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    if (!access_token) throw { name: 'Unauthorized' };
    const payload = verifyToken(access_token);
    const user = await User.findOne({ where: { email: payload.email } });
    if (!user) throw { name: 'Unauthorized' };
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authentication };
