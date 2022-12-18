const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const currentUser = require('./currentUser');
const updateSubscriptionUser = require('./updateSubscriptionUser');
const updateAvatar = require('./updateAvatar');

module.exports = {
  register,
  login,
  logout,
  currentUser,
  updateSubscriptionUser,
  updateAvatar
};
