import { db } from '../../lib/firebase';
import { remark } from 'remark';
import html from 'remark-html';
import Script from 'next/script';
import SEO from '@/app/components/SEO';
import Header from '@/app/Header';
import Footer from '@/app/Footer';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';

function calculateReadingTime(text) {
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / 200);
}

async function getBlogContent(slug) {
  const blogRef = db.collection('blogs').doc(slug);
  const docSnap = await blogRef.get();

  if (!docSnap.exists) {
    throw new Error(`Blog post not found: ${slug}`);
  }

  const data = docSnap.data();
  const processedContent = await remark().use(html).process(data.content);
  const contentHtml = processedContent.toString();
  const readingTime = calculateReadingTime(data.content);

  return {
    frontMatter: {
      title: data.title,
      date: data.createdAt.toDate().toISOString(),
      // Add other front matter fields if necessary
    },
    content: contentHtml,
    readingTime,
  };
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
      <main className="bg-muted/40 py-20">
        <div className="container">
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl font-bold">{frontMatter.title}</CardTitle>
              <div className="flex justify-center items-center gap-4 mt-4 text-sm text-muted-foreground">
                <Badge variant="secondary">{frontMatter.date}</Badge>
                {readingTime && (
                  <Badge variant="outline">{readingTime} min read</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: content }}
              />
              <div className="mt-8 text-center">
                <Button asChild>
                  <Link href="/blog">← Back to Blog</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
