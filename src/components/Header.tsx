"use client";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { Search } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-[#EEEEEE]">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-serif text-xl font-bold tracking-tight hover:opacity-70 transition-opacity">
            Speion Research Labs
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 text-[13px] font-medium text-[#666666]">
            <Link href="/papers" className="hover:text-[#111111] transition-colors">Research</Link>
            <Link href="/areas" className="hover:text-[#111111] transition-colors">Areas</Link>
            <Link href="/about" className="hover:text-[#111111] transition-colors">About</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#F9F9F9] border border-[#EEEEEE] rounded">
            <Search size={14} className="text-[#999999]" />
            <input 
              type="text" 
              placeholder="Search research..." 
              className="bg-transparent border-none outline-none text-[12px] w-32 focus:w-48 transition-all placeholder:text-[#BBBBBB]"
            />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
