"use client";

import { useEffect, useState } from "react";
import Script from "next/script"; // Import Next.js Script component
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import "./NewsList.css";

function NewsList() {
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
        setNews(data.articles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      {/* Google AdSense Script - Correct Placement */}
      <Script 
        async 
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2663142027592405"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      <Head>
        {/* SEO and Meta Tags */}
        <title>Latest Tax News & Updates - SmartTaxBot</title>
        {/* ... other meta tags ... */}
      </Head>

      <Header />

      <div className="container py-4">
        <h1 className="mb-4 text-center">
          Latest Tax News & Updates - SmartTaxBot
        </h1>

        {loading && <div>Loading latest tax news...</div>}
        {error && <div>Error: {error}</div>}

        {!loading && !error && (
          <>
            {news.length === 0 ? (
              <p className="text-center">
                No tax-related news found. Check back later for updates.
              </p>
            ) : (
              <div className="row">
                {news.map((article) => (
                  <div
                    key={article.link}
                    className="col-md-4 mb-4 animate__animated animate__fadeInUp"
                  >
                    <article className="card h-100 shadow-sm">
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-decoration-none text-dark"
                      >
                        {article.image && (
                          <img
                            src={article.image}
                            alt={article.title}
                            className="card-img-top"
                            style={{
                              objectFit: "cover",
                              maxHeight: "200px",
                            }}
                          />
                        )}
                        <div className="card-body">
                          <h2 className="card-title">{article.title}</h2>
                          <p className="card-text">{article.description}</p>
                          <p className="card-text">
                            <small className="text-muted">
                              {new Date(article.published).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </small>
                          </p>
                        </div>
                      </a>
                    </article>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      
      <Footer />
    </>
  );
}

export default NewsList;
