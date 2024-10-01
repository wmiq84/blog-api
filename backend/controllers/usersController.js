// controllers/usersController.js

const db = require('../db/queries');

async function sayHello(req, res) {
	const posts = await db.findAllPosts();
	console.log(posts);
	res.render('index', { user: req.user, posts: posts });    
}

module.exports = {
    sayHello,
};

// const posts = [
//     {
//         name: 'Post 1',
//         comments: [
//             { name: 'Comment 1' },
//             { name: 'Comment 2' }
//         ]
//     },
//     {
//         name: 'Post 2',
//         comments: [
//             { name: 'Comment 3' }
//         ]
//     }
// ];	