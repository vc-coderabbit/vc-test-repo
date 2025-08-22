const express = require('express');
const cors = require('cors');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// Mock data - in a real app, this would be a database
let blogPosts = [
  {
    id: '1',
    title: 'Getting Started with React Hooks',
    content: 'React Hooks have revolutionized the way we write React components. In this comprehensive guide, we\'ll explore the most commonly used hooks and how they can simplify your code. From useState to useEffect, we\'ll cover practical examples and best practices that will help you become more productive in your React development journey.',
    author: 'Alice Johnson',
    createdAt: '2024-01-15T10:30:00Z',
    tags: ['React', 'JavaScript', 'Web Development'],
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop'
  },
  {
    id: '2',
    title: 'The Future of Web Development',
    content: 'Web development is constantly evolving, with new technologies and frameworks emerging regularly. This post explores upcoming trends including WebAssembly, edge computing, and the rise of serverless architectures. We\'ll also discuss how these technologies will impact developer workflows and user experiences in the coming years.',
    author: 'Bob Smith',
    createdAt: '2024-01-10T14:20:00Z',
    tags: ['Web Development', 'Technology', 'Future'],
    imageUrl: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=400&fit=crop'
  },
  {
    id: '3',
    title: 'Building Scalable APIs with Node.js',
    content: 'Creating robust and scalable APIs is crucial for modern applications. This article dives deep into Node.js best practices, including proper error handling, database optimization, caching strategies, and API versioning. We\'ll also cover security considerations and performance monitoring techniques that every backend developer should know.',
    author: 'Carol Davis',
    createdAt: '2024-01-08T09:15:00Z',
    tags: ['Node.js', 'API', 'Backend'],
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop'
  },
  {
    id: '4',
    title: 'CSS Grid vs Flexbox: When to Use What',
    content: 'Both CSS Grid and Flexbox are powerful layout systems, but knowing when to use each can be challenging. This guide provides clear examples and use cases for both technologies. We\'ll build real-world layouts and discuss the strengths and limitations of each approach, helping you make informed decisions in your projects.',
    author: 'David Wilson',
    createdAt: '2024-01-05T16:45:00Z',
    tags: ['CSS', 'Layout', 'Design'],
    imageUrl: 'https://images.unsplash.com/photo-1609619385005-bf44040c8d82?w=800&h=400&fit=crop'
  },
  {
    id: '5',
    title: 'Introduction to TypeScript',
    content: 'TypeScript adds static typing to JavaScript, making code more robust and maintainable. This beginner-friendly introduction covers basic types, interfaces, classes, and generics. We\'ll also explore how TypeScript integrates with popular frameworks like React and Angular, and discuss the benefits it brings to large-scale applications.',
    author: 'Eva Brown',
    createdAt: '2024-01-02T11:30:00Z',
    tags: ['TypeScript', 'JavaScript', 'Programming'],
    imageUrl: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop'
  }
];

// API Routes

// Get all blog posts
app.get('/api/posts', (req, res) => {
  // Sort by creation date (newest first)
  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(sortedPosts);
});

// Get a single blog post by ID
app.get('/api/posts/:id', (req, res) => {
  const post = blogPosts.find(p => p.id === req.params.id);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  res.json(post);
});

// Create a new blog post
app.post('/api/posts', (req, res) => {
  const { title, content, author, tags, imageUrl } = req.body;
  
  if (!title || !content || !author) {
    return res.status(400).json({ error: 'Title, content, and author are required' });
  }
  
  const newPost = {
    id: uuidv4(),
    title,
    content,
    author,
    createdAt: new Date().toISOString(),
    tags: tags || [],
    imageUrl: imageUrl || 'https://images.unsplash.com/photo-1486312338219-ce68e2c6b725?w=800&h=400&fit=crop'
  };
  
  blogPosts.push(newPost);
  res.status(201).json(newPost);
});

// Update a blog post
app.put('/api/posts/:id', (req, res) => {
  const postIndex = blogPosts.findIndex(p => p.id === req.params.id);
  if (postIndex === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }
  
  const { title, content, author, tags, imageUrl } = req.body;
  blogPosts[postIndex] = {
    ...blogPosts[postIndex],
    title: title || blogPosts[postIndex].title,
    content: content || blogPosts[postIndex].content,
    author: author || blogPosts[postIndex].author,
    tags: tags || blogPosts[postIndex].tags,
    imageUrl: imageUrl || blogPosts[postIndex].imageUrl,
    updatedAt: new Date().toISOString()
  };
  
  res.json(blogPosts[postIndex]);
});

// Delete a blog post
app.delete('/api/posts/:id', (req, res) => {
  const postIndex = blogPosts.findIndex(p => p.id === req.params.id);
  if (postIndex === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }
  
  blogPosts.splice(postIndex, 1);
  res.status(204).send();
});

// Get posts by tag
app.get('/api/posts/tag/:tag', (req, res) => {
  const tag = req.params.tag;
  const filteredPosts = blogPosts.filter(post => 
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
  res.json(filteredPosts);
});

// Search posts
app.get('/api/search', (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }
  
  const searchResults = blogPosts.filter(post =>
    post.title.toLowerCase().includes(query.toLowerCase()) ||
    post.content.toLowerCase().includes(query.toLowerCase()) ||
    post.author.toLowerCase().includes(query.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );
  
  res.json(searchResults);
});

// Serve React app in production
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
