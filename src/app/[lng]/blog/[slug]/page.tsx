import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostView, getBlogPostMetadata } from "@/app/blog/_shared";
import { getAllBlogPosts } from "@/lib/blog";
import { getNonDefaultBlogLocale, getNonDefaultBlogLocaleParams } from "@/lib/blog-i18n";

interface LocalizedBlogPostPageProps {
  params: Promise<{
    lng: string;
    slug: string;
  }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getNonDefaultBlogLocaleParams().flatMap(({ lng }) =>
    getAllBlogPosts(lng).map((post) => ({ lng, slug: post.slug })),
  );
}

export async function generateMetadata({ params }: LocalizedBlogPostPageProps): Promise<Metadata> {
  const { lng, slug } = await params;
  const locale = getNonDefaultBlogLocale(lng);

  if (!locale) {
    return {
      title: "Blog | Muchlis Adhi Wiratama",
      robots: { index: false, follow: false },
    };
  }

  return getBlogPostMetadata(locale, slug);
}

export default async function LocalizedBlogPostPage({ params }: LocalizedBlogPostPageProps) {
  const { lng, slug } = await params;
  const locale = getNonDefaultBlogLocale(lng);

  if (!locale) {
    notFound();
  }

  return <BlogPostView locale={locale} slug={slug} />;
}
