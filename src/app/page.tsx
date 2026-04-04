import Link from "next/link";
import { getAllPapers } from "@/lib/papers";
import PaperCard from "@/components/PaperCard";
import { ArrowRight, BookOpen, Cpu, Shield, Brain } from "lucide-react";

export default function HomePage() {
  const papers = getAllPapers();
  const featuredPapers = papers.slice(0, 3);

  return (
    <div className="space-y-32">
      {/* 1. Hero Section */}
      <section className="text-center space-y-8 py-10">
        <div className="inline-block px-3 py-1 bg-[#FAFAFA] border border-[#EEEEEE] text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-[#999999] mb-4">
          Independent Research Publication
        </div>
        <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight text-[#111111] max-w-[800px] mx-auto leading-tight">
          Speion Research Labs
        </h1>
        <p className="text-xl text-[#666666] font-sans font-medium tracking-tight max-w-[600px] mx-auto leading-relaxed">
          Advancing human knowledge through rigorous computation, security research, and neuroscience.
        </p>
        <div className="pt-6 flex flex-wrap justify-center gap-6">
          <Link href="/papers" className="btn-academic">
            Browse Research <ArrowRight size={14} />
          </Link>
          <Link href="/about" className="text-[13px] font-sans font-medium hover:underline text-secondary flex items-center gap-2">
            Learn about our mission
          </Link>
        </div>
      </section>

      {/* 2. Positioning Block */}
      <section className="academic-box max-w-[700px] mx-auto">
        <div className="abstract-title">Our Focus</div>
        <p className="text-lg leading-relaxed text-[#333333]">
          Speion Research Labs operates as an independent research collective dedicated to solving complex problems at the intersection of <strong>Artificial Intelligence</strong>, <strong>Cybersecurity</strong>, and <strong>Applied Automation</strong>. 
        </p>
        <p className="text-[#666666]">
          Our goal is to provide high-credibility, open-access research that informs industry standards and provides developers with the intellectual foundation to build secure, intelligent systems.
        </p>
      </section>

      {/* 3. Featured Research */}
      <section id="featured" className="space-y-12">
        <div className="flex items-center justify-between border-b border-[#EEEEEE] pb-4">
          <h2 className="text-xs uppercase tracking-widest font-sans font-bold text-[#111111] border-none m-0 p-0">
            Featured Publications
          </h2>
          <Link href="/papers" className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#999999] hover:text-[#111111] transition-colors">
            View Archive
          </Link>
        </div>
        
        <div className="space-y-16">
          {featuredPapers.length > 0 ? (
            featuredPapers.map((paper) => (
              <div key={paper.slug}>
                <PaperCard paper={paper} />
              </div>
            ))
          ) : (
            <p className="text-[#999999] italic text-sm text-center py-10">No publications currently featured in the archive.</p>
          )}
        </div>
      </section>

      {/* 4. Research Areas */}
      <section id="areas" className="space-y-12">
        <div className="border-b border-[#EEEEEE] pb-4">
          <h2 className="text-xs uppercase tracking-widest font-sans font-bold text-[#111111] border-none m-0 p-0">
            Active Domains
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { 
              title: "AI Systems", 
              desc: "Researching large language models, neural architecture search, and cognitive computing.",
              icon: Brain
            },
            { 
              title: "Cybersecurity", 
              desc: "Deep-dives into zero-day vulnerabilities, cryptographic security, and cloud infrastructure.",
              icon: Shield
            },
            { 
              title: "Automation", 
              desc: "Advanced logic systems for high-frequency trading and industrial workflow optimization.",
              icon: Cpu
            }
          ].map((area) => (
            <div key={area.title} className="space-y-4">
              <div className="w-10 h-10 flex items-center justify-center bg-[#FAFAFA] border border-[#EEEEEE] rounded">
                <area.icon size={20} className="text-[#333333]" />
              </div>
              <h3 className="font-serif font-bold text-lg m-0">{area.title}</h3>
              <p className="text-[13px] text-[#666666] leading-relaxed">
                {area.desc}
              </p>
              <Link href={`/areas/${area.title.toLowerCase().replace(' ', '-')}`} className="text-[11px] font-bold uppercase tracking-wider text-[#999999] hover:text-[#111111] mt-2 block">
                Explore papers &rarr;
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Final CTA */}
      <section className="text-center py-20 border-t border-[#F5F5F5]">
        <h2 className="font-serif text-3xl font-bold border-none mb-6">Contribute to the Lab</h2>
        <p className="text-[#666666] max-w-[500px] mx-auto text-sm leading-relaxed mb-10">
          Speion is an open-access lab. Browse our open source repositories or submit a research proposal to our independent board.
        </p>
        <div className="flex justify-center gap-6">
          <Link href="https://github.com/FGARMY/SpeionResearch" className="btn-academic">
            Source Code
          </Link>
          <button className="btn-academic">
            Submit Proposal
          </button>
        </div>
      </section>
    </div>
  );
}
