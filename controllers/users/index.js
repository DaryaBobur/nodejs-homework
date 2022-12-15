const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const currentUser = require('./currentUser');
const updateSubscriptionUser = require('./updateSubscriptionUser');

module.exports = {
  register,
  login,
  logout,
  currentUser,
  updateSubscriptionUser,
};
