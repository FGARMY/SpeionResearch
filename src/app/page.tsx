import Link from "next/link";
import Image from "next/image";
import { getAllPapers, formatDate } from "@/lib/papers";

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
            className="px-5 py-2.5 bg-[var(--color-primary)] text-[var(--color-bg)] rounded-md hover:opacity-90 transition-opacity no-underline inline-flex items-center justify-center border border-[var(--color-primary)]"
          >
            View Papers
          </Link>
          <Link 
            href="https://github.com/FGARMY" 
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 border border-[var(--color-border)] text-[var(--color-primary)] shadow-sm rounded-md hover:bg-[var(--color-bg-secondary)] transition-colors no-underline inline-flex items-center justify-center bg-[var(--color-bg)]"
          >
            Explore Projects
          </Link>
        </div>
      </section>

      {/* Featured Research */}
      <section className="mb-14 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl leading-none">🔥</span>
          <h2
            className="text-sm font-semibold uppercase tracking-wider text-[var(--color-primary)] m-0 leading-none"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Featured Research
          </h2>
        </div>
        
        <h3 className="text-2xl font-bold mb-3 text-[var(--color-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
          Agent-Based Autonomous Code Generation
        </h3>
        
        <ul className="text-base text-[var(--color-secondary)] mb-6 space-y-2 font-sans list-none p-0 m-0">
          <li className="flex items-start gap-2">
             <span className="text-[var(--color-muted)] mt-[1px]">−</span>
             <span>3x efficiency vs single-agent systems</span>
          </li>
          <li className="flex items-start gap-2">
             <span className="text-[var(--color-muted)] mt-[1px]">−</span>
             <span>Tested on real production tasks</span>
          </li>
          <li className="flex items-start gap-2">
             <span className="text-[var(--color-muted)] mt-[1px]">−</span>
             <span>Open-source framework available</span>
          </li>
        </ul>
        
        <div className="flex items-center gap-3 font-sans text-sm font-medium">
          <Link 
            href="/papers/speion-agent-architecture" 
            className="px-4 py-2 bg-[var(--color-primary)] text-[var(--color-bg)] rounded-md hover:opacity-90 transition-opacity no-underline inline-flex items-center justify-center border border-[var(--color-primary)]"
          >
            Read Paper
          </Link>
          <Link 
            href="https://github.com/FGARMY" 
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-[var(--color-border)] text-[var(--color-primary)] shadow-sm rounded-md hover:bg-[var(--color-border)] transition-colors no-underline inline-flex items-center justify-center bg-[var(--color-bg)]"
          >
            View Code
          </Link>
        </div>
      </section>

      {/* Divider */}
      <hr className="border-t border-[var(--color-border)] mb-10" />

      {/* Recent papers */}
      <section>
        <div className="flex items-baseline justify-between mb-6">
          <h2
            className="text-sm font-semibold uppercase tracking-wider text-[var(--color-muted)]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Recent Papers
          </h2>
          <Link
            href="/papers"
            className="text-sm text-[var(--color-accent)] no-underline hover:underline"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            View all →
          </Link>
        </div>

        {recentPapers.length > 0 ? (
          <div className="space-y-0">
            {recentPapers.map((paper) => (
              <article
                key={paper.slug}
                className="py-5 border-b border-[var(--color-border)] last:border-b-0"
              >
                <div
                  className="flex items-center gap-2 mb-1 text-xs text-[var(--color-muted)]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  <time dateTime={paper.date}>{formatDate(paper.date)}</time>
                  <span className="text-[var(--color-border)]">·</span>
                  <span>{paper.readingTime}</span>
                  <span className="text-[var(--color-border)]">·</span>
                  <span className="inline-flex items-center px-1.5 py-0.5 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded text-[0.6875rem] font-medium">
                    {paper.version}
                  </span>
                </div>
                <h3 className="text-base font-semibold mb-1 leading-snug">
                  <Link
                    href={`/papers/${paper.slug}`}
                    className="text-[var(--color-primary)] no-underline hover:text-[var(--color-accent)]"
                  >
                    {paper.title}
                  </Link>
                </h3>
                <p
                  className="text-sm text-[var(--color-muted)] mb-1.5"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {paper.authors.join(", ")}
                </p>
                <p className="text-sm text-[var(--color-secondary)] leading-relaxed line-clamp-2">
                  {paper.abstract}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-[var(--color-muted)] text-sm italic">
            No papers published yet.
          </p>
        )}
      </section>

      {/* Research Implementations */}
      <section className="mt-14">
        <div className="flex items-center gap-2 mb-8">
          <span className="text-xl leading-none">🧠</span>
          <h2
            className="text-sm font-semibold uppercase tracking-wider text-[var(--color-muted)] m-0 leading-none"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Research Implementations
          </h2>
        </div>
        
        <div className="space-y-12">
          {[
            {
              title: "Autonomous Coding Agent",
              tag: "Live demo",
              desc: "A fully autonomous agent capable of resolving highly complex GitHub issues across full codebases using multi-step reasoning capabilities.",
              link: "https://github.com/FGARMY",
              image: "/images/research/agent.png"
            },
            {
              title: "LLM Evaluation Pipeline",
              tag: "Benchmark tool",
              desc: "An internal evaluation pipeline used to benchmark the performance, context retrieval, and reasoning capabilities of frontier foundation models.",
              link: "https://github.com/FGARMY",
              image: "/images/research/eval.png"
            },
            {
              title: "AI DevOps Assistant",
              tag: "Internal system",
              desc: "A continuous integration agent that parses code reviews, summarizes diffs, and manages automated testing and deployment traces autonomously.",
              link: "https://github.com/FGARMY",
              image: "/images/research/devops.png"
            }
          ].map((impl, idx) => (
            <div key={idx} className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
              <div className="flex-1 w-full relative aspect-[16/10] bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded shadow-sm overflow-hidden shrink-0 md:max-w-[400px]">
                <Image 
                  src={impl.image} 
                  alt={impl.title} 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="flex-1 w-full pt-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold leading-tight text-[var(--color-primary)]">
                    {impl.title}
                  </h3>
                  <span className="inline-flex items-center px-2 py-0.5 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded text-[0.6875rem] font-medium text-[var(--color-muted)] whitespace-nowrap" style={{ fontFamily: "var(--font-sans)" }}>
                    {impl.tag}
                  </span>
                </div>
                <p className="text-[0.9375rem] text-[var(--color-secondary)] leading-relaxed mb-5 max-w-md">
                  {impl.desc}
                </p>
                <Link
                  href={impl.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-primary)] transition-colors no-underline"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  View Repository →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <hr className="border-t border-[var(--color-border)] my-16" />

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
          ].map((area) => (
            <div
              key={area.title}
              className="p-5 border border-[var(--color-border)] rounded"
            >
              <h3 className="text-sm font-semibold mb-2">{area.title}</h3>
              <p
                className="text-sm text-[var(--color-secondary)] leading-relaxed"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {area.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
