import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-overlay"></div>
        <img 
          src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=1200&h=600&fit=crop" 
          alt="Hero background" 
          className="hero-image"
        />
      </div>
      
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title fade-in">
            Welcome to MockBlog
          </h1>
          <p className="hero-subtitle slide-in-up">
            Discover amazing stories, insights, and ideas from our community of writers.
            Share your own experiences and connect with readers from around the world.
          </p>
          
          <div className="hero-actions slide-in-up">
            <Link to="/create" className="btn btn-primary btn-hero">
              <i className="fas fa-pen-nib"></i>
              Start Writing
            </Link>
            <Link to="#featured" className="btn btn-outline btn-hero">
              <i className="fas fa-book-open"></i>
              Explore Posts
            </Link>
          </div>
          
          <div className="hero-stats slide-in-up">
            <div className="stat">
              <span className="stat-number">100+</span>
              <span className="stat-label">Posts</span>
            </div>
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Writers</span>
            </div>
            <div className="stat">
              <span className="stat-number">1K+</span>
              <span className="stat-label">Readers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
