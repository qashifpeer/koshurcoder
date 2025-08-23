// src/lib/getYouTubeVideos.ts
export async function getYouTubeVideos() {
  
  try {
    const apiKey = process.env.NEXT_PUBLIC_YT_API_KEY;
    const channelId = process.env.NEXT_PUBLIC_YT_CHANNEL_ID;

    if (!apiKey || !channelId) {
      console.error("Missing YouTube API Key or Channel ID in .env");
      return [];
    }

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=6&order=date&type=video&key=${apiKey}`;

    const res = await fetch(url);

    if (!res.ok) {
      console.error("YouTube API error:", res.status, res.statusText);
      return [];
    }

    const data = await res.json();
    return data.items || [];
  } catch (err) {
    console.error("YouTube fetch failed:", err);
    return [];
  }
}
