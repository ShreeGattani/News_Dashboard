import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Navbar.css'

function Navbar({ search, setSearch }) {
  const [theme, setTheme] = useState('light')
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.toggle('dark-theme', theme === 'dark')
  }, [theme])

  const handleSearch = (e) => {
    e.preventDefault()
    // Optionally, you could trigger navigation or other logic here
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <div className="navbar__logo">
          News Dashboard
        </div>
        <div className="navbar__links">
          <Link to="/">Home</Link>
          <Link to="/summaries">My Summaries</Link>
          <button className="navbar__theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? (
              // Moon SVG for dark mode
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>
            ) : (
              // Sun SVG for light mode
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 6.95-1.41-1.41M6.46 6.46 5.05 5.05m12.02 0-1.41 1.41M6.46 17.54l-1.41 1.41"/></svg>
            )}
          </button>
        </div>
      </div>
      <div className="navbar__right">
        <form className="navbar__search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ minWidth: 0, width: '90%', maxWidth: 200 }}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </nav>
  )
}

export default Navbar
