"use client";
import Link from "next/link";
import { motion } from "framer-motion";
export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-gray-200 bg-[#fff8f6] dark:border-white/10 dark:bg-[#020617]">
      {" "}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,56,92,0.12),transparent_40%)] dark:bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.15),transparent_45%)]" />{" "}
      <div className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-center px-6 py-24 text-center">
        {" "}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl"
        >
          {" "}
          <div className="mb-8 inline-flex items-center rounded-full border border-[#ff385c]/20 bg-[#ff385c]/10 px-5 py-2 text-sm font-medium text-[#ff385c] dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
            {" "}
            Free & Transparent ATS Resume Checker{" "}
          </div>{" "}
          <h1 className="text-5xl font-bold leading-tight tracking-tight text-[#222222] dark:text-white md:text-7xl">
            {" "}
            Get Accurate ATS Score <br /> And Resume Suggestions{" "}
          </h1>{" "}
          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-[#6a6a6a] dark:text-gray-400 md:text-xl">
            {" "}
            Upload your resume and instantly check ATS score, keyword match,
            readability, formatting, and improvement suggestions — completely
            free with no fake low scoring or sales tricks.{" "}
          </p>{" "}
          <div className="mt-12 flex items-center justify-center">
            {" "}
            <Link
              href="/upload"
              className="rounded-2xl bg-[#ff385c] px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-[#e31c5f]"
            >
              {" "}
              Upload Resume{" "}
            </Link>{" "}
          </div>{" "}
        </motion.div>{" "}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative mt-24 w-full max-w-6xl"
        >
          {" "}
          <div className="overflow-hidden rounded-[32px] border border-gray-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#0f172a]">
            {" "}
            <div className="border-b border-gray-200 px-6 py-4 dark:border-white/10">
              {" "}
              <div className="flex items-center gap-2">
                {" "}
                <div className="h-3 w-3 rounded-full bg-red-500" />{" "}
                <div className="h-3 w-3 rounded-full bg-yellow-500" />{" "}
                <div className="h-3 w-3 rounded-full bg-green-500" />{" "}
              </div>{" "}
            </div>{" "}
            <div className="grid gap-6 p-8 lg:grid-cols-3">
              {" "}
              <div className="rounded-3xl border border-gray-200 bg-[#fafafa] p-8 dark:border-white/10 dark:bg-white/[0.03]">
                {" "}
                <p className="text-sm text-[#6a6a6a] dark:text-gray-400">
                  {" "}
                  Overall ATS Score{" "}
                </p>{" "}
                <div className="mt-6 flex h-40 w-40 items-center justify-center rounded-full border-[10px] border-[#ff385c] text-5xl font-bold text-[#222222] dark:border-emerald-500 dark:text-white">
                  {" "}
                  82{" "}
                </div>{" "}
                <p className="mt-6 text-sm text-[#ff385c] dark:text-emerald-400">
                  {" "}
                  Good ATS Compatibility{" "}
                </p>{" "}
              </div>{" "}
              <div className="space-y-5 lg:col-span-2">
                {" "}
                {[
                  ["ATS Compatibility", "92%"],
                  ["Keyword Match", "78%"],
                  ["Readability", "85%"],
                  ["Formatting", "89%"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-gray-200 bg-[#fafafa] p-5 dark:border-white/10 dark:bg-white/[0.03]"
                  >
                    {" "}
                    <div className="mb-3 flex items-center justify-between">
                      {" "}
                      <span className="font-medium text-[#222222] dark:text-white">
                        {" "}
                        {label}{" "}
                      </span>{" "}
                      <span className="text-[#ff385c] dark:text-emerald-400">
                        {" "}
                        {value}{" "}
                      </span>{" "}
                    </div>{" "}
                    <div className="h-3 rounded-full bg-gray-200 dark:bg-white/10">
                      {" "}
                      <div
                        className="h-3 rounded-full bg-[#ff385c] dark:bg-emerald-500"
                        style={{ width: value }}
                      />{" "}
                    </div>{" "}
                  </div>
                ))}{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </motion.div>{" "}
      </div>{" "}
    </section>
  );
}
