const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://muchlisadhi.my.id";

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl,
  outDir: "out",
  generateRobotsTxt: false,
  generateIndexSitemap: false,
  exclude: [
    "/404",
    "/500",
    "/robots.txt",
    "/manifest.webmanifest",
    "/blog/opengraph-image",
    "/blog/*/opengraph-image",
  ],
  transform: async (ctx, path) => {
    return {
      loc: path,
      changefreq: path === "/" ? "weekly" : "monthly",
      priority: path === "/" ? 1 : 0.7,
      lastmod: new Date().toISOString(),
      alternateRefs: ctx.alternateRefs ?? [],
    };
  },
  additionalPaths: async () => {
    return [
      {
        loc: "/blog",
        changefreq: "weekly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      },
    ];
  },
};

module.exports = config;
