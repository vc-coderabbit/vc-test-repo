import React, { useState, useEffect } from 'react'

// ANTI-PATTERN: Component name doesn't match filename convention
const terribleComponent = () => {
  const [count, setCount] = useState(0)
  const [data, setData] = useState([])
  
  // PERFORMANCE ISSUE: Object created on every render
  const style = {
    color: 'red',
    fontSize: Math.random() * 20 + 'px' // Random size on every render
  }
  
  // REACT ANTI-PATTERN: Calling hooks conditionally
  if (count > 5) {
    const [specialState, setSpecialState] = useState(false)
  }
  
  // MEMORY LEAK: Event listener without cleanup
  useEffect(() => {
    const handleScroll = () => {
      console.log('Scrolling...')
    }
    
    window.addEventListener('scroll', handleScroll)
    // Missing cleanup!
  }, [])
  
  // ANTI-PATTERN: Using array index as key and direct mutation
  const addItem = () => {
    data.push({ id: Math.random(), value: 'New item' }) // Direct mutation
    setData(data) // Won't trigger re-render
  }
  
  // PERFORMANCE ISSUE: Inline function in JSX
  const handleClick = () => {
    // LOGIC ERROR: Potential infinite loop
    while (count < 10) {
      setCount(count + 1) // This will use stale closure
    }
  }
  
  // SECURITY ISSUE: Dangerous innerHTML usage
  const unsafeHTML = "<script>alert('XSS')</script><p>Content</p>"
  
  // BAD PRACTICE: Try-catch without proper error handling
  try {
    const result = JSON.parse('invalid json')
  } catch (e) {
    // Silently ignore error
  }
  
  return (
    <div>
      {/* PERFORMANCE ISSUE: Inline styles */}
      <h1 style={{ color: 'blue', fontSize: Math.random() * 30 + 'px' }}>
        Bad Component
      </h1>
      
      {/* SECURITY VULNERABILITY: XSS through dangerouslySetInnerHTML */}
      <div dangerouslySetInnerHTML={{ __html: unsafeHTML }} />
      
      <p>Count: {count}</p>
      
      {/* ANTI-PATTERN: Inline event handler */}
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      
      <button onClick={handleClick}>Bad Increment</button>
      <button onClick={addItem}>Add Item</button>
      
      {/* PERFORMANCE ISSUE: Array index as key */}
      {data.map((item, index) => (
        <div key={index} style={style}>
          {item.value}
        </div>
      ))}
      
      {/* LOGIC ERROR: Potential null reference */}
      <p>{data[0].value}</p>
      
      {/* ACCESSIBILITY ISSUE: Missing alt text and proper labels */}
      <img src="broken-image.jpg" />
      <input type="text" placeholder="Enter text" />
      <button>Submit</button>
    </div>
  )
}

// STYLE ISSUE: Inconsistent export pattern
export default terribleComponent
