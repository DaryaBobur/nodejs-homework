const { User } = require('../../models/user');

const verifyEmailUser = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }

    await User.findByIdAndUpdate(user._id, {verify: true, verificationToken: null});
    res.json({
      message: 'Verification successful',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyEmailUser;