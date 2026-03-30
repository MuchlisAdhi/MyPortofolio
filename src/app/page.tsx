import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { EmailButton } from "@/components/email-button";
import { SocialLinks } from "@/components/social-links";
import { StatsRow } from "@/components/stats-row";
import { ThemeToggle } from "@/components/theme-toggle";
import { getStats, profile, projects, skillGroups, socialLinks } from "@/lib/data";

const PortfolioTabs = dynamic(
  () => import("@/components/portfolio-tabs").then((module) => module.PortfolioTabs),
  {
    loading: () => (
      <div className="rounded-2xl bg-[#ececec] p-5 text-sm text-[#5a5a5a] dark:bg-[#1f2430] dark:text-slate-300">
        Loading portfolio...
      </div>
    ),
  },
);

export default function Home() {
  const stats = getStats(new Date().getFullYear());
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen px-4 py-9 sm:px-6 sm:py-12">
      <main className="relative mx-auto w-full max-w-[840px] rounded-[30px] bg-[#d0d1d4] px-5 pb-11 pt-12 shadow-[0_18px_42px_-28px_rgba(0,0,0,0.35)] sm:px-10 dark:bg-[#151922]">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
          <ThemeToggle />
        </div>

        <header className="mx-auto mt-2 w-full max-w-[560px]">
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:justify-center">
            <div className="relative h-[104px] w-[104px] overflow-hidden rounded-full border-[3px] border-[#f3c845]">
              <Image
                src="/avatar.jpg"
                alt="Foto profil Muchlis Adhi Wiratama"
                fill
                sizes="104px"
                className="object-cover"
                priority
              />
            </div>

            <div className="space-y-1 text-center sm:text-left">
              <h1 className="font-display text-[30px] font-semibold leading-tight text-[#434343] dark:text-white">
                {profile.name}
              </h1>
              <p className="text-lg text-[#525252] dark:text-slate-300">{profile.role}</p>
              <address className="not-italic text-[15px] text-[#666666] dark:text-slate-400">
                {profile.location}
              </address>
              <nav aria-label="Social media links" className="pt-2">
                <SocialLinks links={socialLinks} />
              </nav>
            </div>
          </div>
        </header>

        <section aria-labelledby="stats-heading" className="mx-auto mt-10 max-w-[540px]">
          <h2 id="stats-heading" className="sr-only">
            Statistik pengalaman
          </h2>
          <StatsRow items={stats} />
        </section>

        <nav
          aria-label="Primary profile actions"
          className="mx-auto mt-9 grid w-full max-w-[520px] grid-cols-3 gap-3"
        >
          <a
            href="/cv.pdf"
            download
            className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#f3c845] px-3 text-[15px] font-semibold text-[#2f2f2f] transition hover:bg-[#e9bc36] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7a7a7a] focus-visible:ring-offset-2 sm:h-12 sm:px-6 sm:text-[18px] dark:bg-[#f3c845] dark:text-[#222]"
          >
            Download CV
          </a>
          <a
            href="#contact"
            className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#ebebeb] px-3 text-[15px] font-semibold text-[#2f2f2f] transition hover:bg-[#e2e2e2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7a7a7a] focus-visible:ring-offset-2 sm:h-12 sm:px-6 sm:text-[18px] dark:bg-[#2a303d] dark:text-slate-100 dark:hover:bg-[#333a49]"
          >
            Contact me
          </a>
          <Link
            href="/blog"
            prefetch={false}
            className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#1d4f91] px-3 text-[15px] font-semibold text-white transition hover:bg-[#173f73] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7a7a7a] focus-visible:ring-offset-2 sm:h-12 sm:px-6 sm:text-[18px] dark:bg-sky-500 dark:text-[#1a1f29] dark:hover:bg-sky-400"
          >
            Blog
          </Link>
        </nav>

        <section aria-labelledby="portfolio-heading" className="mx-auto mt-11 max-w-[660px]">
          <h2 id="portfolio-heading" className="sr-only">
            Portfolio dan skill
          </h2>
          <PortfolioTabs projects={projects} skillGroups={skillGroups} />
        </section>

        <section
          aria-labelledby="contact-heading"
          id="contact"
          className="mx-auto mt-12 max-w-[560px] rounded-2xl bg-[#e7e7e7] p-6 dark:bg-[#202633]"
        >
          <h2 id="contact-heading" className="font-display text-2xl font-semibold text-[#383838] dark:text-white">
            Let&apos;s build something useful together
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#565656] dark:text-slate-300">
            Terbuka untuk kolaborasi pengembangan web, sistem internal perusahaan, dan
            digitalisasi proses bisnis.
          </p>
          <div className="mt-4">
            <EmailButton />
          </div>
        </section>

        <footer className="mt-10 flex flex-col items-center justify-between gap-4 text-sm text-[#686868] sm:flex-row dark:text-slate-400">
          <p>&copy; {currentYear} Muchlis Adhi Wiratama.</p>
          <nav aria-label="Footer social links">
            <SocialLinks links={socialLinks} compact variant="chip" />
          </nav>
        </footer>
      </main>
    </div>
  );
}
