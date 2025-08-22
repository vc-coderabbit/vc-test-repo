import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useSearch } from '../hooks/usePosts';
import BlogCard from '../components/BlogCard';
import './SearchResults.css';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { results, loading, error } = useSearch(query);

  const highlightText = (text, query) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query.trim()})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="search-highlight">{part}</span>
      ) : (
        part
      )
    );
  };

  if (!query.trim()) {
    return (
      <div className="search-results fade-in">
        <div className="container">
          <div className="search-header">
            <h1>Search Posts</h1>
            <p>Enter a search term to find relevant posts</p>
          </div>
          
          <div className="search-empty">
            <i className="fas fa-search fa-3x"></i>
            <h3>Start your search</h3>
            <p>Use the search bar above to find posts by title, content, author, or tags.</p>
            <Link to="/" className="btn btn-primary">
              Browse All Posts
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="search-results fade-in">
      <div className="container">
        <div className="search-header">
          <h1>Search Results</h1>
          <p>
            {loading ? (
              'Searching...'
            ) : error ? (
              `Error: ${error}`
            ) : (
              <>
                Found {results.length} result{results.length !== 1 ? 's' : ''} for "{highlightText(query, '')}"
              </>
            )}
          </p>
        </div>

        {error && (
          <div className="error-message">
            <i className="fas fa-exclamation-triangle"></i>
            {error}
            <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Back to Home
            </Link>
          </div>
        )}

        {loading ? (
          <div className="search-loading">
            <div className="loading"></div>
            <p>Searching through posts...</p>
          </div>
        ) : (
          <>
            {results.length > 0 ? (
              <>
                <div className="search-stats">
                  <div className="results-count">
                    <strong>{results.length}</strong> posts found
                  </div>
                  <div className="search-filters">
                    <select className="filter-select">
                      <option value="relevance">Sort by Relevance</option>
                      <option value="date">Sort by Date</option>
                      <option value="author">Sort by Author</option>
                    </select>
                  </div>
                </div>

                <div className="search-results-grid">
                  {results.map((post, index) => (
                    <div key={post.id} className="search-result-item">
                      <BlogCard 
                        post={{
                          ...post,
                          title: highlightText(post.title, query),
                          content: highlightText(post.content, query),
                          author: highlightText(post.author, query)
                        }}
                        animationDelay={index * 0.1}
                      />
                    </div>
                  ))}
                </div>

                <div className="search-suggestions">
                  <h3>Related Searches</h3>
                  <div className="suggestion-tags">
                    {/* Extract unique tags from results */}
                    {Array.from(
                      new Set(
                        results.flatMap(post => post.tags || [])
                      )
                    ).slice(0, 8).map(tag => (
                      <Link 
                        key={tag}
                        to={`/search?q=${encodeURIComponent(tag)}`}
                        className="suggestion-tag"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="no-results">
                <i className="fas fa-search-minus fa-3x"></i>
                <h3>No posts found</h3>
                <p>
                  We couldn't find any posts matching "{highlightText(query, '')}"
                </p>
                
                <div className="search-tips">
                  <h4>Search Tips:</h4>
                  <ul>
                    <li>Try using different keywords</li>
                    <li>Check your spelling</li>
                    <li>Use more general terms</li>
                    <li>Try searching by author name or tags</li>
                  </ul>
                </div>

                <div className="no-results-actions">
                  <Link to="/" className="btn btn-primary">
                    Browse All Posts
                  </Link>
                  <Link to="/create" className="btn btn-outline">
                    Write a Post
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
