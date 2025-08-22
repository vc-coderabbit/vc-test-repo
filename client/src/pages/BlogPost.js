import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { usePost } from '../hooks/usePosts';
import { blogAPI } from '../services/api';
import './BlogPost.css';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { post, loading, error } = usePost(id);
  const [isDeleting, setIsDeleting] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);
    try {
      await blogAPI.deletePost(id);
      navigate('/', { replace: true });
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Failed to delete post. Please try again.');
      setIsDeleting(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.content.substring(0, 100) + '...',
          url: window.location.href
        });
      } catch (err) {
        // User cancelled sharing
      }
    } else {
      // Fallback to copying URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Post URL copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="blog-post-loading">
          <div className="loading"></div>
          <p>Loading post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container">
        <div className="error-message">
          <i className="fas fa-exclamation-triangle"></i>
          {error || 'Post not found'}
          <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="blog-post fade-in">
      <div className="blog-post-hero">
        <img 
          src={post.imageUrl || 'https://images.unsplash.com/photo-1486312338219-ce68e2c6b725?w=1200&h=600&fit=crop'} 
          alt={post.title}
          className="blog-post-image"
        />
        <div className="blog-post-hero-overlay">
          <div className="container">
            <div className="blog-post-hero-content">
              <Link to="/" className="back-link">
                <i className="fas fa-arrow-left"></i>
                Back to Posts
              </Link>
              
              <h1 className="blog-post-title">{post.title}</h1>
              
              <div className="blog-post-meta">
                <div className="meta-item">
                  <i className="fas fa-user"></i>
                  <span>By {post.author}</span>
                </div>
                <div className="meta-item">
                  <i className="fas fa-calendar"></i>
                  <span>{formatDate(post.createdAt)}</span>
                </div>
                {post.updatedAt && (
                  <div className="meta-item">
                    <i className="fas fa-edit"></i>
                    <span>Updated {formatDate(post.updatedAt)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="blog-post-content-wrapper">
          <div className="blog-post-content">
            <div className="blog-post-actions-top">
              <div className="social-actions">
                <button className="action-btn" title="Like this post">
                  <i className="far fa-heart"></i>
                  <span>24</span>
                </button>
                <button className="action-btn" onClick={handleShare} title="Share this post">
                  <i className="fas fa-share-alt"></i>
                  <span>Share</span>
                </button>
                <button className="action-btn" title="Bookmark this post">
                  <i className="far fa-bookmark"></i>
                </button>
              </div>
              
              <div className="admin-actions">
                <button className="action-btn edit-btn" title="Edit post">
                  <i className="fas fa-edit"></i>
                </button>
                <button 
                  className="action-btn delete-btn" 
                  onClick={handleDelete}
                  disabled={isDeleting}
                  title="Delete post"
                >
                  <i className={isDeleting ? "fas fa-spinner fa-spin" : "fas fa-trash"}></i>
                </button>
              </div>
            </div>

            <div className="blog-post-text">
              {post.content.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="blog-post-tags">
                <h4>Tags</h4>
                <div className="tags">
                  {post.tags.map((tag, index) => (
                    <Link 
                      key={index} 
                      to={`/search?q=${encodeURIComponent(tag)}`} 
                      className="tag"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="blog-post-sidebar">
            <div className="sidebar-widget">
              <h4>About the Author</h4>
              <div className="author-info">
                <div className="author-avatar">
                  <i className="fas fa-user-circle"></i>
                </div>
                <div className="author-details">
                  <h5>{post.author}</h5>
                  <p>A passionate writer sharing insights and experiences through engaging blog posts.</p>
                </div>
              </div>
            </div>

            <div className="sidebar-widget">
              <h4>Quick Actions</h4>
              <div className="quick-actions">
                <Link to="/create" className="btn btn-primary btn-block">
                  <i className="fas fa-pen-nib"></i>
                  Write a Post
                </Link>
                <Link to="/" className="btn btn-outline btn-block">
                  <i className="fas fa-list"></i>
                  Browse All Posts
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
