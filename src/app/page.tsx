import { getYouTubeVideos } from "@/lib/getYouTubeVideos";
import { getData } from "@/lib/client";
import Image from "next/image";
import Hero from "@/components/hero/Hero";
import LatestVideos from "@/components/latestVideos/LatestVideos";
import LatestBlogs from "@/components/latestBlogs/LatestBlogs";




// page
export default function Home() {
  

  return (
    <main>
      <Hero />
      <LatestVideos />
      <LatestBlogs />
    </main>
  );
}
