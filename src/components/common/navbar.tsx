"use client";

import Link from "next/link";

import { Moon, Sun } from "lucide-react";

import { useEffect, useState } from "react";

export function Navbar() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => {
    const nextTheme = !darkMode;

    setDarkMode(nextTheme);

    if (nextTheme) {
      document.documentElement.classList.add("dark");

      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");

      localStorage.setItem("theme", "light");
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#ebebeb] bg-white/95 backdrop-blur-xl dark:border-white/10 dark:bg-[#0f172a]/95">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-3xl font-black tracking-tight text-[#222222] dark:text-[var(--foreground)]"
        >
          ATS
          <span className="text-[#ff385c]">Mirror</span>
        </Link>

        {/* <nav className="hidden items-center gap-2 md:flex">
          <Link
            href="/"
            className="rounded-full px-5 py-2 text-sm font-medium text-[#6a6a6a] transition hover:bg-[#f7f7f7] hover:text-[#222222] dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-[var(--foreground)]"
          >
            Home
          </Link>

          <Link
            href="/upload"
            className="rounded-full px-5 py-2 text-sm font-medium text-[#6a6a6a] transition hover:bg-[#f7f7f7] hover:text-[#222222] dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-[var(--foreground)]"
          >
            Upload
          </Link>
        </nav> */}

        <div className="flex items-center gap-4">
          {
            <button
              onClick={toggleTheme}
              className="rounded-full border border-[#dddddd] bg-white p-3 transition hover:shadow-md dark:border-white/10 dark:bg-slate-900"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-[var(--foreground)]" />
              ) : (
                <Moon className="h-5 w-5 text-black" />
              )}
            </button>
          }

          <Link
            href="/upload"
            className="rounded-full bg-[#ff385c] px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:bg-[#e31c5f]"
          >
            Analyze Resume
          </Link>
        </div>
      </div>
    </header>
  );
}
