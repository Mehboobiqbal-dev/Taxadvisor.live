'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Fuse from 'fuse.js';

export default function BlogSearch({ blogs }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(blogs);

  useEffect(() => {
    if (query.trim() === '') {
      setResults(blogs);
    } else {
     
      const fuse = new Fuse(blogs, {
        keys: ['frontMatter.title', 'frontMatter.excerpt', 'frontMatter.tags'],
        threshold: 0.3,
      });
      const searchResults = fuse.search(query).map(({ item }) => item);
      setResults(searchResults);
    }
  }, [query, blogs]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search blog posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      {query && results.length === 0 && (
        <p className="text-gray-500">No matching blog posts found.</p>
      )}
      <div className="space-y-4">
        {results.map(({ frontMatter, slug }) => (
          <div key={slug} className="p-4 border rounded hover:bg-gray-100">
            <Link href={`/blog/${slug}`}>
              <h2 className="text-xl font-bold text-blue-700 hover:underline">
                {frontMatter.title}
              </h2>
            </Link>
            <p className="text-gray-500 text-sm">{frontMatter.date}</p>
            <p className="mt-1 text-gray-700">{frontMatter.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
