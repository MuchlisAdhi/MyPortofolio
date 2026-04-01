import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { BlogLanguageSwitcher } from "@/components/blog-language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { mdxComponents } from "@/components/mdx-content";
import { formatBlogDate, getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";
import {
  type BlogLocale,
  getBlogListingPath,
  getBlogPostPath,
  getBlogTranslator,
  toBlogLanguageTag,
  toIntlLocale,
} from "@/lib/blog-i18n";
import { SITE_URL } from "@/lib/site";

interface BlogIndexViewProps {
  locale: BlogLocale;
}

interface BlogPostViewProps {
  locale: BlogLocale;
  slug: string;
}

export async function getBlogIndexMetadata(locale: BlogLocale): Promise<Metadata> {
  const { t } = await getBlogTranslator(locale);
  const listingPath = getBlogListingPath(locale);

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: listingPath,
      languages: {
        id: getBlogListingPath("id"),
        en: getBlogListingPath("en"),
        jv: getBlogListingPath("jv"),
      },
    },
    openGraph: {
      type: "website",
      url: `${SITE_URL}${listingPath}`,
      title: t("metaTitle"),
      description: t("metaDescription"),
      siteName: "Muchlis Adhi Wiratama",
      images: [
        {
          url: "/blog/opengraph-image",
          width: 1200,
          height: 630,
          alt: t("schemaBlogName"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("metaTitle"),
      description: t("metaDescription"),
      images: ["/blog/opengraph-image"],
    },
  };
}

export async function getBlogPostMetadata(locale: BlogLocale, slug: string): Promise<Metadata> {
  const { t } = await getBlogTranslator(locale);
  const post = getBlogPostBySlug(slug, locale);

  if (!post) {
    return {
      title: t("notFoundTitle"),
      robots: { index: false, follow: false },
    };
  }

  const localizedPostPath = getBlogPostPath(locale, post.slug);
  const ogImageUrl = `${SITE_URL}/blog/${post.slug}/opengraph-image`;

  return {
    title: `${post.title} | ${t("schemaBlogName")}`,
    description: post.description,
    alternates: {
      canonical: localizedPostPath,
      languages: {
        id: getBlogPostPath("id", post.slug),
        en: getBlogPostPath("en", post.slug),
        jv: getBlogPostPath("jv", post.slug),
      },
    },
    keywords: post.keywords,
    openGraph: {
      type: "article",
      url: `${SITE_URL}${localizedPostPath}`,
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

export async function BlogIndexView({ locale }: BlogIndexViewProps) {
  const { t } = await getBlogTranslator(locale);
  const posts = getAllBlogPosts(locale);
  const listingPath = getBlogListingPath(locale);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: t("schemaBlogName"),
    description: t("schemaBlogDescription"),
    url: `${SITE_URL}${listingPath}`,
    inLanguage: toBlogLanguageTag(locale),
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${SITE_URL}${getBlogPostPath(locale, post.slug)}`,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      author: {
        "@type": "Person",
        name: post.author,
      },
    })),
  };

  return (
    <div className="min-h-screen px-3 py-8 max-[360px]:px-2 max-[320px]:px-1.5 sm:px-6 sm:py-12">
      <main className="relative mx-auto w-full max-w-[920px] rounded-[24px] bg-[#d0d1d4] px-4 pb-10 pt-10 shadow-[0_20px_45px_-28px_rgba(0,0,0,0.35)] max-[360px]:rounded-[20px] max-[360px]:px-3 max-[360px]:pb-8 max-[360px]:pt-9 max-[320px]:px-2.5 max-[320px]:pb-7 max-[320px]:pt-8 sm:rounded-[30px] sm:px-8 sm:pb-12 sm:pt-12 dark:bg-[#151922]">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
          <ThemeToggle />
        </div>

        <header className="rounded-2xl bg-[#e5e7eb]/90 p-4 max-[360px]:p-3.5 max-[320px]:p-3 sm:rounded-3xl sm:p-8 dark:bg-[#1d2330]/75">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#4f5b72] max-[360px]:text-xs max-[360px]:tracking-[0.12em] dark:text-slate-300">
                {t("headerBadge")}
              </p>
              <h1 className="mt-3 text-balance font-display text-[28px] font-semibold leading-tight text-[#2b2b2b] max-[360px]:text-[24px] max-[320px]:text-[22px] sm:text-4xl dark:text-white">
                {t("headerTitle")}
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#4b4b4b] max-[360px]:text-[13px] max-[360px]:leading-6 sm:text-[15px] dark:text-slate-300">
                {t("headerDescription")}
              </p>
            </div>
            <BlogLanguageSwitcher currentLocale={locale} activeLabel={locale === "en" ? "Active" : "Aktif"} />
          </div>

          <nav className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link
              href="/"
              prefetch={false}
              className="rounded-full bg-[#f3c845] px-4 py-2 font-semibold text-[#2d2d2d] transition hover:bg-[#e3b834]"
            >
              {t("home")}
            </Link>
          </nav>
        </header>

        <section className="mt-6 grid grid-cols-1 gap-4 max-[360px]:gap-3 max-[320px]:gap-2.5 sm:mt-8 sm:gap-5 md:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group rounded-2xl bg-[#ececec] p-4 transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-22px_rgba(0,0,0,0.5)] max-[360px]:p-3.5 max-[320px]:p-3 sm:rounded-3xl sm:p-5 dark:bg-[#1a202c]"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#5a5a5a] max-[360px]:text-[10px] max-[360px]:tracking-[0.06em] sm:text-xs sm:tracking-[0.12em] dark:text-slate-400">
                {formatBlogDate(post.publishedAt, toIntlLocale(locale))} | {t("minutesRead", { count: post.readingTimeMinutes })}
              </p>
              <h2 className="mt-2 break-words text-balance font-display text-[22px] leading-[1.28] text-[#2f2f2f] max-[360px]:text-[20px] max-[360px]:leading-[1.3] max-[320px]:text-[18px] max-[320px]:leading-[1.34] max-[320px]:[display:-webkit-box] max-[320px]:[-webkit-box-orient:vertical] max-[320px]:[-webkit-line-clamp:4] sm:mt-3 sm:text-[24px] dark:text-white">
                {post.title}
              </h2>
              <p className="mt-3 text-justify text-sm leading-8 text-[#4f4f4f] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:7] max-[360px]:text-[13px] max-[360px]:leading-7 max-[360px]:[-webkit-line-clamp:6] max-[320px]:text-[12.5px] max-[320px]:leading-6 max-[320px]:[-webkit-line-clamp:5] sm:[-webkit-line-clamp:5] dark:text-slate-300">
                {post.excerpt}
              </p>

              <div className="mt-6 flex flex-wrap gap-2 max-[360px]:mt-5 max-[360px]:gap-1.5 max-[320px]:mt-4 max-[320px]:gap-1">
                {post.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#dde2ea] px-2.5 py-1 text-xs font-medium text-[#354159] max-[360px]:px-2 max-[360px]:py-0.5 max-[360px]:text-[11px] max-[320px]:px-1.5 max-[320px]:text-[10px] dark:bg-[#2f3749] dark:text-slate-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href={getBlogPostPath(locale, post.slug)}
                prefetch={false}
                className="mt-5 inline-flex items-center rounded-full bg-[#1d4f91] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#153a69] max-[360px]:mt-4 max-[360px]:px-3.5 max-[360px]:py-1.5 max-[360px]:text-[13px] max-[320px]:mt-3.5 max-[320px]:px-3 max-[320px]:py-1.5 max-[320px]:text-xs sm:mt-6"
              >
                {t("readArticle")}
              </Link>
            </article>
          ))}
        </section>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}

export async function BlogPostView({ locale, slug }: BlogPostViewProps) {
  const { t } = await getBlogTranslator(locale);
  const post = getBlogPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  const listingPath = getBlogListingPath(locale);
  const localizedPostPath = getBlogPostPath(locale, post.slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    inLanguage: toBlogLanguageTag(locale),
    keywords: post.keywords,
    articleSection: post.tags,
    mainEntityOfPage: `${SITE_URL}${localizedPostPath}`,
    url: `${SITE_URL}${localizedPostPath}`,
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
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 flex-1">
              <nav className="text-sm text-[#4d5a74] max-[360px]:text-[13px] dark:text-slate-300">
                <Link href="/" prefetch={false} className="underline underline-offset-4">
                  {t("breadcrumbsHome")}
                </Link>{" "}
                /{" "}
                <Link href={listingPath} prefetch={false} className="underline underline-offset-4">
                  {t("breadcrumbsBlog")}
                </Link>
              </nav>
              <h1 className="mt-4 break-words text-balance font-display text-[30px] font-semibold leading-tight text-[#2e2e2e] max-[360px]:text-[25px] max-[360px]:leading-[1.24] max-[320px]:text-[22px] max-[320px]:leading-[1.3] sm:text-4xl dark:text-white">
                {post.title}
              </h1>
              <p className="mt-4 text-sm leading-7 text-[#4a4a4a] max-[360px]:text-[13px] max-[360px]:leading-6 sm:text-[15px] dark:text-slate-300">
                {post.description}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-[#555] max-[360px]:gap-1.5 max-[360px]:text-[13px] max-[320px]:gap-1 max-[320px]:text-[12px] sm:mt-5 dark:text-slate-300">
                <span>{formatBlogDate(post.publishedAt, toIntlLocale(locale))}</span>
                <span>|</span>
                <span>{t("minutesRead", { count: post.readingTimeMinutes })}</span>
                <span>|</span>
                <span>{post.author}</span>
              </div>
            </div>
            <BlogLanguageSwitcher
              currentLocale={locale}
              slug={post.slug}
              activeLabel={locale === "en" ? "Active" : "Aktif"}
            />
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
