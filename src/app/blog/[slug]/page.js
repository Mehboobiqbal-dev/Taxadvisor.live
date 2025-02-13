import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Head from 'next/head';
import './blog.css';

// Utility function: calculate reading time (assuming 200 words per minute)
function calculateReadingTime(text) {
  const wordsPerMinute = 200; // average reading speed
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

async function getBlogContent(slug) {
  // Remove any existing ".md" extension from the slug
  const normalizedSlug = slug.endsWith('.md') ? slug.slice(0, -3) : slug;
  const filePath = path.join(process.cwd(), 'content', `${normalizedSlug}.md`);
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  // Convert Markdown content to HTML
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  // Calculate reading time
  const readingTime = calculateReadingTime(content);

  return { frontMatter: data, content: contentHtml, readingTime };
}

export default async function BlogPost({ params }) {
  const { slug } = params;
  const { frontMatter, content, readingTime } = await getBlogContent(slug);

  return (
    <article className="blog-post">
      <Head>
        <title>{frontMatter.title} | TaxAdvisor Blog</title>
        <meta name="description" content={frontMatter.excerpt || frontMatter.title} />
        {/* Consider adding more meta tags for SEO here */}
      </Head>
      
      {/* Blog Post Header */}
      <header className="blog-post-header">
        <h1>{frontMatter.title}</h1>
        <div className="blog-meta">
          <span className="blog-date">{frontMatter.date}</span>
          {readingTime && (
            <span className="blog-reading-time">{readingTime} min read</span>
          )}
        </div>
        {frontMatter.author && (
          <p className="blog-author">By {frontMatter.author}</p>
        )}
      </header>
      
      {/* Blog Post Content */}
      <div className="blog-content" dangerouslySetInnerHTML={{ __html: content }} />

      {/* Blog Post Footer */}
      <footer className="blog-footer">
        <a href="/blog" className="back-to-blog">← Back to Blog</a>
      </footer>
    </article>
  );
}

