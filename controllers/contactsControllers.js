const { Contact, joiSchema, statusJoiSchema } = require('../models/contact');

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

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
    if (!contact) {
      const error = new Error(`Contact with id=${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: 'success',
      code: 200,
      message: `Contact with id=${contactId} find.`,
      data: {
        result: contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const newContact = await Contact.create(req.body);

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

const updateContactById = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const updateDataContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });

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

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContactById,
  updateContactById,
  updateStatusContact,
};
