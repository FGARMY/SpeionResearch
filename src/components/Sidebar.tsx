"use client";

import Link from "next/link";
import Image from "next/image";
import { Home, FileText, Info, Globe, ExternalLink, LucideIcon } from "lucide-react";
import React from "react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
};

export const NAV_LINKS: NavItem[] = [
  { label: "Main Page", href: "/", icon: Home },
  { label: "Browse Papers", href: "/papers", icon: FileText },
  { label: "About Speion", href: "/about", icon: Info },
];

export const CONTRIBUTE_LINKS: NavItem[] = [
  { label: "GitHub Portal", href: "https://github.com/FGARMY", icon: Globe, external: true },
  { label: "Publishing Tool", href: "/admin", icon: ExternalLink },
];

export default function Sidebar() {
  return (
    <div className="flex flex-col h-full space-y-8 font-sans">
      {/* Logo Area */}
      <div className="mb-4">
        <Link href="/" className="group block">
          <Image
            src="/logo.png"
            alt="Speion Research"
            width={120}
            height={30}
            className="h-auto w-32 group-hover:opacity-80 transition-opacity"
            priority
          />
        </Link>
      </div>

      {/* Main Navigation */}
      <section>
        <h3 className="text-[0.625rem] uppercase tracking-widest text-[var(--color-muted)] font-bold mb-3">Navigation</h3>
        <nav className="space-y-1">
          {NAV_LINKS.map((item) => (
            <SidebarLink key={item.href} href={item.href} icon={<item.icon className="w-3.5 h-3.5" />}>
              {item.label}
            </SidebarLink>
          ))}
        </nav>
      </section>

      {/* Contribution/Social */}
      <section>
        <h3 className="text-[0.625rem] uppercase tracking-widest text-[var(--color-muted)] font-bold mb-3">Contribute</h3>
        <nav className="space-y-1">
          {CONTRIBUTE_LINKS.map((item) => (
            <SidebarLink key={item.href} href={item.href} icon={<item.icon className="w-3.5 h-3.5" />} external={item.external}>
              {item.label}
            </SidebarLink>
          ))}
        </nav>
      </section>

      {/* Tagline */}
      <div className="mt-auto pt-8 border-t border-[var(--color-border)]">
        <p className="text-[10px] text-[var(--color-muted)] italic leading-tight">
          The Independent Encyclopedia of AI & Research.
        </p>
      </div>
    </div>
  );
}

export function SidebarLink({ 
  href, 
  children, 
  icon, 
  external 
}: { 
  href: string; 
  children: React.ReactNode; 
  icon: React.ReactNode;
  external?: boolean;
}) {
  const content = (
    <>
      <span className="text-[var(--color-muted)] group-hover:text-[var(--color-accent)] transition-colors">{icon}</span>
      <span>{children}</span>
    </>
  );

  const className = "flex items-center gap-2 px-2 py-1.5 text-[0.8125rem] text-[var(--color-accent)] hover:text-[var(--color-primary)] transition-colors group rounded hover:bg-[var(--color-bg-secondary)]";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
