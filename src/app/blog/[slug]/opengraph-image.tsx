import { ImageResponse } from "next/og";
import { formatBlogDate, getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const alt = "Blog Post";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

interface BlogOgImageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

function truncate(value: string, limit: number): string {
  if (value.length <= limit) {
    return value;
  }

  return `${value.slice(0, limit - 3).trim()}...`;
}

export default async function Image({ params }: BlogOgImageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  const title = post ? truncate(post.title, 96) : "Artikel Blog";
  const excerpt = post
    ? truncate(post.excerpt || post.description, 170)
    : "Artikel teknis dari Muchlis Adhi Wiratama.";
  const published = post ? formatBlogDate(post.publishedAt) : "";
  const tags = post?.tags.slice(0, 3) ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px",
          background: "linear-gradient(135deg, #1a2234 0%, #2b3f66 100%)",
          color: "#e2e8f0",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "18px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              fontSize: 24,
              color: "#cbd5e1",
              fontWeight: 600,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "9999px",
                  backgroundColor: "#f3c845",
                }}
              />
              Blog Post
            </div>
            <div>{published}</div>
          </div>

          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              lineHeight: 1.12,
              maxWidth: "1060px",
              color: "#f8fafc",
            }}
          >
            {title}
          </div>

          <div
            style={{
              fontSize: 30,
              lineHeight: 1.35,
              color: "#dbe3ef",
              maxWidth: "1060px",
            }}
          >
            {excerpt}
          </div>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "10px 18px",
                  borderRadius: "9999px",
                  backgroundColor: "#d9e2ef",
                  color: "#23334f",
                  fontSize: 22,
                  fontWeight: 700,
                }}
              >
                {tag}
              </div>
            ))}
          </div>

          <div style={{ fontSize: 24, color: "#dbe3ef", fontWeight: 700 }}>
            {`muchlisadhi.my.id/blog/${slug}`}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
