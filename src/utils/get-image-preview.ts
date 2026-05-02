export const getImagePreviewUrl = (path?: string | null) => {
  if (!path) return null;

  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("/")
  ) {
    return path;
  }

  const baseUrl = process.env.NEXT_PUBLIC_STORAGE_URL?.replace(/\/$/, "");
  if (!baseUrl) return `/${path}`;

  return `${baseUrl}/${path.replace(/^\//, "")}`;
};
