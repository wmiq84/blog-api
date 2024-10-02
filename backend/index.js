// app.js
const path = require('node:path');
const bodyParser = require('body-parser');

const express = require('express');
const app = express();
const usersRouter = require('./routes/usersRouter');
const passport = require('./auth');

const session = require('express-session');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('@prisma/client');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const cors = require('cors');
const usersController = require('./controllers/usersController');

const { findAllPosts } = require('./db/queries'); // Import the getAllPosts function


app.use(
	session({
		cookie: {
			maxAge: 7 * 24 * 60 * 60 * 1000, // ms
		},
		secret: 'a santa at nasa',
		resave: true,
		saveUninitialized: true,
		store: new PrismaSessionStore(new PrismaClient(), {
			checkPeriod: 2 * 60 * 1000, //ms
			dbRecordIdIsSessionId: true,
			dbRecordIdFunction: undefined,
		}),
	})
);

app.use(cors());
app.get('/create-board', usersController.createBoard);

app.get('/', async (req, res) => {
		const posts = await findAllPosts(); // Use the getAllPosts function to fetch posts
		res.json(posts);
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.use(passport.session());

// added for jwt

app.use(bodyParser.json());
app.use(express.json());

app.use('/', usersRouter);
app.use('/users', usersRouter);

// makes css compatible
const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
