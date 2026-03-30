import type { StatItem } from "@/lib/data";

interface StatsRowProps {
  items: StatItem[];
}

export function StatsRow({ items }: StatsRowProps) {
  return (
    <dl className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3 sm:gap-2">
      {items.map((item) => (
        <div key={item.label} className="flex flex-col px-2 py-1">
          <dt className="order-2 mx-auto mt-2 max-w-[120px] text-[15px] leading-6 text-[#4f4f4f] dark:text-slate-300">
            {item.label}
          </dt>
          <dd className="order-1 font-display text-[30px] font-medium leading-none text-[#4a4a4a] dark:text-white">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
