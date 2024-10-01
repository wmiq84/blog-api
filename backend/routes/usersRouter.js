// routes/usersRouter.js
const { Router } = require('express');
const usersController = require('../controllers/usersController');
const usersRouter = Router();
const passport = require('../auth');
const jwt = require('jsonwebtoken'); 

usersRouter.get('/', usersController.createBoard);

usersRouter.get('/posts', usersController.createPostForm);
usersRouter.post('/posts', usersController.postMessage);


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
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            if (!user) {
                console.error('Authentication Failed:', info);
                return res.status(401).json({ message: 'Authentication failed', info });
            }
            const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' }); // Add token expiration
            res.json({ user, token });
        })(req, res, next);
    }
);

usersRouter.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ message: 'You have accessed a protected route!', user: req.user });
});


module.exports = usersRouter;
