import path from 'path';
import fs from 'fs/promises';
import matter from 'gray-matter';
import BlogSearch from './BlogSearch';
import Header from '../Header';
import Footer from '../Footer';
import Script from 'next/script'; // ✅ Import Next.js Script component
import Head from 'next/head'; // Added Head for SEO metadata

// Function to fetch blog posts
async function getBlogPosts() {
  const contentDir = path.join(process.cwd(), 'content'); // Absolute path
  const files = await fs.readdir(contentDir); // Read files asynchronously

  const posts = await Promise.all(
    files.map(async (filename) => {
      const filePath = path.join(contentDir, filename);
      const fileContent = await fs.readFile(filePath, 'utf-8'); // Read file content
      const { data } = matter(fileContent); // Extract frontmatter

      return { frontMatter: data, slug: filename.replace(/\.mdx?$/, '') };
    })
  );

  return posts;
}

// This is how you fetch data inside the App Directory component
export default async function BlogListPage() {
  // Fetch blog posts here
  const blogs = await getBlogPosts();

  return (
    <>
      {/* SEO Meta Tags */}
      <Head>
        <title>Tax Blog | TaxAdvisor</title> {/* Page Title */}
        <meta name="description" content="Stay updated with the latest tax news, tips, and blog posts on TaxAdvisor. Learn about tax regulations, tax-saving strategies, and more." />
        <meta name="robots" content="index, follow" /> {/* Instruct search engines to index the page */}
        <meta name="viewport" content="width=device-width, initial-scale=1" /> {/* Ensure responsive design */}
        <link rel="canonical" href="https://www.taxadvisor.live/blog" /> {/* Canonical URL for SEO */}
      </Head>

      {/* ✅ Corrected placement for Google AdSense */}
      <Script 
        async 
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2663142027592405"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      <Header /> {/* Added Header component */}
      <div className="max-w-3xl mx-auto p-6 bg-gray-50 shadow-md rounded-lg">
        <h1 className="text-4xl font-extrabold mb-6 text-blue-800">Tax Blog</h1>
        
        {/* Blog Search with SEO-optimized content */}
        <BlogSearch blogs={blogs} />
      </div>
      <Footer /> {/* Added Footer component */}
    </>
  );
}
