const { Contact } = require('../../models');

const removeContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deleteContact = await Contact.findByIdAndRemove(contactId);
    if (!deleteContact) {
      const error = new Error(`Contact with id=${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'contact deleted',
      data: {
        result: deleteContact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeContactById;
