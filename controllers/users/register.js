const { User, joiRegisterSchema } = require('../../models/user');

const bcrypt = require('bcryptjs');
const gravatar = require("gravatar");
const { v4 } = require('uuid');
const {sendEmail} = require('../../services');

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
    const verificationToken = v4();

    const newUser = await User.create({ email, avatarURL, password: hashPassword, verificationToken });
    const mail = {
      to: email,
      subject: "Confirm your email",
      html: `<a target="_blank" 
      href="http://localhost:3000/api/users/verify/${verificationToken}">Confirm your email></a>`
    };
    await sendEmail(mail);
    
    res.status(201).json({
      status: 'success',
      code: 201,
      user: {
        email,
        avatarURL,
        subscription: newUser.subscription,
        verificationToken
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
