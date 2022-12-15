const { User, joiLoginSchema } = require('../../models/user');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = joiLoginSchema.validate(req.body);

    if (error) {
      error.status = 400;
      throw error;
    }
    const user = await User.findOne({ email });
    if (!user || !user.comparePassword(password)) {
      const error = new Error(`Email or password is wrong`);
      error.status = 401;
      throw error;
    }

    const payload = {
      id: user._id,
    };
    const { subscription } = user;
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
      status: 'success',
      code: 200,
      token: token,
      user: {
        email,
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
