"use client";

import NewsList from "../NewsList";  // Adjust import path if needed

const NewsPage = () => {
  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Latest Tax News</h1>
      <NewsList /> 
    </div>
  );
};

export default NewsPage;
