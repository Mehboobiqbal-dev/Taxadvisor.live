// src/app/sitemap.xml.js
export default async function sitemap() {
    const baseUrl = 'https://taxadvisor.live';
  
    // List out the public URL routes you want to include
    const routes = [
      '',           // Root (i.e., '/')
      'home',       // Home page (if different from root)
      'privacy',
      'contact',
      'SmartTaxBot',     // Public route for SmartTaxBot
      'blog',            // Public route for Blog
      'tax-calculator',
      'newslist',
      'about',
     
      // Add more routes as needed
    ];
  
    // Create XML entries for each route
    const urls = routes
      .map((route) => {
        const path = route ? `/${route}` : '';
        return `
    <url>
      <loc>${baseUrl}${path}</loc>
    </url>`;
      })
      .join('');
  
    // Create the complete XML sitemap
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls}
  </urlset>`;
  
    return new Response(sitemapXml, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  }
  