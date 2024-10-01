const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
	await prisma.comment.deleteMany();
	await prisma.post.deleteMany();
	await prisma.user.deleteMany();

	// Reset the auto-incrementing primary key sequences
	await prisma.$executeRaw`ALTER SEQUENCE "Comment_id_seq" RESTART WITH 1`;
	await prisma.$executeRaw`ALTER SEQUENCE "Post_id_seq" RESTART WITH 1`;
	await prisma.$executeRaw`ALTER SEQUENCE "User_id_seq" RESTART WITH 1`;

	const hashedPassword = await bcrypt.hash('123', 10);

	await prisma.user.create({
		data: {
			email: '123@gmail.com',
			password: hashedPassword,
			posts: {
				create: {
					email: '123@gmail.com',
					title: 'Test',
					content: 'Lorem ipsum dolor and so on.',
					comments: {
						create: [
							{
								content: 'Wow so cool!!!',
							},
							{
								content: 'Wow Wow Wow x100!!!',
							},
						],
					},
				},
			},
		},
	});

	const allUsers = await prisma.user.findMany({
		include: {
			posts: {
				include: {
					comments: true,
				},
			},
		},
	});
	// console.dir(allUsers, { depth: null });
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});

async function findAllPosts() {
	const posts = await prisma.post.findMany({
		where: {
			userId: 1,
		},
		include: {
			comments: true,
		},
	});
	return posts;
}

async function postMessage({ email, title, content, userId }) {
	const posts = await prisma.post.findMany({
		where: {
			userId: userId,
		},
		include: {
			comments: true,
		},
	});

	const maxId = posts.reduce((max, post) => (post.id > max ? post.id : max), 0);

	const newPost = {
		id: maxId + 1,
		email: email,
		title: title,
		content: content,
		userId: userId,
	};

	await prisma.post.create({
		data: newPost,
	});
}

module.exports = {
	findAllPosts,
	postMessage,
};
