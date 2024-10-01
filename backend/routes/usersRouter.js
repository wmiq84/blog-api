// routes/usersRouter.js
const { Router } = require("express");
const usersController = require("../controllers/usersController");
const usersRouter = Router();
const passport = require('../auth');

usersRouter.get("/", usersController.sayHello);
// usersRouter.post("/", usersController.logIn);
usersRouter.post(
	'/log-in',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/',
	})
);

module.exports = usersRouter;