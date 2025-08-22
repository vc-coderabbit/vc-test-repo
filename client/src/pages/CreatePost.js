import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogAPI } from '../services/api';
import './CreatePost.css';

const CreatePost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    tags: '',
    imageUrl: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Process tags - split by comma and clean up
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const postData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        author: formData.author.trim(),
        tags: tagsArray,
        imageUrl: formData.imageUrl.trim() || undefined
      };

      const response = await blogAPI.createPost(postData);
      navigate(`/post/${response.data.id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create post. Please try again.');
      console.error('Error creating post:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.title.trim() && formData.content.trim() && formData.author.trim();

  return (
    <div className="create-post fade-in">
      <div className="container">
        <div className="create-post-header">
          <h1>Create New Post</h1>
          <p>Share your thoughts and stories with the world</p>
        </div>

        {error && (
          <div className="error-message">
            <i className="fas fa-exclamation-triangle"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="create-post-form">
          <div className="form-grid">
            <div className="form-main">
              <div className="form-group">
                <label htmlFor="title" className="form-label">
                  Post Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter an engaging title for your post"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="content" className="form-label">
                  Content *
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="Write your amazing content here..."
                  rows="12"
                  required
                />
                <div className="character-count">
                  {formData.content.length} characters
                </div>
              </div>
            </div>

            <div className="form-sidebar">
              <div className="sidebar-section">
                <h3>Post Details</h3>
                
                <div className="form-group">
                  <label htmlFor="author" className="form-label">
                    Author Name *
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="tags" className="form-label">
                    Tags
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="React, JavaScript, Web Development"
                  />
                  <div className="form-help">
                    Separate tags with commas
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="imageUrl" className="form-label">
                    Cover Image URL
                  </label>
                  <input
                    type="url"
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="https://example.com/image.jpg"
                  />
                  <div className="form-help">
                    Optional: Add a cover image for your post
                  </div>
                </div>
              </div>

              <div className="sidebar-section">
                <h3>Preview Tags</h3>
                <div className="tags-preview">
                  {formData.tags.split(',').map((tag, index) => {
                    const trimmedTag = tag.trim();
                    return trimmedTag ? (
                      <span key={index} className="tag">
                        {trimmedTag}
                      </span>
                    ) : null;
                  })}
                  {!formData.tags.trim() && (
                    <span className="no-tags">No tags added yet</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="btn btn-secondary"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Publishing...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane"></i>
                  Publish Post
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
