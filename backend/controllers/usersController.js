// controllers/usersController.js

const db = require('../db/queries');

async function sayHello(req, res) {
    res.render('index', { email: req.email})
}

module.exports = {
    sayHello,
};