// lib/getLatestPosts.ts
import { client } from "@/lib/client"; // adjust path
import { groq } from "next-sanity";

export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
   imageUrl?: string; 
  publishedAt?: string;
}

const LATEST_POSTS_QUERY = groq`*[_type == "post"] | order(publishedAt desc)[0...3]{
  _id,
  title,
  slug,
  excerpt,
  'imageUrl':featureImage.asset->url,
  publishedAt
}`;

export async function getLatestPosts(): Promise<BlogPost[]> {
  const posts = await client.fetch<BlogPost[]>(LATEST_POSTS_QUERY);
  return posts;
}