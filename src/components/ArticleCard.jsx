import './ArticleCard.css'

function ArticleCard({ article, onClick }) {
  return (
    <div className="article-card" onClick={onClick} tabIndex={0}>
      {article.urlToImage ? (
        <img src={article.urlToImage} alt={article.title} className="article-card__img" />
      ) : (
        <div className="article-card__img article-card__img--placeholder">
          <span className="article-card__no-image-text">No Image</span>
        </div>
      )}
      <div className="article-card__info">
        <h3>{article.title}</h3>
        <p className="article-card__source">{article.source?.name}</p>
      </div>
    </div>
  )
}

export default ArticleCard
