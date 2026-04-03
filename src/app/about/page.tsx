import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Speion Research — independent research in software engineering, AI, and applied technology.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1
        className="text-2xl font-bold mb-6"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        About
      </h1>

      <div className="prose-academic">
        <p>
          Speion Research is an independent research initiative focused on
          advancing the understanding and practice of software engineering,
          artificial intelligence, and applied technology.
        </p>

        <p>
          Our work spans agent-based software architectures, large language model
          evaluation, developer productivity tooling, and engineering
          methodology. We publish our findings openly and maintain reproducible
          codebases for all published work.
        </p>

        <h2>Research Philosophy</h2>

        <p>
          We believe in rigorous, reproducible research that bridges the gap
          between academic inquiry and practical engineering. Every paper we
          publish is accompanied by open-source code, ensuring that our results
          can be independently verified and built upon.
        </p>

        <h2>Focus Areas</h2>

        <ul>
          <li>
            <strong>Software Architecture</strong> — Agent-based systems,
            distributed computing patterns, and scalable system design.
          </li>
          <li>
            <strong>Artificial Intelligence</strong> — LLM evaluation
            frameworks, prompt engineering methodology, and applied ML pipelines.
          </li>
          <li>
            <strong>Developer Tooling</strong> — Automation frameworks, CI/CD
            optimization, and engineering productivity measurement.
          </li>
        </ul>

        <h2>Open Access</h2>

        <p>
          All Speion Research publications are freely available. We are committed
          to open access and believe that research should be accessible to
          everyone. Source code for our papers and experiments is available on{" "}
          <a
            href="https://github.com/FGARMY/SpeionResearch"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </p>

        <h2>Contact</h2>

        <p>
          For inquiries about our research, collaboration opportunities, or
          general questions, please reach out via our{" "}
          <a
            href="https://github.com/FGARMY/SpeionResearch"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub repository
          </a>
          .
        </p>
      </div>
    </div>
  );
}
