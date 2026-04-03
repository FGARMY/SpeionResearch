import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Speion Research — building practical AI systems, not just theoretical models.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1
        className="text-4xl font-bold mb-8 tracking-tight text-[var(--color-primary)]"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        About Speion Research
      </h1>

      <div className="prose-academic">
        <p className="text-xl leading-relaxed text-[var(--color-primary)]">
          Speion Research is an independent R&D initiative focused on building practical AI systems, not just theoretical models.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-4" style={{ fontFamily: "var(--font-sans)" }}>We focus on:</h2>
        <ul>
          <li><strong>Real-world deployment</strong></li>
          <li><strong>System design over hype</strong></li>
          <li><strong>Performance and scalability</strong></li>
        </ul>

        <h2 className="text-xl font-semibold mt-10 mb-4" style={{ fontFamily: "var(--font-sans)" }}>Goal</h2>
        <p className="text-lg">
          Bridge the gap between AI research and production systems.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-4" style={{ fontFamily: "var(--font-sans)" }}>Connect</h2>
        <p>
          For collaboration, open-source queries, or internship opportunities, please reach out via our{" "}
          <a
            href="https://github.com/FGARMY/SpeionResearch"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub repository
          </a> or through the links in the footer.
        </p>
      </div>
    </div>
  );
}
