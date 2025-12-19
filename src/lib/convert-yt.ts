export function convertYoutubeToEmbed(url?: string | null): string | undefined {
  if (!url) return undefined;

  try {
    const parsedUrl = new URL(url);

    // youtu.be/{id}
    if (parsedUrl.hostname === "youtu.be") {
      const videoId = parsedUrl.pathname.replace("/", "");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : undefined;
    }

    // youtube.com/watch?v={id}
    if (
      parsedUrl.hostname.includes("youtube.com") &&
      parsedUrl.searchParams.has("v")
    ) {
      const videoId = parsedUrl.searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : undefined;
    }

    return undefined;
  } catch {
    return undefined;
  }
}
