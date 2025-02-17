// app/newslist/page.jsx

import Parser from "rss-parser";
import Header from "./Header";
import Footer from "./Footer";
import Script from "next/script";
import Head from "next/head";
import Image from "next/image";
import "./NewsList.css";

// This page is a server component by default (no "use client" directive)
// and therefore supports async/await.
export const dynamic = "force-dynamic"; // Ensures the page fetches fresh data

// Fetch news on the server
async function getNews() {
  try {
    const parser = new Parser({
      customFields: {
        item: [["media:content", "image", { keepArray: false, attr: "url" }]],
      },
    });

    const feed = await parser.parseURL(
      "https://news.google.com/rss/search?q=tax+finance&hl=en-US&gl=US&ceid=US:en"
    );

    if (!feed || !feed.items) {
      throw new Error("Invalid feed data");
    }

    const seenLinks = new Set();
    const articles = [];

    for (const item of feed.items) {
      const link = item.link;
      if (!seenLinks.has(link)) {
        seenLinks.add(link);
        articles.push({
          title: item.title?.trim(),
          link,
          published: item.pubDate,
          description: item.contentSnippet || "No description available",
          image: item.image || null,
        });
      }
    }
    return articles;
  } catch (error) {
    console.error("Error fetching news:", error);
    // Return an empty array so the page renders gracefully.
    return [];
  }
}

export default async function NewsList() {
  const news = await getNews();

  // Reintroduce the structuredData variable
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    headline: "Latest Tax News & Updates - SmartTaxBot",
    description:
      "Stay updated with the latest tax news, tax-saving tips, and tax regulations. SmartTaxBot brings you the most relevant tax-related articles.",
    publisher: {
      "@type": "Organization",
      name: "SmartTaxBot",
      logo: {
        "@type": "ImageObject",
        url: "https://taxadvisor.live/path/to/logo.jpg", // Replace with your logo URL
      },
    },
  };

  return (
    <>
      {/* Google AdSense Script */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2663142027592405"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      <Head>
        <title>Latest Tax News & Updates - SmartTaxBot</title>
        <meta
          name="description"
          content="Stay updated with the latest tax news, tax-saving tips, and tax regulations. SmartTaxBot brings you the most relevant tax-related articles."
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://taxadvisor.live/newslist" />

        {/* Open Graph Meta Tags */}
        <meta
          property="og:title"
          content="Latest Tax News & Updates - SmartTaxBot"
        />
        <meta
          property="og:description"
          content="Stay updated with the latest tax news, tax-saving tips, and tax regulations. SmartTaxBot brings you the most relevant tax-related articles."
        />
        <meta
          property="og:image"
          content="https://taxadvisor.live/path/to/thumbnail.jpg"
        />
        <meta property="og:url" content="https://taxadvisor.live/newslist" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Latest Tax News & Updates - SmartTaxBot"
        />
        <meta
          name="twitter:description"
          content="Stay updated with the latest tax news, tax-saving tips, and tax regulations."
        />
        <meta
          name="twitter:image"
          content="https://taxadvisor.live/path/to/thumbnail.jpg"
        />

        {/* JSON‑LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </Head>

      {/* Place Header inside the returned JSX */}
      <Header />

      <div className="container py-4">
        <h1 className="mb-4 text-center">
          Latest Tax News & Updates - SmartTaxBot
        </h1>
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
                      <div className="card-img-wrapper">
                        <Image
                          src={article.image}
                          alt={article.title}
                          width={400} // Adjust as needed
                          height={200} // Adjust as needed
                          style={{ objectFit: "cover" }}
                        />
                      </div>
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
      </div>

      <Footer />
    </>
  );
}
