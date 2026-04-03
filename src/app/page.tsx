import Link from "next/link";
import { getAllPapers, formatDate } from "@/lib/papers";

export default function HomePage() {
  const papers = getAllPapers();
  const recentPapers = papers.slice(0, 5);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Title block */}
      <section className="mb-12">
        <h1
          className="text-3xl font-bold mb-3"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Speion Research
        </h1>
        <p className="text-lg text-[var(--color-secondary)] leading-relaxed max-w-2xl">
          Independent research in software engineering, artificial intelligence,
          and applied technology.
        </p>
      </section>

      {/* Divider */}
      <hr className="border-t border-[var(--color-border)] mb-10" />

      {/* Recent papers */}
      <section>
        <div className="flex items-baseline justify-between mb-6">
          <h2
            className="text-sm font-semibold uppercase tracking-wider text-[var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Recent Papers
          </h2>
          <Link
            href="/papers"
            className="text-sm text-[var(--color-accent)] no-underline hover:underline"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            View all →
          </Link>
        </div>

        {recentPapers.length > 0 ? (
          <div className="space-y-0">
            {recentPapers.map((paper) => (
              <article
                key={paper.slug}
                className="py-5 border-b border-[var(--color-border)] last:border-b-0"
              >
                <div
                  className="flex items-center gap-2 mb-1 text-xs text-[var(--color-muted)]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  <time dateTime={paper.date}>{formatDate(paper.date)}</time>
                  <span className="text-[var(--color-border)]">·</span>
                  <span>{paper.readingTime}</span>
                  <span className="text-[var(--color-border)]">·</span>
                  <span className="inline-flex items-center px-1.5 py-0.5 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded text-[0.6875rem] font-medium">
                    {paper.version}
                  </span>
                </div>
                <h3 className="text-base font-semibold mb-1 leading-snug">
                  <Link
                    href={`/papers/${paper.slug}`}
                    className="text-[var(--color-primary)] no-underline hover:text-[var(--color-accent)]"
                  >
                    {paper.title}
                  </Link>
                </h3>
                <p
                  className="text-sm text-[var(--color-muted)] mb-1.5"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {paper.authors.join(", ")}
                </p>
                <p className="text-sm text-[var(--color-secondary)] leading-relaxed line-clamp-2">
                  {paper.abstract}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-[var(--color-muted)] text-sm italic">
            No papers published yet.
          </p>
        )}
      </section>

      {/* Research areas */}
      <section className="mt-14">
        <h2
          className="text-sm font-semibold uppercase tracking-wider text-[var(--color-muted)] mb-6"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Research Areas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Software Architecture",
              desc: "Agent-based systems, distributed computing, and scalable design patterns.",
            },
            {
              title: "Artificial Intelligence",
              desc: "Large language models, evaluation frameworks, and applied machine learning.",
            },
            {
              title: "Applied Technology",
              desc: "Developer tooling, automation pipelines, and engineering productivity.",
            },
          ].map((area) => (
            <div
              key={area.title}
              className="p-5 border border-[var(--color-border)] rounded"
            >
              <h3 className="text-sm font-semibold mb-2">{area.title}</h3>
              <p
                className="text-sm text-[var(--color-secondary)] leading-relaxed"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {area.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
