const { User, joiRegisterSchema } = require('../../models/user');

const bcrypt = require('bcryptjs');
const gravatar = require("gravatar");

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = joiRegisterSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const user = await User.findOne({ email });

    if (user) {
      const error = new Error(`Email ${email} in use`);
      error.status = 409;
      throw error;
    }

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const avatarURL = gravatar.url(email);
    const newUser = await User.create({ email, avatarURL, password: hashPassword });
    res.status(201).json({
      status: 'success',
      code: 201,
      user: {
        email,
        avatarURL,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
