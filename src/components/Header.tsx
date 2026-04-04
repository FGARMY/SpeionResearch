"use client";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { User, Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { NAV_LINKS, CONTRIBUTE_LINKS, SidebarLink } from "./Sidebar";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-bg)] transition-colors duration-300">
      {/* Utility Bar (Top) */}
      <div className="h-10 px-4 sm:px-6 flex items-center justify-between text-[11px] font-sans border-b border-[var(--color-border)]/50">
        <div className="flex items-center gap-1.5 text-[var(--color-muted)]">
          <User className="w-3 h-3" />
          <span className="hidden sm:inline">Not logged in</span>
          <Link href="/talk" className="text-[var(--color-accent)] hover:underline ml-2">Talk</Link>
          <Link href="/contributions" className="text-[var(--color-accent)] hover:underline ml-2">Contributions</Link>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center bg-[var(--color-bg-secondary)] border border-[var(--color-border)] px-2 py-0.5 rounded gap-2 group focus-within:border-[var(--color-accent)] transition-colors">
            <Search className="w-3 h-3 text-[var(--color-muted)]" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none outline-none w-16 sm:w-32 placeholder:text-[10px] text-[var(--color-primary)] transition-all focus:w-24 sm:focus:w-40"
            />
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Main Bar (Wiki Tabs) */}
      <div className="h-12 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)] overflow-x-auto no-scrollbar">
        <div className="flex items-end justify-between min-w-max sm:min-w-0 h-full px-4 sm:px-6">
          <div className="flex h-full items-end gap-1">
            <div className="px-3 sm:px-4 py-2 bg-[var(--color-bg)] border-x border-t border-[var(--color-border)] text-[11px] sm:text-xs font-medium -mb-[1px] whitespace-nowrap">
              Research
            </div>
            <div className="px-3 sm:px-4 py-2 hover:bg-white/50 text-[var(--color-accent)] text-[11px] sm:text-xs -mb-[1px] cursor-pointer whitespace-nowrap">
              Discussion
            </div>
          </div>
          
          <div className="flex h-full items-end gap-1 ml-auto">
            <div className="px-3 sm:px-4 py-2 bg-[var(--color-bg)] border-x border-t border-[var(--color-border)] text-[11px] sm:text-xs font-medium -mb-[1px] whitespace-nowrap">
              Read
            </div>
            <div className="px-3 sm:px-4 py-2 hover:bg-white/50 text-[var(--color-accent)] text-[11px] sm:text-xs -mb-[1px] cursor-pointer whitespace-nowrap hidden xs:block">
              View source
            </div>
            <div className="px-3 sm:px-4 py-2 hover:bg-white/50 text-[var(--color-accent)] text-[11px] sm:text-xs -mb-[1px] cursor-pointer whitespace-nowrap hidden sm:block">
              View history
            </div>
            
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden h-full px-4 flex items-center justify-center hover:bg-[var(--color-bg)] border-l border-[var(--color-border)] ml-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
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
           <span className="font-serif font-bold text-[var(--color-primary)]">Speion Menu</span>
           <button 
             onClick={() => setMobileMenuOpen(false)}
             className="p-1 hover:bg-[var(--color-bg-secondary)] rounded transition-colors"
           >
             <X size={20} className="text-[var(--color-muted)]" />
           </button>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          <h3 className="text-[0.625rem] uppercase tracking-widest text-[var(--color-muted)] font-bold mb-2 px-2">Navigation</h3>
          {NAV_LINKS.map((item) => (
            <div key={item.href} onClick={() => setMobileMenuOpen(false)}>
              <SidebarLink href={item.href} icon={<item.icon className="w-3.5 h-3.5" />}>
                {item.label}
              </SidebarLink>
            </div>
          ))}
          
          <h3 className="text-[0.625rem] uppercase tracking-widest text-[var(--color-muted)] font-bold mt-6 mb-2 px-2">Contribute</h3>
          {CONTRIBUTE_LINKS.map((item) => (
            <div key={item.href} onClick={() => setMobileMenuOpen(false)}>
              <SidebarLink 
                href={item.href} 
                icon={<item.icon className="w-3.5 h-3.5" />} 
                external={item.external}
              >
                {item.label}
              </SidebarLink>
            </div>
          ))}
        </nav>
      </aside>
    </header>
  );
}
