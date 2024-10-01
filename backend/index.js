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

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const cors = require('cors');

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

app.get('/', (req, res) => {
  res.json([
    { title: 'Post 1', content: 'Content of post 1' },
    { title: 'Post 2', content: 'Content of post 2' },
  ]);
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

