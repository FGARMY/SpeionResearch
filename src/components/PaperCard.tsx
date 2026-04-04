import Link from "next/link";
import { PaperMeta } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function PaperCard({ paper }: { paper: PaperMeta }) {
  return (
    <article className="py-2">
      <div className="flex flex-col gap-1.5">
        {/* Title */}
        <h2 className="text-[1.1rem] font-bold leading-snug">
          <Link
            href={`/papers/${paper.slug}`}
            className="text-[var(--color-accent)] hover:underline no-underline"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {paper.title}
          </Link>
        </h2>

        {/* Metadata Line */}
        <div className="flex flex-wrap items-center gap-x-2 text-[11px] text-[var(--color-muted)] font-sans">
          <span className="font-semibold text-[var(--color-secondary)]">{paper.authors.join(", ")}</span>
          <span>•</span>
          <time dateTime={paper.date}>{formatDate(paper.date)}</time>
          <span>•</span>
          <span>{paper.readingTime}</span>
          <span>•</span>
          <span className="text-[var(--color-accent)]">{paper.version}</span>
        </div>

        {/* Summary */}
        <p className="text-[0.8125rem] text-[var(--color-primary)] leading-relaxed mt-1">
          {paper.abstract}
        </p>

        {/* Actions - Wiki Style Links */}
        <div className="flex items-center gap-4 mt-2 text-[11px] font-bold uppercase tracking-tight">
          <Link
            href={`/papers/${paper.slug}`}
            className="text-[var(--color-accent)] hover:underline"
          >
            Read Article
          </Link>
          {paper.pdf && (
            <a
              href={paper.pdf}
              className="text-[var(--color-accent)] hover:underline"
              download
            >
              Full PDF
            </a>
          )}
          {paper.github && (
            <a
              href={paper.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-accent)] hover:underline"
            >
              Source Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
