"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getResumeAnalysis } from "@/services/resume-service";
import {
  ResumeAnalysisResponse,
  ScoreCard,
  Suggestion,
  ScoreBreakdown,
  Strength,
} from "@/types/resume";

// ─── Color maps ───────────────────────────────────────────────────────────────
const COLOR_MAP: Record<string, string> = {
  GREEN: "#16a34a",
  RED: "#dc2626",
  AMBER: "#d97706",
  BLUE: "#2563eb",
  ORANGE: "#ea580c",
};

const STATUS_BG: Record<string, string> = {
  GREEN: "bg-emerald-50 text-emerald-700",
  RED: "bg-red-50 text-red-600",
  AMBER: "bg-amber-50 text-amber-700",
  BLUE: "bg-blue-50 text-blue-700",
  ORANGE: "bg-orange-50 text-orange-700",
};

const SEVERITY_STYLES: Record<string, string> = {
  HIGH: "bg-red-50 text-red-600 border border-red-100",
  MEDIUM: "bg-amber-50 text-amber-700 border border-amber-100",
  LOW: "bg-slate-100 text-slate-500 border border-slate-200",
};

// ─── Icon map ─────────────────────────────────────────────────────────────────
function CardIcon({ icon, color }: { icon: string; color: string }) {
  const c = COLOR_MAP[color] ?? "#64748b";
  const paths: Record<string, React.ReactNode> = {
    SHIELD: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    CHART: (
      <>
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </>
    ),
    BOOK_OPEN: (
      <>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </>
    ),
    SPARKLES: (
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z" />
    ),
    PEN_TOOL: (
      <>
        <path d="m12 19 7-7 3 3-7 7-3-3z" />
        <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="m2 2 7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </>
    ),
    RULER: (
      <path d="M21.3 8.7 8.7 21.3c-1 1-2.5 1-3.4 0l-2.6-2.6c-1-1-1-2.5 0-3.4L15.3 2.7c1-1 2.5-1 3.4 0l2.6 2.6c1 1 1 2.5 0 3.4Z" />
    ),
    LAYERS: (
      <>
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </>
    ),
    BRIEFCASE: (
      <>
        <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </>
    ),
  };
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke={c}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[icon] ?? <circle cx="12" cy="12" r="8" />}
    </svg>
  );
}

// ─── Score ring ───────────────────────────────────────────────────────────────
function ScoreRing({ score, color }: { score: number; color: string }) {
  const r = 52,
    circ = 2 * Math.PI * r;
  const offset = circ - (Math.min(score, 100) / 100) * circ;
  const c = COLOR_MAP[color] ?? "#ff385c";
  return (
    <div className="relative flex h-[124px] w-[124px] shrink-0 items-center justify-center">
      <svg
        width="124"
        height="124"
        viewBox="0 0 124 124"
        className="-rotate-90"
      >
        <circle
          cx="62"
          cy="62"
          r={r}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth="6"
        />
        <circle
          cx="62"
          cy="62"
          r={r}
          fill="none"
          stroke={c}
          strokeWidth="6"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-3xl font-bold tracking-tight" style={{ color: c }}>
          {Math.round(score)}
        </div>
        <div className="text-[11px] font-medium text-slate-400">/100</div>
      </div>
    </div>
  );
}

// ─── Mini arc (score cards) ───────────────────────────────────────────────────
function MiniArc({ score, color }: { score: number; color: string }) {
  const r = 18,
    circ = 2 * Math.PI * r;
  const offset = circ - (Math.min(score, 100) / 100) * circ;
  const c = COLOR_MAP[color] ?? "#64748b";
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      className="-rotate-90 shrink-0"
    >
      <circle
        cx="22"
        cy="22"
        r={r}
        fill="none"
        stroke="#f1f5f9"
        strokeWidth="4"
      />
      <circle
        cx="22"
        cy="22"
        r={r}
        fill="none"
        stroke={c}
        strokeWidth="4"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fafaf9]">
      {children}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ResultsPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<ResumeAnalysisResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await getResumeAnalysis(Number(id));
        setData(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading)
    return (
      <Centered>
        <p className="text-sm text-slate-400">Analysing…</p>
      </Centered>
    );
  if (!data)
    return (
      <Centered>
        <p className="text-sm text-red-400">Failed to load.</p>
      </Centered>
    );

  const h = data.header;
  const kw = data.keywordOverview;
  const total = kw.totalKeywords || 1;

  return (
    <main className="min-h-screen bg-[#f8f8f7] text-slate-800">
      {/* NAV */}
      {/* <nav className="sticky top-0 z-50 flex h-13 items-center justify-between border-b border-slate-100 bg-white/90 px-8 backdrop-blur-sm">
        <span className="text-sm font-bold tracking-tight">
          ATS<span className="text-[#ff385c]">Mirror</span>
        </span>
        <button className="flex items-center gap-2 rounded-full bg-[#ff385c] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#e8304f]">
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
          </svg>
          Analyze Resume
        </button>
      </nav> */}

      <div className="mx-auto max-w-5xl space-y-4 px-5 py-7">
        {/* ── HERO CARD ──────────────────────────────────────────────── */}
        <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="grid lg:grid-cols-[1fr_220px]">
            {/* Left */}
            <div className="p-7">
              <div className="mb-5 flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h1 className="text-[17px] font-bold text-slate-900">
                    {h.fileName}
                  </h1>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                    <span>
                      {new Date(h.uploadedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-slate-200" />
                    <span>
                      {h.totalPages} page · {h.totalWords} words
                    </span>
                  </div>
                </div>
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-600">
                  ✓ Analysis Complete
                </span>
              </div>

              <div className="flex items-center gap-6">
                <ScoreRing score={h.overallScore} color={h.overallColor} />
                <div>
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                    Overall Score
                  </p>
                  <p className="mb-2 text-sm font-bold text-slate-800">
                    {h.overallStatus}
                  </p>
                  <p className="max-w-md text-xs leading-relaxed text-slate-500">
                    {h.summary}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: quick summary */}
            <div className="border-l border-slate-100 bg-slate-50/50 px-6 py-7">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                Quick Summary
              </p>
              {[
                { label: "Detected Role", value: h.detectedRole },
                { label: "Experience", value: `${h.experienceYears} Years` },
                { label: "Seniority", value: h.seniority },
                { label: "Resume ID", value: `#${data.resumeId}` },
              ].map(({ label, value }) => (
                <div key={label} className="mb-4 last:mb-0">
                  <p className="text-[10px] text-slate-400">{label}</p>
                  <p className="mt-0.5 text-[13px] font-semibold text-slate-800">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SCORE CARDS ────────────────────────────────────────────── */}
        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {data.scoreCards.map((card: ScoreCard) => (
            <div
              key={card.id}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="rounded-xl border border-slate-100 p-2">
                  <CardIcon icon={card.icon} color={card.color} />
                </div>
                <MiniArc score={card.score} color={card.color} />
              </div>
              <p className="text-[11px] font-medium text-slate-400">
                {card.title}
              </p>
              <p
                className="mt-0.5 text-xl font-bold"
                style={{ color: COLOR_MAP[card.color] }}
              >
                {Math.round(card.score)}
                <span className="text-xs font-normal text-slate-300">/100</span>
              </p>
              <span
                className={`mt-1.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${STATUS_BG[card.color]}`}
              >
                {card.status}
              </span>
              <p className="mt-2 text-[11px] leading-relaxed text-slate-400 line-clamp-2">
                {card.description}
              </p>
            </div>
          ))}
        </section>

        {/* ── BODY GRID ──────────────────────────────────────────────── */}
        <div className="grid gap-4 lg:grid-cols-[1fr_252px]">
          {/* Suggestions */}
          <div className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm">
            <h2 className="text-sm font-bold text-slate-900">
              Recruiter Suggestions
            </h2>
            <p className="mb-5 mt-0.5 text-[11px] text-slate-400">
              Ranked by impact on your ATS score
            </p>
            <div className="space-y-2">
              {data.suggestions.map((s: Suggestion) => (
                <div
                  key={s.id}
                  className="flex items-start gap-3 rounded-xl border border-slate-100 p-4 transition hover:border-slate-200 hover:bg-slate-50/60"
                >
                  <div className="mt-0.5 shrink-0 rounded-xl border border-slate-100 p-2">
                    <CardIcon
                      icon={s.icon ?? "SHIELD"}
                      color={s.color ?? "BLUE"}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-semibold text-slate-800">
                      {s.title}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
                      {s.message}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 self-start rounded-full px-2.5 py-1 text-[10px] font-bold ${SEVERITY_STYLES[s.severity]}`}
                  >
                    {s.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-3">
            {/* Keyword coverage */}
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                Keyword Coverage
              </p>
              {[
                {
                  label: "Matched",
                  value: kw.matchedKeywords,
                  pct: (kw.matchedKeywords / total) * 100,
                  bar: "bg-emerald-400",
                },
                {
                  label: "Missing",
                  value: kw.missingKeywords,
                  pct: (kw.missingKeywords / total) * 100,
                  bar: "bg-amber-400",
                },
                {
                  label: "Total",
                  value: kw.totalKeywords,
                  pct: 100,
                  bar: "bg-blue-300",
                },
              ].map(({ label, value, pct, bar }) => (
                <div key={label} className="mb-3 last:mb-0">
                  <div className="mb-1 flex justify-between text-[11px]">
                    <span className="text-slate-500">{label}</span>
                    <span className="font-bold text-slate-700">{value}</span>
                  </div>
                  <div className="h-1 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${bar}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Missing */}
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                Missing Keywords
              </p>
              <div className="flex flex-wrap gap-1.5">
                {kw.missingSkills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-red-100 bg-red-50 px-2.5 py-1 text-[11px] font-medium text-red-500"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Detected */}
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                  Detected Skills
                </p>
                <button className="text-[11px] font-semibold text-[#ff385c]">
                  View All
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {kw.matchedSkills.slice(0, 10).map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-600"
                  >
                    {s}
                  </span>
                ))}
                {kw.matchedSkills.length > 10 && (
                  <span className="rounded-full border border-slate-100 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-400">
                    +{kw.matchedSkills.length - 10} more
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── SCORE BREAKDOWN ────────────────────────────────────────── */}
        <section className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm">
          <h2 className="mb-1 text-sm font-bold text-slate-900">
            Score Breakdown
          </h2>
          <p className="mb-5 text-[11px] text-slate-400">
            Weighted contribution to overall score
          </p>
          <div className="space-y-2">
            {data.scoreBreakdown.map((item: ScoreBreakdown) => {
              const c = COLOR_MAP[item.color] ?? "#64748b";
              return (
                <div
                  key={item.category}
                  className="grid grid-cols-[1fr_52px_1fr_56px] items-center gap-4 rounded-xl px-3 py-3 transition hover:bg-slate-50"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="shrink-0 rounded-lg border border-slate-100 p-1.5">
                      <CardIcon icon={item.icon} color={item.color} />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-[12px] font-semibold text-slate-700">
                        {item.title}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {item.weight}% weight
                      </p>
                    </div>
                  </div>
                  <span
                    className={`justify-self-start rounded-full px-2 py-0.5 text-[10px] font-semibold ${STATUS_BG[item.color]}`}
                  >
                    {item.status}
                  </span>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${item.score}%`, backgroundColor: c }}
                    />
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold" style={{ color: c }}>
                      {Math.round(item.score)}
                    </span>
                    <span className="text-[11px] text-slate-300">/100</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── STRENGTHS ──────────────────────────────────────────────── */}
        <section className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm">
          <h2 className="mb-4 text-sm font-bold text-slate-900">
            What&apos;s Working Well
          </h2>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {data.strengths.map((s: Strength) => (
              <div
                key={s.id}
                className="flex items-start gap-2.5 rounded-xl border border-emerald-50 bg-emerald-50/60 p-3.5"
              >
                <svg
                  className="mt-0.5 shrink-0"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="2.5"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <p className="text-[11px] leading-relaxed text-slate-600">
                  {s.message}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
