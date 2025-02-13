import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'posts');

// Fetch all post slugs
export function getAllPostSlugs() {
  const filePath = path.join(postsDirectory, 'posts.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const allPostsData = JSON.parse(fileContents);
  return allPostsData.map(post => post.slug);
}

// Retrieve post data by slug
export function getPostData(slug) {
  const filePath = path.join(postsDirectory, `${slug}.json`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const postData = JSON.parse(fileContents);
  return postData;
}

// Corrected getStaticProps - now only one is defined
export async function getStaticProps() {
  try {
    // Fetch data from your API or other sources
    const res = await fetch('https://api.example.com/data');
    if (!res.ok) throw new Error('Failed to fetch data');
    const data = await res.json();

    // Return the fetched data as props
    return { props: { data } };
  } catch (error) {
    console.error('Error fetching data:', error);
    
    // Provide fallback data if API fetch fails
    return { props: { data: [] } };
  }
}
