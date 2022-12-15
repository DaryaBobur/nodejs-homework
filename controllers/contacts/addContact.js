const { Contact, joiSchema } = require('../../models/contact');

const addContact = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { error } = joiSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const newContact = await Contact.create({ ...req.body, owner: _id });

    res.status(201).json({
      status: 'success',
      code: 201,
      message: `Contact ${newContact.name} added!`,
      data: {
        result: newContact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
