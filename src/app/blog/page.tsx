import { getData } from "@/lib/client";
import { BlogCard } from "@/components";
import type { Metadata } from "next";
import type { PostType } from "@/lib/interface"


// Metadata for SEO
export const metadata: Metadata = {
  metadataBase: new URL("https://www.nuzhakashmir.com"),
  title: "Blog-Nuzha Kashmir: Travel Guide to Gulmarg, Pahalgam & More",
  
  description:
    "Discover the best places to visit in Kashmir, including Gulmarg, Pahalgam, Sonamarg & Bangus. Your complete travel guide for unforgettable experiences.",
  keywords:
    "Kashmir travel blog, Gulmarg travel guide, Kashmir tourism, Sonamarg places to visit, Bangus valley Kashmir, Kashmir itinerary, best time to visit Kashmir, Kashmir travel tips, explore Kashmir, offbeat places in Kashmir, keran valley,",
    robots: {
      index: false,
      follow: true,
    },
    openGraph: {
    title: "NuzhaKashmir",
    description: "Dive deep into Kashmir with NuzhaKashmir.",
    url: "https://www.nuzhakashmir.com/blog",
    siteName: "NuzhaKashmir",
    // images: [
    //   {
    //     url: "https://www.nuzhakashmir.com/og-image.png",
    //     width: 1200,
    //     height: 630,
    //   },
    // ],
    type: "website",
  },
};

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
