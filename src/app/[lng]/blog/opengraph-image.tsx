import { ImageResponse } from "next/og";
import {
  getBlogListingPath,
  getNonDefaultBlogLocale,
  getNonDefaultBlogLocaleParams,
} from "@/lib/blog-i18n";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const alt = "Blog";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

interface LocalizedBlogIndexOgImageProps {
  params: Promise<{
    lng: string;
  }>;
}

const localeCopy = {
  en: {
    badge: "Notes and Insights",
    title: "Muchlis Adhi Wiratama Blog",
    description:
      "Articles about backend development, system engineering, and practical web building experiences.",
  },
  jv: {
    badge: "Cathetan lan Insight",
    title: "Blog Muchlis Adhi Wiratama",
    description:
      "Artikel babagan backend development, system engineering, lan pengalaman mbangun aplikasi web.",
  },
} as const;

export function generateStaticParams() {
  return getNonDefaultBlogLocaleParams();
}

export default async function Image({ params }: LocalizedBlogIndexOgImageProps) {
  const { lng } = await params;
  const locale = getNonDefaultBlogLocale(lng);
  const activeLocale = locale ?? "en";
  const copy = localeCopy[activeLocale];

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
          background: "linear-gradient(135deg, #d9dce2 0%, #bcc5d3 100%)",
          color: "#111827",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: 24,
              fontWeight: 600,
              color: "#334155",
            }}
          >
            <div
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "9999px",
                backgroundColor: "#f3c845",
              }}
            />
            {copy.badge}
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.1,
              maxWidth: "980px",
            }}
          >
            {copy.title}
          </div>
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.35,
              color: "#334155",
              maxWidth: "980px",
            }}
          >
            {copy.description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 22px",
              borderRadius: "9999px",
              backgroundColor: "#1d4f91",
              color: "#ffffff",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            {`muchlisadhi.my.id${getBlogListingPath(activeLocale)}`}
          </div>
          <div style={{ fontSize: 24, color: "#475569", fontWeight: 600 }}>
            Muchlis Adhi Wiratama
          </div>
        </div>
      </div>
    ),
    size,
  );
}
