import { getT, initServerI18next } from "next-i18next/server";
import i18nConfig from "../../i18n.config";

export const BLOG_LOCALES = ["id", "en", "jv"] as const;
export type BlogLocale = (typeof BLOG_LOCALES)[number];
export type NonDefaultBlogLocale = Exclude<BlogLocale, "id">;

export const DEFAULT_BLOG_LOCALE: BlogLocale = "id";
const NON_DEFAULT_BLOG_LOCALES = BLOG_LOCALES.filter(
  (locale): locale is NonDefaultBlogLocale => locale !== DEFAULT_BLOG_LOCALE,
);

initServerI18next(i18nConfig);

export function isBlogLocale(value: string): value is BlogLocale {
  return BLOG_LOCALES.includes(value as BlogLocale);
}

export function getNonDefaultBlogLocale(value: string): NonDefaultBlogLocale | null {
  if (!isBlogLocale(value) || value === DEFAULT_BLOG_LOCALE) {
    return null;
  }

  return value as NonDefaultBlogLocale;
}

export function getNonDefaultBlogLocaleParams(): { lng: NonDefaultBlogLocale }[] {
  return NON_DEFAULT_BLOG_LOCALES.map((lng) => ({ lng }));
}

export function getBlogListingPath(locale: BlogLocale): string {
  return locale === DEFAULT_BLOG_LOCALE ? "/blog" : `/${locale}/blog`;
}

export function getBlogPostPath(locale: BlogLocale, slug: string): string {
  return `${getBlogListingPath(locale)}/${slug}`;
}

export function toBlogLanguageTag(locale: BlogLocale): string {
  if (locale === "en") {
    return "en-US";
  }

  if (locale === "jv") {
    return "jv-ID";
  }

  return "id-ID";
}

export function toIntlLocale(locale: BlogLocale): string {
  if (locale === "en") {
    return "en-US";
  }

  if (locale === "jv") {
    return "jv-ID";
  }

  return "id-ID";
}

export async function getBlogTranslator(locale: BlogLocale) {
  return getT("blog", { lng: locale });
}
