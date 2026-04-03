import Link from "next/link";
import { PaperMeta, formatDate } from "@/lib/papers";

export default function PaperCard({ paper }: { paper: PaperMeta }) {
  return (
    <article className="py-6 border-b border-[var(--color-border)] last:border-b-0">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div
            className="flex items-center gap-2 mb-1.5 text-xs"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <time
              dateTime={paper.date}
              className="text-[var(--color-muted)]"
            >
              {formatDate(paper.date)}
            </time>
            <span className="text-[var(--color-border)]">·</span>
            <span className="text-[var(--color-muted)]">{paper.readingTime}</span>
            <span className="text-[var(--color-border)]">·</span>
            <span className="inline-flex items-center px-1.5 py-0.5 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded text-[var(--color-secondary)] text-[0.6875rem] font-medium">
              {paper.version}
            </span>
          </div>

          <h2 className="text-lg font-semibold leading-snug mb-2">
            <Link
              href={`/papers/${paper.slug}`}
              className="text-[var(--color-primary)] no-underline hover:text-[var(--color-accent)]"
            >
              {paper.title}
            </Link>
          </h2>

          <p
            className="text-sm text-[var(--color-secondary)] mb-2"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {paper.authors.join(", ")}
          </p>

          <p className="text-sm text-[var(--color-secondary)] leading-relaxed line-clamp-3">
            {paper.abstract}
          </p>

          <div
            className="flex items-center gap-4 mt-3 text-xs"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <Link
              href={`/papers/${paper.slug}`}
              className="text-[var(--color-accent)] no-underline hover:underline font-medium"
            >
              Read Paper →
            </Link>
            {paper.pdf && (
              <a
                href={paper.pdf}
                className="text-[var(--color-muted)] no-underline hover:text-[var(--color-primary)]"
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
                className="text-[var(--color-muted)] no-underline hover:text-[var(--color-primary)]"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>

      {paper.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {paper.tags.map((tag) => (
            <span
              key={tag}
              className="text-[0.6875rem] px-2 py-0.5 bg-[var(--color-bg-secondary)] text-[var(--color-muted)] rounded"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
