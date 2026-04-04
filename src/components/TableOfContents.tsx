"use client";
import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [toc, setToc] = useState<TocItem[]>([]);

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll("#paper-content h2, #paper-content h3"));
    const items = headings.map((h) => ({
      id: h.id,
      text: h.textContent || "",
      level: parseInt(h.tagName.charAt(1)),
    }));
    setToc(items);
  }, []);

  if (toc.length === 0) return null;

  return (
    <nav className="toc-container space-y-1">
      {toc.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`toc-link transition-colors ${
            item.level === 2 
              ? "text-[11px] font-bold uppercase tracking-wider text-[#111111]" 
              : "text-[12px] pl-4 text-[#666666] hover:text-[#111111]"
          }`}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          {item.text}
        </a>
      ))}
    </nav>
  );
}
