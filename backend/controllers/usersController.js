// controllers/usersController.js

const db = require('../db/queries');

async function createBoard(req, res) {
	const posts = await db.findAllPosts();
	res.render('index', { user: req.user, posts: posts });
}

async function createPostForm(req, res) {
	res.render('post-form');
}

async function postMessage(req, res) {
	const { title, content } = req.body;
	const userId = req.user.id;
	const email = req.user.email;
	await db.postMessage({
		email: email,
		title: title,
		content: content,
		userId: userId,
	});
	res.redirect('/');
}

module.exports = {
	createBoard,
	createPostForm,
	postMessage,
};
