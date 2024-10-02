// routes/usersRouter.js
const { Router } = require('express');
const usersController = require('../controllers/usersController');
const usersRouter = Router();
const passport = require('../auth');
const jwt = require('jsonwebtoken');

usersRouter.get('/', usersController.createBoard);
usersRouter.get('/posts', usersController.createPostForm);
usersRouter.post('/posts', usersController.postMessage);

// added for jwt
usersRouter.post(
	'/log-in',
	(req, res, next) => {
		console.log('Request Body:', req.body);
		next();
	},
	(req, res, next) => {
		passport.authenticate('local', { session: false }, (err, user, info) => {
			if (err) {
				console.error('Authentication Error:', err);
			}
			const token = jwt.sign({ id: user.id }, 'your_jwt_secret');
			res.json({ user, token });
		})(req, res, next);
	}
);
// added for jwt
usersRouter.get(
	'/protected',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		res.json({
			message: 'You have accessed a protected route!',
			user: req.user,
		});
	}
);

module.exports = usersRouter;
