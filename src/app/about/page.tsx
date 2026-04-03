import type { Metadata } from "next";
import { X, Link as LinkIcon, Check } from "lucide-react";

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

        <h2 className="text-xl font-semibold mt-10 mb-4" style={{ fontFamily: "var(--font-sans)" }}>Methodology</h2>
        <p>
          We believe in <strong>System Design over Hype</strong>. Our research is evaluated against real-world production constraints—scalability, latency, and reliability. We don't just run experiments on synthetic datasets; we build autonomous agents that resolve real GitHub issues and evaluators that analyze production-scale context.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-4" style={{ fontFamily: "var(--font-sans)" }}>Engineering Stack</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 py-4 px-6 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg">
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[var(--color-muted)] font-bold mb-2">Inference & R&D</h4>
            <ul className="text-sm space-y-1 list-none p-0 m-0">
              <li>• Multi-agent orchestration</li>
              <li>• High-concurrency LLM inference</li>
              <li>• Vector-native context retrieval</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[var(--color-muted)] font-bold mb-2">Platform & Ops</h4>
            <ul className="text-sm space-y-1 list-none p-0 m-0">
              <li>• Git-backed MDX pipelines</li>
              <li>• Automated benchmarking</li>
              <li>• Next.js 15 (App Router)</li>
            </ul>
          </div>
        </div>

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

        <h2 className="text-xl font-semibold mt-10 mb-4" style={{ fontFamily: "var(--font-sans)" }}>Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { name: "Principal Researcher", role: "Founding Lead", bio: "Focussed on multi-agent software architectures and LLM benchmarking." },
            { name: "Systems Engineer", role: "R&D Engineer", bio: "Expert in scalable AI deployment and autonomous DevOps pipelines." },
            { name: "Core Contributor", role: "Research Associate", bio: "Specializes in applied technology and evaluation metrics." }
          ].map((member, idx) => (
            <div key={idx} className="group">
              <div className="w-12 h-12 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-full mb-4 group-hover:border-[var(--color-primary)] transition-colors flex items-center justify-center text-[var(--color-muted)] font-mono text-xs">
                {member.name.charAt(0)}
              </div>
              <h3 className="text-sm font-bold text-[var(--color-primary)] mb-1 leading-none">{member.name}</h3>
              <p className="text-[0.625rem] uppercase tracking-widest text-[var(--color-muted)] font-bold mb-3">{member.role}</p>
              <p className="text-xs text-[var(--color-secondary)] leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
