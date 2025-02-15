// app/blog/page.jsx
import path from 'path';
import fs from 'fs/promises';
import matter from 'gray-matter';
import BlogSearch from './BlogSearch';
import Header from '../Header';
import Footer from '../Footer';
import Script from 'next/script';
import SEO from '@/app/components/SEO';

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

// Website and Breadcrumb structured data
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

const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.taxadvisor.live" },
    { "@type": "ListItem", "position": 2, "name": "Tax Blog", "item": "https://www.taxadvisor.live/blog" }
  ]
};

export default async function BlogListPage() {
  const blogs = await getBlogPosts();

  return (
    <>
      <SEO
        title="Tax Blog | TaxAdvisor"
        description="Stay updated with the latest tax news, tips, and blog posts on TaxAdvisor. Learn about tax regulations, tax-saving strategies, and more."
        canonical="https://www.taxadvisor.live/blog"
        openGraph={{
          title: "Tax Blog | TaxAdvisor",
          description: "Stay updated with the latest tax news, tips, and blog posts on TaxAdvisor. Learn about tax regulations, tax-saving strategies, and more.",
          url: "https://www.taxadvisor.live/blog",
          type: "website",
          site_name: "TaxAdvisor",
          locale: "en_US",
          image: "https://www.taxadvisor.live/og-image.jpg",
        }}
        twitter={{
          card: "summary_large_image",
          title: "Tax Blog | TaxAdvisor",
          description: "Stay updated with the latest tax news, tips, and blog posts on TaxAdvisor. Learn about tax regulations, tax-saving strategies, and more.",
          image: "https://www.taxadvisor.live/twitter-image.jpg",
          site: "@TaxAdvisor",
          creator: "@TaxAdvisor",
        }}
        structuredData={[websiteStructuredData, breadcrumbStructuredData]}
      />

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
