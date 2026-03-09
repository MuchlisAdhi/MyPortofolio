import type { MetadataRoute } from "next";

const SITE_URL = "https://muchlisadhi.my.id";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date().toISOString().slice(0, 10);

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
