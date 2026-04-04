import Link from "next/link";
import Image from "next/image";
import PaperCard from "@/components/PaperCard";
import NewsletterSignup from "@/components/Newsletter";
import { getAllPapers } from "@/lib/papers";
import { formatDate } from "@/lib/utils";
import { Home, FileText, Info, Globe, ExternalLink } from "lucide-react";

const SidebarLink = ({ href, icon, children, external }: { href: string, icon: React.ReactNode, children: React.ReactNode, external?: boolean }) => (
  <a href={href} className="flex items-center gap-2 text-[11px] text-[var(--color-accent)] hover:underline" target={external ? "_blank" : undefined}>
    {icon}
    {children}
  </a>
);

export default function HomePage() {
  const papers = getAllPapers();
  const recentPapers = papers.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Welcome Bar */}
      <section className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-6 rounded shadow-sm">
        <h1 className="text-3xl font-bold mb-2 tracking-tight text-[var(--color-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
          Welcome to Speion Research
        </h1>
        <p className="text-sm text-[var(--color-secondary)]">
          The <span className="font-semibold text-[var(--color-primary)]">Independent Encyclopedia</span> of software engineering, artificial intelligence, and neuro science research.
        </p>
        <div className="mt-4 flex gap-4 text-xs">
          <span className="text-[var(--color-muted)]">Currently tracking: <strong className="text-[var(--color-primary)]">{papers.length} articles</strong></span>
          <span className="text-[var(--color-muted)]">•</span>
          <span className="text-[var(--color-muted)]">Language: <strong className="text-[var(--color-primary)]">English (Academic)</strong></span>
        </div>
      </section>

      {/* Contents Box */}
      <section className="bg-[var(--color-bg)] border border-[var(--color-border)] p-4 rounded inline-block min-w-[240px]">
        <div className="flex items-baseline justify-between mb-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)]">Contents</h2>
          <span className="text-[10px] text-[var(--color-accent)] cursor-pointer hover:underline">[hide]</span>
        </div>
        <nav className="space-y-1 text-xs">
          {[
            { id: "recent", label: "1 Recent Research" },
            { id: "areas", label: "2 Research Areas" },
            { id: "newsletter", label: "3 Community Newsletter" },
          ].map(item => (
            <a key={item.id} href={`#${item.id}`} className="block text-[var(--color-accent)] hover:underline">
              {item.label}
            </a>
          ))}
        </nav>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Recent Research (Featured) */}
        <div className="md:col-span-7 lg:col-span-8 space-y-8">
          <section id="recent" className="wiki-portal-box overflow-hidden rounded border border-[var(--color-border)] bg-[var(--color-bg)] h-full">
            <h2 className="bg-[#eaf3ff] dark:bg-[#1a2d44] px-4 py-2 text-sm font-bold border-b border-[var(--color-border)] flex items-center gap-2">
              <span className="text-[var(--color-primary)]">From today's featured research</span>
            </h2>
            <div className="p-6">
              {recentPapers.length > 0 ? (
                <div className="space-y-8">
                  {recentPapers.map((paper, idx) => (
                    <div key={paper.slug} className={idx === 0 ? "relative" : "pt-8 border-t border-[var(--color-border)] opacity-80"}>
                      <PaperCard paper={paper} />
                    </div>
                  ))}
                  <div className="pt-4 flex justify-end">
                    <Link href="/papers" className="text-xs font-bold text-[var(--color-accent)] hover:underline">
                      More featured research...
                    </Link>
                  </div>
                </div>
              ) : (
                <p className="text-[var(--color-muted)] text-sm italic">
                  No articles currently published in this portal.
                </p>
              )}
            </div>
          </section>
        </div>

        {/* Right Column: In the news / Research Areas */}
        <div className="md:col-span-12 lg:col-span-5 space-y-8">
          <section id="areas" className="wiki-portal-box overflow-hidden rounded border border-[var(--color-border)] bg-[var(--color-bg)]">
            <h2 className="bg-[#f2f2f2] dark:bg-[#252525] px-4 py-2 text-sm font-bold border-b border-[var(--color-border)]">
              Research Portals
            </h2>
            <div className="p-4 space-y-6">
              {[
                { title: "Quantum Computing", icon: "⚛️" },
                { title: "Artificial Intelligence", icon: "🤖" },
                { title: "Neuro Science", icon: "🧠" }
              ].map(area => (
                <div key={area.title} className="flex gap-4 group cursor-pointer">
                  <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded text-xl">
                    {area.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[var(--color-accent)] group-hover:underline">{area.title}</h3>
                    <p className="text-[11px] text-[var(--color-secondary)] leading-snug mt-0.5">Explore the encyclopedia of {area.title.toLowerCase()} research papers and implementations.</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-4 rounded">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--color-muted)] mb-3">On this day</h2>
            <div className="text-[0.8125rem] leading-relaxed text-[var(--color-secondary)]">
              <p><strong>April 4:</strong> Speion Research platform reached stable Wikipedia-inspired layout architecture.</p>
              <ul className="mt-2 list-disc list-inside space-y-1 text-[11px]">
                <li>2026: UI overhaul completed.</li>
                <li>2025: Initial R&D phase started.</li>
              </ul>
            </div>
          </section>
        </div>
      </div>

      {/* Newsletter (Footer Portal) */}
      <section id="newsletter" className="bg-[#f8f9fa] dark:bg-[#1a1a1a] border border-[var(--color-border)] p-8 rounded text-center">
        <NewsletterSignup />
      </section>
    </div>
  );
}
