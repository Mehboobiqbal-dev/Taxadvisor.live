import path from 'path';
import fs from 'fs/promises';
import matter from 'gray-matter';

export default async function handler(req, res) {
  try {
    const contentDir = path.join(process.cwd(), 'content');
    const files = await fs.readdir(contentDir);

    const posts = await Promise.all(
      files.map(async (filename) => {
        const filePath = path.join(contentDir, filename);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const { data } = matter(fileContent);

        return { slug: filename.replace('.md', ''), frontMatter: data };
      })
    );

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
