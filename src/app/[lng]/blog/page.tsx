import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogIndexView, getBlogIndexMetadata } from "@/app/blog/_shared";
import { getNonDefaultBlogLocale, getNonDefaultBlogLocaleParams } from "@/lib/blog-i18n";

interface LocalizedBlogPageProps {
  params: Promise<{
    lng: string;
  }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getNonDefaultBlogLocaleParams();
}

export async function generateMetadata({ params }: LocalizedBlogPageProps): Promise<Metadata> {
  const { lng } = await params;
  const locale = getNonDefaultBlogLocale(lng);

  if (!locale) {
    return {
      title: "Blog | Muchlis Adhi Wiratama",
      robots: { index: false, follow: false },
    };
  }

  return getBlogIndexMetadata(locale);
}

export default async function LocalizedBlogPage({ params }: LocalizedBlogPageProps) {
  const { lng } = await params;
  const locale = getNonDefaultBlogLocale(lng);

  if (!locale) {
    notFound();
  }

  return <BlogIndexView locale={locale} />;
}
