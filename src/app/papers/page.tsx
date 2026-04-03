import { getAllPapers } from "@/lib/papers";
import SearchablePaperList from "@/components/SearchablePaperList";
import NewsletterSignup from "@/components/Newsletter";
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
          className="text-4xl font-bold mb-3 tracking-tight text-[var(--color-primary)]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Research Papers
        </h1>
        <p className="text-[var(--color-primary)] text-lg" style={{ fontFamily: "var(--font-sans)" }}>
          {papers.length} paper{papers.length !== 1 ? "s" : ""} published
        </p>
      </section>

      <SearchablePaperList papers={papers} />

      <div className="h-[1px] w-full bg-gradient-to-r from-[var(--color-border)] via-transparent to-[var(--color-border)] my-16 opacity-50"></div>

      <NewsletterSignup />
    </div>
  );
}
