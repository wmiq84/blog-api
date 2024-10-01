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
			postsContainer.appendChild(postElement);
		});
	}

	// Fetch and display posts on page load
	fetchPosts();
});
