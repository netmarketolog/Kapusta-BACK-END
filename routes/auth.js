const express = require("express");

const register = require("../controller/auth/registrationController");
const login = require("../controller/auth/loginController");
const { logout } = require("../controller/auth/logoutController");
const { tryCatchWrapper } = require("../helpers/tryCatchWrapper");
const { authorize } = require("../middlewares/authorize");
const { googleAuth } = require("../controller/auth/googleAuthControler");
const {
  googleRedirect,
} = require("../controller/auth/googleRedirectController");

const authRouter = express.Router();

authRouter.post("/users/register", tryCatchWrapper(register));
authRouter.post("/users/login", tryCatchWrapper(login));
authRouter.post(
  "/users/logout",
  tryCatchWrapper(authorize),
  tryCatchWrapper(logout)
);
authRouter.get("/google", tryCatchWrapper(googleAuth));
authRouter.get("/google-redirect", tryCatchWrapper(googleRedirect));

module.exports = authRouter;
