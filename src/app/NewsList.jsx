"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
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

  // Define structured data for a collection page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "headline": "Latest Tax News & Updates - SmartTaxBot",
    "description": "Stay updated with the latest tax news, tax-saving tips, and tax regulations. SmartTaxBot brings you the most relevant tax-related articles.",
    "publisher": {
      "@type": "Organization",
      "name": "SmartTaxBot",
      "logo": {
        "@type": "ImageObject",
        "url": "https://taxadvisor.live/path/to/logo.jpg" // Replace with your logo URL
      }
    }
    // Optionally, add a mainEntity ItemList if you have server-side article data
  };

  return (
    <>
      {/* Google AdSense */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2663142027592405"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      <Head>
        {/* SEO Meta Tags */}
        <title>Latest Tax News & Updates - SmartTaxBot</title>
        <meta
          name="description"
          content="Stay updated with the latest tax news, tax-saving tips, and tax regulations. SmartTaxBot brings you the most relevant tax-related articles."
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://taxadvisor.live/newslist" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Latest Tax News & Updates - SmartTaxBot" />
        <meta
          property="og:description"
          content="Stay updated with the latest tax news, tax-saving tips, and tax regulations. SmartTaxBot brings you the most relevant tax-related articles."
        />
        <meta property="og:image" content="https://taxadvisor.live/path/to/thumbnail.jpg" />
        <meta property="og:url" content="https://taxadvisor.live/newslist" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Latest Tax News & Updates - SmartTaxBot" />
        <meta
          name="twitter:description"
          content="Stay updated with the latest tax news, tax-saving tips, and tax regulations."
        />
        <meta name="twitter:image" content="https://taxadvisor.live/path/to/thumbnail.jpg" />

        {/* JSON‑LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <Header />

      <div className="container py-4">
        <h1 className="mb-4 text-center">Latest Tax News & Updates - SmartTaxBot</h1>

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
                {news.map((article, index) => (
                  <div
                    key={article.link || index}
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
                              {new Date(article.published).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
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
