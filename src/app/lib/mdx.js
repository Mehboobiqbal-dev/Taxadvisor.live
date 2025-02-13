import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function getBlogContent(slug) {
  const filePath = path.join(process.cwd(), "content", `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return { frontMatter: data, content };
}
