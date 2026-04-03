"use client";

import { useState } from "react";
import { verifyPassword, publishPaper, type PaperSubmission } from "../actions/admin";

export default function AdminPortal() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const [formData, setFormData] = useState<PaperSubmission>({
    title: "",
    authors: "Speion Research",
    abstract: "",
    tags: "",
    contributions: "",
    content: "",
    github: "",
    pdf: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success?: boolean; message?: string }>({});

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setIsAuthenticating(true);

    try {
      const res = await verifyPassword(password);
      if (res.success) {
        setIsAuthenticated(true);
      } else {
        setAuthError(res.error || "Authentication failed.");
      }
    } catch (err) {
      setAuthError("An unexpected error occurred.");
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({});

    try {
      const res = await publishPaper({ ...formData, password });
      
      if (res.success) {
        setSubmitStatus({ 
          success: true, 
          message: `Successfully published paper! Vercel is building the site now. Your abstract will be live at /papers/${res.slug} shortly.` 
        });
        // Clear form except authors
        setFormData({
          title: "",
          authors: formData.authors,
          abstract: "",
          tags: "",
          contributions: "",
          content: "",
          github: "",
          pdf: ""
        });
      } else {
        setSubmitStatus({ success: false, message: res.error });
      }
    } catch (err: any) {
      setSubmitStatus({ success: false, message: err.message || "Network error." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6">
        <div className="w-full max-w-sm p-8 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded shadow-sm">
          <h1 className="text-2xl font-bold mb-2 text-[var(--color-primary)]" style={{ fontFamily: "var(--font-serif)" }}>Admin Portal</h1>
          <p className="text-sm text-[var(--color-secondary)] mb-6" style={{ fontFamily: "var(--font-sans)" }}>
            Enter the shared passcode to access the Git-backed publishing dashboard.
          </p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Passcode..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-[var(--color-border)] rounded bg-[var(--color-bg)] text-[var(--color-primary)] focus:outline-none focus:border-[var(--color-accent)] font-mono text-sm"
                required
              />
            </div>
            {authError && <p className="text-red-500 text-xs font-medium" style={{ fontFamily: "var(--font-sans)" }}>{authError}</p>}
            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full px-4 py-2 bg-[var(--color-primary)] text-[var(--color-bg)] rounded font-medium hover:opacity-90 transition-opacity disabled:opacity-50 text-sm"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {isAuthenticating ? "Verifying..." : "Authenticate →"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-10 flex items-end justify-between border-b border-[var(--color-border)] pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--color-primary)] mb-2" style={{ fontFamily: "var(--font-serif)" }}>
            Publish Paper
          </h1>
          <p className="text-[var(--color-secondary)] text-sm" style={{ fontFamily: "var(--font-sans)" }}>
            Submit an MDX file securely to the speion-research repository.
          </p>
        </div>
        <div className="text-xs font-mono px-3 py-1 bg-green-100 text-green-800 rounded border border-green-200">
          Authenticated connection active
        </div>
      </div>

      <form onSubmit={handlePublish} className="space-y-8" style={{ fontFamily: "var(--font-sans)" }}>
        
        {/* Core Metadata */}
        <section className="p-6 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded space-y-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-muted)] border-b border-[var(--color-border)] pb-2 mb-4">Core Metadata</h2>
          
          <div className="grid grid-cols-1 gap-5">
            <div>
              <label className="block text-sm font-medium text-[var(--color-primary)] mb-1">Paper Title *</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Agent-Based Autonomous Code Generation..."
                className="w-full px-4 py-2 border border-[var(--color-border)] rounded bg-[var(--color-bg)] text-[var(--color-primary)] focus:outline-none focus:border-[var(--color-accent)] text-sm"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-[var(--color-primary)] mb-1">Authors (Comma separated)</label>
              <input
                name="authors"
                value={formData.authors}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[var(--color-border)] rounded bg-[var(--color-bg)] text-[var(--color-primary)] focus:outline-none focus:border-[var(--color-accent)] text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-primary)] mb-1">Tags (Comma separated)</label>
              <input
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="AI, Software Engineering, etc."
                className="w-full px-4 py-2 border border-[var(--color-border)] rounded bg-[var(--color-bg)] text-[var(--color-primary)] focus:outline-none focus:border-[var(--color-accent)] text-sm"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[var(--color-primary)] mb-1">Short Abstract *</label>
            <textarea
              name="abstract"
              value={formData.abstract}
              onChange={handleChange}
              rows={3}
              placeholder="A 3-4 sentence high-impact summary..."
              className="w-full px-4 py-2 border border-[var(--color-border)] rounded bg-[var(--color-bg)] text-[var(--color-primary)] focus:outline-none focus:border-[var(--color-accent)] text-sm"
              required
            />
          </div>
        </section>

        {/* Extensions */}
        <section className="p-6 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded space-y-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-muted)] border-b border-[var(--color-border)] pb-2 mb-4">Extensions & Links</h2>
          
          <div>
            <label className="block text-sm font-medium text-[var(--color-primary)] mb-1">Key Contributions (One per line)</label>
            <textarea
              name="contributions"
              value={formData.contributions}
              onChange={handleChange}
              rows={4}
              placeholder="Multi-agent architecture&#10;Real-world benchmark results"
              className="w-full px-4 py-2 border border-[var(--color-border)] rounded bg-[var(--color-bg)] text-[var(--color-primary)] focus:outline-none focus:border-[var(--color-accent)] text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-[var(--color-primary)] mb-1">GitHub URL</label>
              <input
                name="github"
                value={formData.github}
                onChange={handleChange}
                placeholder="https://github.com/FGARMY/..."
                className="w-full px-4 py-2 border border-[var(--color-border)] rounded bg-[var(--color-bg)] text-[var(--color-primary)] focus:outline-none focus:border-[var(--color-accent)] text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-primary)] mb-1">Raw PDF URL</label>
              <input
                name="pdf"
                value={formData.pdf}
                onChange={handleChange}
                placeholder="/papers/my-file.pdf"
                className="w-full px-4 py-2 border border-[var(--color-border)] rounded bg-[var(--color-bg)] text-[var(--color-primary)] focus:outline-none focus:border-[var(--color-accent)] text-sm"
              />
            </div>
          </div>
        </section>

        {/* Main Body */}
        <section className="p-6 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded space-y-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-muted)] border-b border-[var(--color-border)] pb-2 mb-4">Main Content (Markdown)</h2>
          
          <div>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={15}
              placeholder="## 1. Introduction&#10;Write the full body of the paper here using standard Markdown format..."
              className="w-full px-4 py-4 border border-[var(--color-border)] rounded bg-[var(--color-bg)] text-[var(--color-primary)] focus:outline-none focus:border-[var(--color-accent)] font-mono text-sm leading-relaxed"
              required
            />
          </div>
        </section>

        {/* Submit handling */}
        <div className="pt-4 flex flex-col gap-4">
          {submitStatus.message && (
            <div className={`p-4 rounded border text-sm font-medium ${submitStatus.success ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"}`}>
              {submitStatus.message}
            </div>
          )}
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto px-8 py-3 bg-[var(--color-primary)] text-[var(--color-bg)] rounded font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 text-base flex justify-center items-center"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[var(--color-bg)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Pushing to GitHub...
              </span>
            ) : (
              "Deploy New Paper"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
