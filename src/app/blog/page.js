import path from "path";
import fs from "fs/promises"; // Use fs/promises for async operations
import matter from "gray-matter";
import Link from "next/link";

async function getBlogPosts() {
  const contentDir = path.join(process.cwd(), "content"); // Absolute path
  const files = await fs.readdir(contentDir); // Read files asynchronously

  const posts = await Promise.all(
    files.map(async (filename) => {
      const filePath = path.join(contentDir, filename);
      const fileContent = await fs.readFile(filePath, "utf-8"); // Read file content
      const { data } = matter(fileContent); // Extract frontmatter

      return { frontMatter: data, slug: filename.replace(".mdx", "") };
    })
  );

  return posts;
}

export default async function BlogList() {
  const blogs = await getBlogPosts();

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 shadow-md rounded-lg">
    <h1 className="text-4xl font-extrabold mb-6 text-blue-800">Tax Blog</h1>
    {blogs.map(({ frontMatter, slug }) => (
      <div key={slug} className="border-b border-gray-200 pb-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 hover:text-blue-600">
          <Link href={`/blog/${slug}`} className="text-blue-700 hover:underline">
            {frontMatter.title}
          </Link>
        </h2>
        <p className="text-gray-500 text-sm">{frontMatter.date}</p>
        <p className="mt-2 text-gray-700">{frontMatter.excerpt}</p>
      </div>
    ))}
  </div>
  
  );
}
