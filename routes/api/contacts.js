const express = require('express');
const router = express.Router();

const {
  listContacts,
  getContactById,
  addContact,
  removeContactById,
  updateContactById,
  updateStatusContact
} = require('../../controllers/contactsControllers');

router.get('/', listContacts);

router.get('/:contactId', getContactById);

router.post('/', addContact);

router.delete('/:contactId', removeContactById);

router.put('/:contactId', updateContactById);

router.patch('/:contactId/favorite', updateStatusContact);

module.exports = router;
