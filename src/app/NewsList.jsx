import Parser from "rss-parser";
import Header from "./Header";
import Footer from "./Footer";
import Script from "next/script";
import Head from "next/head";
import { BuyMeCoffee } from './components/BuyMeCoffee';
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";

export const dynamic = "force-dynamic"; 

async function getNews() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/google-news`);
    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

export default async function NewsList() {
  const news = await getNews();

  
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

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </Head>

      <Header />
      <BuyMeCoffee />
      <div className="container py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight">
            Latest Tax News & Updates
          </h1>
          <p className="text-muted-foreground mt-2">
            Your daily source for the latest tax news and regulations.
          </p>
        </div>
        {news.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No tax-related news found. Check back later for updates.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((article, index) => (
              <a
                key={article.link || index}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-dark"
              >
                <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  {article.image && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={article.image}
                        alt={article.title}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{article.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Badge variant="secondary">
                      {new Date(article.published).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </Badge>
                  </CardFooter>
                </Card>
              </a>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
