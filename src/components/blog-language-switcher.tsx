import Link from "next/link";
import {
  type BlogLocale,
  getBlogListingPath,
  getBlogPostPath,
} from "@/lib/blog-i18n";

interface BlogLanguageSwitcherProps {
  currentLocale: BlogLocale;
  slug?: string;
  activeLabel?: string;
}

const localeOptions: Array<{
  locale: BlogLocale;
  label: string;
  shortLabel: string;
  flag: string;
}> = [
  {
    locale: "id",
    label: "Bahasa Indonesia",
    shortLabel: "ID",
    flag: "ID",
  },
  {
    locale: "en",
    label: "English",
    shortLabel: "EN",
    flag: "EN",
  },
  {
    locale: "jv",
    label: "Basa Jawa",
    shortLabel: "JV",
    flag: "JV",
  },
];

function resolveHref(locale: BlogLocale, slug?: string): string {
  if (!slug) {
    return getBlogListingPath(locale);
  }

  return getBlogPostPath(locale, slug);
}

export function BlogLanguageSwitcher({
  currentLocale,
  slug,
  activeLabel = "Aktif",
}: BlogLanguageSwitcherProps) {
  const activeLocale =
    localeOptions.find((option) => option.locale === currentLocale) ?? localeOptions[0];

  return (
    <details className="group relative z-20">
      <summary className="flex list-none cursor-pointer items-center gap-2 rounded-full border border-[#d4d7dd] bg-white px-3 py-2 text-sm font-semibold text-[#30323a] shadow-[0_10px_20px_-16px_rgba(0,0,0,0.45)] transition hover:border-[#bec3cc] hover:bg-[#f7f7f8] [&::-webkit-details-marker]:hidden dark:border-[#394152] dark:bg-[#151a24] dark:text-slate-100 dark:hover:border-[#4a5266] dark:hover:bg-[#1a2030]">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#1f2330] text-[11px] font-bold tracking-[0.12em] text-white dark:bg-[#f3f4f6] dark:text-[#111827]">
          {activeLocale.flag}
        </span>
        <span className="min-w-[24px] text-[13px] font-semibold uppercase tracking-[0.12em]">
          {activeLocale.shortLabel}
        </span>
        <span className="text-[11px] text-[#6c7482] dark:text-slate-400">v</span>
      </summary>

      <div className="absolute right-0 mt-2 w-[min(16rem,calc(100vw-2.25rem))] rounded-2xl border border-[#d6dae2] bg-[#f7f7f8] p-2 shadow-[0_16px_28px_-16px_rgba(0,0,0,0.55)] max-[360px]:w-[min(14rem,calc(100vw-2rem))] dark:border-[#3a4355] dark:bg-[#161c29]">
        <ul className="space-y-1">
          {localeOptions.map((option) => {
            const isActive = option.locale === currentLocale;

            return (
              <li key={option.locale}>
                <Link
                  href={resolveHref(option.locale, slug)}
                  prefetch={false}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm text-[#2f3440] transition hover:bg-white dark:text-slate-100 dark:hover:bg-[#20293a]"
                >
                  <span className="flex items-center gap-2">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#111827] text-[11px] font-bold tracking-[0.1em] text-white dark:bg-[#e5e7eb] dark:text-[#111827]">
                      {option.flag}
                    </span>
                    <span>{option.label}</span>
                  </span>
                  {isActive ? (
                    <span className="rounded-full bg-[#f3c845] px-2 py-0.5 text-[11px] font-semibold text-[#222]">
                      {activeLabel}
                    </span>
                  ) : (
                    <span className="text-[11px] uppercase tracking-[0.12em] text-[#707887] dark:text-slate-400">
                      {option.shortLabel}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </details>
  );
}
