import './ArticleDetails.css'
import { useState } from 'react'
import { summariseTextWithGemini, saveArticle } from '../utils/api'

function ArticleDetails({ article, onClose }) {
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const userId = 'demo-user-id' // TODO: Replace with real user ID from auth

  const handleSummarise = async () => {
    setLoading(true)
    setError(null)
    setSummary('')
    try {
      const text = article.content || article.description || article.title
      const prompt = `Summarize the following article in 3 bullet points:\n${text}`
      const result = await summariseTextWithGemini(prompt)
      setSummary(result)
    } catch (err) {
      setError('Failed to summarise')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      await saveArticle(userId, { ...article, summary })
      alert('Article saved!')
    } catch (err) {
      alert('Failed to save article')
    }
  }

  return (
    <div className="article-details__overlay">
      <div className="article-details">
        <button className="article-details__close" onClick={onClose}>&times;</button>
        {article.urlToImage && <img src={article.urlToImage} alt={article.title} className="article-details__img" />}
        <h2>{article.title}</h2>
        <p className="article-details__meta">
          <span>{article.source?.name}</span> | <span>{article.author || 'Unknown Author'}</span> | <span>{new Date(article.publishedAt).toLocaleString()}</span>
        </p>
        <p>{article.description}</p>
        <div className="article-details__actions">
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="article-details__read">Read Full Article</a>
          <button className="article-details__summarise" onClick={handleSummarise} disabled={loading}>
            {loading ? 'Summarising...' : 'Summarise'}
          </button>
          <button className="article-details__save" onClick={handleSave} style={{ marginLeft: 8 }}>Save Article</button>
        </div>
        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
        {summary && (
          <div className="article-details__summary">
            <h4>Summary</h4>
            {summary.includes('\n') ? (
              <ul>
                {summary.split('\n').filter(line => line.trim()).map((line, idx) => (
                  <li key={idx}>{line.replace(/^[-•\d.\s]+/, '')}</li>
                ))}
              </ul>
            ) : (
              <p>{summary}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ArticleDetails
