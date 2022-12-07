const { Contact, joiSchema } = require('../../models/contact');

const updateContactById = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const updateDataContact = await Contact.findByIdAndUpdate( contactId, req.body, { new: true } );

    if (!updateDataContact) {
      const error = new Error(`Contact with id=${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: 'success',
      code: 200,
      message: `Contact ${req.body.name} update`,
      data: {
        result: updateDataContact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContactById;
