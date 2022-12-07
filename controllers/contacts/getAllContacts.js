const { Contact } = require('../../models/contact');

const listContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({});
    res.json({
      status: 'success',
      code: 200,
      message: 'All contacts',
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = listContacts;
