import type { Metadata } from "next";
import { BlogIndexView, getBlogIndexMetadata } from "@/app/blog/_shared";
import { DEFAULT_BLOG_LOCALE } from "@/lib/blog-i18n";

export async function generateMetadata(): Promise<Metadata> {
  return getBlogIndexMetadata(DEFAULT_BLOG_LOCALE);
}

export default async function BlogPage() {
  return <BlogIndexView locale={DEFAULT_BLOG_LOCALE} />;
}
