import { client } from "@/lib/client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Head from "next/head";
import { portableTextComponents } from "@/lib/portableTextComponents";
import type { PortableTextBlock } from "@portabletext/types";


// Types
interface RecentPost {
  title: string;
  slug: string;
  imageUrl: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface Author {
  _id: string;
  name: string;
  slug: string;
  authorImgUrl: string;
  altAuthorImg?: string;
}

interface BlogPostData {
  slug: string;
  title: string;
  content: PortableTextBlock[];
  shortDescription?: string;
  imageUrl: string;
  altFtImg: string;
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  excerpt?: string;
  categories?: Category[];
}

// Get recent posts excluding current
async function getRecentPosts(currentSlug: string): Promise<RecentPost[]> {
  const query = `
    *[_type=='post' && slug.current != '${currentSlug}'] | order(publishedAt desc)[0...5] {
      title,
      'slug': slug.current,
      'imageUrl': featureImage.asset->url
    }
  `;
  const posts: RecentPost[] = await client.fetch(query);
  return posts;
}

// Fetch single blog post data
async function getSinglePost(slug: string): Promise<BlogPostData | null> {
  const query = `
    *[_type=='post' && slug.current == '${slug}']{
      'slug': slug.current,
      title,
      content,
      shortDescription,
      'imageUrl': featureImage.asset->url,
      'altFtImg': coalesce(featureImage.alt, "No alt text"),
      author,
      'body': pt::text(body),
      'content': body,
      'author': *[_type == 'author' && _id == ^.author._ref][0]{
        _id,
        name,
        'slug': slug.current,
        'authorImgUrl': image.asset->url,
        'altAuthorImg': image.alt
      },
      publishedAt,
      categories[]->{
        _id,
        name,
        'slug': slug.current
      }, 
    }[0]`;
  const data: BlogPostData = await client.fetch(query);
  return data || null;
}

// Metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { _slug: string };
}): Promise<Metadata> {
  const data = await getSinglePost(params._slug);
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
const BlogPost = async ({ params }: { params: { _slug: string } }) => {
  const data = await getSinglePost(params._slug);
  if (!data) return notFound();

  const recentPosts = await getRecentPosts(params._slug);

  return (
    <section className="max-w-7xl mx-auto px-4 flex flex-col gap-10 justify-center items-center pt-4 ">
      <div className="">
        <Head>
          <title>{data.title} - Nuzha Kashmir</title>
          <meta name="description" content={data.shortDescription} />
          <meta property="og:title" content={data.title} />
          <meta property="og:description" content={data.shortDescription} />
          <meta property="og:image" content={data.imageUrl} />
          <meta
            property="og:url"
            content={`https://www.nuzhakashmir.com/blog/${data.slug}`}
          />
          <meta name="twitter:title" content={data.title} />
          <meta name="twitter:description" content={data.shortDescription} />
          <meta name="twitter:image" content={data.imageUrl} />
        </Head>

        <h1 className="text-3xl font-extrabold mb-4">{data.title}</h1>

        <Image
          src={data.imageUrl}
          priority
          alt="featured"
          width={800}
          height={800}
          className="rounded-lg my-4"
        />

        <p className="text-xs text-gray-400 mt-1 mb-2 underline">
          {data.author.name}, {data.publishedAt.substring(0, 10)}
        </p>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <article className="prose prose-neutral dark:prose-invert max-w-none prose-li:marker:text-primary">
              <PortableText
                value={data.content}
                components={portableTextComponents}
              />
            </article>
          </div>

          <aside className="lg:w-1/3">
            <h3 className="text-xl font-semibold mb-4">You Might Also Like</h3>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <a
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
                  <p className="text-sm font-medium text-gray-800 line-clamp-2">
                    {post.title}
                  </p>
                </a>
              ))}
            </div>
          </aside>
        </div>

        {data.categories &&  data.categories.length > 0 && (
          <div className="mt-8">
            <h3 className="font-bold text-lg">Categories:</h3>
            <ul className="flex gap-2 flex-wrap">
              {data.categories.map((category) => (
                <li key={category._id}>
                  <a
                    href={`/${category.slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

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
              name: "Nuzha Kashmir",
              logo: {
                "@type": "ImageObject",
                url: "https://www.nuzhakashmir.com/logo.png",
              },
            },
            datePublished: data.publishedAt,
            dateModified: data.updatedAt || data.publishedAt,
            description: data.excerpt || data.shortDescription || "",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://www.nuzhakashmir.com/blog/${data.slug}`,
            },
          }),
        }}
      />
    </section>
  );
};

export default BlogPost;
