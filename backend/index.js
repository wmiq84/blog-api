// app.js
const path = require('node:path'); // for ejs

const express = require('express');
const app = express();
const usersRouter = require('./routes/usersRouter');
const passport = require('./auth'); // Adjust the path as necessary

const session = require('express-session');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('@prisma/client');

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

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

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.use(passport.session());

app.use('/', usersRouter);

// makes css compatible
const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));