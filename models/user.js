const { Schema, model } = require('mongoose');

const Joi = require('joi');

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
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: String
  }, { versionKey: false, timestamps: true }
);

const User = model('user', userSchema);

const joiRegisterSchema = Joi.object({
  password: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

module.exports = {
  User,
  joiRegisterSchema,
  joiLoginSchema,
};
