import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import MySummaries from './pages/MySummaries'
import './App.css'
import { useState } from 'react'

function App() {
  const [search, setSearch] = useState('')
  return (
    <div className="app-container">
      <Navbar search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home search={search} />} />
        <Route path="/summaries" element={<MySummaries />} />
      </Routes>
    </div>
  )
}

export default App
