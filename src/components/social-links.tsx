import type { SocialLink } from "@/lib/data";

interface SocialLinksProps {
  links: SocialLink[];
  compact?: boolean;
  variant?: "plain" | "chip";
}

export function SocialLinks({
  links,
  compact = false,
  variant = "plain",
}: SocialLinksProps) {
  const iconSizeClass = compact ? "h-[18px] w-[18px]" : "h-5 w-5";
  const linkClass =
    variant === "chip"
      ? "inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-[#585858] transition hover:bg-[#f2f2f2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7a7a7a] focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-900"
      : "inline-flex items-center justify-center text-[#5c5c5c] transition hover:text-[#2d2d2d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7a7a7a] focus-visible:ring-offset-2 dark:text-slate-300 dark:hover:text-white dark:focus-visible:ring-offset-slate-900";

  return (
    <ul className={`flex items-center justify-center ${compact ? "gap-4" : "gap-5"}`}>
      {links.map((item) => (
        <li key={item.platform}>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${item.label} - ${item.handle}`}
            className={linkClass}
          >
            {item.platform === "linkedin" ? <LinkedInIcon className={iconSizeClass} /> : null}
            {item.platform === "instagram" ? <InstagramIcon className={iconSizeClass} /> : null}
            {item.platform === "github" ? <GitHubIcon className={iconSizeClass} /> : null}
          </a>
        </li>
      ))}
    </ul>
  );
}

interface IconProps {
  className: string;
}

function LinkedInIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6A2.5 2.5 0 1 1 4.98 3.5ZM.5 8h4V24h-4V8Zm7.5 0h3.8v2.2h.1c.5-1 1.8-2.5 3.8-2.5 4 0 4.8 2.7 4.8 6.2V24h-4v-8.8c0-2.1 0-4.8-3-4.8s-3.4 2.3-3.4 4.7V24h-4V8Z" />
    </svg>
  );
}

function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function GitHubIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.3c-3.4.7-4.1-1.5-4.1-1.5-.6-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.9 2.9 1.4 3.6 1 .1-.8.4-1.4.8-1.7-2.7-.3-5.6-1.3-5.6-6A4.7 4.7 0 0 1 6.4 8c-.1-.3-.6-1.5.1-3.1 0 0 1-.3 3.3 1.2a11 11 0 0 1 6 0c2.2-1.5 3.2-1.2 3.2-1.2.7 1.6.2 2.8.1 3.1a4.7 4.7 0 0 1 1.3 3.2c0 4.7-2.9 5.7-5.6 6 .4.4.8 1.1.8 2.3v3.4c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z" />
    </svg>
  );
}
