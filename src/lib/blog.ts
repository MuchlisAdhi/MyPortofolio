import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import { SITE_URL } from "@/lib/site";

const BLOG_DIRECTORY = path.join(process.cwd(), "content", "blog");
const FALLBACK_IMAGE = "/og/og-image-dark-muchlisadhi.png";
const DEFAULT_AUTHOR = "Muchlis Adhi Wiratama";

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

function parseBlogFile(fileName: string): BlogPost {
  const slug = fileName.replace(/\.mdx$/i, "");
  const filePath = path.join(BLOG_DIRECTORY, fileName);
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
  const keywords = Array.from(new Set([...asStringArray(frontmatter.keywords), ...tags]));
  const image = resolveImagePath(frontmatter.image);
  const canonical = `${SITE_URL}/blog/${slug}`;

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

const getAllBlogPostsInternal = cache((): BlogPost[] => {
  if (!fs.existsSync(BLOG_DIRECTORY)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_DIRECTORY)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map(parseBlogFile)
    .sort(
      (left, right) =>
        new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime(),
    );
});

export const getAllBlogPosts = cache((): BlogPostSummary[] =>
  getAllBlogPostsInternal().map((post) => ({
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
  })),
);

export const getBlogPostBySlug = cache((slug: string): BlogPost | null => {
  const match = getAllBlogPostsInternal().find((post) => post.slug === slug);
  return match ?? null;
});

export function formatBlogDate(dateInput: string): string {
  const parsed = new Date(dateInput);
  if (Number.isNaN(parsed.getTime())) {
    return dateInput;
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(parsed);
}

export function resolveBlogImageUrl(imagePath: string): string {
  return toAbsoluteUrl(imagePath);
}
