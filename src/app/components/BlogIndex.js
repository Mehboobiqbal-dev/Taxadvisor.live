"use client";  // Ensures this runs on the client side

import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BlogIndex() {
  const [allPostsData, setAllPostsData] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) throw new Error("Failed to fetch posts");

        const data = await response.json();
        setAllPostsData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Head>
        <title>Blog - Tax Advisor</title>
      </Head>
      <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>
      <ul>
        {allPostsData.map(({ slug, date, title }) => (
          <li key={slug} className="mb-4">
            <Link href={`/blog/${slug}`} className="text-2xl text-blue-600 hover:underline">
              {title}
            </Link>
            <br />
            <small className="text-gray-500">{date}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
