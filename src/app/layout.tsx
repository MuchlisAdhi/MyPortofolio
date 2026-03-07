import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ServiceWorkerRegister } from "@/components/sw-register";

const jakartaSans = Poppins({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Poppins({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Muchlis Adhi Wiratama | Portfolio",
  description:
    "Portfolio landing page of Muchlis Adhi Wiratama, Web Developer / Fullstack Developer.",
  metadataBase: new URL("https://muchlisadhi.my.id"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://muchlisadhi.my.id/",
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
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${jakartaSans.variable} ${spaceGrotesk.variable} antialiased`}>
        <ThemeProvider>
          {children}
          <ServiceWorkerRegister />
        </ThemeProvider>
      </body>
    </html>
  );
}
