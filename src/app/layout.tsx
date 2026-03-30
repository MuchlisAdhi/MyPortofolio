import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

const appFont = Poppins({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Muchlis Adhi Wiratama | Portfolio",
  description:
    "Portfolio landing page of Muchlis Adhi Wiratama, Web Developer / Fullstack Developer.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/`,
    title: "Muchlis Adhi Wiratama | Portfolio",
    description:
      "Portfolio landing page of Muchlis Adhi Wiratama, Web Developer / Fullstack Developer.",
    siteName: "Muchlis Adhi Wiratama Portfolio",
    images: [
      {
        url: "/og/og-image-dark-muchlisadhi.png",
        width: 1200,
        height: 630,
        alt: "Muchlis Adhi Wiratama Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muchlis Adhi Wiratama | Portfolio",
    description:
      "Portfolio landing page of Muchlis Adhi Wiratama, Web Developer / Fullstack Developer.",
    images: ["/og/og-image-dark-muchlisadhi.png"],
  },
  manifest: "/manifest.webmanifest",
  icons: {
    shortcut: "/favicon.svg",
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/icon-192x192.png", sizes: "192x192" }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f6fb" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const setInitialThemeScript = `
    (function() {
      try {
        var storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (error) {
        document.documentElement.classList.remove('dark');
      }
    })();
  `;

  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: setInitialThemeScript }} />
      </head>
      <body className={`${appFont.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
