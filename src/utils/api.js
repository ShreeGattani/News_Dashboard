const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY

export async function fetchArticlesByCategory(category) {
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${NEWS_API_KEY}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch articles')
  const data = await res.json()
  return data.articles
}

export async function summariseTextWithGemini(text) {
  const apiKey = GEMINI_API_KEY;
  if (!apiKey) throw new Error('Missing Gemini API key');

  const response = await fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Summarize the following news content in 3 concise bullet points:\n${text}` }] }]
      })
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Gemini API error:', errorText);
    throw new Error('Failed to summarize with Gemini');
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No summary generated.';
}
const userId = '665f1a2b3c4d5e6f7a8b9c0d'; // Example ObjectId

export async function getSavedArticles(userId) {
  const res = await fetch(`/api/saved-articles/${userId}`)
  if (!res.ok) throw new Error('Failed to fetch saved articles')
  return res.json()
}

export async function saveArticle(userId, article) {
  const res = await fetch(`/api/saved-articles/${userId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(article)
  })
  if (!res.ok) throw new Error('Failed to save article')
  return res.json()
}

export async function deleteSavedArticle(userId, articleId) {
  const res = await fetch(`/api/saved-articles/${userId}/${articleId}`, {
    method: 'DELETE'
  })
  if (!res.ok) throw new Error('Failed to delete article')
  return res.json()
}
