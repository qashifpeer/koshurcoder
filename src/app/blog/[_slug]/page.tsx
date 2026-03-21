import { client } from "@/lib/client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

// 👇 PageProps for this route (Next 15)
type PageProps = {
  params: Promise<{ _slug: string }>;
  searchParams?: Promise<URLSearchParams>;
};

// PortableText components
const portableTextComponents = {
  types: {},
  marks: {},
  block: {
    h1: ({ children }: any) => <h2>{children}</h2>,
    h2: ({ children }: any) => <h2>{children}</h2>,
    h3: ({ children }: any) => <h3>{children}</h3>,
    h4: ({ children }: any) => <h4>{children}</h4>,
    normal: ({ children }: any) => <p>{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 pl-4 italic">{children}</blockquote>
    ),
  },
};

// Get recent posts excluding current
async function getRecentPosts(currentSlug: string) {
  const query = `
    *[_type=='post' && slug.current != $currentSlug] | order(publishedAt desc)[0...5] {
      title,
      'slug': slug.current,
      'imageUrl': featureImage.asset->url
    }
  `;
  const posts = await client.fetch(query, { currentSlug });
  return posts;
}

// Fetch single blog post data
async function getSinglePost(slug: string) {
  const query = `
    *[_type=='post' && slug.current == $slug][0]{
      'slug': slug.current,
      title,
      content,
      shortDescription,
      'imageUrl': featureImage.asset->url,
      'altFtImg': featureImage.alt,
      author,
      'body': pt::text(body),
      'content': body,
      'author': *[_type == 'author' && _id == ^.author._ref][0]{
        _id,
        name,
        'slug': slug.current,
        image{
          asset->{url},
          alt
        }
      },
      publishedAt,
      tags[]->{
        _id,
        title,
        'slug': slug.current
      }, 
      categories[]->{
        _id,
        title,
        'slug': slug.current
      }
    }
  `;
  const data = await client.fetch(query, { slug });
  return data;
}

// Metadata for SEO
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { _slug } = await props.params;
  const data = await getSinglePost(_slug);

  if (!data) return notFound();

  const url = `https://www.nuzhakashmir.com/blog/${data.slug}`;

  return {
    title: `${data.title} - Nuzha Kashmir`,
    description: data.shortDescription || "Read this amazing blog post!",
    alternates: {
      canonical: url,
    },
    metadataBase: new URL("https://www.nuzhakashmir.com"),
    openGraph: {
      title: data.title,
      description: data.shortDescription,
      url,
      images: [{ url: data.imageUrl, width: 800, height: 600 }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.shortDescription,
      images: [data.imageUrl],
    },
  };
}

// Blog Post Page
export default async function BlogPost(props: PageProps) {
  const { _slug } = await props.params;

  const data = await getSinglePost(_slug);
  const recentPosts = await getRecentPosts(_slug);

  if (!data) return notFound();

  return (
    <section className="max-w-7xl mx-auto px-4 flex flex-col gap-10 justify-center items-center pt-20 ">
      {/* MAIN CONTENT */}
      <div className="">
        {/* title of the post */}
        <h1 className="text-3xl font-extrabold mb-4">{data.title}</h1>

        <Image
          src={data.imageUrl}
          priority
          alt={data.altFtImg}
          width={800}
          height={800}
          className="rounded-lg my-4"
        />

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {data.tags &&
            data.tags.length > 0 &&
            data.tags.map((tag: any) => {
              const colors = [
                "bg-rose-500",
                "bg-indigo-500",
                "bg-emerald-500",
                "bg-amber-500",
                "bg-purple-500",
              ];
              const color =
                colors[tag._id.slice(-1).charCodeAt(0) % colors.length] ||
                colors[0];

              return (
                <Link
                  key={tag._id}
                  href={`/tags/${tag.slug}`}
                  className={`text-xs px-3 py-1 capitalize text-white ${color} hover:opacity-85 transition`}
                >
                  {tag.title}
                </Link>
              );
            })}
        </div>

        {/* Author + date */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-1 text-base text-gray-400 border-b border-gray-700 pb-4">
          <span className="font-medium">
            By:{" "}
            <Link
              href={`/authors/${data.author.slug}`}
              className="text-gray-200 capitalize hover:text-sky-400 underline"
            >
              {data.author.name}
            </Link>
          </span>
          <span className="text-sm">
            Last Updated:{" "}
            {new Date(data.publishedAt).toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </span>
        </div>

        {/* content + sidebar */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* content side */}
          <div className="mt-8 prose prose-lg prose-code:bg-slate-600 prose-headings:text-sky-200 prose-invert prose-li:marker:text-rose-500">
            <PortableText value={data.content} components={portableTextComponents} />
          </div>

          {/* SIDEBAR */}
          <aside className="lg:w-1/3">
            <h3 className="text-xl font-semibold mb-4">You Might Also Like</h3>
            <div className="space-y-4">
              {recentPosts.map((post: any) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="flex gap-4 items-start hover:opacity-90 transition"
                >
                  <div className="min-w-[90px] h-[70px] relative">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="rounded-md object-cover"
                      sizes="90px"
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-200 line-clamp-2">
                    {post.title}
                  </p>
                </Link>
              ))}
            </div>
          </aside>
        </div>

        {/* Categories (optional; if you have them) */}
        {data.categories?.length > 0 && (
          <div className="mt-8">
            <h3 className="font-bold text-lg">Categories:</h3>
            <ul className="flex gap-2 flex-wrap">
              {data.categories.map(
                (category: { _id: string; title: string; slug: string }) => (
                  <li key={category._id}>
                    <Link
                      href={`/${category.slug}`}
                      className="text-blue-400 hover:underline"
                    >
                      {category.title}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        )}

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: data.title,
              image: [data.imageUrl],
              author: {
                "@type": "Person",
                name: data.author.name,
              },
              publisher: {
                "@type": "Organization",
                name: "Koshur Coder",
                logo: {
                  "@type": "ImageObject",
                  url: "https://www.koshurcoder.in/logo.png",
                },
              },
              datePublished: data.publishedAt,
              dateModified: data.updatedAt || data.publishedAt,
              description: data.excerpt || data.shortDescription || "",
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://www.koshurcoder.in/blog/${data.slug}`,
              },
            }),
          }}
        />
      </div>
    </section>
  );
}