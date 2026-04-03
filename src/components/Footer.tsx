export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] mt-16">
      <div
        className="max-w-4xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[var(--color-muted)]"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <p className="whitespace-nowrap">&copy; {new Date().getFullYear()} Speion Research. All rights reserved.</p>
        
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-5">
          <a
            href="https://github.com/FGARMY/SpeionResearch"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-primary)] no-underline transition-colors"
          >
            GitHub
          </a>
          <a href="#" className="hover:text-[var(--color-primary)] no-underline transition-colors">LinkedIn</a>
          <a href="mailto:contact@example.com" className="hover:text-[var(--color-primary)] no-underline transition-colors">Email</a>
          <a href="#" className="hover:text-[var(--color-primary)] no-underline transition-colors">Collaboration / Internship</a>
        </div>
      </div>
    </footer>
  );
}
