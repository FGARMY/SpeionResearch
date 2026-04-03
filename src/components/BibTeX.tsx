"use client";

import { useState } from "react";

interface BibTeXProps {
  slug: string;
  title: string;
  authors: string[];
  date: string;
}

export default function BibTeXCitation({ slug, title, authors, date }: BibTeXProps) {
  const [copied, setCopied] = useState(false);
  const year = new Date(date).getFullYear();
  const firstAuthor = authors[0]?.split(" ").pop()?.toLowerCase() || "author";
  
  const bibtex = `@article{${firstAuthor}${year}${slug.split("-")[0]},
  title={${title}},
  author={${authors.join(" and ")}},
  journal={Speion Research Publications},
  year={${year}},
  url={https://speionresearch.com/papers/${slug}}
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(bibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-12 p-6 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--color-muted)]" style={{ fontFamily: "var(--font-sans)" }}>
          Cite this Research (BibTeX)
        </h3>
        <button
          onClick={handleCopy}
          className="text-[0.625rem] font-bold uppercase tracking-widest px-2 py-1 bg-[var(--color-bg)] border border-[var(--color-border)] rounded hover:bg-[var(--color-primary)] hover:text-[var(--color-bg)] transition-all"
        >
          {copied ? "Copied!" : "Copy BibTeX"}
        </button>
      </div>
      <pre className="text-[0.8125rem] font-mono p-4 bg-[var(--color-bg)] border border-[var(--color-border)] rounded overflow-x-auto leading-relaxed text-[var(--color-secondary)]">
        {bibtex}
      </pre>
    </div>
  );
}
