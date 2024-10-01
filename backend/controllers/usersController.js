// controllers/usersController.js

const db = require('../db/queries');

async function sayHello(req, res) {
    console.log(req.user);
    res.render('index', { user: req.user})
}

module.exports = {
    sayHello,
};