import { useEffect, useState } from 'react'
import { getSavedArticles, deleteSavedArticle } from '../utils/api'
import ArticleCard from '../components/ArticleCard'

const userId = 'demo-user-id' // TODO: Replace with real user ID from auth

function MySummaries() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    getSavedArticles(userId)
      .then(setArticles)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (articleId) => {
    try {
      await deleteSavedArticle(userId, articleId)
      setArticles(articles => articles.filter(a => a._id !== articleId))
    } catch (err) {
      alert('Failed to delete article')
    }
  }

  return (
    <div style={{ marginTop: '80px', padding: '2rem' }}>
      <h2>My Summaries</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && articles.length === 0 && <p>No saved summaries found.</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginTop: '1rem', justifyContent: 'center' }}>
        {articles.map(article => (
          <div key={article._id} style={{ position: 'relative' }}>
            <ArticleCard article={article} onClick={() => {}} />
            <button onClick={() => handleDelete(article._id)} style={{ position: 'absolute', top: 8, right: 8, background: '#ffd700', border: 'none', borderRadius: '50%', width: 28, height: 28, cursor: 'pointer', fontWeight: 'bold' }}>×</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MySummaries
