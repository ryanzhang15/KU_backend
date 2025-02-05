const BASE_URL = 'http://localhost:3000/api'; // Change to your deployed server if needed

// Fetch all users
async function getUsers() {
    try {
        const response = await fetch(`${BASE_URL}/users`);
        const data = await response.json();
        console.log('Users:', data);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

// Create a new user
async function createUser() {
    try {
        const newUser = {
            name: "Alice",
            email: "alice@example.com",
            username: "alice123",
            password: "secure123"
        };
        
        const response = await fetch(`${BASE_URL}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser)
        });
        
        const data = await response.json();
        console.log('New User Created:', data);
    } catch (error) {
        console.error('Error creating user:', error);
    }
}

// Fetch all posts
async function getPosts() {
    try {
        const response = await fetch(`${BASE_URL}/posts`);
        const data = await response.json();
        console.log('Posts:', data);
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

// Create a new post
async function createPost() {
    try {
        const newPost = {
            userId: 1, // Use a valid user ID from `getUsers()`
            title: "Hello World",
            content: "This is my first post!"
        };

        const response = await fetch(`${BASE_URL}/posts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPost)
        });

        const data = await response.json();
        console.log('New Post Created:', data);
    } catch (error) {
        console.error('Error creating post:', error);
    }
}

// Run all functions in sequence
async function runTests() {
    console.log("Fetching users...");
    await getUsers();
    
    console.log("Creating a new user...");
    await createUser();
    
    console.log("Fetching posts...");
    await getPosts();
    
    console.log("Creating a new post...");
    await createPost();
    
    console.log("Finished API tests.");
}

// Execute the test functions
runTests();
