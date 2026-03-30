import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx-content";
import { formatBlogDate, getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

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
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Artikel tidak ditemukan | Muchlis Adhi Wiratama",
      robots: { index: false, follow: false },
    };
  }

  const ogImageUrl = `${SITE_URL}/blog/${post.slug}/opengraph-image`;

  return {
    title: `${post.title} | Blog Muchlis Adhi Wiratama`,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    keywords: post.keywords,
    openGraph: {
      type: "article",
      url: post.canonical,
      title: post.title,
      description: post.description,
      siteName: "Muchlis Adhi Wiratama",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    inLanguage: "id-ID",
    keywords: post.keywords,
    articleSection: post.tags,
    mainEntityOfPage: post.canonical,
    url: post.canonical,
    image: `${SITE_URL}/blog/${post.slug}/opengraph-image`,
    author: {
      "@type": "Person",
      name: post.author,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Muchlis Adhi Wiratama",
      url: SITE_URL,
    },
  };

  return (
    <div className="min-h-screen px-3 py-8 max-[360px]:px-2 max-[320px]:px-1.5 sm:px-6 sm:py-12">
      <main className="mx-auto w-full max-w-[920px] rounded-[24px] bg-[#d0d1d4] px-4 pb-10 pt-8 shadow-[0_20px_45px_-28px_rgba(0,0,0,0.35)] max-[360px]:rounded-[20px] max-[360px]:px-3 max-[360px]:pb-8 max-[320px]:px-2.5 max-[320px]:pb-7 sm:rounded-[30px] sm:px-10 sm:pb-12 sm:pt-10 dark:bg-[#151922]">
        <header className="rounded-2xl bg-[#e8eaee] p-4 max-[360px]:p-3.5 max-[320px]:p-3 sm:rounded-3xl sm:p-8 dark:bg-[#1f2533]">
          <nav className="text-sm text-[#4d5a74] max-[360px]:text-[13px] dark:text-slate-300">
            <Link href="/" prefetch={false} className="underline underline-offset-4">
              Home
            </Link>{" "}
            /{" "}
            <Link href="/blog" prefetch={false} className="underline underline-offset-4">
              Blog
            </Link>
          </nav>
          <h1 className="mt-4 break-words text-balance font-display text-[30px] font-semibold leading-tight text-[#2e2e2e] max-[360px]:text-[25px] max-[360px]:leading-[1.24] max-[320px]:text-[22px] max-[320px]:leading-[1.3] sm:text-4xl dark:text-white">
            {post.title}
          </h1>
          <p className="mt-4 text-sm leading-7 text-[#4a4a4a] max-[360px]:text-[13px] max-[360px]:leading-6 sm:text-[15px] dark:text-slate-300">
            {post.description}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-[#555] max-[360px]:gap-1.5 max-[360px]:text-[13px] max-[320px]:gap-1 max-[320px]:text-[12px] sm:mt-5 dark:text-slate-300">
            <span>{formatBlogDate(post.publishedAt)}</span>
            <span>|</span>
            <span>{post.readingTimeMinutes} min read</span>
            <span>|</span>
            <span>{post.author}</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 max-[360px]:gap-1.5 max-[320px]:gap-1">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#d8dde8] px-2.5 py-1 text-xs font-medium text-[#33415a] max-[360px]:px-2 max-[360px]:py-0.5 max-[360px]:text-[11px] max-[320px]:px-1.5 max-[320px]:text-[10px] dark:bg-[#2f3749] dark:text-slate-100"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <article className="mt-6 rounded-2xl bg-[#f4f4f4] px-4 py-6 max-[360px]:px-3 max-[360px]:py-5 max-[320px]:px-2.5 max-[320px]:py-4 sm:mt-8 sm:rounded-3xl sm:px-8 sm:py-9 dark:bg-[#181d27]">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </article>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
