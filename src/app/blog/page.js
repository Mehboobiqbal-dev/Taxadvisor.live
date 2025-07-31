import React from 'react';
import { motion } from 'framer-motion';
import { db } from '../lib/firebase';
import BlogSearch from './BlogSearch';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Container, Section } from '../components/layout/Container';
import SEOEnhanced from '../components/SEOEnhanced';
import { EnhancedCard, CardContent, CardHeader } from '../components/ui/Card';
import { Calendar, User, Tag, ArrowRight, Search, TrendingUp } from 'lucide-react';
import Button from '../components/ui/Button';
import Script from 'next/script';

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

export async function getStaticProps() {
  const blogs = await getBlogPosts();

  return {
    props: {
      blogs,
    },
    revalidate: 60, // Regenerate page every minute
  };
}

function BlogListPage({ blogs }) {

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const featuredCategories = [
    { name: "Tax Planning", count: 24, color: "bg-primary" },
    { name: "Business Tax", count: 18, color: "bg-secondary" },
    { name: "Personal Tax", count: 31, color: "bg-accent" },
    { name: "Tax News", count: 15, color: "bg-muted" }
  ];

  return (
    <>
      <SEOEnhanced
        title="Tax Blog | Expert Tax Insights & Tips - TaxAdvisor"
        description="Stay updated with the latest tax news, expert insights, and practical tips from TaxAdvisor. Learn about tax regulations, saving strategies, and financial planning."
        keywords="tax blog, tax tips, tax news, tax planning, business tax, personal tax, financial advice"
        url="https://www.taxadvisor.live/blog"
        structuredData={[websiteStructuredData, breadcrumbStructuredData]}
      />

      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2663142027592405"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow">
          {/* Hero Section */}
          <Section padding="xl" className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
            <Container>
              <motion.div 
                initial="hidden" 
                animate="visible" 
                variants={fadeInUp} 
                className="text-center mb-16"
              >
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-6">
                  Tax Blog & Insights
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Stay ahead with expert tax insights, latest regulations, and practical tips 
                  to optimize your tax strategy and financial planning.
                </p>
                <div className="flex items-center justify-center space-x-2 mt-6 text-sm text-muted-foreground">
                  <TrendingUp className="w-4 h-4" />
                  <span>Updated daily with fresh content</span>
                </div>
              </motion.div>
            </Container>
          </Section>

          {/* Search and Categories */}
          <Section padding="lg">
            <Container>
              <div className="max-w-4xl mx-auto">
                {/* Search Bar */}
                <motion.div 
                  initial="hidden" 
                  animate="visible" 
                  variants={fadeInUp}
                  className="mb-12"
                >
                  <EnhancedCard className="p-6">
                    <div className="flex items-center space-x-4">
                      <Search className="w-5 h-5 text-muted-foreground" />
                      <div className="flex-1">
                        <BlogSearch blogs={blogs} />
                      </div>
                    </div>
                  </EnhancedCard>
                </motion.div>

                {/* Categories */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                  className="mb-16"
                >
                  <h2 className="text-2xl font-bold text-center mb-8">Browse by Category</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {featuredCategories.map((category, index) => (
                      <motion.div key={index} variants={fadeInUp}>
                        <EnhancedCard className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                          <CardContent className="p-4">
                            <div className={`w-12 h-12 ${category.color} rounded-full mx-auto mb-3 flex items-center justify-center`}>
                              <Tag className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-semibold mb-1">{category.name}</h3>
                            <p className="text-sm text-muted-foreground">{category.count} articles</p>
                          </CardContent>
                        </EnhancedCard>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Featured Blog Posts */}
                {blogs.length > 0 && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="mb-16"
                  >
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-3xl font-bold">Latest Articles</h2>
                      <Button variant="outline" size="sm">
                        View All <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {blogs.slice(0, 6).map((blog, index) => (
                        <motion.div key={index} variants={fadeInUp}>
                          <EnhancedCard className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-t-lg"></div>
                            <CardContent className="p-6">
                              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-3">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(blog.frontMatter.date).toLocaleDateString()}</span>
                                <span>•</span>
                                <User className="w-4 h-4" />
                                <span>TaxAdvisor Team</span>
                              </div>
                              <h3 className="font-bold text-lg mb-3 line-clamp-2">
                                {blog.frontMatter.title}
                              </h3>
                              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                                {blog.content?.substring(0, 150)}...
                              </p>
                              <Button variant="ghost" size="sm" className="p-0 h-auto font-medium">
                                Read More <ArrowRight className="w-4 h-4 ml-1" />
                              </Button>
                            </CardContent>
                          </EnhancedCard>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Newsletter Signup */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                >
                  <EnhancedCard className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
                    <CardContent className="p-8 text-center">
                      <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
                      <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                        Subscribe to our newsletter for weekly tax tips, regulatory updates, and expert insights 
                        delivered straight to your inbox.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input 
                          type="email" 
                          placeholder="Enter your email"
                          className="flex-1 px-4 py-2 rounded-lg border border-border bg-background focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                        <Button variant="gradient" size="lg">
                          Subscribe
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-4">
                        No spam, unsubscribe at any time.
                      </p>
                    </CardContent>
                  </EnhancedCard>
                </motion.div>
              </div>
            </Container>
          </Section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default BlogListPage;
