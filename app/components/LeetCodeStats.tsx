'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, TrendingUp, Hash } from 'lucide-react';

const LEETCODE_USERNAME = 'devmazaharul';

type Difficulty = 'Easy' | 'Medium' | 'Hard';

const DIFF: Record<Difficulty, { stroke: string; text: string; bar: string }> = {
    Easy:   { stroke: '#10b981', text: 'text-emerald-400', bar: 'bg-emerald-500' },
    Medium: { stroke: '#f59e0b', text: 'text-amber-400',   bar: 'bg-amber-500'   },
    Hard:   { stroke: '#f43f5e', text: 'text-rose-400',    bar: 'bg-rose-500'    },
};

function DonutChart({ easy, medium, hard, total, isLight }: {
    easy: number; medium: number; hard: number; total: number; isLight: boolean;
}) {
    const r    = 48;
    const circ = 2 * Math.PI * r;
    const t    = Math.max(total, 1);
    const gap  = 5;
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
                <circle cx="54" cy="54" r={r} fill="none"
                    stroke={isLight ? '#e4e4e7' : '#1f1f23'} strokeWidth="9" />
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
                <span className={`text-xl font-semibold tabular-nums leading-none ${isLight ? 'text-zinc-800' : 'text-white'}`}>{total}</span>
                <span className={`text-[10px] ${isLight ? 'text-zinc-400' : 'text-zinc-600'}`}>solved</span>
            </div>
        </div>
    );
}

function DiffRow({ label, val, pct, delay, isLight }: {
    label: Difficulty; val: number; pct: number; delay: number; isLight: boolean;
}) {
    const cfg = DIFF[label];
    return (
        <motion.div className="flex items-center gap-3"
            initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.25 }}>
            <span className={`text-[11px] font-medium w-12 shrink-0 ${cfg.text}`}>{label}</span>
            <div className={`flex-1 h-1 rounded-full overflow-hidden ${isLight ? 'bg-zinc-200' : 'bg-zinc-800'}`}>
                <motion.div
                    className={`h-full rounded-full ${cfg.bar}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.9, delay: delay + 0.1, ease: 'easeOut' }}
                />
            </div>
            <span className={`text-xs font-semibold tabular-nums w-7 text-right shrink-0 ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>{val}</span>
        </motion.div>
    );
}

export default function LeetCodeStats({ isLight = false }: { isLight?: boolean }) {
    const [stats, setStats]     = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const res  = await fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${LEETCODE_USERNAME}`);
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

    /* ── theme tokens ── */
    const cardBg    = isLight ? 'bg-white border-zinc-200/80'         : 'bg-[#111113] border-zinc-800/80';
    const headerBd  = isLight ? 'border-zinc-100'                     : 'border-zinc-800/60';
    const avatarBg  = isLight ? 'bg-zinc-100 text-zinc-600'           : 'bg-zinc-800 text-zinc-300';
    const nameTx    = isLight ? 'text-zinc-800'                       : 'text-zinc-200';
    const slashTx   = isLight ? 'text-zinc-300'                       : 'text-zinc-700';
    const subTx     = isLight ? 'text-zinc-400'                       : 'text-zinc-600';
    const liveColor = isLight ? 'text-zinc-400'                       : 'text-zinc-600';
    const extColor  = isLight ? 'text-zinc-300 hover:text-zinc-500'   : 'text-zinc-700 hover:text-zinc-400';
    const metaBd    = isLight ? 'border-zinc-100'                     : 'border-zinc-800/60';
    const rankTx    = isLight ? 'text-zinc-700'                       : 'text-zinc-200';
    const skelBg    = isLight ? 'bg-zinc-100'                         : 'bg-zinc-800/40';
    const skelBar   = isLight ? 'bg-zinc-100'                         : 'bg-zinc-800';

    return (
        <motion.div
            initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.3 }}>
            <div className={`rounded-2xl border overflow-hidden ${cardBg}`}>

                {/* Header */}
                <div className={`flex items-center justify-between px-5 py-3 border-b ${headerBd}`}>
                    <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-semibold ${avatarBg}`}>
                            D
                        </div>
                        <span className={`text-sm font-medium ${nameTx}`}>{LEETCODE_USERNAME}</span>
                        <span className={slashTx}>/</span>
                        <span className={`text-sm ${subTx}`}>leetcode</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className={`text-[10px] ${liveColor}`}>{isError ? 'sample data' : 'live'}</span>
                        </div>
                        <a href={`https://leetcode.com/${LEETCODE_USERNAME}`} target="_blank" rel="noopener noreferrer"
                            className={`transition-colors ${extColor}`}>
                            <ExternalLink size={12} />
                        </a>
                    </div>
                </div>

                {/* Body */}
                <div className="p-5">
                    <div className="flex gap-5">

                        {/* Donut */}
                        {loading
                            ? <div className={`w-[108px] h-[108px] rounded-full animate-pulse shrink-0 ${skelBg}`} />
                            : <DonutChart easy={easy} medium={medium} hard={hard} total={total} isLight={isLight} />
                        }

                        {/* Right */}
                        <div className="flex-1 flex flex-col justify-between min-w-0">

                            {/* Bars */}
                            <div className="space-y-2.5">
                                {loading
                                    ? [...Array(3)].map((_, i) => (
                                        <div key={i} className="flex items-center gap-3 animate-pulse">
                                            <div className={`w-12 h-3 rounded ${skelBar}`} />
                                            <div className={`flex-1 h-1 rounded-full ${skelBar}`} />
                                            <div className={`w-6 h-3 rounded ${skelBar}`} />
                                        </div>
                                    ))
                                    : (['Easy', 'Medium', 'Hard'] as Difficulty[]).map((d, i) => {
                                        const val = d === 'Easy' ? easy : d === 'Medium' ? medium : hard;
                                        return (
                                            <DiffRow key={d} label={d} val={val}
                                                pct={Math.round((val / maxVal) * 100)}
                                                delay={0.1 * i} isLight={isLight} />
                                        );
                                    })
                                }
                            </div>

                            {/* Meta */}
                            <div className={`flex items-center gap-4 mt-4 pt-4 border-t ${metaBd}`}>
                                <div className="flex items-center gap-1.5">
                                    <Hash size={11} className={subTx} />
                                    {loading
                                        ? <div className={`w-20 h-3.5 rounded animate-pulse ${skelBar}`} />
                                        : <span className={`text-xs font-semibold tabular-nums ${rankTx}`}>
                                            {stats?.ranking ? Number(stats.ranking).toLocaleString() : '—'}
                                          </span>
                                    }
                                    <span className={`text-[10px] ${subTx}`}>rank</span>
                                </div>
                                <div className={`w-px h-3.5 ${isLight ? 'bg-zinc-200' : 'bg-zinc-800'}`} />
                                <div className="flex items-center gap-1.5">
                                    <TrendingUp size={11} className="text-emerald-500" />
                                    {loading
                                        ? <div className={`w-10 h-3.5 rounded animate-pulse ${skelBar}`} />
                                        : <span className={`text-xs font-semibold ${rankTx}`}>
                                            {stats?.acceptanceRate ? `${Math.round(stats.acceptanceRate)}%` : '—'}
                                          </span>
                                    }
                                    <span className={`text-[10px] ${subTx}`}>acceptance</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}