import type { PortableTextBlock } from "@portabletext/types";

export interface SanityImage {
  asset: {
    _ref: string;
    _type: "reference";
    url?: string;
  };
  alt?: string;
}

export interface Author {
  _id: string;
  name: string;
  slug: string; // if actually { current: string } in Sanity, change this
  image: SanityImage;
}

export interface Category {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
}

export interface Post {
  _id: string;
  title: string;
  shortDescription: string;
  slug: { current: string };
  imageUrl: string;
  altFtImg: string;
  publishedAt: string;
  body: string;
  author: Author;
  categories?: Category[];
  content: PortableTextBlock[];
}

export type PostType = Post;
export type FetchedData = Post;
