import Link from "next/link";

export default function BlogCard({ title, date, excerpt, slug }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300">
      <h2 className="text-xl font-semibold mb-2">
        <Link href={`/blog/${slug}`} className="text-blue-600 hover:underline">
          {title}
        </Link>
      </h2>
      <p className="text-gray-500 text-sm">{date}</p>
      <p className="mt-2 text-gray-700">{excerpt}</p>
    </div>
  );
}
