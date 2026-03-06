"use client";

import { useState } from "react";
import Image from "next/image";
import type { Project } from "@/lib/data";
import { FiExternalLink } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const mobileTechStack = isExpanded ? project.techStack.slice(0, 3) : project.techStack.slice(0, 2);
  const hiddenTechCount = project.techStack.length - mobileTechStack.length;

  return (
    <article className="group overflow-hidden rounded-[14px] bg-[#ececec] transition hover:-translate-y-0.5 dark:bg-[#1a1f29]">
      <div className="relative aspect-[16/10] overflow-hidden rounded-t-[14px]">
        <Image
          src={project.image}
          alt={`Preview ${project.title}`}
          fill
          sizes="(min-width: 640px) 320px, 100vw"
          className="object-cover object-top transition duration-300 group-hover:scale-[1.03]"
        />
      </div>

      <div
        className={`relative overflow-hidden rounded-b-[14px] transition-[height] duration-500 sm:hidden ${
          isExpanded ? "h-[340px]" : "h-[260px]"
        }`}
      >
        <div
          className={`absolute inset-x-0 bottom-0 flex h-full flex-col bg-[#f5f5f5] p-3 transition duration-500 dark:bg-[#222938] ${
            isExpanded ? "translate-y-0" : "translate-y-[170px]"
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#f3c845] px-2 py-1 text-[11px] font-semibold text-[#2f2f2f]">
              <HiSparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {project.role}
            </span>
            <div className="flex items-center gap-2">
              <p className="shrink-0 text-xs font-medium text-[#6c6c6c] dark:text-slate-300">{project.year}</p>
              <button
                type="button"
                onClick={() => setIsExpanded((prevState) => !prevState)}
                className="rounded-full bg-[#dfe2ea] px-2.5 py-1 text-[11px] font-semibold text-[#30384b] transition hover:bg-[#d0d5e0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b6b6b] focus-visible:ring-offset-2 dark:bg-[#31384c] dark:text-slate-100 dark:hover:bg-[#3a4258]"
              >
                {isExpanded ? "Tutup" : "Detail"}
              </button>
            </div>
          </div>

          <h3 className="mt-2 text-[15px] font-semibold leading-5 text-[#2f2f2f] dark:text-white">
            {project.title}
          </h3>

          <p
            className={`mt-1 overflow-hidden text-xs leading-5 text-[#5d5d5d] [display:-webkit-box] [-webkit-box-orient:vertical] dark:text-slate-300 ${
              isExpanded ? "[-webkit-line-clamp:5]" : "[-webkit-line-clamp:2]"
            }`}
          >
            {project.description}
          </p>

          <ul className="mt-2 flex flex-wrap gap-1.5">
            {mobileTechStack.map((tech) => (
              <li
                key={tech}
                className="rounded-md bg-white px-2 py-1 text-[11px] text-[#666] dark:bg-[#2d3446] dark:text-slate-200"
              >
                {tech}
              </li>
            ))}
            {hiddenTechCount > 0 ? (
              <li className="rounded-md bg-[#dfe2ea] px-2 py-1 text-[11px] font-medium text-[#4b5566] dark:bg-[#31384c] dark:text-slate-200">
                +{hiddenTechCount} more
              </li>
            ) : null}
          </ul>

          <div className="mt-auto flex items-center justify-end pt-3">
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#1d4f91] px-2.5 py-1 text-[11px] font-semibold text-white transition hover:bg-[#163c6c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b6b6b] focus-visible:ring-offset-2 dark:bg-sky-500 dark:text-[#1a1f29] dark:hover:bg-sky-400 dark:focus-visible:ring-offset-slate-900"
              >
                <FiExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                Visit
              </a>
            ) : (
              <p className="text-xs text-[#8b8b8b] dark:text-slate-500">No link</p>
            )}
          </div>
        </div>
      </div>

      <div className="relative hidden h-[280px] overflow-hidden rounded-b-[14px] sm:block">
        <div className="absolute inset-x-0 bottom-0 flex h-full flex-col bg-[#f5f5f5] p-3 transition duration-500 translate-y-[188px] group-hover:translate-y-0 dark:bg-[#222938]">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#f3c845] px-2 py-1 text-[11px] font-semibold text-[#2f2f2f]">
              <HiSparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {project.role}
            </span>
            <p className="shrink-0 text-xs font-medium text-[#6c6c6c] dark:text-slate-300">
              {project.year}
            </p>
          </div>

          <h3 className="mt-2 text-[15px] font-semibold leading-5 text-[#2f2f2f] dark:text-white">
            {project.title}
          </h3>

          <p className="mt-1 text-xs leading-5 text-[#5d5d5d] dark:text-slate-300">{project.description}</p>

          <ul className="mt-2 flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <li
                key={tech}
                className="rounded-md bg-white px-2 py-1 text-[11px] text-[#666] dark:bg-[#2d3446] dark:text-slate-200"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex items-center justify-end pt-3">
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#1d4f91] px-2.5 py-1 text-[11px] font-semibold text-white transition hover:bg-[#163c6c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b6b6b] focus-visible:ring-offset-2 dark:bg-sky-500 dark:text-[#1a1f29] dark:hover:bg-sky-400 dark:focus-visible:ring-offset-slate-900"
              >
                <FiExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                Visit
              </a>
            ) : (
              <p className="text-xs text-[#8b8b8b] dark:text-slate-500">No link</p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
