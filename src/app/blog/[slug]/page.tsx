import type { Metadata } from "next";
import { BlogPostView, getBlogPostMetadata } from "@/app/blog/_shared";
import { getAllBlogPosts } from "@/lib/blog";
import { DEFAULT_BLOG_LOCALE } from "@/lib/blog-i18n";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  return getBlogPostMetadata(DEFAULT_BLOG_LOCALE, slug);
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  return <BlogPostView locale={DEFAULT_BLOG_LOCALE} slug={slug} />;
}
