import React from 'react'
import './CategoryTabs.css'

const categories = [
  { key: 'business', label: 'Business' },
  { key: 'technology', label: 'Technology' },
  { key: 'sports', label: 'Sports' },
  { key: 'health', label: 'Health' },
]

function CategoryTabs({ selected, onCategoryChange }) {
  return (
    <div className="category-tabs">
      {categories.map(cat => (
        <button
          key={cat.key}
          className={selected === cat.key ? 'active' : ''}
          onClick={() => onCategoryChange(cat.key)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}

export default CategoryTabs
