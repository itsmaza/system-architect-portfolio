'use client';

import { useState, useEffect, JSX, useRef } from 'react';
import { motion, AnimatePresence, cubicBezier, useScroll, useTransform } from 'framer-motion';

import {
    Mail, Github, Linkedin, ExternalLink, MapPin, Code2, Terminal,
    Monitor, Server, Wrench, ChevronDown, ArrowRight, MessageCircle,
    Menu, X, Rocket, BookOpen, Award, Send, Heart, CheckCircle2,
    Circle, Database, ArrowUpRight, Target, TrendingUp, Copy, Check,
    Sparkles, Layers, Star, Clock,
} from 'lucide-react';

import {
    PERSONAL, SOCIAL_LINKS, SKILL_CATEGORIES, PROJECTS,
    DSA_METRICS, DSA_PATTERNS, DSA_CASE_STUDIES, EXPERIENCE_TIMELINE,
} from '@/lib/data';

import LeetCodeStats from './components/LeetCodeStats';
import CommandPalette from './components/CommandPalette';

/* ═══════════════ ANIMATIONS ═══════════════ */
const ease = cubicBezier(0.16, 1, 0.3, 1);
const fadeUp      = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } };
const scaleIn     = { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease } } };
const stagger     = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const staggerSlow = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } };

/* ═══════════════ ICON MAPS ═══════════════ */
const socialIcon = (id: string) => {
    const m: Record<string, JSX.Element> = {
        email:    <Mail className="w-[18px] h-[18px]" />,
        linkedin: <Linkedin className="w-[18px] h-[18px]" />,
        github:   <Github className="w-[18px] h-[18px]" />,
        whatsapp: <MessageCircle className="w-[18px] h-[18px]" />,
    };
    return m[id] ?? <ExternalLink className="w-[18px] h-[18px]" />;
};

const catIcon = (id: string) => {
    const m: Record<string, JSX.Element> = {
        frontend: <Monitor className="w-5 h-5" />,
        backend:  <Server className="w-5 h-5" />,
        tools:    <Wrench className="w-5 h-5" />,
    };
    return m[id] ?? <Code2 className="w-5 h-5" />;
};

const tlIcon = (t: string) => {
    const m: Record<string, JSX.Element> = {
        milestone: <Award className="w-4 h-4" />,
        project:   <Rocket className="w-4 h-4" />,
        learning:  <BookOpen className="w-4 h-4" />,
    };
    return m[t] ?? <Circle className="w-4 h-4" />;
};

const NAV = [
    { label: 'About',       id: 'about' },
    { label: 'Skills',      id: 'skills' },
    { label: 'Projects',    id: 'projects' },
    { label: 'Case Studies',id: 'casestudies' },
    { label: 'Journey',     id: 'journey' },
    { label: 'Contact',     id: 'contact' },
] as const;

/* ═══════════════ EXTRA DSA CASE STUDIES ═══════════════ */
const EXTRA_DSA_CASES = [
    {
        id: 'ex-1',
        project: 'Flight Search — Fly Bismillah',
        title: 'Cursor-Based Pagination vs Offset',
        summary: 'Duffel API supports cursor-based pagination. Replaced naive offset with `return_offers: false` + sequential GET — eliminated duplicate offer bugs and cut network overhead ~40%.',
        complexityFocus: 'Offset: O(n) full scan per page. Cursor: O(1) indexed seek — no re-scan.',
        impact: 'Zero duplicate flight results in production. Search page load: 2.8s → 1.6s.',
        stack: ['Next.js', 'Duffel API', 'TypeScript'],
        liveUrl: 'https://www.flybismillah.com',
    },
    {
        id: 'ex-2',
        project: 'SMS Dashboard — ClickSend Clone',
        title: 'Sliding Window for Rate-Limit Throttling',
        summary: 'Fixed sliding-window counter throttles outbound SMS API calls. Redis-backed timestamp ring buffer — no third-party rate-limit lib needed.',
        complexityFocus: 'Ring buffer: O(1) insert/evict. Memory: O(w) where w = window capacity.',
        impact: 'API quota violations → 0. 100% of messages delivered within SLA windows.',
        stack: ['Node.js', 'Redis', 'TypeScript'],
        liveUrl: '#',
    },
    {
        id: 'ex-3',
        project: 'E-Commerce — themaza.shop',
        title: 'Hash Map for O(1) Cart State Lookup',
        summary: 'Replaced linear-scan cart array with a product-id-keyed hash map in Zustand. Quantity updates, additions, and deletions became constant-time regardless of cart size.',
        complexityFocus: 'Array scan: O(n) per update. Hash map: O(1) amortized for all cart ops.',
        impact: 'Cart interaction latency: ~12ms → ~1ms at 200-item cart size in benchmarks.',
        stack: ['Next.js', 'Zustand', 'MongoDB'],
        liveUrl: 'https://themaza.shop',
    },
];

/* ═══════════════ COMPONENTS ═══════════════ */
type CaseStudy = {
    id: string;
    project: string;
    title: string;
    summary: string;
    complexityFocus: string;
    impact: string;
    stack: readonly string[];
    liveUrl?: string;
};

function NoiseOverlay() {
    return (
        <div
            className="pointer-events-none fixed inset-0 z-[-1] opacity-[0.02]"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
        />
    );
}

function AmbientBg() {
    return (
        <div className="pointer-events-none fixed inset-0 z-[-2] overflow-hidden">
            <div className="absolute -top-[250px] left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-[radial-gradient(ellipse,rgba(16,185,129,0.05),transparent_65%)]" />
            <div className="absolute inset-0 opacity-[0.022]" style={{
                backgroundImage: `linear-gradient(rgba(16,185,129,0.2) 1px,transparent 1px),linear-gradient(90deg,rgba(16,185,129,0.2) 1px,transparent 1px)`,
                backgroundSize: '80px 80px',
            }} />
        </div>
    );
}

function SectionHeader({ number, tag, title, desc, center = false }: {
    number: string; tag: string; title: string; desc: string; center?: boolean;
}) {
    return (
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp} className={`mb-16 ${center ? 'text-center' : ''}`}>
            <div className={`flex items-center gap-3 mb-5 ${center ? 'justify-center' : ''}`}>
                <span className="text-[11px] font-mono text-emerald-500/60">{number}</span>
                <span className="w-8 h-px bg-emerald-500/25" />
                <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-emerald-400/70">{tag}</span>
            </div>
            <h2 className="text-[32px] sm:text-[40px] font-light text-white tracking-[-0.03em] leading-[1.1]">{title}</h2>
            <p className={`text-[14px] text-zinc-400 mt-3 leading-relaxed font-light ${center ? 'max-w-md mx-auto' : 'max-w-lg'}`}>{desc}</p>
        </motion.div>
    );
}

function Typer({ texts }: { texts: string[] }) {
    const [text, setText] = useState('');
    const [idx, setIdx]   = useState(0);
    const [ci, setCi]     = useState(0);
    const [del, setDel]   = useState(false);

    useEffect(() => {
        const t = texts[idx];
        const timer = setTimeout(() => {
            if (!del) {
                setText(t.slice(0, ci + 1));
                setCi(p => p + 1);
                if (ci + 1 === t.length) setTimeout(() => setDel(true), 2200);
            } else {
                setText(t.slice(0, ci - 1));
                setCi(p => p - 1);
                if (ci === 0) { setDel(false); setIdx(p => (p + 1) % texts.length); }
            }
        }, del ? 25 : 55);
        return () => clearTimeout(timer);
    }, [ci, del, idx, texts]);

    return (
        <span className="text-emerald-400">
            {text}<span className="animate-pulse text-emerald-600">|</span>
        </span>
    );
}

function GlassCard({ children, className = '', hover = true }: {
    children: React.ReactNode; className?: string; hover?: boolean;
}) {
    return (
        <div className={`rounded-2xl bg-zinc-900/50 border border-zinc-800/60 backdrop-blur-sm
            ${hover ? 'hover:bg-zinc-800/50 hover:border-zinc-700/60 transition-all duration-500' : ''} ${className}`}>
            {children}
        </div>
    );
}

function Divider() {
    return (
        <div className="relative z-[2] max-w-6xl mx-auto px-6">
            <div className="h-px bg-gradient-to-r from-transparent via-zinc-800/80 to-transparent" />
        </div>
    );
}

function CaseCard({ cs }: { cs: CaseStudy }) {
    return (
        <GlassCard className="p-6 sm:p-7 h-full flex flex-col relative group overflow-hidden">
            <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-emerald-500/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <p className="text-[10px] font-mono text-emerald-400/60 uppercase tracking-wider mb-5 flex items-center gap-2">
                <Database className="w-3 h-3" />{cs.project}
            </p>
            <h3 className="text-[15px] font-medium text-zinc-200 mb-3 leading-snug group-hover:text-white transition-colors duration-300">{cs.title}</h3>
            <p className="text-[11px] text-zinc-500 leading-[1.8] mb-5 flex-1 font-light">{cs.summary}</p>
            <div className="p-4 rounded-xl bg-zinc-800/40 border border-zinc-700/40 mb-5">
                <p className="text-[9px] font-mono text-emerald-400/50 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Target className="w-2.5 h-2.5" /> Complexity Analysis
                </p>
                <p className="text-[11px] text-zinc-400 leading-relaxed font-light">{cs.complexityFocus}</p>
            </div>
            <p className="text-[10px] text-zinc-500 italic mb-5 flex items-start gap-2">
                <TrendingUp className="w-3 h-3 mt-0.5 shrink-0 text-emerald-400/40" />{cs.impact}
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-zinc-800/60 mt-auto">
                <div className="flex flex-wrap gap-1.5">
                    {cs.stack.map(t => (
                        <span key={t} className="px-2 py-0.5 rounded text-[8px] font-mono bg-zinc-800/60 border border-zinc-700/40 text-zinc-500">{t}</span>
                    ))}
                </div>
                {cs.liveUrl && (
                    <a href={cs.liveUrl} target="_blank" rel="noopener noreferrer"
                        className="p-2 text-zinc-600 hover:text-emerald-400 transition-colors duration-300">
                        <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                )}
            </div>
        </GlassCard>
    );
}

/* ═══════════════ MAIN ═══════════════ */
export default function Portfolio() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive]     = useState('');
    const [copied, setCopied]     = useState(false);
    const [progress, setProgress] = useState(0);
    const heroRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    useTransform(scrollYProgress, [0, 1], [1, 0]);

    useEffect(() => {
        const fn = () => {
            setScrolled(window.scrollY > 50);
            const t = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(t > 0 ? window.scrollY / t : 0);
        };
        window.addEventListener('scroll', fn, { passive: true });
        return () => window.removeEventListener('scroll', fn);
    }, []);

    useEffect(() => {
        const io = new IntersectionObserver(
            es => es.forEach(e => e.isIntersecting && setActive(e.target.id)),
            { rootMargin: '-40% 0px -55% 0px' },
        );
        document.querySelectorAll('section[id]').forEach(n => io.observe(n));
        return () => io.disconnect();
    }, []);

    const copyMail = async () => {
        await navigator.clipboard.writeText(PERSONAL.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative min-h-screen bg-[#0a0a0a] text-zinc-300 antialiased scroll-smooth selection:bg-emerald-500/20 selection:text-emerald-200">
            <AmbientBg />
            
            {/* Added Tools */}
            <NoiseOverlay />
            <CommandPalette />

            {/* Progress — emerald gradient */}
            <div className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-emerald-700 via-emerald-400 to-emerald-500 z-[60] origin-left"
                style={{ transform: `scaleX(${progress})`, transition: 'transform 0.1s' }} />

            {/* ══ NAV ══ */}
            <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-2xl ' : ''}`}>
                <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
                    <a href="#" className="group flex items-center gap-2">
                        <span className="w-4 h-px bg-gradient-to-r from-emerald-400/70 to-transparent group-hover:w-6 group-hover:from-emerald-400 transition-all duration-500" />
                        <span className="font-mono text-[13px] tracking-tight">
                            <span className="font-semibold text-white group-hover:text-emerald-300 transition-colors duration-300">Maza</span>
                            <span className="font-light text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300">Soft</span>
                        </span>
                    </a>

                    <div className="hidden md:flex items-center gap-1">
                        {NAV.map(n => (
                            <a key={n.id} href={`#${n.id}`}
                                className={`px-3.5 py-2 rounded-lg text-[12px] tracking-wide transition-all duration-300 ${
                                    active === n.id
                                        ? 'text-emerald-400 bg-emerald-500/[0.08] '
                                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                                }`}>{n.label}
                            </a>
                        ))}
                    </div>

                    <a href="#contact"
                        className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full text-[12px] font-medium bg-emerald-500/[0.1] text-emerald-400 border border-emerald-500/25 hover:bg-emerald-500/[0.18] hover:text-emerald-300 hover:border-emerald-400/40 transition-all duration-300">
                        Let&apos;s Talk <ArrowRight className="w-3 h-3" />
                    </a>

                    <button aria-label="Menu" onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden p-2 text-zinc-400 hover:text-zinc-200 transition-colors">
                        {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                <AnimatePresence>
                    {menuOpen && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease }}
                            className="md:hidden overflow-hidden bg-[#0a0a0a]/98 backdrop-blur-2xl border-b border-zinc-800/70">
                            <div className="px-6 py-5 space-y-1">
                                {NAV.map(n => (
                                    <a key={n.id} href={`#${n.id}`} onClick={() => setMenuOpen(false)}
                                        className={`block px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                                            active === n.id ? 'text-emerald-400 bg-emerald-500/[0.08]' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                                        }`}>{n.label}
                                    </a>
                                ))}
                                <div className="pt-3">
                                    <a href="#contact" onClick={() => setMenuOpen(false)}
                                        className="block text-center px-4 py-3 rounded-xl text-sm bg-emerald-500/[0.1] text-emerald-400 border border-emerald-500/25">
                                        Let&apos;s Talk →
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* ══ HERO ══ */}
            <section id="hero" ref={heroRef} className="relative z-[2] min-h-screen flex items-center">
                <div className="max-w-6xl mx-auto px-6 w-full py-24 sm:py-32">
                    <div className="grid lg:grid-cols-[1fr_340px] gap-20 items-center">
                        <motion.div initial="hidden" animate="visible" variants={staggerSlow} className="order-2 lg:order-1">

                            {/* Status badge */}
                            <motion.div variants={fadeUp} className="mb-10">
                                <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/[0.07] border border-emerald-500/20 text-[11px] font-medium text-emerald-400/90">
                                    <span className="relative flex h-1.5 w-1.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400/60 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                                    </span>
                                    Available for opportunities
                                </span>
                            </motion.div>

                            {/* Name + typer */}
                            <motion.div variants={fadeUp} className="mb-8">
                                <p className="text-[13px] text-zinc-500 mb-3 font-mono flex items-center gap-3">
                                    <span className="w-6 h-px bg-emerald-500/40" />Hello, I&apos;m
                                </p>
                                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extralight tracking-[-0.04em] text-white leading-[1.05] mb-5">
                                    {PERSONAL.name.split(' ')[0]}<br />
                                    <span className="text-zinc-400">{PERSONAL.name.split(' ').slice(1).join(' ')}</span>
                                </h1>
                                <div className="text-lg sm:text-xl font-mono h-7 font-light">
                                    <Typer texts={['Full Stack Engineer', 'System Architect', 'Problem Solver', PERSONAL.title]} />
                                </div>
                            </motion.div>

                            <motion.p variants={fadeUp} className="text-[15px] text-zinc-400 leading-[1.9] max-w-lg mb-10 font-light">
                                {PERSONAL.description}
                            </motion.p>

                            {/* Meta row */}
                            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-5 mb-10 text-[12px] text-zinc-500">
                                {[
                                    { icon: <MapPin className="w-3.5 h-3.5" />, t: PERSONAL.location },
                                    { icon: <Clock className="w-3.5 h-3.5" />, t: `${PERSONAL.experience}+ Years Exp.` },
                                    { icon: <Layers className="w-3.5 h-3.5" />, t: PERSONAL.title },
                                ].map((c, i) => (
                                    <span key={i} className="inline-flex items-center gap-2">
                                        <span className="text-emerald-500/60">{c.icon}</span>{c.t}
                                        {i < 2 && <span className="ml-5 w-px h-3 bg-zinc-700" />}
                                    </span>
                                ))}
                            </motion.div>

                            {/* CTAs */}
                            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-12">
                                <a href="#projects"
                                    className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[13px] font-semibold bg-emerald-500 text-zinc-950 hover:bg-emerald-400 transition-all duration-300 shadow-lg shadow-emerald-500/20">
                                    View Projects
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
                                </a>
                                <a href="#contact"
                                    className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[13px] font-medium bg-zinc-800/60 text-zinc-300 border border-zinc-700/60 hover:bg-zinc-700/60 hover:text-white hover:border-zinc-600 transition-all duration-300">
                                    Get in Touch <Send className="w-3.5 h-3.5" />
                                </a>
                            </motion.div>

                            {/* Socials */}
                            <motion.div variants={fadeUp} className="flex items-center gap-1">
                                {SOCIAL_LINKS.map(s => (
                                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                                        className="p-3 rounded-xl text-zinc-500 hover:text-emerald-400 hover:bg-emerald-500/[0.07] transition-all duration-300">
                                        {socialIcon(s.icon)}
                                    </a>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Profile image */}
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.4, ease }}
                            className="order-1 lg:order-2 flex justify-center">
                            <div className="relative group">
                                <div className="absolute -inset-8 rounded-[32px] bg-gradient-to-b from-emerald-500/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden border border-zinc-700/50 bg-zinc-900/50 group-hover:border-emerald-500/30 transition-all duration-500 shadow-2xl shadow-black/40">
                                    <img
                                        src="/Mazaharul Islam Full Stack Software Engineer.PNG"
                                        alt={PERSONAL.name}
                                        loading="lazy" decoding="async"
                                        className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                                <div className="absolute -bottom-4 -right-4 px-4 py-2 rounded-xl bg-[#0a0a0a] border border-zinc-700/60 shadow-2xl shadow-black/60">
                                    <span className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
                                        <Star className="w-3 h-3 text-emerald-400/70" />{PERSONAL.experience}+ years
                                    </span>
                                </div>
                                <div className="absolute -top-3 -left-3 w-6 h-6 rounded-lg border border-zinc-700/50 bg-[#0a0a0a] flex items-center justify-center">
                                    <Sparkles className="w-3 h-3 text-emerald-400/60" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ══ ABOUT ══ */}
            <section id="about" className="relative z-[2] py-6 sm:py-6">
                <div className="max-w-6xl mx-auto px-6">
                    <SectionHeader number="01" tag="About" title="Algorithmic Thinking"
                        desc="Clean architecture, time & space complexity, and measurable efficiency in every system I build." />

                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
                        variants={stagger} className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-16">
                        {DSA_METRICS.map(m => (
                            <motion.div key={m.id} variants={scaleIn}>
                                <GlassCard className="p-6 text-center">
                                    <p className="font-mono text-3xl sm:text-4xl font-light text-emerald-400 mb-2 tracking-tighter">{m.value}</p>
                                    <p className="text-[12px] font-medium text-zinc-300 mb-1">{m.label}</p>
                                    <p className="text-[10px] text-zinc-500 leading-relaxed">{m.description}</p>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp}>
                        <GlassCard className="overflow-hidden" hover={false}>
                            <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-800/60">
                                <div className="flex gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                                </div>
                                <span className="text-[10px] font-mono text-zinc-500">patterns.ts</span>
                                <div className="w-12" />
                            </div>
                            <div className="p-5 sm:p-6">
                                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
                                    variants={stagger} className="grid sm:grid-cols-2 gap-1">
                                    {DSA_PATTERNS.map(p => (
                                        <motion.div key={p.id} variants={fadeUp}
                                            className="group flex items-start gap-3.5 p-3.5 rounded-xl hover:bg-zinc-800/40 transition-all duration-300">
                                            <div className="w-8 h-8 rounded-lg bg-emerald-500/[0.07] border border-emerald-500/15 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-emerald-500/[0.12] transition-colors duration-300">
                                                <Terminal className="w-3.5 h-3.5 text-emerald-400/60" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2.5 mb-1 flex-wrap">
                                                    <span className="text-[12px] font-medium text-zinc-300 group-hover:text-white transition-colors duration-300">{p.name}</span>
                                                    <span className="font-mono text-[9px] px-2 py-0.5 rounded-md bg-zinc-800 text-emerald-400/60 border border-zinc-700/60">{p.notation}</span>
                                                </div>
                                                <p className="text-[10px] text-zinc-500 leading-relaxed">{p.description}</p>
                                            </div>
                                            <span className={`shrink-0 text-[9px] font-mono px-2.5 py-1 rounded-full border ${
                                                p.level === 'Strong'  ? 'border-emerald-500/25 text-emerald-400/80 bg-emerald-500/[0.07]'
                                                : p.level === 'Active' ? 'border-zinc-700/50 text-zinc-400 bg-zinc-800/50'
                                                : 'border-zinc-800/40 text-zinc-500 bg-zinc-900/40'
                                            }`}>{p.level}</span>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        </GlassCard>
                        <br />
                        <LeetCodeStats />
                    </motion.div>
                </div>
            </section>

            <Divider />

            {/* ══ SKILLS ══ */}
            <section id="skills" className="relative z-[2] py-24 sm:py-32">
                <div className="max-w-6xl mx-auto px-6">
                    <SectionHeader number="02" tag="Stack" title="Technical Skills"
                        desc="Technologies I use daily to build production-grade systems." />
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
                        variants={stagger} className="grid md:grid-cols-3 gap-4">
                        {SKILL_CATEGORIES.map(cat => (
                            <motion.div key={cat.title} variants={fadeUp}>
                                <GlassCard className="p-6 sm:p-7 h-full relative group overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/[0.015] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3.5 mb-5">
                                            <div className="p-2.5 rounded-xl bg-emerald-500/[0.07] border border-emerald-500/15 text-emerald-400/60 group-hover:text-emerald-400 transition-colors duration-300">
                                                {catIcon(cat.icon)}
                                            </div>
                                            <div>
                                                <h3 className="text-[14px] font-medium text-zinc-200 group-hover:text-white transition-colors duration-300">{cat.title}</h3>
                                                <p className="text-[10px] text-zinc-500 font-mono mt-0.5">{cat.skills.length} technologies</p>
                                            </div>
                                        </div>
                                        <p className="text-[11px] text-zinc-500 mb-5 leading-relaxed font-light">{cat.description}</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {cat.skills.map(s => (
                                                <span key={s.name}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800/50 border border-zinc-700/50 text-[10px] font-mono text-zinc-400 hover:text-emerald-300 hover:border-emerald-500/30 hover:bg-emerald-500/[0.06] transition-all duration-300 cursor-default">
                                                    {s.name}<span className="text-[8px] text-zinc-600">{s.experience}</span>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <Divider />

            {/* ══ PROJECTS ══ */}
            <section id="projects" className="relative z-[2] py-24 sm:py-32">
                <div className="max-w-6xl mx-auto px-6">
                    <SectionHeader number="03" tag="Work" title="Selected Projects"
                        desc="Systems I've designed, built, and shipped to production." />
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
                        variants={stagger} className="grid sm:grid-cols-2 gap-4">
                        {PROJECTS.map((proj, i) => (
                            <motion.a key={proj.id} href={proj.liveUrl} target="_blank" rel="noopener noreferrer"
                                variants={fadeUp} className="group block">
                                <GlassCard className="p-6 sm:p-7 h-full relative overflow-hidden">
                                    <div className="absolute top-4 right-5 text-[60px] font-extralight text-zinc-800/50 leading-none select-none pointer-events-none">
                                        {String(i + 1).padStart(2, '0')}
                                    </div>
                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-6">
                                            <span className="inline-flex items-center gap-2 text-[10px] font-mono text-zinc-500">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />{proj.status}
                                            </span>
                                            <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-emerald-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300" />
                                        </div>
                                        <h3 className="text-[17px] font-medium text-zinc-200 group-hover:text-white mb-1.5 transition-colors duration-300 leading-snug">{proj.title}</h3>
                                        <p className="text-[10px] text-zinc-500 font-mono mb-4">{proj.subtitle}</p>
                                        <p className="text-[12px] text-zinc-400 leading-[1.8] mb-6 font-light">{proj.description}</p>
                                        <div className="h-px bg-zinc-800/60 mb-5" />
                                        <div className="flex flex-wrap gap-1.5">
                                            {proj.techStack.map(t => (
                                                <span key={t} className="px-2.5 py-1 rounded-md text-[9px] font-mono bg-zinc-800/60 border border-zinc-700/50 text-zinc-500 group-hover:text-emerald-400/70 group-hover:border-emerald-500/20 transition-colors duration-300">{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                </GlassCard>
                            </motion.a>
                        ))}
                    </motion.div>
                </div>
            </section>

            <Divider />

            {/* ══ CASE STUDIES ══ */}
            <section id="casestudies" className="relative z-[2] py-24 sm:py-32">
                <div className="max-w-6xl mx-auto px-6">
                    <SectionHeader number="04" tag="Deep Dive" title="Engineering Case Studies"
                        desc="How algorithmic thinking shapes real production decisions." />
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
                        variants={stagger} className="grid lg:grid-cols-3 gap-4 mb-4">
                        {DSA_CASE_STUDIES.map(cs => (
                            <motion.div key={cs.id} variants={fadeUp}><CaseCard cs={cs} /></motion.div>
                        ))}
                    </motion.div>
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
                        variants={stagger} className="grid lg:grid-cols-3 gap-4">
                        {EXTRA_DSA_CASES.map(cs => (
                            <motion.div key={cs.id} variants={fadeUp}><CaseCard cs={cs} /></motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <Divider />

            {/* ══ JOURNEY ══ */}
            <section id="journey" className="relative z-[2] py-24 sm:py-32">
                <div className="max-w-6xl mx-auto px-6">
                    <SectionHeader number="05" tag="Timeline" title="My Journey"
                        desc="From frontend foundations to full-stack distributed systems." center />
                    <div className="max-w-2xl mx-auto">
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
                            variants={stagger} className="relative">
                            <div className="absolute left-[21px] top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/25 via-zinc-800/40 to-transparent" />
                            <div className="space-y-5">
                                {EXPERIENCE_TIMELINE.map(item => (
                                    <motion.div key={item.id} variants={fadeUp} className="relative pl-16">
                                        <div className="absolute left-0 top-6 w-[42px] flex justify-center">
                                            <div className="w-[42px] h-[42px] rounded-xl bg-zinc-900/70 border border-zinc-700/50 flex items-center justify-center text-zinc-500 hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/[0.06] transition-all duration-300">
                                                {tlIcon(item.type)}
                                            </div>
                                        </div>
                                        <GlassCard className="p-6 sm:p-7">
                                            <span className="inline-block font-mono text-[10px] font-medium px-3 py-1 rounded-lg mb-4 bg-emerald-500/[0.07] border border-emerald-500/20 text-emerald-400/80">
                                                {item.year}
                                            </span>
                                            <h3 className="text-[15px] font-medium text-zinc-200 mb-2">{item.title}</h3>
                                            <p className="text-[12px] text-zinc-400 leading-[1.8] mb-5 font-light">{item.summary}</p>
                                            <ul className="space-y-2.5 mb-5">
                                                {item.highlights.map((h, hi) => (
                                                    <li key={hi} className="flex items-start gap-2.5 text-[11px] text-zinc-400">
                                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400/50 mt-0.5 shrink-0" />
                                                        <span className="leading-relaxed font-light">{h}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-800/60">
                                                {item.techStack.map(t => (
                                                    <span key={t} className="px-2.5 py-0.5 rounded-md text-[8px] font-mono bg-zinc-800/60 border border-zinc-700/40 text-zinc-500">{t}</span>
                                                ))}
                                            </div>
                                        </GlassCard>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Divider />

            {/* ══ CONTACT ══ */}
            <section id="contact" className="relative z-[2] py-24 sm:py-32">
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
                        variants={staggerSlow} className="max-w-xl mx-auto text-center">
                        <motion.div variants={fadeUp} className="mb-10">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/[0.07] border border-emerald-500/20 mb-7">
                                <Mail className="w-6 h-6 text-emerald-400/80" />
                            </div>
                            <div className="flex items-center justify-center gap-3 mb-5">
                                <span className="text-[11px] font-mono text-emerald-500/60">06</span>
                                <span className="w-8 h-px bg-emerald-500/25" />
                                <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-emerald-400/70">Contact</span>
                            </div>
                            <h2 className="text-[32px] sm:text-[40px] font-light text-white tracking-[-0.03em] mb-4">Let&apos;s work together</h2>
                            <p className="text-[14px] text-zinc-400 leading-relaxed max-w-md mx-auto font-light">
                                Open to collaboration, hiring, or technical conversations. I&apos;d love to hear from you.
                            </p>
                        </motion.div>

                        <motion.div variants={stagger} className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                            {SOCIAL_LINKS.map(s => (
                                <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" variants={scaleIn}>
                                    <GlassCard className="flex flex-col items-center gap-3 p-5 group cursor-pointer">
                                        <span className="text-zinc-500 group-hover:text-emerald-400 transition-colors duration-300">{socialIcon(s.icon)}</span>
                                        <span className="text-[11px] text-zinc-500 group-hover:text-zinc-300 transition-colors duration-300 font-light">{s.label}</span>
                                    </GlassCard>
                                </motion.a>
                            ))}
                        </motion.div>

                        <motion.div variants={fadeUp}>
                            <button onClick={copyMail}
                                className="group inline-flex items-center gap-4 px-6 py-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-700/50 hover:bg-zinc-800/60 hover:border-emerald-500/25 transition-all duration-300">
                                <Mail className="w-4 h-4 text-zinc-500" />
                                <span className="text-[13px] font-mono text-zinc-400 group-hover:text-emerald-300 transition-colors duration-300">{PERSONAL.email}</span>
                                <div className="w-px h-4 bg-zinc-700" />
                                {copied
                                    ? <Check className="w-4 h-4 text-emerald-400" />
                                    : <Copy className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400 transition-colors duration-300" />}
                            </button>
                            <AnimatePresence>
                                {copied && (
                                    <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                        className="text-[11px] text-emerald-400/80 font-mono mt-3">
                                        ✓ Copied to clipboard
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ══ FOOTER ══ */}
            <footer className="relative z-[2] py-10 border-t border-zinc-800/60">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <a href="#" className="group flex items-center gap-2">
                            <span className="w-4 h-px bg-gradient-to-r from-emerald-400/70 to-transparent group-hover:w-6 group-hover:from-emerald-400 transition-all duration-500" />
                            <span className="font-mono text-[13px] tracking-tight">
                                <span className="font-semibold text-white group-hover:text-emerald-300 transition-colors duration-300">Maza</span>
                                <span className="font-light text-zinc-500">Soft</span>
                            </span>
                        </a>
                        <span className="text-[11px] text-zinc-500 flex items-center gap-2">
                            © {new Date().getFullYear()} {PERSONAL.name}
                            <span className="text-zinc-700">·</span>
                            Turning Ideas into Reality
                            <Heart className="w-3 h-3 text-emerald-400/40" />
                        </span>
                        <div className="flex gap-0.5">
                            {SOCIAL_LINKS.slice(0, 3).map(s => (
                                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                                    className="p-2.5 text-zinc-600 hover:text-emerald-400 transition-colors duration-300">
                                    {socialIcon(s.icon)}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>

            {/* Back to top */}
            <AnimatePresence>
                {scrolled && (
                    <motion.a href="#hero" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2 }}
                        className="fixed bottom-6 right-6 z-50 p-3 rounded-xl bg-zinc-900/80 border border-zinc-700/50 text-zinc-500 hover:text-emerald-400 hover:border-emerald-500/25 backdrop-blur-sm transition-all duration-300">
                        <ChevronDown className="w-4 h-4 rotate-180" />
                    </motion.a>
                )}
            </AnimatePresence>
        </div>
    );
}