import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { usePosts } from '../hooks/usePosts'
import BlogCard from '../components/BlogCard'
import Hero from '../components/Hero'
import './Home.css'

const Home = () => {
  const { posts, loading, error } = usePosts()
  
  // REACT ANTI-PATTERN: Unnecessary state that causes re-renders
  const [renderCount, setRenderCount] = useState(0)
  const [randomValue, setRandomValue] = useState(Math.random())
  
  // PERFORMANCE ISSUE: Running on every render
  const expensiveCalculation = () => {
    let result = 0
    for (let i = 0; i < 100000; i++) {
      result += Math.random()
    }
    return result
  }
  
  const calculatedValue = expensiveCalculation() // Should be memoized
  
  // REACT ANTI-PATTERN: useEffect without dependencies causing infinite loop
  useEffect(() => {
    setRenderCount(renderCount + 1)
    setRandomValue(Math.random())
  })
  
  // PERFORMANCE ISSUE: Creating new functions on every render
  const handleClick = () => {
    console.log("Clicked")
  }
  
  // BAD PRACTICE: Accessing DOM directly
  const homeElement = document.querySelector('.home')
  if (homeElement) {
    homeElement.style.backgroundColor = randomValue > 0.5 ? 'red' : 'blue'
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-message">
          <i className="fas fa-exclamation-triangle"></i>
          {error}
        </div>
      </div>
    )
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
