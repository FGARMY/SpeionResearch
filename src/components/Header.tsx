"use client";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { User, Search, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-bg)]">
      {/* Utility Bar (Top) */}
      <div className="h-10 px-6 flex items-center justify-between text-[11px] font-sans border-b border-[var(--color-border)]/50">
        <div className="flex items-center gap-1.5 text-[var(--color-muted)]">
          <User className="w-3 h-3" />
          <span className="hidden sm:inline">Not logged in</span>
          <Link href="/talk" className="text-[var(--color-accent)] hover:underline ml-2">Talk</Link>
          <Link href="/contributions" className="text-[var(--color-accent)] hover:underline ml-2">Contributions</Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center bg-[var(--color-bg-secondary)] border border-[var(--color-border)] px-2 py-0.5 rounded gap-2 group focus-within:border-[var(--color-accent)] transition-colors">
            <Search className="w-3 h-3 text-[var(--color-muted)]" />
            <input 
              type="text" 
              placeholder="Search Speion..." 
              className="bg-transparent border-none outline-none w-32 placeholder:text-[10px] text-[var(--color-primary)]"
            />
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Main Bar (Wiki Tabs) */}
      <div className="h-12 px-6 flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
        <div className="flex h-full items-end gap-1">
          <div className="px-4 py-2 bg-[var(--color-bg)] border-x border-t border-[var(--color-border)] text-xs font-medium -mb-[1px]">
            Research
          </div>
          <div className="px-4 py-2 hover:bg-white/50 text-[var(--color-accent)] text-xs -mb-[1px] cursor-pointer">
            Discussion
          </div>
        </div>
        
        <div className="flex h-full items-end gap-1">
          <div className="px-4 py-2 bg-[var(--color-bg)] border-x border-t border-[var(--color-border)] text-xs font-medium -mb-[1px]">
            Read
          </div>
          <div className="px-4 py-2 hover:bg-white/50 text-[var(--color-accent)] text-xs -mb-[1px] cursor-pointer hidden sm:block">
            View source
          </div>
          <div className="px-4 py-2 hover:bg-white/50 text-[var(--color-accent)] text-xs -mb-[1px] cursor-pointer hidden sm:block">
            View history
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden h-full px-4 flex items-center justify-center hover:bg-[var(--color-bg)] border-l border-[var(--color-border)]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-200 lg:hidden ${mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setMobileMenuOpen(false)}
      ></div>
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[var(--color-bg)] shadow-lg z-50 transform transition-transform duration-300 lg:hidden ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 border-b border-[var(--color-border)] flex items-center justify-between">
           <span className="font-serif font-bold">Speion Menu</span>
           <button onClick={() => setMobileMenuOpen(false)}><X size={20} /></button>
        </div>
        <nav className="flex flex-col gap-4 p-6 text-sm">
          <Link href="/" className="text-[var(--color-accent)] hover:underline" onClick={() => setMobileMenuOpen(false)}>Main Page</Link>
          <Link href="/papers" className="text-[var(--color-accent)] hover:underline" onClick={() => setMobileMenuOpen(false)}>Browse Papers</Link>
          <Link href="/about" className="text-[var(--color-accent)] hover:underline" onClick={() => setMobileMenuOpen(false)}>About</Link>
          <hr className="border-[var(--color-border)]" />
          <Link href="https://github.com/FGARMY" className="text-[var(--color-accent)] hover:underline">GitHub</Link>
        </nav>
      </aside>
    </header>
  );
}
