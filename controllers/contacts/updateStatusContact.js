const { Contact, statusJoiSchema } = require('../../models/contact');

const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = statusJoiSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const { favorite } = req.body;

    const updateStatus = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });

    if (!updateStatus) {
      const error = new Error(`Contact with id=${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: 'success',
      code: 200,
      message: `Status favorite = ${req.body.favorite}`,
      data: {
        result: updateStatus,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatusContact;