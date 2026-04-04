"use client";
import { useState } from "react";
import { PaperMeta } from "@/lib/types";
import { Copy, Check } from "lucide-react";

interface CitationGeneratorProps {
  meta: PaperMeta;
}

export default function CitationGenerator({ meta }: CitationGeneratorProps) {
  const [copied, setCopied] = useState(false);

  // APA Style: Author, A. A., & Author, B. B. (Year). Title of article. Title of Periodical, volume number(issue number), pages. https://doi.org/xx.xxx/xxxx
  const year = new Date(meta.date).getFullYear();
  const authorsArr = meta.authors.map(a => {
    const parts = a.split(' ');
    const last = parts[parts.length - 1];
    const firstInitial = parts[0][0];
    return `${last}, ${firstInitial}.`;
  });
  
  let authorString = authorsArr.join(", ");
  if (authorsArr.length > 1) {
    const last = authorsArr.pop();
    authorString = `${authorsArr.join(", ")} & ${last}`;
  }

  const citation = `${authorString} (${year}). ${meta.title}. Speion Research Labs, ${meta.version}. ${meta.doi ? `https://doi.org/${meta.doi}` : ""}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative bg-[#FAFAFA] border border-[#EEEEEE] p-6 rounded-[2px]">
      <div className="text-[13px] text-[#333333] font-serif leading-relaxed pr-10 italic">
        {citation}
      </div>
      
      <button 
        onClick={copyToClipboard}
        className="absolute top-4 right-4 p-2 text-[#999999] hover:text-[#111111] transition-colors"
        title="Copy APA Citation"
      >
        {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
      </button>
      
      <div className="mt-4 flex gap-4 text-[10px] uppercase font-bold tracking-widest text-[#BBBBBB]">
        <span>APA Style</span>
        <span>Version {meta.version}</span>
      </div>
    </div>
  );
}
