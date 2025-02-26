import path from 'path';
import fs from 'fs/promises';
import matter from 'gray-matter';

export async function GET() {
  try {
    const contentDir = path.join(process.cwd(), 'content');
    const files = await fs.readdir(contentDir);

    const posts = await Promise.all(
      files.map(async (filename) => {
        const filePath = path.join(contentDir, filename);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const { data, content } = matter(fileContent);

        return {
          slug: filename.replace('.md', ''),
          frontMatter: {
            ...data,
            metaDescription: content.slice(0, 160),
          },
          content: content.slice(0, 160), // Include a snippet for description
        };
      })
    );

    return Response.json(posts, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
