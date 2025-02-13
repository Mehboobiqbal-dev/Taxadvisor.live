import path from 'path';
import fs from 'fs/promises';
import matter from 'gray-matter';
import BlogSearch from './BlogSearch';
import Header from '../Header';
import Footer from '../Footer';

// Function to fetch blog posts
async function getBlogPosts() {
  const contentDir = path.join(process.cwd(), 'content'); // Absolute path
  const files = await fs.readdir(contentDir); // Read files asynchronously

  const posts = await Promise.all(
    files.map(async (filename) => {
      const filePath = path.join(contentDir, filename);
      const fileContent = await fs.readFile(filePath, 'utf-8'); // Read file content
      const { data } = matter(fileContent); // Extract frontmatter

      return { frontMatter: data, slug: filename.replace(/\.mdx?$/, '') };
    })
  );

  return posts;
}

// This is how you fetch data inside the App Directory component
export default async function BlogListPage() {
  // Fetch blog posts here
  const blogs = await getBlogPosts();

  return (
    <>
      <Header /> {/* Added Header component */}
      <div className="max-w-3xl mx-auto p-6 bg-gray-50 shadow-md rounded-lg">
        <h1 className="text-4xl font-extrabold mb-6 text-blue-800">Tax Blog</h1>
        {/* Pass the blog data to the client component */}
        <BlogSearch blogs={blogs} />
      </div>
      <Footer /> {/* Added Footer component */}
    </>
  );
}
