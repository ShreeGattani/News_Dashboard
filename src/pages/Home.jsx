import { useState, useEffect } from 'react'
import CategoryTabs from '../components/CategoryTabs'
import ArticleCard from '../components/ArticleCard'
import { fetchArticlesByCategory } from '../utils/api'
import ArticleDetails from '../components/ArticleDetails'

function Home({ search }) {
  const [category, setCategory] = useState('business')
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedArticle, setSelectedArticle] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetchArticlesByCategory(category)
      .then(setArticles)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [category])

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedArticle]);

  const filteredArticles = articles.filter(article => {
    const term = search?.toLowerCase() || '';
    return (
      article.title?.toLowerCase().includes(term) ||
      article.source?.name?.toLowerCase().includes(term)
    );
  });

  return (
    <div style={{ marginTop: '80px', padding: '2rem' }}>
      <CategoryTabs selected={category} onCategoryChange={setCategory} />
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <p>Loading articles...</p>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginTop: '1rem', maxHeight: '70vh', overflowY: 'auto', justifyContent: 'center' }}>
        {filteredArticles.map((article, idx) => (
          <ArticleCard key={idx} article={article} onClick={() => setSelectedArticle(article)} />
        ))}
      </div>
      {selectedArticle && (
        <ArticleDetails article={selectedArticle} onClose={() => setSelectedArticle(null)} />
      )}
    </div>
  )
}

export default Home
