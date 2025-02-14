import path from 'path';
import fs from 'fs/promises';
import matter from 'gray-matter';

// ... existing code ...

export default async function handler(req, res) {
  try {
    const contentDir = path.join(process.cwd(), 'content');
    const files = await fs.readdir(contentDir);

    const posts = await Promise.all(
      files.map(async (filename) => {
        const filePath = path.join(contentDir, filename);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const { data, content } = matter(fileContent);

        // SEO: Include metadata for structured data
        return { 
          slug: filename.replace('.md', ''), 
          frontMatter: {
            ...data,
            metaDescription: content.slice(0, 160)
          },
          content: content.slice(0, 160) // Include a snippet for description
        };
      })
    );

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}