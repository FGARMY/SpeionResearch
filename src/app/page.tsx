import Link from "next/link";
import Image from "next/image";
import PaperCard from "@/components/PaperCard";
import NewsletterSignup from "@/components/Newsletter";
import { getAllPapers } from "@/lib/papers";
import { formatDate } from "@/lib/utils";

export default function HomePage() {
  const papers = getAllPapers();
  const recentPapers = papers.slice(0, 5);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Title block */}
      <section className="mb-14">
        <h1
          className="text-4xl font-bold mb-5 tracking-tight text-[var(--color-primary)]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Speion Research
        </h1>
        <div className="space-y-4">
          <p className="text-xl text-[var(--color-primary)] leading-relaxed max-w-2xl font-serif">
            Building production-grade AI systems, autonomous agents, and scalable software architectures.
          </p>
          <ul className="text-base text-[var(--color-secondary)] space-y-2 font-sans list-none p-0 m-0">
            <li className="flex items-start gap-2">
              <span className="text-[var(--color-muted)] mt-[1px]">→</span>
              <span><strong>Focus:</strong> Multi-agent systems, LLM evaluation, real-world deployment</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--color-muted)] mt-[1px]">→</span>
              <span>Open research + engineering-first approach</span>
            </li>
          </ul>
        </div>
        
        <div className="mt-8 flex items-center gap-4 font-sans text-sm font-medium">
          <Link 
            href="/papers" 
            className="px-5 py-2.5 bg-[var(--color-primary)] text-[var(--color-bg)] rounded-md hover:opacity-90 transition-opacity no-underline inline-flex items-center justify-center border border-[var(--color-primary)] w-full sm:w-auto"
          >
            View Papers
          </Link>
        </div>
      </section>

      {/* Divider */}
      <hr className="border-t border-[var(--color-border)] mb-10" />

      {/* Impact Section */}
      <section className="mb-14 grid grid-cols-2 md:grid-cols-4 gap-4 text-center" style={{ fontFamily: "var(--font-sans)" }}>
        <div className="p-5 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] flex flex-col justify-center shadow-sm">
          <div className="text-3xl font-bold text-[var(--color-primary)] mb-1.5" style={{ fontFamily: "var(--font-serif)" }}>{papers.length}+</div>
          <div className="text-[0.6875rem] font-bold text-[var(--color-secondary)] uppercase tracking-wider">Research Papers</div>
        </div>
        <div className="p-5 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] flex flex-col justify-center shadow-sm">
          <div className="text-3xl font-bold text-[var(--color-primary)] mb-1.5" style={{ fontFamily: "var(--font-serif)" }}>0</div>
          <div className="text-[0.6875rem] font-bold text-[var(--color-secondary)] uppercase tracking-wider">Active Projects</div>
        </div>
        <div className="p-5 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] flex flex-col justify-center shadow-sm">
          <div className="text-3xl font-bold text-[var(--color-primary)] mb-1.5" style={{ fontFamily: "var(--font-serif)" }}>-</div>
          <div className="text-[0.6875rem] font-bold text-[var(--color-secondary)] uppercase tracking-wider">Development Traces</div>
        </div>
        <div className="p-5 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] flex flex-col justify-center shadow-sm">
          <div className="text-3xl font-bold text-[var(--color-primary)] mb-1.5" style={{ fontFamily: "var(--font-serif)" }}>∞</div>
          <div className="text-[0.6875rem] font-bold text-[var(--color-secondary)] uppercase tracking-wider">Open Source</div>
        </div>
      </section>



      {/* Divider */}
      <div className="h-[1px] w-full bg-gradient-to-r from-[var(--color-border)] via-transparent to-[var(--color-border)] my-16 opacity-50"></div>

      {/* Recent papers */}
      <section>
        <div className="flex items-baseline justify-between mb-8">
          <h2
            className="text-sm font-semibold uppercase tracking-wider text-[var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Recent Research
          </h2>
          <Link
            href="/papers"
            className="text-xs font-medium text-[var(--color-accent)] hover:text-[var(--color-primary)] transition-colors no-underline uppercase tracking-wide"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            All Papers →
          </Link>
        </div>

        {recentPapers.length > 0 ? (
          <div className="grid grid-cols-1 gap-12">
            {recentPapers.map((paper, idx) => (
              <div key={paper.slug} className={idx === 0 ? "relative p-6 -mx-6 bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)] shadow-sm" : ""}>
                {idx === 0 && (
                  <div className="absolute -top-3 left-6 px-2 py-0.5 bg-[var(--color-primary)] text-[var(--color-bg)] text-[0.625rem] font-bold uppercase tracking-widest rounded leading-none" style={{ fontFamily: "var(--font-sans)" }}>
                    Featured Research
                  </div>
                )}
                <PaperCard paper={paper} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[var(--color-muted)] text-sm italic">
            No papers published yet.
          </p>
        )}
      </section>



      {/* Divider */}
      <div className="h-[1px] w-full bg-gradient-to-r from-[var(--color-border)] via-transparent to-[var(--color-border)] my-16 opacity-50"></div>

      {/* Research areas */}
      <section>
        <h2
          className="text-sm font-semibold uppercase tracking-wider text-[var(--color-muted)] mb-6"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Research Areas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Software Architecture",
              desc: "Agent-based systems, distributed computing, and scalable design patterns.",
            },
            {
              title: "Artificial Intelligence",
              desc: "Large language models, evaluation frameworks, and applied machine learning.",
            },
            {
              title: "Applied Technology",
              desc: "Developer tooling, automation pipelines, and engineering productivity.",
            },
          ].map((area, idx) => (
              <div
              key={area.title}
              className="p-6 border border-[var(--color-border)] rounded-lg hover:shadow-md transition-shadow bg-[var(--color-bg)]"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-md bg-[var(--color-bg-secondary)] border border-[var(--color-border)] mb-5 text-[var(--color-primary)]">
                {idx === 0 && (
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <path d="M3 9h18"></path>
                    <path d="M9 21V9"></path>
                  </svg>
                )}
                {idx === 1 && (
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20"></path>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                )}
                {idx === 2 && (
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                )}
              </div>
              <h3 className="text-base font-semibold mb-2 leading-snug">{area.title}</h3>
              <p
                className="text-[0.9375rem] text-[var(--color-secondary)] leading-relaxed"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {area.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="h-[1px] w-full bg-gradient-to-r from-[var(--color-border)] via-transparent to-[var(--color-border)] my-16 opacity-50"></div>

      {/* Newsletter */}
      <NewsletterSignup />
    </div>
  );
}
