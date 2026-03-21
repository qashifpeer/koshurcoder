import { getYouTubeVideos } from "@/lib/getYouTubeVideos";
import Link from "next/link";

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

export default async function LatestVideos() {
  const videos: YouTubeVideo[] = await getYouTubeVideos();

  // Get only latest three videos:
  const latestThree = videos.slice(0, 3);

  return (
    <section className="py-12 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-sky-200">Latest Videos</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {latestThree.length > 0 ? (
          latestThree.map((video) => (
            <div key={video.id.videoId} className="rounded-lg overflow-hidden shadow bg-white">
              <iframe
                className="w-full aspect-video"
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                title={video.snippet.title}
                allowFullScreen
              ></iframe>
              <p className="p-2 font-medium text-base text-slate-500">{video.snippet.title}</p>
            </div>
          ))
        ) : (
          <p>No videos available</p>
        )}
      </div>
      <div className="flex justify-end mt-6">
        <Link
          href="/videos"
          className="px-6 py-2 bg-rose-500 text-sky-0 rounded-md font-semibold hover:bg-sky-600 transition"
        >
          View more
        </Link>
      </div>
    </section>
  );
}
