const express = require('express');
const router = express.Router();
const { users: ctrl } = require("../../controllers");
const {user, uploadImg} = require('../../middlewares');

router.post('/register', ctrl.register);

router.get('/login', ctrl.login);

router.post('/logout', user, ctrl.logout);

router.get('/current', user, ctrl.currentUser);

router.patch('/:contactId/users', ctrl.updateSubscriptionUser);

router.patch('/avatars', user, uploadImg.single("avatar"), ctrl.updateAvatar);

router.get('/verify/:verificationToken', ctrl.verifyEmailUser);

router.post('/verify', ctrl.resendVerificationEmail);

module.exports = router;