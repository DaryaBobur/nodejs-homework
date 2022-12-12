const { Contact } = require('../../models/contact');

const listContacts = async (req, res, next) => {
  try {
    const {_id} = req.user;
    const contacts = await Contact.find({owner: _id});
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
