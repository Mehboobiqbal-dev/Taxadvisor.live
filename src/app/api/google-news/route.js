import Parser from "rss-parser";

export async function GET() {
  try {
    const parser = new Parser({
      customFields: {
        item: [["media:content", "image", { keepArray: false, attr: "url" }]],
      },
    });

    // Updated URL with additional parameters for better results.
    const feed = await parser.parseURL(
      "https://news.google.com/rss/search?q=tax+finance&hl=en-US&gl=US&ceid=US:en"
    );

    // Create a Set to track unique links
    const seenLinks = new Set();
    const articles = [];

    for (const item of feed.items) {
      const title = item.title?.trim();
      const link = item.link;
      const published = item.pubDate;
      const description = item.contentSnippet || "No description available";
      const image = item.image || null; // Extract the image from the item

      // Avoid duplicates and limit results to 5
      if (!seenLinks.has(link) && articles.length < 5) {
        seenLinks.add(link);
        articles.push({ title, link, published, description, image });
      }

      // Stop loop when we have 5 unique articles
      if (articles.length === 5) break;
    }

    return new Response(JSON.stringify({ articles }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch news" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
