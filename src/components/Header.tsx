import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

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
        {/* Desktop Nav */}
        <nav
          className="hidden sm:flex gap-6 text-sm"
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
          <div className="pl-2 border-l border-[var(--color-border)] ml-2">
            <ThemeToggle />
          </div>
        </nav>
        {/* Mobile Menu Button */}
        <button
          className="sm:hidden p-2 rounded-md hover:bg-[var(--color-bg-secondary)] transition-colors"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-200 ${mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={toggleMenu}
      ></div>
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[var(--color-bg)] shadow-lg z-50 transform transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
        aria-hidden={!mobileMenuOpen}
      >
        <nav className="flex flex-col gap-4 p-6 text-sm" style={{ fontFamily: "var(--font-sans)" }}>
          <Link href="/" className="text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors" onClick={toggleMenu}>Home</Link>
          <Link href="/papers" className="text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors" onClick={toggleMenu}>Papers</Link>
          <Link href="/about" className="text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors" onClick={toggleMenu}>About</Link>
          <div className="mt-4"><ThemeToggle /></div>
        </nav>
      </aside>
    </header>
  );
}
