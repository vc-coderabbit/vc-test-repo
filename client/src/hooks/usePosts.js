import { useState, useEffect } from 'react';
import { blogAPI } from '../services/api';

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await blogAPI.getAllPosts();
      setPosts(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch posts');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const refetch = () => {
    fetchPosts();
  };

  return { posts, loading, error, refetch };
};

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
