import BlogCard from "@/components/blogCard/BlogCard";
import {  getData } from "@/lib/client";
import { PostType } from "@/lib/interface";

import Image from "next/image";

interface Blog {
  _id: string;
  title: string;
  shortDescription: string;
  imageUrl: string;
  altFtImg: string;
}
export const revalidate = 60; // ISR: revalidate data every 60 seconds
export default async function BlogPage() {
  const posts: PostType[] = await getData();
  return (
    <section className="max-w-7xl mx-auto mt-10 p-4">
      
      <div className="flex justify-between items-center pl-4 my-4 bg-gradient-to-r from-orange-800 to-slate-900">
        <h1 className="text-xl text-slate-100   uppercase font-kalam py-2">
          Blog
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts?.length > 0 &&
          posts.map((post, idx) => <BlogCard key={idx} postData={post} />)}
      </div>
    </section>
  );
}