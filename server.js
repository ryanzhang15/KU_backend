const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

// process.env.PORT is for deployment on cloud platform later
const PORT = process.env.PORT || 3000;
const corsOptions = {
    // origin: 'https://your-client-app.com', // Allow only requests from this origin
    // methods: 'GET,POST', // Allow only these methods
    // allowedHeaders: ['Content-Type', 'Authorization'] // Allow only these headers
};

app.use(cors(corsOptions));
app.use(express.json());


const DATA_FILE = 'test_data.json';

const readData = () => {
    try {
        return JSON.parse(fs.readFileSync(DATA_FILE));
    } catch (error) {
        return { users: [], posts: [] }; // Return default structure if file is missing
    }
};

// Function to write JSON file
const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// GET all users
app.get('/api/users', (req, res) => {
    const data = readData();
    res.json(data.users);
});

// POST a new user
app.post('/api/users', (req, res) => {
    const data = readData();
    const newUser = {
        id: data.users.length + 1,
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        createdAt: new Date().toISOString()
    };
    data.users.push(newUser);
    writeData(data);
    res.status(201).json(newUser);
});

// GET all posts
app.get('/api/posts', (req, res) => {
    const data = readData();
    res.json(data.posts);
});

// POST a new post
app.post('/api/posts', (req, res) => {
    const data = readData();
    const newPost = {
        postId: data.posts.length + 1,
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
        likes: 0,
        comments: [],
        createdAt: new Date().toISOString()
    };
    data.posts.push(newPost);
    writeData(data);
    res.status(201).json(newPost);
});

app.listen(PORT,()=>{
console.log(`Server running on port ${PORT}`)
})