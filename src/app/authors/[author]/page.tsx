// app/authors/[author]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/lib/client";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "@/lib/portableTextComponents"; 
import { PostListItem } from "@/types/post";

// ✅ Match Next.js 15 page type
type PageProps = {
  params: Promise<{ author: string }>;
  searchParams?: Promise<URLSearchParams>;
};



async function getAuthorBySlug(slug: string) {
  const query = `
    *[_type == "author" && slug.current == $slug][0]{
      _id,
      name,
      'slug': slug.current,
      image {
        asset->{
          url
        },
        alt
      },
      bio
    }
  `;
  return await client.fetch(query, { slug });
}

async function getRecentPostsByAuthor(authorId: string): Promise<PostListItem[]> {
  const query = `
    *[_type == "post" && author._ref == $authorId] | order(publishedAt desc)[0..4] {
      title,
      'slug': slug.current,
      shortDescription,
      publishedAt,
      'imageUrl': featureImage.asset->url
    }
  `;
  return await client.fetch<PostListItem[]>(query, { authorId });
}

export default async function AuthorPage(props: PageProps) {
  const params = await props.params;
  const { author } = params;

  const authorData = await getAuthorBySlug(author);
  const posts = await getRecentPostsByAuthor(authorData?._id);

  if (!authorData) return <p>Author not found</p>;

  const avatarUrl = authorData.image?.asset?.url;

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {avatarUrl && (
          <img
            src={avatarUrl}
            alt={authorData.image?.alt || authorData.name}
            className="w-24 h-24 rounded-full object-cover"
          />
        )}
        <div>
          <h1 className="text-2xl font-bold text-sky-200">{authorData.name}</h1>
          {authorData.bio && (
            <div className="mt-3 text-gray-300 text-sm">
              <PortableText value={authorData.bio} components={portableTextComponents} />
            </div>
          )}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold text-sky-200 mb-4">
          Latest posts by {authorData.name}
        </h2>
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post : PostListItem) => (
              <article
                key={post.slug}
                className="rounded-lg overflow-hidden shadow bg-slate-900 flex flex-col"
              >
                {post.imageUrl && (
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
        ) : (
          <p className="text-gray-400">No posts yet by this author.</p>
        )}
      </div>
    </section>
  );
}

// Also update generateMetadata
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const author = await getAuthorBySlug(params.author);

  return {
    title: `${author?.name || "Author"} | KoshurCoder`,
    description: `Technical tutorials and blog posts by ${author?.name || "an author"} on KoshurCoder.`,
  };
}