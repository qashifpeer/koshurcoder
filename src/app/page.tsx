import { getYouTubeVideos } from "@/lib/getYouTubeVideos";
import { getData } from "@/lib/client";
import Image from "next/image";


// --- Types ---
interface YouTubeVideo {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      medium: { url: string };
    };
  };
}

interface Blog {
  _id: string;
  title: string;
  shortDescription: string;
  imageUrl: string;
  altFtImg: string;
}

// page
export default async function Home() {
  const [videos, blogs] : [YouTubeVideo[],Blog[]] = await Promise.all([
    getYouTubeVideos(),
    getData(),
  ]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 space-y-20">
      <section>
        <h2 className="text-2xl font-bold mb-6">Latest Videos</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {videos.length > 0 ? (
            videos.map((video) => (
              <div key={video.id.videoId} className="rounded-lg overflow-hidden shadow">
                <iframe
                  className="w-full h-60"
                  src={`https://www.youtube.com/embed/${video.id.videoId}`}
                  title={video.snippet.title}
                  allowFullScreen
                ></iframe>
                <p className="p-2 font-medium">{video.snippet.title}</p>
              </div>
            ))
          ) : (
            <p>No videos available</p>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Latest Blogs</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div key={blog._id} className="rounded-lg border p-4 shadow">
                <Image src={blog.imageUrl} alt={blog.altFtImg} width={300} height={300} className="rounded-lg" />
                <h3 className="font-semibold text-lg mt-2">{blog.title}</h3>
                <p className="text-sm text-gray-600">{blog.shortDescription}</p>
              </div>
            ))
          ) : (
            <p>No blogs found</p>
          )}
        </div>
      </section>
    </main>
  );
}
