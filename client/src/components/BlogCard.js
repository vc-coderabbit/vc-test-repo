import React from 'react';
import { Link } from 'react-router-dom';
import './BlogCard.css';

const BlogCard = ({ post, featured = false, animationDelay = 0 }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + '...';
  };

  return (
    <article 
      className={`blog-card ${featured ? 'featured' : ''} hover-lift slide-in-up`}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className="blog-card-image">
        <img 
          src={post.imageUrl || 'https://images.unsplash.com/photo-1486312338219-ce68e2c6b725?w=800&h=400&fit=crop'} 
          alt={post.title}
          loading="lazy"
        />
        <div className="blog-card-overlay">
          <Link to={`/post/${post.id}`} className="read-more-overlay">
            <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>
      
      <div className="blog-card-content">
        <div className="blog-card-meta">
          <span className="author">
            <i className="fas fa-user"></i>
            {post.author}
          </span>
          <span className="date">
            <i className="fas fa-calendar"></i>
            {formatDate(post.createdAt)}
          </span>
        </div>
        
        <h3 className="blog-card-title">
          <Link to={`/post/${post.id}`}>
            {post.title}
          </Link>
        </h3>
        
        <p className="blog-card-excerpt">
          {truncateContent(post.content, featured ? 200 : 150)}
        </p>
        
        {post.tags && post.tags.length > 0 && (
          <div className="blog-card-tags">
            {post.tags.slice(0, 3).map((tag, index) => (
              <Link 
                key={index} 
                to={`/search?q=${encodeURIComponent(tag)}`} 
                className="tag"
              >
                {tag}
              </Link>
            ))}
            {post.tags.length > 3 && (
              <span className="tag-more">+{post.tags.length - 3} more</span>
            )}
          </div>
        )}
        
        <div className="blog-card-footer">
          <Link to={`/post/${post.id}`} className="read-more-btn">
            Read More
            <i className="fas fa-arrow-right"></i>
          </Link>
          
          <div className="blog-card-actions">
            <button className="action-btn" title="Like">
              <i className="far fa-heart"></i>
            </button>
            <button className="action-btn" title="Bookmark">
              <i className="far fa-bookmark"></i>
            </button>
            <button className="action-btn" title="Share">
              <i className="fas fa-share-alt"></i>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
