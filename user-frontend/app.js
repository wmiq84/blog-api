document.addEventListener('DOMContentLoaded', () => {
	const postsContainer = document.getElementById('posts-container');

	// Function to fetch posts from the API
	async function fetchPosts() {
		try {
			const response = await fetch('http://localhost:3000/'); // Replace with your API endpoint
			const posts = await response.json();
			displayPosts(posts);
		} catch (error) {
			console.error('Error fetching posts:', error);
		}
	}

	// Function to display posts
	function displayPosts(posts) {
		postsContainer.innerHTML = '';
		posts.forEach((post) => {
			const postElement = document.createElement('div');
			postElement.className = 'post';
			postElement.innerHTML = `
          <h2>${post.title}</h2>
          <p>${post.content}</p>
        `;
			// Create a container for comments
			const commentsContainer = document.createElement('div');
			commentsContainer.className = 'comments';

			// Iterate over comments and create HTML elements for each
			if (post.comments && post.comments.length > 0) {
				post.comments.forEach((comment) => {
					const commentElement = document.createElement('p');
					commentElement.className = 'comment';
					commentElement.textContent = comment.content;
					commentsContainer.appendChild(commentElement);
				});
			} else {
				const noCommentsElement = document.createElement('p');
				noCommentsElement.className = 'no-comments';
				noCommentsElement.textContent = 'No comments yet.';
				commentsContainer.appendChild(noCommentsElement);
			}

			// Append the comments container to the post element
			postElement.appendChild(commentsContainer);

			// Append the post element to the posts container
			postsContainer.appendChild(postElement);
		});
	}

	// Fetch and display posts on page load
	fetchPosts();
});
