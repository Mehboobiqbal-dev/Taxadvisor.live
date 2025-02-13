import Parser from "rss-parser";

export async function GET() {
  try {
    const parser = new Parser({
      // This custom field will extract the image URL if available
      customFields: {
        item: [["media:content", "image", { keepArray: false, attr: "url" }]],
      },
    });

    // Fetch the Google News RSS feed with your query (e.g., "tax finance")
    const feed = await parser.parseURL(
      "https://news.google.com/rss/search?q=tax+finance&hl=en-US&gl=US&ceid=US:en"
    );

    // Create a Set to avoid duplicate links and prepare an array for articles
    const seenLinks = new Set();
    const articles = [];

    // Loop through all items in the feed and add them without a limit
    for (const item of feed.items) {
      const title = item.title?.trim();
      const link = item.link;
      const published = item.pubDate;
      const description = item.contentSnippet || "No description available";
      const image = item.image || null;

      // Avoid duplicate articles and add all unique items
      if (!seenLinks.has(link)) {
        seenLinks.add(link);
        articles.push({ title, link, published, description, image });
      }
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
