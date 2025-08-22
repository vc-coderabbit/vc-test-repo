import React from 'react';
import { Link } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';
import BlogCard from '../components/BlogCard';
import Hero from '../components/Hero';
import './Home.css';

const Home = () => {
  const { posts, loading, error } = usePosts();

  if (error) {
    return (
      <div className="container">
        <div className="error-message">
          <i className="fas fa-exclamation-triangle"></i>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <Hero />
      
      <section className="featured-posts">
        <div className="container">
          <div className="section-header">
            <h2>Latest Posts</h2>
            <p>Discover our latest insights and stories</p>
          </div>
          
          {loading ? (
            <div className="posts-loading">
              <div className="loading"></div>
              <p>Loading amazing posts...</p>
            </div>
          ) : (
            <>
              <div className="posts-grid">
                {posts.map((post, index) => (
                  <BlogCard 
                    key={post.id} 
                    post={post} 
                    featured={index === 0}
                    animationDelay={index * 0.1}
                  />
                ))}
              </div>
              
              {posts.length === 0 && (
                <div className="no-posts">
                  <i className="fas fa-blog fa-3x"></i>
                  <h3>No posts yet</h3>
                  <p>Be the first to share your story!</p>
                  <Link to="/create" className="btn btn-primary">
                    Write First Post
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      
      <section className="call-to-action">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to share your story?</h2>
            <p>Join our community and start writing amazing content today.</p>
            <Link to="/create" className="btn btn-primary btn-large">
              <i className="fas fa-pen-nib"></i>
              Start Writing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
