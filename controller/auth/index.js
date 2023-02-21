const { register } = require("./registrationController");
const { login } = require("./loginController");
const { logout } = require("./logoutController");
const { googleAuth } = require("./googleAuthControler");
const {googleRedirect} = require("./googleRedirectController");

module.exports = {
  register,
  login,
  logout,
  googleAuth,
  googleRedirect,
};