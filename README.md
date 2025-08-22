# MockBlog - CodeRabbit Testing Application

A modern, full-stack blog application built with React and Node.js, designed specifically for testing CodeRabbit functionality.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive design with gradient backgrounds and smooth animations
- **Full CRUD Operations**: Create, read, update, and delete blog posts
- **Search Functionality**: Search posts by title, content, author, or tags
- **Tag System**: Organize posts with tags and filter by categories
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **RESTful API**: Well-structured backend with comprehensive endpoints
- **Real-time Feedback**: Loading states, error handling, and user feedback

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **UUID** - Unique identifier generation
- **Nodemon** - Development server with hot reload

### Frontend
- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Modern styling with flexbox and grid
- **Font Awesome** - Icons
- **Google Fonts (Inter)** - Typography

## 📁 Project Structure

```
mock-blog-app/
├── server.js                 # Express server and API routes
├── package.json              # Backend dependencies
├── client/                   # React frontend
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   ├── BlogCard.js
│   │   │   └── Hero.js
│   │   ├── pages/           # Page components
│   │   │   ├── Home.js
│   │   │   ├── BlogPost.js
│   │   │   ├── CreatePost.js
│   │   │   └── SearchResults.js
│   │   ├── hooks/           # Custom React hooks
│   │   │   └── usePosts.js
│   │   ├── services/        # API service layer
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json         # Frontend dependencies
└── README.md
```

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vc-coderabbit/vc-test-repo.git
   cd mock-blog-app
   ```

2. **Install backend dependencies:**
   ```bash
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   npm run install-client
   ```

4. **Start the development servers:**
   
   **Option 1: Start both servers with one command (recommended)**
   ```bash
   npm run dev
   ```
   
   **Option 2: Start servers separately**
   ```bash
   # Terminal 1 - Backend server
   npm run server
   
   # Terminal 2 - Frontend development server
   npm run client
   ```

5. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🔌 API Endpoints

### Blog Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post by ID
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Search & Filter
- `GET /api/search?q={query}` - Search posts
- `GET /api/posts/tag/:tag` - Get posts by tag

### Sample API Usage

**Create a new post:**
```bash
curl -X POST http://localhost:5000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My New Post",
    "content": "This is the content of my post...",
    "author": "John Doe",
    "tags": ["React", "JavaScript"],
    "imageUrl": "https://example.com/image.jpg"
  }'
```

## 🎨 Features for CodeRabbit Testing

This application includes various code patterns and structures that are perfect for testing CodeRabbit:

1. **Component Architecture**: Well-organized React components with proper separation of concerns
2. **Custom Hooks**: Reusable logic with `usePosts`, `usePost`, and `useSearch` hooks
3. **API Integration**: Comprehensive REST API with proper error handling
4. **State Management**: Local state management with useState and useEffect
5. **Routing**: Client-side routing with React Router
6. **CSS Organization**: Modular CSS with component-specific stylesheets
7. **Form Handling**: Complex form with validation and submission
8. **Search Functionality**: Advanced search with highlighting and suggestions
9. **Responsive Design**: Mobile-first responsive layout
10. **Error Handling**: Comprehensive error handling and user feedback

## 🔧 Development Commands

```bash
# Install dependencies
npm install                    # Backend dependencies
npm run install-client        # Frontend dependencies

# Development
npm run dev                    # Start both servers
npm run server                 # Backend only
npm run client                 # Frontend only

# Production
npm run build                  # Build frontend for production
npm start                      # Start production server
```

## 🌟 Sample Data

The application comes pre-loaded with 5 sample blog posts covering various technology topics:

1. "Getting Started with React Hooks"
2. "The Future of Web Development" 
3. "Building Scalable APIs with Node.js"
4. "CSS Grid vs Flexbox: When to Use What"
5. "Introduction to TypeScript"

Each post includes realistic content, tags, and high-quality images from Unsplash.

## 🎯 CodeRabbit Testing Scenarios

This codebase is ideal for testing CodeRabbit's ability to:

- Review React component structure and best practices
- Analyze API endpoint design and implementation
- Evaluate CSS organization and responsive design patterns
- Check error handling and user experience considerations
- Assess code organization and file structure
- Review custom hooks and state management patterns
- Analyze form validation and submission flows
- Evaluate search functionality implementation

## 📝 License

This project is created for testing purposes and is available under the MIT License.

## 🤝 Contributing

This is a testing repository for CodeRabbit. Feel free to create issues, submit pull requests, or suggest improvements to test various CodeRabbit features.
