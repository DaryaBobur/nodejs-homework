const { User, verifyEmailSchema } = require('../../models/user');
const { sendEmail } = require('../../helpers');

const resendVerificationEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    const { error } = verifyEmailSchema.validate(req.body);

    if (error) {
      error.status = 400;
      throw error;
    }
    if (!user) {
      const error = new Error('missing required field email');
      error.status = 400;
      throw error;
    }
    if (user.verify) {
      const error = new Error('Verification has already been passed');
      error.status = 400;
      throw error;
    }

    const mail = {
      to: email,
      subject: 'Confirm your email',
      html: `<a target="_blank" 
        href="http://localhost:3000/api/users/verify/${user.verificationToken}">Confirm your email></a>`,
    };
    await sendEmail(mail);
    res.json({
      message: 'Verification email sent',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resendVerificationEmail;
