'use client';

import Head from 'next/head';
import { useRouter } from 'next/navigation';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
}

export default function SEOEnhanced({
  title = 'TaxAdvisor - Professional Tax Solutions & Financial Planning',
  description = 'Get expert tax advice, use our advanced tax calculator, read latest tax news, and chat with our AI-powered SmartTaxBot. Simplify your tax planning with TaxAdvisor.',
  keywords = 'tax advisor, tax calculator, tax planning, financial advisor, tax news, AI tax bot, tax software, income tax, professional tax services',
  image = 'https://i.ibb.co/vxKbKLHT/photo.jpg',
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'TaxAdvisor Team',
  section = 'Tax & Finance',
  tags = ['tax', 'finance', 'calculator', 'advisor'],
  noindex = false
}: SEOProps) {
  const router = useRouter();
  const currentUrl = url || `https://taxadvisor.live${router.asPath || ''}`;
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "TaxAdvisor",
    "url": "https://taxadvisor.live",
    "description": description,
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://taxadvisor.live/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "TaxAdvisor",
      "logo": {
        "@type": "ImageObject",
        "url": image
      }
    }
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://taxadvisor.live"
      }
    ]
  };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'} />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="TaxAdvisor" />
      <meta property="og:locale" content="en_US" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}
      {section && <meta property="article:section" content={section} />}
      {tags.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@TaxAdvisorLive" />
      <meta name="twitter:creator" content="@TaxAdvisorLive" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#0070f3" />
      <meta name="msapplication-TileColor" content="#0070f3" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="TaxAdvisor" />
      
      {/* Favicon and Icons */}
      <link rel="icon" type="image/jpeg" href="https://i.ibb.co/vxKbKLHT/photo.jpg" />
      <link rel="apple-touch-icon" href="https://i.ibb.co/vxKbKLHT/photo.jpg" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
    </Head>
  );
}
