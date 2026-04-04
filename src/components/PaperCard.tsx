import Link from "next/link";
import { PaperMeta } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface PaperCardProps {
  paper: PaperMeta;
}

export default function PaperCard({ paper }: PaperCardProps) {
  return (
    <article className="group space-y-6">
      <div className="space-y-4">
        <div className="metadata-line mb-0">
          <span className="font-bold text-[#111111]">{paper.version}</span>
          <span>{formatDate(paper.date)}</span>
          {paper.area && (
             <span className="bg-[#F9F9F9] px-2 py-0.5 border border-[#EEEEEE] rounded-[2px]">{paper.area}</span>
          )}
          {paper.doi && (
             <span className="text-[#999999] font-mono text-[11px]">{paper.doi}</span>
          )}
        </div>
        
        <Link 
          href={`/papers/${paper.slug}`} 
          className="block no-underline group-hover:opacity-100"
        >
          <h3 className="text-2xl font-serif font-bold text-[#111111] leading-tight m-0 group-hover:underline transition-all">
            {paper.title}
          </h3>
        </Link>

        <p className="text-[12px] uppercase tracking-widest font-sans font-bold text-[#999999] m-0">
          {paper.authors.join(", ")}
        </p>
      </div>

      <p className="text-[14px] text-[#666666] leading-relaxed line-clamp-3 text-justify m-0">
        {paper.abstract}
      </p>

      <div className="flex items-center gap-6 pt-2">
        <Link 
          href={`/papers/${paper.slug}`} 
          className="text-[12px] font-sans font-bold uppercase tracking-widest text-[#111111] flex items-center gap-1.5 no-underline hover:underline"
        >
          Read Paper <ArrowUpRight size={14} />
        </Link>
        
        {paper.pdf && (
          <Link 
            href={paper.pdf} 
            target="_blank"
            className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#999999] hover:text-[#111111] no-underline transition-colors"
          >
            PDF (v{paper.version.replace('v', '')})
          </Link>
        )}
      </div>
    </article>
  );
}
