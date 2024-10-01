// controllers/usersController.js

const db = require('../db/queries');

async function createBoard(req, res) {
	const posts = await db.findAllPosts();
	res.render('index', { user: req.user, posts: posts });
}

async function postMessage(req, res) {
    const { title, content } = req.body;
	await db.postMessage({email: '123@gmail.com', title: title, content: content});
}

async function createPostForm(req, res) {
	res.render('post-form');
}

module.exports = {
	createBoard,
	postMessage,
    createPostForm
};
