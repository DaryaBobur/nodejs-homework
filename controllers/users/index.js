const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const currentUser = require('./currentUser');
const updateSubscriptionUser = require('./updateSubscriptionUser');
const updateAvatar = require('./updateAvatar');
const verifyEmailUser = require('./verifyEmailUser');
const resendVerificationEmail = require('./resendVerificationEmail');

module.exports = {
  register,
  login,
  logout,
  currentUser,
  updateSubscriptionUser,
  updateAvatar,
  verifyEmailUser,
  resendVerificationEmail
};
