import type { StatItem } from "@/lib/data";

interface StatsRowProps {
  items: StatItem[];
}

export function StatsRow({ items }: StatsRowProps) {
  return (
    <section
      aria-label="Portfolio statistics"
      className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3 sm:gap-2"
    >
      {items.map((item) => (
        <article key={item.label} className="px-2 py-1">
          <p className="font-display text-[30px] font-medium leading-none text-[#4a4a4a] dark:text-white">
            {item.value}
          </p>
          <p className="mx-auto mt-2 max-w-[120px] text-[15px] leading-6 text-[#4f4f4f] dark:text-slate-300">
            {item.label}
          </p>
        </article>
      ))}
    </section>
  );
}
