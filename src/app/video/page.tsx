import { getYouTubeVideos } from "@/lib/getYouTubeVideos";



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


export default async function VideoPage() {
  const [videos]: [YouTubeVideo[]] = await Promise.all([
    getYouTubeVideos(),
    
  ]);
  return (
    <section className="bg-gradient-to-l from-gray-900 from-0% via-neutral-900 via-50% to-indigo-900 to-100%">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-20">
        <div>
          <h2 className="text-2xl font-bold mb-6 mt-6 text-sky-200">All Videos</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {videos.length > 0 ? (
              videos.map((video) => (
                <div
                  key={video.id.videoId}
                  className="rounded-lg overflow-hidden shadow"
                >
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
        </div>

        
      </div>
    </section>
  );
}
