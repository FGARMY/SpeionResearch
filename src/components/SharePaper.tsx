"use client";

import { X, Link as Linkedin, Link as LinkIcon, Check } from "lucide-react";
import { useState } from "react";

interface ShareProps {
  title: string;
}

export default function SharePaper({ title }: ShareProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = encodeURIComponent(typeof window !== "undefined" ? window.location.href : "");
  const shareText = encodeURIComponent(`Check out this research paper: ${title}`);

  return (
    <div className="mt-8 border-t border-[var(--color-border)] pt-8">
      <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--color-muted)] mb-4" style={{ fontFamily: "var(--font-sans)" }}>
        Share this Research
      </h3>
      <div className="flex flex-wrap gap-3">
        <a
          href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-md hover:border-[var(--color-primary)] transition-all text-[0.8125rem] font-medium text-[var(--color-primary)] no-underline"
        >
          <X size={14} />
          Twitter
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-md hover:border-[var(--color-primary)] transition-all text-[0.8125rem] font-medium text-[var(--color-primary)] no-underline"
        >
          <Linkedin size={14} />
          LinkedIn
        </a>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-md hover:border-[var(--color-primary)] transition-all text-[0.8125rem] font-medium text-[var(--color-primary)]"
        >
          {copied ? (
            <>
              <Check size={14} className="text-green-500" />
              Link Copied
            </>
          ) : (
            <>
              <LinkIcon size={14} />
              Copy URL
            </>
          )}
        </button>
      </div>
    </div>
  );
}
