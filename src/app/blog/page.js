import { db } from '../lib/firebase';
import BlogSearch from './BlogSearch';
import Header from '../Header';
import Footer from '../Footer';
import Script from 'next/script';
import SEO from '@/app/components/SEO';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';

async function getBlogPosts() {
  const blogsCollection = db.collection('blogs');
  const snapshot = await blogsCollection.orderBy('createdAt', 'desc').get();

  if (snapshot.empty) {
    return [];
  }

  const posts = snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      frontMatter: {
        title: data.title,
        date: data.createdAt.toDate().toISOString(),
        // Add other front matter fields if necessary
      },
      slug: doc.id,
      content: data.content,
    };
  });

  return posts;
}

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

      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2663142027592405"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      <Header />
      <main className="bg-muted/40 py-20">
        <div className="container">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center text-4xl font-bold">Tax Blog</CardTitle>
            </CardHeader>
            <CardContent>
              <BlogSearch blogs={blogs} />
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
