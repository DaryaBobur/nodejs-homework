const express = require('express');
const router = express.Router();
const { contacts: ctrl } = require('../../controllers');
const {user} = require('../../middlewares');

router.get('/', user, ctrl.getAllContacts);

router.get('/:contactId', ctrl.getContactById);

router.post('/', user, ctrl.addContact);

router.delete('/:contactId', ctrl.removeContactById);

router.put('/:contactId', ctrl.updateContactById);

router.patch('/:contactId/favorite', ctrl.updateStatusContact);

module.exports = router;