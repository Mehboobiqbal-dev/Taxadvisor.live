
export async function GET() {
    const baseUrl = 'https://taxadvisor.live';
  
    
    const routes = [
      '',           
      'home',       
      'privacy',
      'contact',
      'SmartTaxBot',     
      'blog',            
      'tax-calculator',
      'newslist',
      'about',
    ];
  
  
    const urls = routes
      .map((route) => {
        const path = route ? `/${route}` : '';
        return `<url>
    <loc>${baseUrl}${path}</loc>
  </url>`;
      })
      .join('');
  
    
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls}
  </urlset>`;
  
    return new Response(sitemapXml, {
      headers: {
        'Content-Type': 'application/xml'
      }
    });
  }
  