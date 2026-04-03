"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-8 h-8 rounded-md bg-[var(--color-bg-secondary)] border border-[var(--color-border)] animate-pulse" />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-8 h-8 flex items-center justify-center rounded-md bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun size={16} className="text-yellow-500" />
      ) : (
        <Moon size={16} className="text-indigo-600" />
      )}
    </button>
  );
}
