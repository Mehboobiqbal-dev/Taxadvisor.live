function BlogLayout({ title, date, children }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-gray-500 text-sm">Published on {date}</p>
      <div className="prose prose-lg mt-6">{children}</div>
    </div>
  );
}

export default BlogLayout;
