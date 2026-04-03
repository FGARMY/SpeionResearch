export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] mt-16">
      <div
        className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between text-sm text-[var(--color-muted)]"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <p>&copy; {new Date().getFullYear()} Speion Research. All rights reserved.</p>
        <a
          href="https://github.com/FGARMY/SpeionResearch"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--color-primary)] no-underline transition-colors"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
