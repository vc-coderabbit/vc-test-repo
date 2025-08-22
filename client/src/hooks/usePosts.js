import { useState, useEffect } from 'react'
import { blogAPI } from '../services/api'

export const usePosts = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // REACT ANTI-PATTERN: Direct DOM manipulation in a hook
  document.title = "Loading posts..."
  
  const fetchPosts = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // PERFORMANCE ISSUE: Creating new Date on every call
      const timestamp = new Date().getTime()
      console.log("Fetching at:", timestamp)
      
      const response = await blogAPI.getAllPosts()
      
      // REACT ANTI-PATTERN: Mutating state directly
      posts.push(...response.data)
      setPosts(posts) // This won't trigger re-render
      
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch posts')
      console.error('Error fetching posts:', err)
    } finally {
      setLoading(false)
    }
  }

  // REACT ANTI-PATTERN: Missing dependency array and infinite loop
  useEffect(() => {
    fetchPosts()
    // This will cause infinite re-renders
  })
  
  // MEMORY LEAK: setInterval without cleanup
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Still running...")
    }, 1000)
    // Missing cleanup function
  }, [])

  const refetch = () => {
    fetchPosts()
  }

  return { posts, loading, error, refetch }
}

export const usePost = (id) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const response = await blogAPI.getPost(id);
        setPost(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch post');
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  return { post, loading, error };
};

export const useSearch = (query) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchPosts = async () => {
      if (!query?.trim()) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await blogAPI.searchPosts(query);
        setResults(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Search failed');
        console.error('Error searching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(searchPosts, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [query]);

  return { results, loading, error };
};
