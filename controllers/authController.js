const { OAuth2Client } = require('google-auth-library');
const { User } = require('../models');
const { compare } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class AuthController {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const role = req.baseUrl.includes('instructor') ? 'Instructor' : 'Admin';
      const result = await User.create({ email, password, role });

      res.status(201).json({
        message: 'Register successful',
        email: result.email,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (user && password && compare(password, user.password)) {
        const payload = { id: user.id, email: user.email };
        const access_token = generateToken(payload);
        res.status(200).json({
          message: 'Login successful',
          access_token,
          user_id: user.id,
          user_role: user.role,
        });
      } else throw { name: 'Invalid' };
    } catch (error) {
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const { id_token } = req.body;
      const client = new OAuth2Client(process.env.GOOGLE_SIGNIN_CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: process.env.GOOGLE_SIGNIN_CLIENT_ID,
      });

      const { email } = ticket.getPayload();
      const role = req.baseUrl.includes('instructor') ? 'Instructor' : '';

      const [user, isCreated] = await User.findOrCreate({
        where: { email },
        defaults: {
          password: 'RANDOM' + (Math.random() + 1).toString(36),
          role,
        },
      });

      if (user) {
        const status = isCreated ? 201 : 200;
        const access_token = generateToken({ id: user.id, email: user.email });

        res.status(status).json({ message: 'Login successful', access_token, user_id: user.id, user_role: user.role });
      } else throw { name: 'Invalid' };
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
