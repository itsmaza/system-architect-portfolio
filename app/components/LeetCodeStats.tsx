'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, TrendingUp, Award, ExternalLink } from 'lucide-react';

const LEETCODE_USERNAME = 'devmazaharul';

type LeetStats = {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  acceptanceRate: number;
  ranking: number;
};

/* ── Animated arc ring ── */
function Ring({
  value,
  max,
  size = 80,
  stroke = 5,
}: {
  value: number;
  max: number;
  size?: number;
  stroke?: number;
}) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const pct = max > 0 ? value / max : 0;
  const offset = circ * (1 - pct);

  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
      </defs>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.05)"
        strokeWidth={stroke}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="url(#goldGrad)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      />
    </svg>
  );
}

/* ── Difficulty bar row ── */
function DiffRow({
  label,
  solved,
  total,
  color,
  delay = 0,
}: {
  label: string;
  solved: number;
  total: number;
  color: string;
  delay?: number;
}) {
  const pct = total > 0 ? (solved / total) * 100 : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span
          style={{
            fontSize: '11px',
            fontWeight: 500,
            color,
            letterSpacing: '0.3px',
          }}
        >
          {label}
        </span>
        <span style={{ fontSize: '11px', fontFamily: 'monospace', color: 'rgba(255,255,255,0.3)' }}>
          {solved}
          <span style={{ color: 'rgba(255,255,255,0.15)' }}>/{total}</span>
        </span>
      </div>
      <div
        style={{
          height: '5px',
          borderRadius: '99px',
          background: 'rgba(255,255,255,0.05)',
          overflow: 'hidden',
        }}
      >
        <motion.div
          style={{ height: '100%', background: color, borderRadius: '99px' }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay }}
        />
      </div>
    </div>
  );
}

/* ── Skeleton loader ── */
function Skeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <style>{`@keyframes lc-pulse { 0%,100%{opacity:.4} 50%{opacity:.8} }`}</style>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
            animation: 'lc-pulse 1.5s ease-in-out infinite',
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          <div
            style={{
              height: '28px',
              width: '120px',
              borderRadius: '6px',
              background: 'rgba(255,255,255,0.05)',
              animation: 'lc-pulse 1.5s ease-in-out infinite',
            }}
          />
          <div
            style={{
              height: '12px',
              width: '80px',
              borderRadius: '4px',
              background: 'rgba(255,255,255,0.04)',
              animation: 'lc-pulse 1.5s ease-in-out infinite',
            }}
          />
        </div>
      </div>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div
              style={{
                height: '10px',
                width: '48px',
                borderRadius: '4px',
                background: 'rgba(255,255,255,0.05)',
                animation: 'lc-pulse 1.5s ease-in-out infinite',
              }}
            />
            <div
              style={{
                height: '10px',
                width: '40px',
                borderRadius: '4px',
                background: 'rgba(255,255,255,0.04)',
                animation: 'lc-pulse 1.5s ease-in-out infinite',
              }}
            />
          </div>
          <div
            style={{
              height: '5px',
              borderRadius: '99px',
              background: 'rgba(255,255,255,0.04)',
              animation: 'lc-pulse 1.5s ease-in-out infinite',
            }}
          />
        </div>
      ))}
    </div>
  );
}

/* ── Main component ── */
export default function LeetCodeStats() {
  const [stats, setStats] = useState<LeetStats | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(
          `https://leetcode-stats-api.herokuapp.com/${LEETCODE_USERNAME}`,
          { cache: 'no-store' },
        );
        if (!res.ok) throw new Error('Failed');
        const data = await res.json();
        setStats(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const topPercent =
    stats && stats.ranking > 0
      ? ((stats.ranking / 600000) * 100).toFixed(1)
      : null;

  return (
    <>
      <style>{`
        @keyframes lc-badge-pulse { 0%,100%{opacity:.6} 50%{opacity:1} }
        .lc-badge-live { animation: lc-badge-pulse 2.4s ease-in-out infinite; }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            background: '#0d1117',
            borderRadius: '20px',
            border: `1px solid ${hovered ? 'rgba(255,180,0,0.25)' : 'rgba(255,255,255,0.08)'}`,
            overflow: 'hidden',
            position: 'relative',
            transition: 'border-color 0.4s ease',
          }}
        >
          {/* Top shimmer line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '1px',
              background:
                'linear-gradient(90deg, transparent, rgba(255,180,0,0.55), transparent)',
            }}
          />

          <div style={{ padding: '20px 22px 0' }}>
            {/* ── Header ── */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'rgba(255,180,0,0.1)',
                    border: '1px solid rgba(255,180,0,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Code2 size={16} color="rgba(255,180,0,0.85)" />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: '13px',
                      fontWeight: 500,
                      color: 'rgba(255,255,255,0.85)',
                    }}
                  >
                    LeetCode Stats
                  </div>
                  <div
                    style={{
                      fontSize: '10px',
                      fontFamily: 'monospace',
                      color: 'rgba(255,180,0,0.55)',
                      marginTop: '1px',
                    }}
                  >
                    @{LEETCODE_USERNAME}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  className="lc-badge-live"
                  style={{
                    background: 'rgba(255,180,0,0.1)',
                    border: '1px solid rgba(255,180,0,0.22)',
                    borderRadius: '20px',
                    padding: '4px 10px',
                    fontSize: '10px',
                    color: 'rgba(255,180,0,0.8)',
                    fontWeight: 500,
                    letterSpacing: '0.5px',
                  }}
                >
                  LIVE
                </div>
                <a
                  href={`https://leetcode.com/${LEETCODE_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'rgba(255,255,255,0.25)',
                    display: 'flex',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color =
                      'rgba(255,255,255,0.6)')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color =
                      'rgba(255,255,255,0.25)')
                  }
                >
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* ── Body ── */}
            {loading && <Skeleton />}

            {error && !loading && (
              <p
                style={{
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.25)',
                  textAlign: 'center',
                  padding: '24px 0',
                  fontWeight: 300,
                }}
              >
                Could not load stats right now.
              </p>
            )}

            {stats && !loading && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Ring + solved count */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div
                    style={{
                      position: 'relative',
                      width: '80px',
                      height: '80px',
                      flexShrink: 0,
                    }}
                  >
                    <Ring value={stats.totalSolved} max={stats.totalQuestions} />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1px',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '18px',
                          fontWeight: 500,
                          color: 'rgba(255,255,255,0.9)',
                          lineHeight: 1,
                        }}
                      >
                        {stats.totalSolved}
                      </span>
                      <span
                        style={{ fontSize: '9px', color: 'rgba(255,255,255,0.28)' }}
                      >
                        solved
                      </span>
                    </div>
                  </div>

                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: '32px',
                        fontWeight: 300,
                        color: 'rgba(255,255,255,0.9)',
                        letterSpacing: '-1px',
                        lineHeight: 1,
                      }}
                    >
                      {stats.totalSolved}
                      <span
                        style={{
                          fontSize: '15px',
                          color: 'rgba(255,255,255,0.2)',
                          marginLeft: '4px',
                        }}
                      >
                        /{stats.totalQuestions}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: '11px',
                        color: 'rgba(255,255,255,0.3)',
                        marginTop: '4px',
                      }}
                    >
                      problems solved
                    </div>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                      <div
                        style={{
                          background: 'rgba(74,222,128,0.08)',
                          border: '1px solid rgba(74,222,128,0.15)',
                          borderRadius: '6px',
                          padding: '3px 8px',
                          fontSize: '10px',
                          color: 'rgba(74,222,128,0.75)',
                          fontFamily: 'monospace',
                        }}
                      >
                        {((stats.totalSolved / stats.totalQuestions) * 100).toFixed(1)}%
                      </div>
                      {topPercent && (
                        <div
                          style={{
                            background: 'rgba(255,180,0,0.08)',
                            border: '1px solid rgba(255,180,0,0.15)',
                            borderRadius: '6px',
                            padding: '3px 8px',
                            fontSize: '10px',
                            color: 'rgba(255,180,0,0.75)',
                            fontFamily: 'monospace',
                          }}
                        >
                          Top {topPercent}%
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Difficulty bars */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <DiffRow
                    label="Easy"
                    solved={stats.easySolved}
                    total={stats.totalEasy}
                    color="rgba(74,222,128,0.7)"
                    delay={0.1}
                  />
                  <DiffRow
                    label="Medium"
                    solved={stats.mediumSolved}
                    total={stats.totalMedium}
                    color="rgba(251,191,36,0.7)"
                    delay={0.2}
                  />
                  <DiffRow
                    label="Hard"
                    solved={stats.hardSolved}
                    total={stats.totalHard}
                    color="rgba(248,113,113,0.7)"
                    delay={0.3}
                  />
                </div>
              </div>
            )}
          </div>

          {/* ── Footer ── */}
          {stats && !loading && (
            <div
              style={{
                borderTop: '1px solid rgba(255,255,255,0.05)',
                padding: '13px 22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '20px',
              }}
            >
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.3)',
                }}
              >
                <Award size={12} color="rgba(255,180,0,0.5)" />
                Rank{' '}
                <span
                  style={{
                    color: 'rgba(255,255,255,0.55)',
                    fontFamily: 'monospace',
                  }}
                >
                  #{stats.ranking.toLocaleString()}
                </span>
              </span>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.3)',
                }}
              >
                <TrendingUp size={12} color="rgba(74,222,128,0.5)" />
                Acceptance{' '}
                <span
                  style={{
                    color: 'rgba(255,255,255,0.55)',
                    fontFamily: 'monospace',
                  }}
                >
                  {stats.acceptanceRate.toFixed(1)}%
                </span>
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}