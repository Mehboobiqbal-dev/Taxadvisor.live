// components/SEO.jsx
import Head from 'next/head';

export default function SEO({
  title,
  description,
  canonical,
  openGraph = {},
  twitter = {},
  structuredData = [],
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

            <meta property="og:title" content={openGraph.title || title} />
      <meta property="og:description" content={openGraph.description || description} />
      {openGraph.url && <meta property="og:url" content={openGraph.url} />}
      <meta property="og:type" content={openGraph.type || 'website'} />
      {openGraph.site_name && <meta property="og:site_name" content={openGraph.site_name} />}
      {openGraph.image && <meta property="og:image" content={openGraph.image} />}
      {openGraph.locale && <meta property="og:locale" content={openGraph.locale} />}

            <meta name="twitter:card" content={twitter.card || 'summary_large_image'} />
      <meta name="twitter:title" content={twitter.title || title} />
      <meta name="twitter:description" content={twitter.description || description} />
      {twitter.image && <meta name="twitter:image" content={twitter.image} />}
      {twitter.site && <meta name="twitter:site" content={twitter.site} />}
      {twitter.creator && <meta name="twitter:creator" content={twitter.creator} />}

            {structuredData.map((data, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      ))}

            <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
