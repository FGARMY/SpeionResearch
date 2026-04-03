import Link from "next/link";
import { PaperMeta, formatDate } from "@/lib/papers";

export default function PaperCard({ paper }: { paper: PaperMeta }) {
  return (
    <article className="py-8 border-b border-[var(--color-border)] last:border-b-0">
      <div className="flex flex-col gap-3">
        {/* Title */}
        <h2 className="text-xl font-bold leading-snug">
          <Link
            href={`/papers/${paper.slug}`}
            className="text-[var(--color-primary)] no-underline hover:text-[var(--color-accent)]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {paper.title}
          </Link>
        </h2>

        {/* Authors */}
        <p className="text-base text-[var(--color-primary)] font-medium" style={{ fontFamily: "var(--font-sans)" }}>
          {paper.authors.join(", ")}
        </p>

        {/* Metadata */}
        <div className="flex items-center gap-2 text-[0.8125rem]" style={{ fontFamily: "var(--font-sans)" }}>
          <time dateTime={paper.date} className="text-[var(--color-muted)]">
            {formatDate(paper.date)}
          </time>
          <span className="text-[var(--color-border)]">·</span>
          <span className="text-[var(--color-muted)]">{paper.readingTime}</span>
          <span className="text-[var(--color-border)]">·</span>
          <span className="inline-flex items-center px-1.5 py-0.5 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded text-[var(--color-secondary)] text-[0.6875rem] font-medium tracking-wide">
            {paper.version}
          </span>
        </div>

        {/* Summary */}
        <p className="text-[0.9375rem] text-[var(--color-secondary)] leading-relaxed mt-1 line-clamp-3">
          {paper.abstract}
        </p>

        {/* Key Contributions */}
        {paper.contributions && paper.contributions.length > 0 && (
          <div className="mt-3">
            <h4 className="text-sm font-semibold mb-2 text-[var(--color-primary)]" style={{ fontFamily: "var(--font-sans)" }}>
              Key Contributions:
            </h4>
            <ul className="space-y-1.5 list-none p-0 m-0">
              {paper.contributions.map((contribution, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[0.9375rem] text-[var(--color-secondary)]">
                  <span className="text-[var(--color-primary)] opacity-90 mt-[1px]" style={{ fontSize: "14px" }}>✔</span>
                  <span>{contribution}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions & Tags */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-5">
          <div className="flex flex-wrap items-center gap-2.5" style={{ fontFamily: "var(--font-sans)" }}>
            <Link
              href={`/papers/${paper.slug}`}
              className="px-4 py-1.5 bg-[var(--color-primary)] text-[var(--color-bg)] rounded text-[0.8125rem] font-medium hover:opacity-90 transition-opacity no-underline border border-[var(--color-primary)]"
            >
              Read Paper
            </Link>
            {paper.pdf && (
              <a
                href={paper.pdf}
                className="px-4 py-1.5 bg-[var(--color-bg)] text-[var(--color-primary)] rounded text-[0.8125rem] font-medium hover:bg-[var(--color-bg-secondary)] transition-colors no-underline border border-[var(--color-border)] shadow-sm"
                download
              >
                PDF
              </a>
            )}
            {paper.github && (
              <a
                href={paper.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1.5 bg-[var(--color-bg)] text-[var(--color-primary)] rounded text-[0.8125rem] font-medium hover:bg-[var(--color-bg-secondary)] transition-colors no-underline border border-[var(--color-border)] shadow-sm"
              >
                Code
              </a>
            )}
          </div>
          
          {paper.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {paper.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[0.6875rem] px-2 py-0.5 border border-[var(--color-border)] text-[var(--color-muted)] rounded"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
