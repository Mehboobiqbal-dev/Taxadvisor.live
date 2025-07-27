import cron from "node-cron";
import { exec } from "child_process";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.ibb.co' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'myplantin.com' },
      { protocol: 'https', hostname: 'www.forbes.com' },
      { protocol: 'https', hostname: 'static01.nyt.com' },
    ],
  },
};

// === Schedule CRON Jobs Only on Server Side ===
if (typeof window === "undefined") {
  // Fetch News Every 15 Minutes
  cron.schedule("*/15 * * * *", () => {
    console.log("⏳ Fetching news articles...");
    exec("node cron/fetch-news.js", (error, stdout, stderr) => {
      if (error) return console.error(`❌ Error: ${error.message}`);
      if (stderr) console.error(`⚠️ stderr: ${stderr}`);
      console.log(`✅ News Fetched: ${stdout}`);
    });
  });

  // Generate Blog Post Every Minute
  cron.schedule("* * * * *", () => {
    console.log("📝 Generating new blog post...");
    exec("node cron/generate-post.js > cron-generate-post.log 2>&1", (error, stdout, stderr) => {
      if (error) return console.error(`❌ Error: ${error.message}`);
      if (stderr) console.error(`⚠️ stderr: ${stderr}`);
      console.log(`✅ Blog Generated: ${stdout}`);
    });
  });
}

export default nextConfig;
