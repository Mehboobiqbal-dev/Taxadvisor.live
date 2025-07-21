function BlogLayout({ title, date, children }) {
  return (
    <div className="card max-w-3xl mx-auto my-8 p-8">
      <h1 className="text-3xl font-bold text-primary mb-2">{title}</h1>
      <p className="text-accent text-sm font-medium mb-6">Published on {date}</p>
      <div className="prose prose-lg text-text mt-6">{children}</div>
    </div>
  );
}

export default BlogLayout;
