import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="border-b border-[var(--color-border)]">
      <div className="max-w-4xl mx-auto px-6 py-5 flex items-baseline justify-between">
        <Link href="/" className="no-underline">
          <h1
            className="text-xl tracking-tight"
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 700,
              color: "var(--color-primary)",
            }}
          >
            Speion Research
          </h1>
        </Link>
        <nav
          className="flex gap-6 text-sm"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <Link
            href="/"
            className="text-[var(--color-secondary)] hover:text-[var(--color-primary)] no-underline transition-colors"
          >
            Home
          </Link>
          <Link
            href="/papers"
            className="text-[var(--color-secondary)] hover:text-[var(--color-primary)] no-underline transition-colors"
          >
            Papers
          </Link>
          <Link
            href="/about"
            className="text-[var(--color-secondary)] hover:text-[var(--color-primary)] no-underline transition-colors"
          >
            About
          </Link>
          <div className="pl-2 border-l border-[var(--color-border)] ml-2 invisible sm:visible">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
