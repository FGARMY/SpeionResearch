import Link from "next/link";
import Image from "next/image";

interface ProjectMeta {
  title: string;
  tag: string;
  desc: string;
  link: string;
  image: string;
}

export default function ProjectCard({ project }: { project: ProjectMeta }) {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
      <div className="flex-1 w-full relative aspect-[16/10] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded shadow-sm overflow-hidden shrink-0 md:max-w-[400px]">
        <Image 
          src={project.image} 
          alt={project.title} 
          fill 
          className="object-cover"
        />
      </div>
      <div className="flex-1 w-full pt-1">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h3 className="text-xl font-bold leading-tight text-[var(--color-primary)]">
            {project.title}
          </h3>
          <span className="inline-flex items-center px-2 py-0.5 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded text-[0.6875rem] font-medium text-[var(--color-muted)] whitespace-nowrap" style={{ fontFamily: "var(--font-sans)" }}>
            {project.tag}
          </span>
        </div>
        <p className="text-[0.9375rem] text-[var(--color-secondary)] leading-relaxed mb-5 max-w-md">
          {project.desc}
        </p>
        <Link
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-primary)] transition-colors no-underline"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
          View Repository →
        </Link>
      </div>
    </div>
  );
}
