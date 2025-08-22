import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const blogAPI = {
  // Get all posts
  getAllPosts: () => api.get('/posts'),
  
  // Get single post by ID
  getPost: (id) => api.get(`/posts/${id}`),
  
  // Create new post
  createPost: (postData) => api.post('/posts', postData),
  
  // Update post
  updatePost: (id, postData) => api.put(`/posts/${id}`, postData),
  
  // Delete post
  deletePost: (id) => api.delete(`/posts/${id}`),
  
  // Get posts by tag
  getPostsByTag: (tag) => api.get(`/posts/tag/${tag}`),
  
  // Search posts
  searchPosts: (query) => api.get(`/search?q=${encodeURIComponent(query)}`),
};

export default api;
