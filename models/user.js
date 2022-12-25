const { Schema, model } = require('mongoose');

const Joi = require('joi');
const bcrypt = require('bcryptjs');
const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: String,
    avatarURL: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true }
);
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.findSubscription = function () {
  return `${this.subscription}`;
};

const joiRegisterSchema = Joi.object({
  password: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string().valid('starter', 'pro', 'business'),
  avatarURL: Joi.string(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const joiSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business'),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string().email().required(),
})

const User = model('user', userSchema);

module.exports = {
  User,
  joiRegisterSchema,
  joiLoginSchema,
  joiSubscriptionSchema,
  verifyEmailSchema
};
