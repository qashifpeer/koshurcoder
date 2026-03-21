// app/tags/[tag]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/lib/client";
import { PostListItem } from "@/types/post";

// Next 15 PageProps
type PageProps = {
  params: Promise<{ tag: string }>;
  searchParams?: Promise<URLSearchParams>;
};

// Fetch posts with this tag
async function getPostsByTag(tagSlug: string): Promise<PostListItem[]> {
  const query = `
    *[_type == "post" && $tagSlug in tags[]->slug.current] | order(publishedAt desc) {
      title,
      'slug': slug.current,
      shortDescription,
      publishedAt,
      'imageUrl': featureImage.asset->url
    }
  `;
  return await client.fetch<PostListItem[]>(query, { tagSlug });
}
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { tag } = await props.params;
  const titleFromSlug = tag.replace(/-/g, " ");

  return {
    title: `Posts tagged “${titleFromSlug}” | KoshurCoder`,
    description: `All blog posts tagged with “${titleFromSlug}” on KoshurCoder.`,
    alternates: {
      canonical: `/tags/${tag}`,
    },
  };
}

export default async function TagPage(props: PageProps) {
  const { tag } = await props.params;
  const tagTitle = tag.replace(/-/g, " ");
  const posts = await getPostsByTag(tag);

  if (!posts.length) {
    return (
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-sky-200">Tag “{tagTitle}”</h1>
        <p className="text-gray-500 mt-4">No posts found with this tag.</p>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-sky-200">
        Posts tagged “{tagTitle}”
      </h1>
      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post: PostListItem) => (
          <article
            key={post.slug}
            className="rounded-lg overflow-hidden shadow bg-slate-900 flex flex-col"
          >
            {post.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4 flex flex-col gap-2">
              <h3 className="font-semibold text-base text-slate-200 line-clamp-2">
                {post.title}
              </h3>
              {post.shortDescription && (
                <p className="text-sm text-slate-400 line-clamp-3">
                  {post.shortDescription}
                </p>
              )}
              <p className="text-xs text-slate-500">
                {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                  timeZone: "Asia/Kolkata",
                })}
              </p>
            </div>
            <Link
              href={`/blog/${post.slug}`}
              className="px-4 py-2 text-sm font-semibold text-rose-400 hover:text-rose-300 transition"
            >
              Read post →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}