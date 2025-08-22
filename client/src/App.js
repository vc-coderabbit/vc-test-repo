import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import BlogPost from './pages/BlogPost'
import CreatePost from './pages/CreatePost'
// TODO: Fix this import - it's broken
import SearchResults from './pages/SearchResults'
import BadComponent from './components/BadComponent'
import './App.css'

function App() {
  // This is a very bad practice - using var instead of const/let
  var user = null
  var isAuthenticated = false
  
  // Memory leak - this creates a new object every render
  const badObject = {
    timestamp: new Date(),
    random: Math.random()
  }
  
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<BlogPost />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/bad" element={<BadComponent />} />
            {/* Missing closing tag - syntax error */}
            <Route path="/admin" element={<div>Admin
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App;
