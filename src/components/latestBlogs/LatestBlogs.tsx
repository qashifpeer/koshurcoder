// components/LatestBlogs.tsx
import Link from "next/link";
import { getLatestPosts, BlogPost } from "@/lib/getLatestBlogs";

export default async function LatestBlogs() {
  const posts: BlogPost[] = await getLatestPosts();

  return (
    <section className="py-12 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-sky-200">Latest Blogs</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <article
              key={post._id}
              className="rounded-lg overflow-hidden shadow bg-white flex flex-col"
            >
              {post.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4 flex flex-col gap-2">
                <h3 className="font-semibold text-base text-slate-800 line-clamp-2">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-sm text-slate-500 line-clamp-3">
                    {post.excerpt}
                  </p>
                )}
                {post.publishedAt && (
                  <p className="text-xs text-slate-400 mt-auto">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
              <Link
                href={`/blog/${post.slug.current}`}
                className="block px-4 pb-4 text-sm font-semibold text-rose-500 hover:text-rose-600"
              >
                Read more →
              </Link>
            </article>
          ))
        ) : (
          <p>No blogs available</p>
        )}
      </div>
      <div className="flex justify-end mt-6">
        <Link
          href="/blog"
          className="px-6 py-2 bg-rose-500 text-sky-0 rounded-md font-semibold hover:bg-sky-600 transition"
        >
          View more
        </Link>
      </div>
    </section>
  );
}