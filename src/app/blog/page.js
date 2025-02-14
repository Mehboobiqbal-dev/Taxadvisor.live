import path from 'path';
import fs from 'fs/promises';
import matter from 'gray-matter';
import BlogSearch from './BlogSearch';
import Header from '../Header';
import Footer from '../Footer';
import Script from 'next/script';
import Head from 'next/head';

// Function to fetch blog posts
async function getBlogPosts() {
  const contentDir = path.join(process.cwd(), 'content');
  const files = await fs.readdir(contentDir);

  const posts = await Promise.all(
    files.map(async (filename) => {
      const filePath = path.join(contentDir, filename);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const { data } = matter(fileContent);

      return { frontMatter: data, slug: filename.replace(/\.mdx?$/, '') };
    })
  );

  return posts;
}

// Structured Data for the Website (Search Action)
const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://www.taxadvisor.live",
  "name": "TaxAdvisor",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.taxadvisor.live/blog?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

// Breadcrumb Structured Data
const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.taxadvisor.live"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Tax Blog",
      "item": "https://www.taxadvisor.live/blog"
    }
  ]
};

export default async function BlogListPage() {
  const blogs = await getBlogPosts();

  return (
    <>
      <Head>
        <title>Tax Blog | TaxAdvisor</title>
        <meta
          name="description"
          content="Stay updated with the latest tax news, tips, and blog posts on TaxAdvisor. Learn about tax regulations, tax-saving strategies, and more."
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://www.taxadvisor.live/blog" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Tax Blog | TaxAdvisor" />
        <meta
          property="og:description"
          content="Stay updated with the latest tax news, tips, and blog posts on TaxAdvisor. Learn about tax regulations, tax-saving strategies, and more."
        />
        <meta property="og:url" content="https://www.taxadvisor.live/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="TaxAdvisor" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content="https://www.taxadvisor.live/og-image.jpg" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tax Blog | TaxAdvisor" />
        <meta
          name="twitter:description"
          content="Stay updated with the latest tax news, tips, and blog posts on TaxAdvisor. Learn about tax regulations, tax-saving strategies, and more."
        />
        <meta name="twitter:image" content="https://www.taxadvisor.live/twitter-image.jpg" />
        <meta name="twitter:site" content="@TaxAdvisor" />
        <meta name="twitter:creator" content="@TaxAdvisor" />

        {/* JSON‑LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Google AdSense */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2663142027592405"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      <Header />
      <main className="max-w-3xl mx-auto p-6 bg-gray-50 shadow-md rounded-lg">
        <h1 className="text-4xl font-extrabold mb-6 text-blue-800">Tax Blog</h1>
        <BlogSearch blogs={blogs} />
      </main>
      <Footer />
    </>
  );
}
