const express = require('express');
const router = express.Router();
const Joi = require('joi');

const { listContacts, getContactById, removeContact, addContact, updateContact } = require('../../models/contacts');

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().min(10).max(10).required(),
  email: Joi.string().email().required()
});

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({ 
      status: "success",
      code: 200,
      message: 'All contacts',
      data: {
        result: contacts
      }
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if(!contact) {
      const error = new Error(`Contact with id=${contactId} not found`);
      console.log(error.status)
      error.status = 404;
      throw error;
    }
    res.json({ 
      status: "success",
      code: 200,
      message:  `Contact with id=${contactId} find.`,
      data: {
        result: contact
      },
    });
  } catch (error) {
    next(error);
  }
  
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
        const error = new Error('missing required name field');
        error.status = 400;
        throw error;
    }
    const newContact = await addContact(req.body);

    res.status(201).json({ 
    status: "success",
    code: 201,
    message:  `Contact ${newContact.name} added!`,
    data: {
      result: newContact
    }, 
  })
  } catch (error) {
    next(error);
  }
  
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deleteContact = await removeContact(contactId);
    if(!deleteContact) {
      const error = new Error(`Contact with id=${contactId} not found`);
      console.log(error.status)
      error.status = 404;
      throw error;
    }
    res.json({    
    status: "success",
    code: 200,
    message:  'contact deleted',
    data: {
      result: deleteContact
    }, 
    })
  } catch (error) {
    next(error);
  }
  
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const {error} = contactsSchema.validate(req.body);
    if(error){
      const error = new Error('Missing fields');
        error.status = 400;
        throw error;
    }
    const { contactId } = req.params;
    const updateDataContact = await updateContact(contactId, req.body);
    if(!updateDataContact) {
      const error = new Error(`Contact with id=${contactId} not found`);
      console.log(error.status)
      error.status = 404;
      throw error;
    }
    res.json({ 
      status: "success",
      code: 200,
      message: `Contact update`,
      data: {
        updateDataContact
      }
      })
  } catch (error) {
    next(error);
  }
  
});

module.exports = router;
