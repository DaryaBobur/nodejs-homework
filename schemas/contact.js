const Joi = require('joi');

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().min(10).max(10).required(),
  email: Joi.string().email().required(),
});

module.exports = contactsSchema;
