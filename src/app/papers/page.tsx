import { getAllPapers } from "@/lib/papers";
import PaperCard from "@/components/PaperCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Papers",
  description:
    "Browse published research papers from Speion Research on software engineering, AI, and applied technology.",
};

export default function PapersPage() {
  const papers = getAllPapers();

  // Group papers by year
  const papersByYear = papers.reduce(
    (acc, paper) => {
      const year = new Date(paper.date).getFullYear().toString();
      if (!acc[year]) acc[year] = [];
      acc[year].push(paper);
      return acc;
    },
    {} as Record<string, typeof papers>
  );

  const years = Object.keys(papersByYear).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <section className="mb-10">
        <h1
          className="text-2xl font-bold mb-2"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Papers
        </h1>
        <p className="text-[var(--color-secondary)] text-sm" style={{ fontFamily: "var(--font-sans)" }}>
          {papers.length} paper{papers.length !== 1 ? "s" : ""} published
        </p>
      </section>

      {years.length > 0 ? (
        years.map((year) => (
          <section key={year} className="mb-10">
            <h2
              className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)] mb-2 pb-2 border-b border-[var(--color-border)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {year}
            </h2>
            <div>
              {papersByYear[year].map((paper) => (
                <PaperCard key={paper.slug} paper={paper} />
              ))}
            </div>
          </section>
        ))
      ) : (
        <p className="text-[var(--color-muted)] text-sm italic">
          No papers published yet.
        </p>
      )}
    </div>
  );
}
