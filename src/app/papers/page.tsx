"use client";

import { useState, useMemo } from "react";
import { getAllPapers } from "@/lib/papers";
import PaperCard from "@/components/PaperCard";
import { Search, Filter, X } from "lucide-react";

export default function PapersPage() {
  const allPapers = getAllPapers();
  const [search, setSearch] = useState("");
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const areas = useMemo(() => {
    const set = new Set<string>();
    allPapers.forEach(p => p.area && set.add(p.area));
    return Array.from(set).sort();
  }, [allPapers]);

  const filteredPapers = useMemo(() => {
    return allPapers.filter((paper) => {
      const matchesSearch = !search || 
        paper.title.toLowerCase().includes(search.toLowerCase()) ||
        paper.authors.some(a => a.toLowerCase().includes(search.toLowerCase())) ||
        paper.abstract.toLowerCase().includes(search.toLowerCase());
      
      const matchesArea = !selectedArea || paper.area === selectedArea;
      
      return matchesSearch && matchesArea;
    });
  }, [allPapers, search, selectedArea]);

  // Group papers by year
  const papersByYear = filteredPapers.reduce(
    (acc, paper) => {
      const year = new Date(paper.date).getFullYear().toString();
      if (!acc[year]) acc[year] = [];
      acc[year].push(paper);
      return acc;
    },
    {} as Record<string, typeof allPapers>
  );

  const years = Object.keys(papersByYear).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <div className="space-y-12">
      <header className="space-y-4 border-b border-[#EEEEEE] pb-12">
        <h1 className="text-4xl font-serif font-bold text-[#111111]">Research Archive</h1>
        <p className="text-[#666666] max-w-[600px] leading-relaxed">
          The complete repository of Speion Research Labs publications, spanning artificial intelligence, cybersecurity, and computational neuroscience. 
        </p>
      </header>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-center gap-6 no-print">
        <div className="relative flex-1 group">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#BBBBBB] group-focus-within:text-[#111111] transition-colors" />
          <input 
            type="text" 
            placeholder="Search by title, author, or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#FAFAFA] border border-[#EEEEEE] text-[13px] rounded-[2px] transition-all focus:bg-white focus:border-[#BBBBBB] outline-none"
          />
          {search && (
            <button 
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#BBBBBB] hover:text-[#111111]"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Filter size={14} className="text-[#BBBBBB]" />
          <select 
            value={selectedArea || ""} 
            onChange={(e) => setSelectedArea(e.target.value || null)}
            className="bg-[#FAFAFA] border border-[#EEEEEE] text-[12px] font-bold uppercase tracking-widest px-4 py-2.5 rounded-[2px] outline-none hover:border-[#BBBBBB] transition-colors"
          >
            <option value="">All Areas</option>
            {areas.map(area => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-20">
        {years.length > 0 ? (
          years.map((year) => (
            <section key={year} className="space-y-12">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl font-serif font-bold text-[#111111] border-none m-0 p-0 leading-none">{year}</h2>
                <div className="flex-1 h-[1px] bg-[#EEEEEE]"></div>
              </div>
              <div className="space-y-16">
                {papersByYear[year].map((paper) => (
                  <PaperCard key={paper.slug} paper={paper} />
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="py-20 text-center space-y-4">
            <p className="text-[#999999] italic">No publications match your current filters.</p>
            <button 
              onClick={() => {setSearch(""); setSelectedArea(null);}}
              className="text-[11px] font-bold uppercase tracking-widest text-[#111111] underline underline-offset-4"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
