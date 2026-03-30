import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const alt = "Blog Muchlis Adhi Wiratama";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

export default function Image() {
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
            Notes and Insights
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.1,
              maxWidth: "980px",
            }}
          >
            Blog Muchlis Adhi Wiratama
          </div>
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.35,
              color: "#334155",
              maxWidth: "980px",
            }}
          >
            Artikel tentang backend development, system engineering, dan pengalaman membangun
            aplikasi web.
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
            muchlisadhi.my.id/blog
          </div>
          <div style={{ fontSize: 24, color: "#475569", fontWeight: 600 }}>Muchlis Adhi Wiratama</div>
        </div>
      </div>
    ),
    size,
  );
}
