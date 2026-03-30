import Link from "next/link";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";

export const mdxComponents: MDXRemoteProps["components"] = {
  h1: ({ children }) => (
    <h1 className="break-words text-balance font-display text-2xl font-semibold leading-tight text-[#262626] max-[360px]:text-[22px] max-[320px]:text-[20px] max-[320px]:leading-[1.32] sm:text-3xl dark:text-white">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-8 break-words text-balance font-display text-2xl font-semibold leading-snug text-[#2f2f2f] max-[360px]:text-[21px] max-[320px]:text-[19px] max-[320px]:leading-[1.34] sm:mt-10 dark:text-white">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-7 break-words text-balance font-display text-[21px] font-semibold leading-snug text-[#333333] max-[360px]:text-[19px] max-[320px]:text-[18px] sm:mt-8 sm:text-xl dark:text-white">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mt-4 text-justify text-[16px] leading-8 text-[#444444] max-[360px]:text-[14px] max-[360px]:leading-7 dark:text-slate-200">
      {children}
    </p>
  ),
  a: ({ href, children }) => {
    if (!href) {
      return <span>{children}</span>;
    }

    if (href.startsWith("/") || href.startsWith("#")) {
      return (
        <Link
          href={href}
          className="break-all font-medium text-[#0f5da8] underline underline-offset-4"
        >
          {children}
        </Link>
      );
    }

    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="break-all font-medium text-[#0f5da8] underline underline-offset-4"
      >
        {children}
      </a>
    );
  },
  ul: ({ children }) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-[16px] leading-8 text-[#444444] max-[360px]:pl-5 max-[360px]:text-[14px] max-[360px]:leading-7 dark:text-slate-200">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-4 list-decimal space-y-2 pl-6 text-[16px] leading-8 text-[#444444] max-[360px]:pl-5 max-[360px]:text-[14px] max-[360px]:leading-7 dark:text-slate-200">
      {children}
    </ol>
  ),
  li: ({ children }) => <li>{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="mt-5 rounded-r-xl border-l-4 border-[#f3c845] bg-[#f6f6f6] px-5 py-4 text-[16px] italic leading-7 text-[#474747] dark:bg-[#1f2430] dark:text-slate-200">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-8 border-[#d8d8d8] dark:border-[#2c3342]" />,
  code: ({ children, className }) => {
    const isCodeBlock = typeof className === "string" && className.startsWith("language-");

    if (isCodeBlock) {
      return <code className="font-mono text-xs sm:text-sm">{children}</code>;
    }

    return (
      <code className="break-words rounded bg-[#eceff4] px-1.5 py-1 font-mono text-[13px] text-[#253047] dark:bg-[#2a3142] dark:text-slate-100">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="mt-5 max-w-full overflow-x-auto rounded-2xl bg-[#1f2430] p-3 text-xs leading-7 text-slate-100 max-[360px]:p-2.5 max-[360px]:text-[11px] sm:p-4 sm:text-sm">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="mt-6 overflow-x-auto rounded-2xl border border-[#d8d8d8] dark:border-[#2f3647]">
      <table className="min-w-full border-collapse text-left text-xs max-[360px]:text-[11px] sm:text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-[#edf0f4] dark:bg-[#202737]">{children}</thead>,
  tbody: ({ children }) => <tbody className="bg-white/80 dark:bg-[#181d28]">{children}</tbody>,
  tr: ({ children }) => (
    <tr className="border-b border-[#d8d8d8] last:border-b-0 dark:border-[#2f3647]">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 font-semibold text-[#2d2d2d] max-[360px]:px-2.5 max-[360px]:py-2 dark:text-slate-100">{children}</th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 text-[#434343] max-[360px]:px-2.5 max-[360px]:py-2 dark:text-slate-200">
      {children}
    </td>
  ),
};
