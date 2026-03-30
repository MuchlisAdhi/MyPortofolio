"use client";

import { useState } from "react";
import type { Project, SkillGroup } from "@/lib/data";
import { ProjectCard } from "@/components/project-card";
import type { IconType } from "react-icons";
import {
  DiCode,
  DiCss3,
  DiDotnet,
  DiHtml5,
  DiJavascript1,
  DiLaravel,
  DiMsqlServer,
  DiMysql,
  DiNodejs,
  DiPostgresql,
  DiVisualstudio,
  DiWindows,
} from "react-icons/di";
import { SiRubyonrails } from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { FaLightbulb, FaUsers } from "react-icons/fa6";

type TabKey = "portfolio" | "skills";

interface PortfolioTabsProps {
  projects: Project[];
  skillGroups: SkillGroup[];
}

const tabs: { key: TabKey; label: string }[] = [
  { key: "portfolio", label: "Portfolio" },
  { key: "skills", label: "Skills" },
];
const PROJECTS_PER_PAGE = 4;

const skillIconMap: Record<
  string,
  { icon: IconType; iconClass: string; bgClass: string }
> = {
  "VB.Net": {
    icon: DiVisualstudio,
    iconClass: "text-[#5C2D91]",
    bgClass: "bg-[#efe8fb]",
  },
  "ASP.Net MVC": {
    icon: DiDotnet,
    iconClass: "text-[#512BD4]",
    bgClass: "bg-[#ece8fb]",
  },
  "Ruby On Rails": {
    icon: SiRubyonrails,
    iconClass: "text-[#CC0000]",
    bgClass: "bg-[#fdeaea]",
  },
  JavaScript: {
    icon: DiJavascript1,
    iconClass: "text-[#D6B400]",
    bgClass: "bg-[#fff7d9]",
  },
  "Node.js": {
    icon: DiNodejs,
    iconClass: "text-[#3C873A]",
    bgClass: "bg-[#e9f6e9]",
  },
  "HTML/CSS": {
    icon: DiHtml5,
    iconClass: "text-[#E34F26]",
    bgClass: "bg-[#fdeee9]",
  },
  Laravel: {
    icon: DiLaravel,
    iconClass: "text-[#FF2D20]",
    bgClass: "bg-[#ffe9e7]",
  },
  MySQL: {
    icon: DiMysql,
    iconClass: "text-[#00758F]",
    bgClass: "bg-[#e8f4f7]",
  },
  "Microsoft SQL Server": {
    icon: DiMsqlServer,
    iconClass: "text-[#CC2927]",
    bgClass: "bg-[#fde9e9]",
  },
  PostgreSQL: {
    icon: DiPostgresql,
    iconClass: "text-[#336791]",
    bgClass: "bg-[#e9eff7]",
  },
  "REST API": {
    icon: TbApi,
    iconClass: "text-[#0E7490]",
    bgClass: "bg-[#e8f8fb]",
  },
  "Windows Server deployment": {
    icon: DiWindows,
    iconClass: "text-[#0078D4]",
    bgClass: "bg-[#e8f2fb]",
  },
  CPanel: {
    icon: DiCode,
    iconClass: "text-[#FF6C2C]",
    bgClass: "bg-[#fff0e8]",
  },
  ".NET Framework": {
    icon: DiDotnet,
    iconClass: "text-[#512BD4]",
    bgClass: "bg-[#ece8fb]",
  },
  Teamwork: {
    icon: FaUsers,
    iconClass: "text-[#2563EB]",
    bgClass: "bg-[#e8efff]",
  },
  "problem solving": {
    icon: FaLightbulb,
    iconClass: "text-[#CA8A04]",
    bgClass: "bg-[#fef3c7]",
  },
};

export function PortfolioTabs({ projects, skillGroups }: PortfolioTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("portfolio");
  const [visibleProjectPage, setVisibleProjectPage] = useState(1);
  const visibleProjectCount = Math.min(
    visibleProjectPage * PROJECTS_PER_PAGE,
    projects.length,
  );
  const visibleProjects = projects.slice(0, visibleProjectCount);
  const hasMoreProjects = visibleProjectCount < projects.length;

  return (
    <section aria-label="Portfolio section" className="space-y-8">
      <div
        role="tablist"
        aria-label="Portfolio tabs"
        className="mx-auto grid max-w-[460px] grid-cols-2 rounded-2xl bg-[#ececec] p-2 dark:bg-[#1f2430]"
      >
        {tabs.map((tab) => {
          const selected = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              id={`tab-${tab.key}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`panel-${tab.key}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-xl px-5 py-3 text-base font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b6b6b] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ${
                selected
                  ? "bg-[#cfcfcf] text-[#2f2f2f] dark:bg-[#31384a] dark:text-white"
                  : "text-[#3b3b3b] hover:text-[#1f1f1f] dark:text-slate-300 dark:hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === "portfolio" ? (
        <section
          role="tabpanel"
          id="panel-portfolio"
          aria-labelledby="tab-portfolio"
          className="space-y-5"
        >
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {visibleProjects.map((project) => (
              <li key={project.title}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>

          {hasMoreProjects ? (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() =>
                  setVisibleProjectPage((prevPage) => prevPage + 1)
                }
                className="rounded-full bg-[#1d4f91] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#163c6c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b6b6b] focus-visible:ring-offset-2 dark:bg-sky-500 dark:text-[#1a1f29] dark:hover:bg-sky-400 dark:focus-visible:ring-offset-slate-900"
              >
                Load More
              </button>
            </div>
          ) : null}
        </section>
      ) : (
        <section
          role="tabpanel"
          id="panel-skills"
          aria-labelledby="tab-skills"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {skillGroups.map((group) => (
            <article
              key={group.title}
              className="rounded-2xl bg-[#ececec] p-5 dark:bg-[#1a1e29]"
            >
              <h3 className="font-display text-lg font-semibold text-[#2f2f2f] dark:text-white">
                {group.title}
              </h3>
              <ul className="mt-4 grid grid-cols-1 gap-2">
                {group.items.map((item) => (
                  <SkillCard key={item} label={item} />
                ))}
              </ul>
            </article>
          ))}
        </section>
      )}
    </section>
  );
}

interface SkillCardProps {
  label: string;
}

function SkillCard({ label }: SkillCardProps) {
  const config = skillIconMap[label];
  const Icon = config?.icon ?? DiCss3;

  return (
    <li className="flex items-center gap-3 rounded-xl bg-white/95 px-3 py-2 dark:bg-[#242a38]">
      <span
        className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${config?.bgClass ?? "bg-slate-100"} dark:bg-[#1a2234]`}
        aria-hidden="true"
      >
        <Icon className={`h-5 w-5 ${config?.iconClass ?? "text-slate-600"} dark:text-slate-200`} />
      </span>
      <span className="text-sm font-medium text-[#3f3f3f] dark:text-slate-100">{label}</span>
    </li>
  );
}
