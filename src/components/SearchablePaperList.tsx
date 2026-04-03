"use client";

import { useState } from "react";
import PaperCard from "./PaperCard";

interface PaperListProps {
  papers: any[];
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
      {/* Search Bar */}
      <div className="mb-12 relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-muted)] group-focus-within:text-[var(--color-accent)] transition-colors">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <input
          type="text"
          placeholder="Filter by title, author, or keyword..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-primary)] placeholder-[var(--color-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] transition-all shadow-sm"
          style={{ fontFamily: "var(--font-sans)" }}
        />
        {search && (
          <button 
            onClick={() => setSearch("")}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-[var(--color-muted)] hover:text-[var(--color-primary)]"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>

      {years.length > 0 ? (
        years.map((year) => (
          <section key={year} className="mb-16">
            <h2
              className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-muted)] mb-6 pb-2 border-b border-[var(--color-border)]/50"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {year}
            </h2>
            <div className="grid grid-cols-1 gap-12">
              {papersByYear[year].map((paper: any) => (
                <PaperCard key={paper.slug} paper={paper} />
              ))}
            </div>
          </section>
        ))
      ) : (
        <div className="py-20 text-center bg-[var(--color-bg-secondary)] border border-dashed border-[var(--color-border)] rounded-2xl">
          <p className="text-[var(--color-muted)] text-sm italic" style={{ fontFamily: "var(--font-sans)" }}>
            No papers found matching "{search}".
          </p>
        </div>
      )}
    </div>
  );
}
