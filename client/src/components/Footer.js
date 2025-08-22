import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>MockBlog</h3>
            <p>A modern blog application for testing CodeRabbit functionality.</p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-link" aria-label="GitHub">
                <i className="fab fa-github"></i>
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/create">Write a Post</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Categories</h4>
            <ul className="footer-links">
              <li><a href="/search?q=React">React</a></li>
              <li><a href="/search?q=JavaScript">JavaScript</a></li>
              <li><a href="/search?q=Node.js">Node.js</a></li>
              <li><a href="/search?q=CSS">CSS</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Newsletter</h4>
            <p>Subscribe to get the latest posts delivered to your inbox.</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-btn">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 MockBlog. All rights reserved. Built for CodeRabbit testing.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
