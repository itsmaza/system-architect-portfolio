'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, TrendingUp, Hash } from 'lucide-react';

const LEETCODE_USERNAME = 'devmazaharul';

type Difficulty = 'Easy' | 'Medium' | 'Hard';

const DIFF: Record<Difficulty, { stroke: string; bg: string; text: string; bar: string }> = {
  Easy:   { stroke: '#10b981', bg: 'bg-emerald-500/10', text: 'text-emerald-400', bar: 'bg-emerald-500' },
  Medium: { stroke: '#f59e0b', bg: 'bg-amber-500/10',   text: 'text-amber-400',   bar: 'bg-amber-500'   },
  Hard:   { stroke: '#f43f5e', bg: 'bg-rose-500/10',    text: 'text-rose-400',    bar: 'bg-rose-500'    },
};

function DonutChart({ easy, medium, hard, total }: { easy: number; medium: number; hard: number; total: number }) {
  const r = 48;
  const circ = 2 * Math.PI * r;
  const t = Math.max(total, 1);
  const gap = 5;
  const segs = [
    { val: easy,   color: '#10b981' },
    { val: medium, color: '#f59e0b' },
    { val: hard,   color: '#f43f5e' },
  ];
  let off = 0;
  const arcs = segs.map(({ val, color }) => {
    const len = Math.max((val / t) * circ - gap, 0);
    const arc = { len, offset: -off, color };
    off += len + gap;
    return arc;
  });

  return (
    <div className="relative w-[108px] h-[108px] shrink-0">
      <svg width="108" height="108" viewBox="0 0 108 108" className="-rotate-90">
        <circle cx="54" cy="54" r={r} fill="none" stroke="#1f1f23" strokeWidth="9" />
        {arcs.map((a, i) =>
          a.len > 0 ? (
            <motion.circle key={i} cx="54" cy="54" r={r}
              fill="none" stroke={a.color} strokeWidth="9" strokeLinecap="round"
              strokeDasharray={`${a.len} ${circ}`}
              strokeDashoffset={a.offset}
              initial={{ strokeDasharray: `0 ${circ}` }}
              animate={{ strokeDasharray: `${a.len} ${circ}` }}
              transition={{ duration: 1, delay: 0.2 * i, ease: 'easeOut' }}
            />
          ) : null
        )}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
        <span className="text-xl font-semibold text-white tabular-nums leading-none">{total}</span>
        <span className="text-[10px] text-zinc-600">solved</span>
      </div>
    </div>
  );
}

function DiffRow({ label, val, pct, delay }: { label: Difficulty; val: number; pct: number; delay: number }) {
  const cfg = DIFF[label];
  return (
    <motion.div
      className="flex items-center gap-3"
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.25 }}
    >
      <span className={`text-[11px] font-medium w-12 shrink-0 ${cfg.text}`}>{label}</span>
      <div className="flex-1 h-1 rounded-full bg-zinc-800 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${cfg.bar}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, delay: delay + 0.1, ease: 'easeOut' }}
        />
      </div>
      <span className="text-xs font-semibold text-zinc-300 tabular-nums w-7 text-right shrink-0">{val}</span>
    </motion.div>
  );
}

export default function AlgorithmicIntelligence() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${LEETCODE_USERNAME}`);
        const data = await res.json();
        if (!data?.totalSolved) throw new Error();
        setStats(data);
      } catch {
        setIsError(true);
        setStats({ totalSolved: 142, easySolved: 78, mediumSolved: 51, hardSolved: 13, ranking: 120450, acceptanceRate: 62 });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const easy   = stats?.easySolved   ?? 0;
  const medium = stats?.mediumSolved ?? 0;
  const hard   = stats?.hardSolved   ?? 0;
  const total  = stats?.totalSolved  ?? 0;
  const maxVal = Math.max(easy, medium, hard, 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <div className="rounded-2xl bg-[#111113] border border-zinc-800/80 overflow-hidden">

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800/60">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-zinc-800 flex items-center justify-center text-[11px] font-semibold text-zinc-300">
              D
            </div>
            <span className="text-sm font-medium text-zinc-200">{LEETCODE_USERNAME}</span>
            <span className="text-zinc-700">/</span>
            <span className="text-sm text-zinc-600">leetcode</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-zinc-600">{isError ? 'sample data' : 'live'}</span>
            </div>
            <a href={`https://leetcode.com/${LEETCODE_USERNAME}`} target="_blank" rel="noopener noreferrer"
              className="text-zinc-700 hover:text-zinc-400 transition-colors">
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* ── Main body ── */}
        <div className="p-5">
          <div className="flex gap-5">

            {/* Left: donut */}
            {loading
              ? <div className="w-[108px] h-[108px] rounded-full bg-zinc-800/40 animate-pulse shrink-0" />
              : <DonutChart easy={easy} medium={medium} hard={hard} total={total} />
            }

            {/* Right: diff bars + meta */}
            <div className="flex-1 flex flex-col justify-between min-w-0">

              {/* Difficulty bars */}
              <div className="space-y-2.5">
                {loading
                  ? [...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center gap-3 animate-pulse">
                        <div className="w-12 h-3 rounded bg-zinc-800" />
                        <div className="flex-1 h-1 rounded-full bg-zinc-800" />
                        <div className="w-6 h-3 rounded bg-zinc-800" />
                      </div>
                    ))
                  : (['Easy', 'Medium', 'Hard'] as Difficulty[]).map((d, i) => {
                      const val = d === 'Easy' ? easy : d === 'Medium' ? medium : hard;
                      return (
                        <DiffRow
                          key={d}
                          label={d}
                          val={val}
                          pct={Math.round((val / maxVal) * 100)}
                          delay={0.1 * i}
                        />
                      );
                    })
                }
              </div>

              {/* Meta row: rank + acceptance */}
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-zinc-800/60">
                <div className="flex items-center gap-1.5">
                  <Hash size={11} className="text-zinc-600" />
                  {loading
                    ? <div className="w-20 h-3.5 rounded bg-zinc-800 animate-pulse" />
                    : <span className="text-xs font-semibold text-zinc-200 tabular-nums">
                        {stats?.ranking ? Number(stats.ranking).toLocaleString() : '—'}
                      </span>
                  }
                  <span className="text-[10px] text-zinc-600">rank</span>
                </div>
                <div className="w-px h-3.5 bg-zinc-800" />
                <div className="flex items-center gap-1.5">
                  <TrendingUp size={11} className="text-emerald-500" />
                  {loading
                    ? <div className="w-10 h-3.5 rounded bg-zinc-800 animate-pulse" />
                    : <span className="text-xs font-semibold text-zinc-200">
                        {stats?.acceptanceRate ? `${Math.round(stats.acceptanceRate)}%` : '—'}
                      </span>
                  }
                  <span className="text-[10px] text-zinc-600">acceptance</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}