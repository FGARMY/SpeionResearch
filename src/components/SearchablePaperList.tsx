"use client";

import { useState } from "react";
import PaperCard from "./PaperCard";
import { PaperMeta } from "@/lib/types";

interface PaperListProps {
  papers: PaperMeta[];
}

export default function SearchablePaperList({ papers }: PaperListProps) {
  const [search, setSearch] = useState("");

  const filteredPapers = papers.filter((paper) => {
    const searchLower = search.toLowerCase();
    return (
      paper.title.toLowerCase().includes(searchLower) ||
      paper.abstract.toLowerCase().includes(searchLower) ||
      paper.authors.some((author: string) => author.toLowerCase().includes(searchLower)) ||
      (paper.tags && paper.tags.some((tag: string) => tag.toLowerCase().includes(searchLower)))
    );
  });

  // Group papers by year
  const papersByYear = filteredPapers.reduce(
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
    <div>
      {/* Search Header */}
      <div className="mb-10 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-[var(--color-primary)]">Search Articles</h2>
          <p className="text-[10px] text-[var(--color-muted)]">Filtering {papers.length} research entries</p>
        </div>
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-1.5 bg-[var(--color-bg)] border border-[var(--color-border)] text-xs text-[var(--color-primary)] focus:outline-none focus:border-[var(--color-accent)] shadow-sm"
          />
          {search && (
            <button 
              onClick={() => setSearch("")}
              className="absolute inset-y-0 right-2 flex items-center text-[var(--color-muted)]"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {years.length > 0 ? (
        years.map((year) => (
          <section key={year} className="mb-12">
            <h2
              className="text-xl font-bold text-[var(--color-primary)] mb-6 py-1 border-b border-[var(--color-border)]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {year}
            </h2>
            <div className="space-y-6">
              {papersByYear[year].map((paper: PaperMeta) => (
                <div key={paper.slug} className="pb-6 border-b border-[var(--color-border)]/50 last:border-b-0">
                  <PaperCard paper={paper} />
                </div>
              ))}
            </div>
          </section>
        ))
      ) : (
        <div className="py-20 text-center bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded shadow-sm">
          <p className="text-[var(--color-muted)] text-sm italic">
            No articles found matching "{search}".
          </p>
        </div>
      )}
    </div>
  );
}
