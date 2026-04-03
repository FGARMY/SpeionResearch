"use client";

import { useState } from "react";
import { subscribeToNewsletter } from "@/app/actions/newsletter";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const res = await subscribeToNewsletter(email);
      if (res.success) {
        setSuccess(true);
        setEmail("");
      } else {
        setError(res.error || "An error occurred.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 px-8 bg-[var(--color-primary)] text-[var(--color-bg)] rounded-2xl overflow-hidden relative border border-[var(--color-primary)]">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none"></div>
      
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <h2 className="text-3xl font-bold mb-4 tracking-tight" style={{ fontFamily: "var(--font-serif)" }}>
          Join the Lab
        </h2>
        <p className="text-white/70 mb-8 max-w-md mx-auto text-sm leading-relaxed" style={{ fontFamily: "var(--font-sans)" }}>
          Get early access to our latest research papers, multi-agent frameworks, and production AI benchmarks. No fluff, just engineering results.
        </p>

        {success ? (
          <div className="py-4 px-6 bg-white/10 border border-white/20 rounded-lg text-sm font-medium animate-in fade-in zoom-in duration-300">
            Welcome to the Lab! We'll be in touch with the latest research.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-sm text-[var(--color-bg)] placeholder-white/40 focus:outline-none focus:bg-white/15 transition-all"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-[var(--color-bg)] text-[var(--color-primary)] font-bold text-sm rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center whitespace-nowrap"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe →"}
            </button>
          </form>
        )}
        {error && <p className="mt-4 text-red-300 text-xs font-semibold">{error}</p>}
      </div>
    </section>
  );
}
