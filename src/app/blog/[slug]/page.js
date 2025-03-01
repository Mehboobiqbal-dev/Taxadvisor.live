

import path from 'path';
import { promises as fs } from 'fs';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Script from 'next/script';
import SEO from '@/app/components/SEO';
import Header from '@/app/Header';
import Footer from '@/app/Footer';
import Link from 'next/link';
import './blog.css';


function calculateReadingTime(text) {
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / 200);
}

async function getBlogContent(slug) {
  const normalizedSlug = slug.replace(/\.md$/, '');
  const filePath = path.join(process.cwd(), 'content', `${normalizedSlug}.md`);
  let fileContent;

  try {
    fileContent = await fs.readFile(filePath, 'utf-8');
  } catch (error) {
    throw new Error(`Blog post not found: ${filePath}`);
  }

  const { data, content } = matter(fileContent);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();
  const readingTime = calculateReadingTime(content);

  return { frontMatter: data, content: contentHtml, readingTime };
}


export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'content');
  const files = await fs.readdir(contentDir);
  return files.map((filename) => ({
    slug: filename.replace(/\.md$/, ''),
  }));
}

export default async function BlogPost({ params }) {
  const { slug } = params;
  const { frontMatter, content, readingTime } = await getBlogContent(slug);

  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2663142027592405"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      <SEO
        title={`${frontMatter.title} | TaxAdvisor Blog`}
        description={frontMatter.excerpt || frontMatter.title}
        canonical={`https://taxadvisor.live/blog/${slug}`}
        openGraph={{
          title: frontMatter.title,
          description: frontMatter.excerpt || frontMatter.title,
          url: `https://taxadvisor.live/blog/${slug}`,
          type: 'article',
          image: frontMatter.image || '/default-image.jpg',
          locale: 'en_US',
          site_name: 'TaxAdvisor',
        }}
        twitter={{
          card: 'summary_large_image',
          title: frontMatter.title,
          description: frontMatter.excerpt || frontMatter.title,
          image: frontMatter.image || '/default-image.jpg',
          site: '@TaxAdvisor',
          creator: '@TaxAdvisor',
        }}
      />

      <Header />
      <article className="blog-post">
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

        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <footer className="blog-footer">
          <Link href="/blog" className="back-to-blog">
            ← Back to Blog
          </Link>
        </footer>
      </article>
      <Footer />
    </>
  );
}
