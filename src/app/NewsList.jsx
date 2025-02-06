"use client";

import { useEffect, useState } from "react";

export function NewsList() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/api/google-news");
        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const data = await response.json();
        console.log("News API Response:", data);

        // Remove duplicate articles based on the link
        const uniqueArticles = [];
        const seenLinks = new Set();
        data.articles.forEach((article) => {
          if (!seenLinks.has(article.link)) {
            seenLinks.add(article.link);
            uniqueArticles.push(article);
          }
        });
        setNews(uniqueArticles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <div>Loading latest tax news...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">Latest Tax News</h2>
      {news.length === 0 ? (
        <p className="text-center">No tax-related news found.</p>
      ) : (
        <div className="row">
          {news.map((article) => (
            <div
              key={article.link}
              className="col-md-4 mb-4 animate__animated animate__fadeInUp"
            >
              <div className="card h-100 shadow-sm">
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none text-dark"
                >
                  <div className="card-body">
                    <h5 className="card-title">{article.title}</h5>
                    <p className="card-text">
                      <small className="text-muted">
                        {new Date(article.published).toLocaleString()}
                      </small>
                    </p>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NewsList;
