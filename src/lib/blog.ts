import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import { SITE_URL } from "@/lib/site";

const BLOG_DIRECTORY = path.join(process.cwd(), "content", "blog");
const FALLBACK_IMAGE = "/og/og-image-dark-muchlisadhi.png";
const DEFAULT_AUTHOR = "Muchlis Adhi Wiratama";

type BlogLocale = "id" | "en" | "jv";

interface BlogSeoConfig {
  title?: string;
  description?: string;
}

interface BlogFrontmatter {
  title?: string;
  description?: string;
  excerpt?: string;
  date?: string;
  publishedAt?: string;
  updatedAt?: string;
  author?: string;
  tags?: string[];
  keywords?: string[];
  image?: string;
  seo?: BlogSeoConfig;
}

export interface BlogPostSummary {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  keywords: string[];
  image: string;
  canonical: string;
  readingTimeMinutes: number;
}

export interface BlogPost extends BlogPostSummary {
  content: string;
}

function normalizeBlogLocale(locale?: string): BlogLocale {
  if (locale === "en") {
    return "en";
  }

  if (locale === "jv") {
    return "jv";
  }

  return "id";
}

function getBlogDirectoryCandidates(locale: BlogLocale): string[] {
  const localizedDirectory = path.join(BLOG_DIRECTORY, locale);

  if (locale === "id") {
    return [localizedDirectory, BLOG_DIRECTORY];
  }

  return [localizedDirectory, path.join(BLOG_DIRECTORY, "id"), BLOG_DIRECTORY];
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

function asDateString(value: unknown): string | null {
  if (typeof value !== "string" || !value.trim()) {
    return null;
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed.toISOString();
}

function resolveImagePath(value: unknown): string {
  if (typeof value !== "string" || !value.trim()) {
    return FALLBACK_IMAGE;
  }

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  if (value.startsWith("/")) {
    const publicImagePath = path.join(process.cwd(), "public", value.slice(1));
    return fs.existsSync(publicImagePath) ? value : FALLBACK_IMAGE;
  }

  return FALLBACK_IMAGE;
}

function sanitizeMdxContent(rawContent: string): string {
  const firstHeadingIndex = rawContent.search(/^#\s+/m);
  const contentWithHeading =
    firstHeadingIndex >= 0 ? rawContent.slice(firstHeadingIndex) : rawContent;

  return contentWithHeading.trim();
}

function toPlainText(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]+`/g, " ")
    .replace(/!\[[^\]]*]\([^)]+\)/g, " ")
    .replace(/\[[^\]]*]\([^)]+\)/g, " ")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/[*_~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function resolveExcerpt(frontmatterExcerpt: unknown, content: string): string {
  if (typeof frontmatterExcerpt === "string" && frontmatterExcerpt.trim()) {
    return frontmatterExcerpt.trim();
  }

  const plainText = toPlainText(content);
  return plainText.length > 180 ? `${plainText.slice(0, 177)}...` : plainText;
}

function estimateReadingTime(content: string): number {
  const words = toPlainText(content).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

function toAbsoluteUrl(urlOrPath: string): string {
  return urlOrPath.startsWith("http://") || urlOrPath.startsWith("https://")
    ? urlOrPath
    : `${SITE_URL}${urlOrPath}`;
}

function getCanonicalPath(locale: BlogLocale, slug: string): string {
  return locale === "id" ? `/blog/${slug}` : `/${locale}/blog/${slug}`;
}

function parseBlogFile(filePath: string, locale: BlogLocale): BlogPost {
  const slug = path.basename(filePath).replace(/\.mdx$/i, "");
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);
  const frontmatter = data as BlogFrontmatter;
  const cleanedContent = sanitizeMdxContent(content);

  const publishedAt =
    asDateString(frontmatter.publishedAt) ??
    asDateString(frontmatter.date) ??
    new Date().toISOString();
  const updatedAt =
    asDateString(frontmatter.updatedAt) ??
    asDateString(frontmatter.publishedAt) ??
    asDateString(frontmatter.date) ??
    publishedAt;

  const seoTitle =
    typeof frontmatter.seo?.title === "string" ? frontmatter.seo.title : null;
  const seoDescription =
    typeof frontmatter.seo?.description === "string"
      ? frontmatter.seo.description
      : null;

  const title =
    seoTitle?.trim() ||
    (typeof frontmatter.title === "string" ? frontmatter.title.trim() : "") ||
    slug;
  const description =
    seoDescription?.trim() ||
    (typeof frontmatter.description === "string"
      ? frontmatter.description.trim()
      : "") ||
    "Artikel blog Muchlis Adhi Wiratama.";
  const tags = asStringArray(frontmatter.tags);
  const keywords = Array.from(
    new Set([...asStringArray(frontmatter.keywords), ...tags]),
  );
  const image = resolveImagePath(frontmatter.image);
  const canonical = `${SITE_URL}${getCanonicalPath(locale, slug)}`;

  return {
    slug,
    title,
    description,
    excerpt: resolveExcerpt(frontmatter.excerpt, cleanedContent),
    author:
      typeof frontmatter.author === "string" && frontmatter.author.trim()
        ? frontmatter.author.trim()
        : DEFAULT_AUTHOR,
    publishedAt,
    updatedAt,
    tags,
    keywords,
    image,
    canonical,
    readingTimeMinutes: estimateReadingTime(cleanedContent),
    content: cleanedContent,
  };
}

const getAllBlogPostsInternal = cache((locale: BlogLocale): BlogPost[] => {
  const filesBySlug = new Map<string, string>();

  for (const directory of getBlogDirectoryCandidates(locale)) {
    if (!fs.existsSync(directory) || !fs.statSync(directory).isDirectory()) {
      continue;
    }

    const fileNames = fs
      .readdirSync(directory)
      .filter((fileName) => fileName.endsWith(".mdx"));

    for (const fileName of fileNames) {
      const slug = fileName.replace(/\.mdx$/i, "");

      if (!filesBySlug.has(slug)) {
        filesBySlug.set(slug, path.join(directory, fileName));
      }
    }
  }

  return Array.from(filesBySlug.values())
    .map((filePath) => parseBlogFile(filePath, locale))
    .sort(
      (left, right) =>
        new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime(),
    );
});

export const getAllBlogPosts = cache((locale: BlogLocale = "id"): BlogPostSummary[] => {
  const normalizedLocale = normalizeBlogLocale(locale);

  return getAllBlogPostsInternal(normalizedLocale).map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    excerpt: post.excerpt,
    author: post.author,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    tags: post.tags,
    keywords: post.keywords,
    image: post.image,
    canonical: post.canonical,
    readingTimeMinutes: post.readingTimeMinutes,
  }));
});

export const getBlogPostBySlug = cache(
  (slug: string, locale: BlogLocale = "id"): BlogPost | null => {
    const normalizedLocale = normalizeBlogLocale(locale);
    const match = getAllBlogPostsInternal(normalizedLocale).find(
      (post) => post.slug === slug,
    );

    return match ?? null;
  },
);

export function formatBlogDate(dateInput: string, locale: string = "id-ID"): string {
  const parsed = new Date(dateInput);
  if (Number.isNaN(parsed.getTime())) {
    return dateInput;
  }

  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(parsed);
}

export function resolveBlogImageUrl(imagePath: string): string {
  return toAbsoluteUrl(imagePath);
}
